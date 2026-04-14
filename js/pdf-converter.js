// ===== PDF CONVERTER TOOL =====
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let selectedFile = null;
let convertedBlob = null;
let outputFilename = '';
let cancelled = false;

const fileInput = document.getElementById('fileInput');
const startBtn = document.getElementById('startConvert');
const resetBtn = document.getElementById('resetBtn');
const removeBtn = document.getElementById('removeFile');
const cancelBtn = document.getElementById('cancelBtn');

function showCancel() { cancelBtn.style.display = 'inline-flex'; startBtn.disabled = true; }
function hideCancel() { cancelBtn.style.display = 'none'; }

// Radio styling for all radio groups
document.querySelectorAll('input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const name = radio.name;
    document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
      r.closest('.radio-option')?.classList.remove('selected');
    });
    radio.closest('.radio-option')?.classList.add('selected');
  });
});

// Hide Excel option when layout mode is selected
document.querySelectorAll('input[name="mode"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const isLayout = radio.value === 'layout';
    document.getElementById('radioExcel').style.opacity = isLayout ? '0.4' : '1';
    document.getElementById('radioExcel').style.pointerEvents = isLayout ? 'none' : 'auto';
    document.getElementById('langGroup').style.opacity = isLayout ? '0.4' : '1';
    if (isLayout) {
      document.querySelector('input[value="word"]').checked = true;
      document.getElementById('radioWord').classList.add('selected');
      document.getElementById('radioExcel').classList.remove('selected');
    }
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
  convertedBlob = null;
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
  trackEvent('pdf_convert_cancelled');
});

resetBtn?.addEventListener('click', () => removeBtn?.click());

startBtn?.addEventListener('click', async () => {
  if (!selectedFile) return;

  const format = document.querySelector('input[name="format"]:checked')?.value || 'word';
  const mode = document.querySelector('input[name="mode"]:checked')?.value || 'text';

  cancelled = false;
  startBtn.disabled = true;
  resetBtn.style.display = 'none';
  document.getElementById('resultContainer')?.classList.remove('show');
  hideStatus('statusMsg');
  showCancel();
  showProgress(5, 'Loading PDF...');

  try {
    const arrayBuffer = await selectedFile.arrayBuffer();
    if (cancelled) return;

    const pdfData = new Uint8Array(arrayBuffer);
    const pdf = await pdfjsLib.getDocument({
      data: pdfData,
      useWorkerFetch: false,
      isEvalSupported: false,
      useSystemFonts: true
    }).promise;
    const totalPages = pdf.numPages;
    const baseName = selectedFile.name.replace('.pdf', '');

    if (mode === 'layout') {
      // === WITH LAYOUT MODE: render pages as images ===
      showStatus('statusMsg', 'Rendering pages with full layout — this preserves images, logos and formatting...', 'info');
      convertedBlob = await buildLayoutDocx(pdf, totalPages);
      outputFilename = baseName + '.docx';
      document.getElementById('downloadIcon').textContent = '🖼️';
      document.getElementById('downloadTitle').textContent = 'Word Document Ready! (With Layout)';
      document.getElementById('downloadDesc').textContent = `${baseName}.docx — ${totalPages} page(s) with full layout`;

    } else {
      // === EDITABLE TEXT MODE ===
      let allText = '';
      let pageTexts = [];

      for (let i = 1; i <= totalPages; i++) {
        if (cancelled) return;
        showProgress(5 + (i / totalPages) * 70, `Extracting page ${i} of ${totalPages}...`);
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(' ').trim();
        pageTexts.push(pageText);
        allText += (pageText ? pageText + '\n\n' : '');
      }

      if (cancelled) return;

      if (!allText.trim()) {
        showProgress(80, 'No text layer — running OCR...');
        showStatus('statusMsg', 'Scanned PDF detected. Running OCR...', 'info');
        allText = await ocrPdfPages(pdf, totalPages, document.getElementById('pdfLang')?.value || 'eng');
        pageTexts = [allText];
      }

      if (cancelled) return;
      showProgress(85, 'Building output file...');

      if (format === 'word') {
        convertedBlob = await buildDocx(allText, pageTexts);
        outputFilename = baseName + '.docx';
        document.getElementById('downloadIcon').textContent = '📝';
        document.getElementById('downloadTitle').textContent = 'Word Document Ready!';
        document.getElementById('downloadDesc').textContent = `${baseName}.docx — ${totalPages} page(s) converted`;
      } else {
        convertedBlob = buildXlsx(pageTexts);
        outputFilename = baseName + '.xlsx';
        document.getElementById('downloadIcon').textContent = '📊';
        document.getElementById('downloadTitle').textContent = 'Excel Spreadsheet Ready!';
        document.getElementById('downloadDesc').textContent = `${baseName}.xlsx — ${totalPages} page(s) converted`;
      }
    }

    showProgress(100, 'Done!');
    hideProgress();
    hideCancel();
    hideStatus('statusMsg');
    document.getElementById('resultContainer').classList.add('show');
    startBtn.disabled = false;
    resetBtn.style.display = 'inline-flex';
    trackEvent('pdf_converted', { output_format: format, mode, page_count: totalPages });

  } catch (err) {
    if (cancelled) return;
    console.error('PDF conversion error:', err);
    hideProgress();
    hideCancel();
    const msg = err?.message || err?.name || 'Unknown error';
    showStatus('statusMsg', `Conversion failed: ${msg}`, 'error');
    trackEvent('pdf_convert_error', { output_format: format, mode });
    startBtn.disabled = false;
  }
});

