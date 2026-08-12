// ===== IMAGE COMPRESSOR — Canvas API =====

const QUALITY_MAP = { low: 0.4, medium: 0.7, high: 0.85 };
const MAX_BYTES = 20 * 1024 * 1024;
const MAX_FILES = 20;

let fileList = [];          // array of { file, name, size }
let compressedResults = []; // array of { name, blob, mimeType, originalSize, compressedSize, url, filename }

// Single-file result state (kept for the 1-file UI path)
let compressedBlob = null;
let originalObjectURL = null;
let compressedObjectURL = null;

// DOM
const uploadZone         = document.getElementById('uploadZone');
const fileInput          = document.getElementById('fileInput');
const fileListSection    = document.getElementById('fileListSection');
const fileListEl         = document.getElementById('fileList');
const fileListHint       = document.getElementById('fileListHint');
const startBtn           = document.getElementById('startBtn');
const startBtnLabel      = document.getElementById('startBtnLabel');
const clearAllBtn        = document.getElementById('clearAllBtn');
const resetBtn           = document.getElementById('resetBtn');
const statusMsg          = document.getElementById('statusMsg');
const progressContainer  = document.getElementById('progressContainer');
const progressFill       = document.getElementById('progressFill');
const progressLabel      = document.getElementById('progressLabel');
const resultContainer    = document.getElementById('resultContainer');
const originalPreview    = document.getElementById('originalPreview');
const compressedPreview  = document.getElementById('compressedPreview');
const originalSizeStat   = document.getElementById('originalSizeStat');
const compressedSizeStat = document.getElementById('compressedSizeStat');
const savingPct          = document.getElementById('savingPct');
const downloadBtn        = document.getElementById('downloadBtn');
const outputFormat       = document.getElementById('outputFormat');
const multiResultContainer     = document.getElementById('multiResultContainer');
const multiOriginalSizeStat    = document.getElementById('multiOriginalSizeStat');
const multiCompressedSizeStat  = document.getElementById('multiCompressedSizeStat');
const multiSavingPct           = document.getElementById('multiSavingPct');
const resultListEl             = document.getElementById('resultList');
const downloadAllBtn           = document.getElementById('downloadAllBtn');

// Quality radio sync
document.querySelectorAll('input[name="quality"]').forEach(radio => {
  radio.addEventListener('change', () => {
    document.querySelectorAll('.radio-option').forEach(el => el.classList.remove('selected'));
    radio.closest('.radio-option').classList.add('selected');
  });
});

// ── Upload zone / drop handling — multi-file ────────────────────────────────
uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.classList.add('drag-over'); });
uploadZone.addEventListener('dragleave', e => { if (!uploadZone.contains(e.relatedTarget)) uploadZone.classList.remove('drag-over'); });
uploadZone.addEventListener('drop', e => {
  e.preventDefault();
  uploadZone.classList.remove('drag-over');
  const dropped = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
  if (dropped.length) addFiles(dropped);
  else showStatus('error', 'Please drop image files only.');
});
fileInput.addEventListener('change', () => {
  addFiles(Array.from(fileInput.files));
  fileInput.value = ''; // allow re-selecting the same file(s) later
});
clearAllBtn.addEventListener('click', resetAll);

function addFiles(incoming) {
  let skipped = 0;
  let tooLarge = 0;

  for (const file of incoming) {
    if (!file.type.startsWith('image/')) { skipped++; continue; }
    if (file.size > MAX_BYTES) { tooLarge++; continue; }
    if (fileList.length >= MAX_FILES) {
      showStatus('warning', `Maximum of ${MAX_FILES} files reached. Remove a file to add more.`);
      break;
    }
    const isDupe = fileList.some(f => f.name === file.name && f.size === file.size);
    if (isDupe) continue;
    fileList.push({ file, name: file.name, size: file.size });
  }

  if (skipped > 0 && incoming.length === skipped) {
    showStatus('error', 'Please upload image files (JPG, PNG, WebP, or GIF).');
  } else if (tooLarge > 0) {
    showStatus('warning', `${tooLarge} file${tooLarge > 1 ? 's were' : ' was'} skipped — maximum size is 20MB each.`);
  } else {
    hideStatus();
  }

  resultContainer.classList.remove('show');
  multiResultContainer.classList.remove('show');
  progressContainer.classList.remove('show');
  resetBtn.style.display = 'none';

  renderFileList();
  updateStartButton();
  updatePngHint();
}

function removeFile(index) {
  fileList.splice(index, 1);
  resultContainer.classList.remove('show');
  multiResultContainer.classList.remove('show');
  hideStatus();
  renderFileList();
  updateStartButton();
  updatePngHint();
}

