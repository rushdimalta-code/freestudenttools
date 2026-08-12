// ===== IMAGE COMPRESSOR — Canvas API =====

const QUALITY_MAP = { low: 0.4, medium: 0.7, high: 0.85 };
const MAX_BYTES = 20 * 1024 * 1024;

let selectedFile = null;
let compressedBlob = null;
let originalObjectURL = null;
let compressedObjectURL = null;

// DOM
const uploadZone        = document.getElementById('uploadZone');
const fileInput         = document.getElementById('fileInput');
const fileInputSelected = document.getElementById('fileInputSelected');
const fileNameEl        = document.getElementById('fileName');
const fileSizeEl        = document.getElementById('fileSize');
const removeFileBtn     = document.getElementById('removeFile');
const startBtn          = document.getElementById('startBtn');
const resetBtn          = document.getElementById('resetBtn');
const statusMsg         = document.getElementById('statusMsg');
const progressContainer = document.getElementById('progressContainer');
const progressFill      = document.getElementById('progressFill');
const progressLabel     = document.getElementById('progressLabel');
const resultContainer   = document.getElementById('resultContainer');
const originalPreview   = document.getElementById('originalPreview');
const compressedPreview = document.getElementById('compressedPreview');
const originalSizeStat  = document.getElementById('originalSizeStat');
const compressedSizeStat= document.getElementById('compressedSizeStat');
const savingPct         = document.getElementById('savingPct');
const downloadBtn       = document.getElementById('downloadBtn');
const outputFormat      = document.getElementById('outputFormat');

// Quality radio sync
document.querySelectorAll('input[name="quality"]').forEach(radio => {
  radio.addEventListener('change', () => {
    document.querySelectorAll('.radio-option').forEach(el => el.classList.remove('selected'));
    radio.closest('.radio-option').classList.add('selected');
  });
});

// Upload zone events — input covers the zone via CSS (position:absolute inset:0),
// so clicks on the zone naturally reach the input. Do NOT call fileInput.click()
// from a zone click handler — that double-triggers the dialog and cancels it.
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

function handleFile(file) {
  if (!file.type.startsWith('image/')) {
    showStatus('error', 'Please upload an image file (JPG, PNG, WebP, or GIF).');
    return;
  }
  if (file.size > MAX_BYTES) {
    showStatus('error', 'File is too large. Maximum size is 20MB.');
    return;
  }
  selectedFile = file;
  fileNameEl.textContent = file.name;
  fileSizeEl.textContent = formatBytes(file.size);
  fileInputSelected.classList.add('show');
  startBtn.disabled = false;
  resultContainer.classList.remove('show');
  progressContainer.classList.remove('show');
  resetBtn.style.display = 'none';

  // Canvas (the only compression path this tool has) can only ever emit
  // PNG/JPEG/WebP — there is no way to write a GIF back out, animated or
  // not. Warn up front rather than let someone compress an animated GIF
  // and silently lose the animation with no explanation.
  if (file.type === 'image/gif') {
    showStatus('warning', 'GIF can\'t be compressed as a GIF in-browser — this will convert it to a static JPEG or WebP. If this GIF is animated, only the first frame will be kept.');
  } else {
    hideStatus();
  }
  updatePngHint();
}

function updatePngHint() {
  const hint = document.getElementById('pngQualityHint');
  if (!hint) return;
  // Matches the same mimeType resolution compressImage() uses: output is
  // only ever PNG when the source is PNG and the user hasn't overridden
  // the format to JPEG/WebP.
  const willOutputPng = selectedFile && selectedFile.type === 'image/png' && outputFormat.value === 'original';
  hint.style.display = willOutputPng ? 'block' : 'none';
}
outputFormat.addEventListener('change', updatePngHint);

startBtn.addEventListener('click', compressImage);
resetBtn.addEventListener('click', resetAll);
downloadBtn.addEventListener('click', downloadCompressed);