document.getElementById('downloadBtn')?.addEventListener('click', () => {
  if (convertedBlob) downloadBlob(convertedBlob, outputFilename);
});

// ===== BUILD LAYOUT DOCX (pages as images — preserves all formatting) =====
async function buildLayoutDocx(pdf, totalPages) {
  const { Document, Packer, Paragraph, ImageRun, PageOrientation } = docx;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const sections = [];

  for (let i = 1; i <= totalPages; i++) {
    if (cancelled) break;
    showProgress(10 + (i / totalPages) * 80, `Rendering page ${i} of ${totalPages}...`);

    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2 }); // scale 2 = high quality
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport }).promise;

    // Convert canvas to PNG bytes
    const dataUrl = canvas.toDataURL('image/png');
    const base64 = dataUrl.split(',')[1];
    const imgBytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));

    // Word page dimensions in EMU (English Metric Units)
    // A4 page: 12240 x 15840 twips = 7772400 x 10058400 EMU
    const isLandscape = viewport.width > viewport.height;
    const pageW = isLandscape ? 15840 : 12240; // twips
    const pageH = isLandscape ? 12240 : 15840;
    const marginEmu = 720; // small margin in twips
    const imgW = pageW - (marginEmu * 2);
    const imgH = Math.round(imgW * (viewport.height / viewport.width));

    sections.push({
      properties: {
        page: {
          size: {
            width: pageW,
            height: pageH,
            orientation: isLandscape ? PageOrientation.LANDSCAPE : PageOrientation.PORTRAIT
          },
          margin: { top: marginEmu, right: marginEmu, bottom: marginEmu, left: marginEmu }
        }
      },
      children: [
        new Paragraph({
          children: [
            new ImageRun({
              data: imgBytes,
              transformation: { width: imgW * 914400 / 1440, height: imgH * 914400 / 1440 },
              type: 'png'
            })
          ],
          spacing: { before: 0, after: 0 }
        })
      ]
    });
  }

  canvas.remove();
  const doc = new Document({ sections });
  return await Packer.toBlob(doc);
}

async function buildDocx(allText, pageTexts) {
  const { Document, Packer, Paragraph, TextRun, HeadingLevel } = docx;
  const paragraphs = [];
  pageTexts.forEach((pageText, idx) => {
    if (pageTexts.length > 1) {
      paragraphs.push(new Paragraph({ text: `Page ${idx + 1}`, heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 120 } }));
    }
    const lines = pageText.split('\n').filter(l => l.trim());
    lines.forEach(line => {
      paragraphs.push(new Paragraph({ children: [new TextRun({ text: line })], spacing: { after: 120 } }));
    });
  });
  const doc = new Document({
    sections: [{ properties: {}, children: paragraphs.length ? paragraphs : [new Paragraph({ children: [new TextRun({ text: 'No text content found.' })] })] }]
  });
  return await Packer.toBlob(doc);
}

function buildXlsx(pageTexts) {
  const wb = XLSX.utils.book_new();
  pageTexts.forEach((pageText, idx) => {
    const rows = pageText.split('\n').filter(l => l.trim()).map(line => [line]);
    if (!rows.length) rows.push(['(No text found on this page)']);
    const ws = XLSX.utils.aoa_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, `Page ${idx + 1}`);
  });
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  return new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}

async function ocrPdfPages(pdf, totalPages, lang) {
  let text = '';
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const worker = await Tesseract.createWorker(lang);
  for (let i = 1; i <= totalPages; i++) {
    if (cancelled) { await worker.terminate(); canvas.remove(); return ''; }
    showProgress(80 + (i / totalPages) * 10, `OCR page ${i} of ${totalPages}...`);
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: ctx, viewport }).promise;
    const { data } = await worker.recognize(canvas);
    text += data.text + '\n\n';
  }
  await worker.terminate();
  canvas.remove();
  return text;
}
