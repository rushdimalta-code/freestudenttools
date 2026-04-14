// ===== PDF COMPRESSOR =====
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let selectedFile = null;
let compressedBlob = null;
let cancelled = false;

const fileInput = document.getElementById('fileInput');
const startBtn = document.getElementById('startCompress');
const resetBtn = document.getElementById('resetBtn');
const removeBtn = document.getElementById('removeFile');
const cancelBtn = document.getElementById('cancelBtn');

const QUALITY = { low: 0.85, medium: 0.6, high: 0.35 };
const SCALE = { low: 1.5, medium: 1.2, high: 0.9 };

function showCancel() { cancelBtn.style.display = 'inline-flex'; startBtn.disabled = true; }
function hideCancel() { cancelBtn.style.display = 'none'; }

document.querySelectorAll('input[name="compression"]').forEach(radio => {
  radio.addEventListener('change', () => {
    document.querySelectorAll('.radio-option').forEach(opt => opt.classList.remove('selected'));
    radio.closest('.radio-option')?.classList.add('selected');
  });
});

fileInput?.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  selectedFile = file;
  setFileSelected(file, 'fileInput');
  startBtn.disabled = false;
  hideStatus('statusMsg');
  document.getElementById('resultContainer')?.classList.remove('show');
});

removeBtn?.addEventListener('click', () => {
  selectedFile = null;
  compressedBlob = null;
  fileInput.value = '';
  setFileSelected(null, 'fileInput');
  startBtn.disabled = true;
  resetBtn.style.display = 'none';
  hideCancel();
  document.getElementById('resultContainer')?.classList.remove('show');
  hideStatus('statusMsg');
  hideProgress();
});

cancelBtn?.addEventListener('click', () => {
  cancelled = true;
  hideCancel();
  hideProgress();
  showStatus('statusMsg', 'Cancelled.', 'warning');
  startBtn.disabled = false;
  resetBtn.style.display = 'inline-flex';
  trackEvent('pdf_compress_cancelled');
});

resetBtn?.addEventListener('click', () => removeBtn?.click());

startBtn?.addEventListener('click', async () => {
  if (!selectedFile) return;

  const level = document.querySelector('input[name="compression"]:checked')?.value || 'medium';
  const quality = QUALITY[level];
  const scale = SCALE[level];

  cancelled = false;
  startBtn.disabled = true;
  resetBtn.style.display = 'none';
  document.getElementById('resultContainer')?.classList.remove('show');
  hideStatus('statusMsg');
  showCancel();
  showProgress(5, 'Loading PDF...');

  try {
    const originalSize = selectedFile.size;
    const arrayBuffer = await selectedFile.arrayBuffer();
    if (cancelled) return;

    showProgress(15, 'Analysing PDF...');
    const pdfData = new Uint8Array(arrayBuffer);
    const pdfDoc = await pdfjsLib.getDocument({
      data: pdfData,
      useWorkerFetch: false,
      isEvalSupported: false,
      useSystemFonts: true
    }).promise;
    const totalPages = pdfDoc.numPages;

    const { PDFDocument } = PDFLib;
    const newPdf = await PDFDocument.create();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    for (let i = 1; i <= totalPages; i++) {
      if (cancelled) { canvas.remove(); return; }
      showProgress(15 + (i / totalPages) * 75, `Compressing page ${i} of ${totalPages}...`);

      const page = await pdfDoc.getPage(i);
      const viewport = page.getViewport({ scale });
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: ctx, viewport }).promise;

      const jpegDataUrl = canvas.toDataURL('image/jpeg', quality);
      const jpegBytes = Uint8Array.from(atob(jpegDataUrl.split(',')[1]), c => c.charCodeAt(0));
      const jpegImage = await newPdf.embedJpg(jpegBytes);
      const newPage = newPdf.addPage([viewport.width, viewport.height]);
      newPage.drawImage(jpegImage, { x: 0, y: 0, width: viewport.width, height: viewport.height });
    }

    if (cancelled) { canvas.remove(); return; }

    canvas.remove();
    showProgress(95, 'Finalising...');
    const compressedBytes = await newPdf.save({ useObjectStreams: true });
    compressedBlob = new Blob([compressedBytes], { type: 'application/pdf' });

    showProgress(100, 'Done!');
    hideProgress();
    hideCancel();

    const compressedSize = compressedBlob.size;
    const saving = ((originalSize - compressedSize) / originalSize * 100);

    document.getElementById('originalSize').textContent = formatBytes(originalSize);
    document.getElementById('compressedSize').textContent = formatBytes(compressedSize);
    document.getElementById('savingPct').textContent = saving > 0 ? `-${saving.toFixed(1)}%` : 'No reduction';

    const baseName = selectedFile.name.replace('.pdf', '');
    document.getElementById('downloadDesc').textContent = `${baseName}-compressed.pdf · ${formatBytes(compressedSize)}`;
    document.getElementById('resultContainer').classList.add('show');
    startBtn.disabled = false;
    resetBtn.style.display = 'inline-flex';

    if (saving <= 0) {
      showStatus('statusMsg', 'This PDF is already well-optimised — minimal reduction achieved.', 'warning');
    }

    // GA4 tracking
    trackEvent('pdf_compressed', {
      compression_level: level,
      original_size_kb: Math.round(originalSize / 1024),
      compressed_size_kb: Math.round(compressedBlob.size / 1024),
      saving_percent: Math.round(saving),
      page_count: totalPages
    });

  } catch (err) {
    if (cancelled) return;
    console.error(err);
    hideProgress();
    hideCancel();
    showStatus('statusMsg', 'Compression failed. Please check the file is a valid PDF.', 'error');
    trackEvent('pdf_compress_error', { compression_level: level });
    startBtn.disabled = false;
  }
});

document.getElementById('downloadBtn')?.addEventListener('click', () => {
  if (!compressedBlob || !selectedFile) return;
  const baseName = selectedFile.name.replace('.pdf', '');
  downloadBlob(compressedBlob, baseName + '-compressed.pdf');
});