async function compressImage() {
  if (!selectedFile) return;

  startBtn.disabled = true;
  resetBtn.style.display = 'none';
  resultContainer.classList.remove('show');
  hideStatus();

  progressContainer.classList.add('show');
  progressLabel.textContent = 'Compressing...';
  progressFill.classList.add('indeterminate');

  try {
    const quality = QUALITY_MAP[getSelectedQuality()];
    const format = outputFormat.value;

    // Determine MIME type
    let mimeType;
    if (format === 'jpeg') mimeType = 'image/jpeg';
    else if (format === 'webp') mimeType = 'image/webp';
    else {
      mimeType = selectedFile.type === 'image/png' ? 'image/png' : 'image/jpeg';
    }

    // Load image
    const imgBitmap = await createImageBitmap(selectedFile);

    // Draw to canvas
    const canvas = document.createElement('canvas');
    canvas.width = imgBitmap.width;
    canvas.height = imgBitmap.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imgBitmap, 0, 0);

    // Compress
    compressedBlob = await new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (blob) resolve(blob);
        else reject(new Error('Compression failed'));
      }, mimeType, mimeType === 'image/png' ? undefined : quality);
    });

    // Revoke old URLs
    if (originalObjectURL) URL.revokeObjectURL(originalObjectURL);
    if (compressedObjectURL) URL.revokeObjectURL(compressedObjectURL);

    originalObjectURL = URL.createObjectURL(selectedFile);
    compressedObjectURL = URL.createObjectURL(compressedBlob);

    // Determine extension
    const extMap = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
    const baseName = selectedFile.name.replace(/\.[^.]+$/, '');
    const ext = extMap[mimeType] || 'jpg';
    const compressedFileName = `${baseName}-compressed.${ext}`;

    // Update previews
    originalPreview.src = originalObjectURL;
    compressedPreview.src = compressedObjectURL;

    // Update stats
    const origSize = selectedFile.size;
    const compSize = compressedBlob.size;
    const saving = Math.round((1 - compSize / origSize) * 100);

    originalSizeStat.textContent = formatBytes(origSize);
    compressedSizeStat.textContent = formatBytes(compSize);
    savingPct.textContent = saving > 0 ? `-${saving}%` : '0%';

    document.getElementById('downloadDesc').textContent =
      `Reduced from ${formatBytes(origSize)} to ${formatBytes(compSize)}. Click to download.`;

    // Store filename for download
    downloadBtn.dataset.filename = compressedFileName;

    progressContainer.classList.remove('show');
    progressFill.classList.remove('indeterminate');
    resultContainer.classList.add('show');
    resetBtn.style.display = '';

    if (saving <= 0) {
      if (mimeType === 'image/png') {
        showStatus('warning', 'PNG is lossless, so the quality slider has no effect on it — that\'s why the file didn\'t shrink. Change "Output Format" above to JPEG or WebP for a real size reduction.');
      } else {
        showStatus('warning', 'The compressed file is not smaller than the original. Try a lower quality level.');
      }
    }
  } catch (err) {
    progressContainer.classList.remove('show');
    progressFill.classList.remove('indeterminate');
    showStatus('error', 'Compression failed: ' + err.message);
    startBtn.disabled = false;
  }
}

function downloadCompressed() {
  if (!compressedBlob) return;
  const url = URL.createObjectURL(compressedBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = downloadBtn.dataset.filename || 'compressed-image.jpg';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function resetAll() {
  selectedFile = null;
  compressedBlob = null;
  if (originalObjectURL) { URL.revokeObjectURL(originalObjectURL); originalObjectURL = null; }
  if (compressedObjectURL) { URL.revokeObjectURL(compressedObjectURL); compressedObjectURL = null; }
  fileInput.value = '';
  fileNameEl.textContent = '';
  fileSizeEl.textContent = '';
  fileInputSelected.classList.remove('show');
  startBtn.disabled = true;
  resetBtn.style.display = 'none';
  progressContainer.classList.remove('show');
  progressFill.classList.remove('indeterminate');
  resultContainer.classList.remove('show');
  hideStatus();
}

function getSelectedQuality() {
  return document.querySelector('input[name="quality"]:checked')?.value || 'medium';
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
  if (bytes === 0) return '0 B';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}