function renderFileList() {
  fileListEl.innerHTML = '';

  if (fileList.length === 0) {
    fileListSection.style.display = 'none';
    clearAllBtn.style.display = 'none';
    return;
  }

  fileListSection.style.display = 'block';
  clearAllBtn.style.display = 'inline-flex';

  fileList.forEach((item, index) => {
    const li = document.createElement('div');
    li.className = 'file-list-item';
    li.setAttribute('role', 'listitem');
    li.innerHTML = `
      <div class="file-list-icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
      </div>
      <span class="file-list-name" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</span>
      <span class="file-list-size">${formatBytes(item.size)}</span>
      <button class="file-list-remove" aria-label="Remove ${escapeHtml(item.name)}" data-index="${index}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    `;
    fileListEl.appendChild(li);
  });

  fileListEl.querySelectorAll('.file-list-remove').forEach(btn => {
    btn.addEventListener('click', () => removeFile(parseInt(btn.dataset.index, 10)));
  });

  const count = fileList.length;
  fileListHint.textContent = count > 1
    ? `${count} images selected — the same quality and format settings apply to all of them`
    : '1 image selected';
}

function updateStartButton() {
  startBtn.disabled = fileList.length === 0;
  startBtnLabel.textContent = fileList.length > 1 ? `Compress ${fileList.length} Images` : 'Compress Image';
}

function updatePngHint() {
  const hint = document.getElementById('pngQualityHint');
  if (!hint) return;
  // Matches the mimeType resolution compressOneFile() uses: output is only
  // ever PNG when the source is PNG and the user hasn't overridden the
  // format to JPEG/WebP. Shown if ANY selected file would resolve to PNG.
  const anyPng = fileList.some(f => f.file.type === 'image/png') && outputFormat.value === 'original';
  hint.style.display = anyPng ? 'block' : 'none';
}
outputFormat.addEventListener('change', updatePngHint);

startBtn.addEventListener('click', compressAll);
resetBtn.addEventListener('click', resetAll);
downloadBtn.addEventListener('click', downloadCompressed);
downloadAllBtn.addEventListener('click', downloadAllCompressed);

// ── Core per-file compression ───────────────────────────────────────────────
async function compressOneFile(file) {
  const quality = QUALITY_MAP[getSelectedQuality()];
  const format = outputFormat.value;

  let mimeType;
  if (format === 'jpeg') mimeType = 'image/jpeg';
  else if (format === 'webp') mimeType = 'image/webp';
  else mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';

  const imgBitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = imgBitmap.width;
  canvas.height = imgBitmap.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(imgBitmap, 0, 0);

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(b => {
      if (b) resolve(b);
      else reject(new Error('Compression failed'));
    }, mimeType, mimeType === 'image/png' ? undefined : quality);
  });

  const extMap = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
  const baseName = file.name.replace(/\.[^.]+$/, '');
  const ext = extMap[mimeType] || 'jpg';

  return { blob, mimeType, filename: `${baseName}-compressed.${ext}` };
}

async function compressAll() {
  if (fileList.length === 0) return;

  startBtn.disabled = true;
  resetBtn.style.display = 'none';
  resultContainer.classList.remove('show');
  multiResultContainer.classList.remove('show');
  hideStatus();

  progressContainer.classList.add('show');
  progressFill.classList.add('indeterminate');

  compressedResults = [];
  let anyPngNoShrink = false;
  let anyGif = fileList.some(f => f.file.type === 'image/gif');

  try {
    for (let i = 0; i < fileList.length; i++) {
      const item = fileList[i];
      progressLabel.textContent = fileList.length > 1
        ? `Compressing ${i + 1} of ${fileList.length}...`
        : 'Compressing...';

      const { blob, mimeType, filename } = await compressOneFile(item.file);
      if (blob.size >= item.size && mimeType === 'image/png') anyPngNoShrink = true;

      compressedResults.push({
        name: item.name,
        blob,
        mimeType,
        filename,
        originalSize: item.size,
        compressedSize: blob.size,
        url: URL.createObjectURL(blob),
      });
    }

    progressContainer.classList.remove('show');
    progressFill.classList.remove('indeterminate');
    resetBtn.style.display = '';
    startBtn.disabled = false;

    if (compressedResults.length === 1) {
      showSingleResult(compressedResults[0], fileList[0].file);
    } else {
      showMultiResult();
    }

    if (anyGif) {
      showStatus('warning', 'GIF can\'t be compressed as a GIF in-browser — animated GIFs were converted to a static image, keeping only the first frame.');
    } else if (anyPngNoShrink) {
      showStatus('warning', 'One or more PNGs didn\'t get smaller — PNG is lossless, so the quality slider has no effect on it. Change "Output Format" above to JPEG or WebP for a real size reduction.');
    }
  } catch (err) {
    progressContainer.classList.remove('show');
    progressFill.classList.remove('indeterminate');
    showStatus('error', 'Compression failed: ' + err.message);
    startBtn.disabled = false;
  }
}

