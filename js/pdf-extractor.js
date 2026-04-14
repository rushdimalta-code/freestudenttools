// ===== PDF PAGE EXTRACTOR — pdf-lib =====

const MAX_BYTES = 100 * 1024 * 1024;

let selectedFile = null;
let totalPages = 0;
let extractedBlob = null;

// DOM
const uploadZone        = document.getElementById('uploadZone');
const fileInput         = document.getElementById('fileInput');
const fileInputSelected = document.getElementById('fileInputSelected');
const fileNameEl        = document.getElementById('fileName');
const fileSizeEl        = document.getElementById('fileSize');
const removeFileBtn     = document.getElementById('removeFile');
const pdfInfoBar        = document.getElementById('pdfInfoBar');
const pdfInfoText       = document.getElementById('pdfInfoText');
const pageRangeInput    = document.getElementById('pageRangeInput');
const extractBtn        = document.getElementById('extractBtn');
const resetBtn          = document.getElementById('resetBtn');
const statusMsg         = document.getElementById('statusMsg');
const progressContainer = document.getElementById('progressContainer');
const progressFill      = document.getElementById('progressFill');
const progressLabel     = document.getElementById('progressLabel');
const resultContainer   = document.getElementById('resultContainer');
const pagesExtractedStat= document.getElementById('pagesExtractedStat');
const outputSizeStat    = document.getElementById('outputSizeStat');
const downloadBtn       = document.getElementById('downloadBtn');

// Upload zone events — input covers zone via CSS, no manual click() needed
uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.classList.add('drag-over'); });
uploadZone.addEventListener('dragleave', e => { if (!uploadZone.contains(e.relatedTarget)) uploadZone.classList.remove('drag-over'); });
uploadZone.addEventListener('drop', e => {
  e.preventDefault();
  uploadZone.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file) handleFile(file);
});
fileInput.addEventListener('change', () => {
  if (fileInput.files[0]) handleFile(fileInput.files[0]);
});
removeFileBtn.addEventListener('click', resetAll);

async function handleFile(file) {
  if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    showStatus('error', 'Please upload a PDF file.');
    return;
  }
  if (file.size > MAX_BYTES) {
    showStatus('error', 'File is too large. Maximum size is 100MB.');
    return;
  }

  selectedFile = file;
  fileNameEl.textContent = file.name;
  fileSizeEl.textContent = formatBytes(file.size);
  fileInputSelected.classList.add('show');
  hideStatus();
  resultContainer.classList.remove('show');
  progressContainer.classList.remove('show');

  // Load to get page count
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    totalPages = pdfDoc.getPageCount();
    pdfInfoText.innerHTML = `<strong>${totalPages}-page PDF loaded</strong> — specify which pages to extract below`;
    pdfInfoBar.classList.add('show');
    updateExtractBtn();
  } catch (err) {
    showStatus('error', 'Could not read PDF. The file may be corrupted or password-protected.');
    resetAll();
  }
}

// Page range input
pageRangeInput.addEventListener('input', updateExtractBtn);

function updateExtractBtn() {
  extractBtn.disabled = !(selectedFile && pageRangeInput.value.trim());
}

// Quick select buttons
document.querySelectorAll('.quick-select-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;
    if (!totalPages) return;
    switch (action) {
      case 'first': pageRangeInput.value = '1'; break;
      case 'last':  pageRangeInput.value = String(totalPages); break;
      case 'all':   pageRangeInput.value = `1-${totalPages}`; break;
      case 'odd':   pageRangeInput.value = Array.from({ length: totalPages }, (_, i) => i + 1).filter(n => n % 2 !== 0).join(','); break;
      case 'even':  pageRangeInput.value = Array.from({ length: totalPages }, (_, i) => i + 1).filter(n => n % 2 === 0).join(','); break;
    }
    updateExtractBtn();
  });
});