function showSingleResult(result, originalFile) {
  if (originalObjectURL) URL.revokeObjectURL(originalObjectURL);
  if (compressedObjectURL) URL.revokeObjectURL(compressedObjectURL);

  originalObjectURL = URL.createObjectURL(originalFile);
  compressedObjectURL = result.url;
  compressedBlob = result.blob;

  originalPreview.src = originalObjectURL;
  compressedPreview.src = compressedObjectURL;

  const origSize = result.originalSize;
  const compSize = result.compressedSize;
  const saving = Math.round((1 - compSize / origSize) * 100);

  originalSizeStat.textContent = formatBytes(origSize);
  compressedSizeStat.textContent = formatBytes(compSize);
  savingPct.textContent = saving > 0 ? `-${saving}%` : '0%';

  document.getElementById('downloadDesc').textContent =
    `Reduced from ${formatBytes(origSize)} to ${formatBytes(compSize)}. Click to download.`;
  downloadBtn.dataset.filename = result.filename;

  resultContainer.classList.add('show');
}

function showMultiResult() {
  const totalOrig = compressedResults.reduce((s, r) => s + r.originalSize, 0);
  const totalComp = compressedResults.reduce((s, r) => s + r.compressedSize, 0);
  const saving = Math.round((1 - totalComp / totalOrig) * 100);

  multiOriginalSizeStat.textContent = formatBytes(totalOrig);
  multiCompressedSizeStat.textContent = formatBytes(totalComp);
  multiSavingPct.textContent = saving > 0 ? `-${saving}%` : '0%';

  resultListEl.innerHTML = '';
  compressedResults.forEach((r, index) => {
    const itemSaving = Math.round((1 - r.compressedSize / r.originalSize) * 100);
    const li = document.createElement('div');
    li.className = 'file-list-item';
    li.setAttribute('role', 'listitem');
    li.innerHTML = `
      <div class="file-list-icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
      </div>
      <span class="file-list-name" title="${escapeHtml(r.name)}">${escapeHtml(r.filename)}</span>
      <span class="file-list-size">${formatBytes(r.originalSize)} → ${formatBytes(r.compressedSize)}</span>
      <span class="file-list-saving">${itemSaving > 0 ? `-${itemSaving}%` : '0%'}</span>
      <button class="file-list-download" aria-label="Download ${escapeHtml(r.filename)}" data-index="${index}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Download
      </button>
    `;
    resultListEl.appendChild(li);
  });

  resultListEl.querySelectorAll('.file-list-download').forEach(btn => {
    btn.addEventListener('click', () => downloadOne(compressedResults[parseInt(btn.dataset.index, 10)]));
  });

  multiResultContainer.classList.add('show');
}

function downloadOne(result) {
  const a = document.createElement('a');
  a.href = result.url;
  a.download = result.filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

async function downloadAllCompressed() {
  // Sequential with a short stagger — browsers can block several
  // simultaneous programmatic downloads fired in the same tick.
  for (const result of compressedResults) {
    downloadOne(result);
    await new Promise(r => setTimeout(r, 300));
  }
}

function downloadCompressed() {
  if (!compressedBlob) return;
  const a = document.createElement('a');
  a.href = compressedObjectURL;
  a.download = downloadBtn.dataset.filename || 'compressed-image.jpg';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function resetAll() {
  fileList = [];
  compressedResults.forEach(r => URL.revokeObjectURL(r.url));
  compressedResults = [];
  compressedBlob = null;
  if (originalObjectURL) { URL.revokeObjectURL(originalObjectURL); originalObjectURL = null; }
  if (compressedObjectURL) { compressedObjectURL = null; }
  fileInput.value = '';
  startBtn.disabled = true;
  startBtnLabel.textContent = 'Compress Image';
  resetBtn.style.display = 'none';
  clearAllBtn.style.display = 'none';
  progressContainer.classList.remove('show');
  progressFill.classList.remove('indeterminate');
  resultContainer.classList.remove('show');
  multiResultContainer.classList.remove('show');
  hideStatus();
  renderFileList();
  updatePngHint();
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

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