extractBtn.addEventListener('click', extractPages);
resetBtn.addEventListener('click', resetAll);
downloadBtn.addEventListener('click', downloadExtracted);

function parsePageInput(input, total) {
  const parts = input.split(',').map(s => s.trim()).filter(Boolean);
  const pages = new Set();

  for (const part of parts) {
    if (/^\d+$/.test(part)) {
      const n = parseInt(part, 10);
      if (n < 1 || n > total) return { pages: null, error: `Page ${n} is out of range. This PDF has ${total} pages.` };
      pages.add(n - 1); // 0-based
    } else if (/^\d+-\d+$/.test(part)) {
      const [start, end] = part.split('-').map(Number);
      if (start > end) return { pages: null, error: `Invalid range "${part}" — start must be less than or equal to end.` };
      if (start < 1 || end > total) return { pages: null, error: `Range "${part}" is out of bounds. This PDF has ${total} pages.` };
      for (let i = start; i <= end; i++) pages.add(i - 1);
    } else {
      return { pages: null, error: `Invalid format: "${part}". Use numbers or ranges like 1-5.` };
    }
  }

  if (pages.size === 0) return { pages: null, error: 'No pages specified.' };
  if (pages.size > 50) return { pages: null, error: 'Maximum 50 pages per extraction.' };

  return { pages: Array.from(pages).sort((a, b) => a - b), error: null };
}

async function extractPages() {
  const { pages, error } = parsePageInput(pageRangeInput.value, totalPages);
  if (error) {
    showStatus('error', error);
    return;
  }

  extractBtn.disabled = true;
  resetBtn.style.display = 'none';
  resultContainer.classList.remove('show');
  hideStatus();
  progressContainer.classList.add('show');
  progressLabel.textContent = `Extracting ${pages.length} page${pages.length !== 1 ? 's' : ''}...`;
  progressFill.classList.add('indeterminate');

  try {
    const arrayBuffer = await selectedFile.arrayBuffer();
    const srcPdf = await PDFLib.PDFDocument.load(arrayBuffer);
    const newPdf = await PDFLib.PDFDocument.create();
    const copied = await newPdf.copyPages(srcPdf, pages);
    copied.forEach(page => newPdf.addPage(page));
    const bytes = await newPdf.save();
    extractedBlob = new Blob([bytes], { type: 'application/pdf' });

    pagesExtractedStat.textContent = pages.length;
    outputSizeStat.textContent = formatBytes(extractedBlob.size);

    const baseName = selectedFile.name.replace(/\.pdf$/i, '');
    downloadBtn.dataset.filename = `${baseName}-extracted.pdf`;

    progressContainer.classList.remove('show');
    progressFill.classList.remove('indeterminate');
    resultContainer.classList.add('show');
    resetBtn.style.display = '';
  } catch (err) {
    progressContainer.classList.remove('show');
    progressFill.classList.remove('indeterminate');
    showStatus('error', 'Extraction failed: ' + err.message);
    extractBtn.disabled = false;
  }
}

function downloadExtracted() {
  if (!extractedBlob) return;
  const url = URL.createObjectURL(extractedBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = downloadBtn.dataset.filename || 'extracted-pages.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function resetAll() {
  selectedFile = null;
  totalPages = 0;
  extractedBlob = null;
  fileInput.value = '';
  fileNameEl.textContent = '';
  fileSizeEl.textContent = '';
  fileInputSelected.classList.remove('show');
  pdfInfoBar.classList.remove('show');
  pageRangeInput.value = '';
  extractBtn.disabled = true;
  resetBtn.style.display = 'none';
  progressContainer.classList.remove('show');
  progressFill.classList.remove('indeterminate');
  resultContainer.classList.remove('show');
  hideStatus();
}

function showStatus(type, message) {
  statusMsg.className = `status-msg ${type} show`;
  statusMsg.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span>${message}</span>`;
}

function hideStatus() {
  statusMsg.className = 'status-msg';
  statusMsg.innerHTML = '';
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}
