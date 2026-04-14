// ===== PDF MERGER — pdf-lib =====

const MAX_FILES = 10;
const MAX_TOTAL_BYTES = 200 * 1024 * 1024; // 200 MB

// State
let fileList = []; // array of { file, name, size }
let mergedBlob = null;

// Elements
const fileInput    = document.getElementById('fileInput');
const uploadZone   = document.getElementById('uploadZone');
const fileListEl   = document.getElementById('fileList');
const fileListSection = document.getElementById('fileListSection');
const fileListHint = document.getElementById('fileListHint');
const mergeBtn     = document.getElementById('mergeBtn');
const clearAllBtn  = document.getElementById('clearAllBtn');
const downloadBtn  = document.getElementById('downloadBtn');
const mergeAgainBtn = document.getElementById('mergeAgainBtn');
const statFiles    = document.getElementById('statFiles');
const statPages    = document.getElementById('statPages');
const statSize     = document.getElementById('statSize');

// ── File input / drop handler ──────────────────────────────────────────────

fileInput?.addEventListener('change', e => {
  addFiles(Array.from(e.target.files));
  // Reset the input so re-selecting the same file fires change again
  fileInput.value = '';
});

// Override common.js drag-drop for the upload zone — we need multi-file support
if (uploadZone) {
  uploadZone.addEventListener('dragover', e => {
    e.preventDefault();
    uploadZone.classList.add('drag-over');
  });
  uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('drag-over');
  });
  uploadZone.addEventListener('drop', e => {
    e.preventDefault();
    uploadZone.classList.remove('drag-over');
    const dropped = Array.from(e.dataTransfer.files).filter(f => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'));
    if (dropped.length) {
      addFiles(dropped);
    } else {
      showStatus('statusMsg', 'Please drop PDF files only.', 'warning');
    }
  });
}

// ── addFiles ───────────────────────────────────────────────────────────────

function addFiles(incoming) {
  hideStatus('statusMsg');
  let skipped = 0;

  for (const file of incoming) {
    // Type check
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      skipped++;
      continue;
    }

    // Max files check
    if (fileList.length >= MAX_FILES) {
      showStatus('statusMsg', `Maximum of ${MAX_FILES} files reached. Remove a file to add more.`, 'warning');
      break;
    }

    // Duplicate check (name + size)
    const isDupe = fileList.some(f => f.name === file.name && f.size === file.size);
    if (isDupe) {
      skipped++;
      continue;
    }

    // Total size check
    const currentTotal = fileList.reduce((sum, f) => sum + f.size, 0);
    if (currentTotal + file.size > MAX_TOTAL_BYTES) {
      showStatus('statusMsg', `Adding "${file.name}" would exceed the 200 MB total limit.`, 'warning');
      break;
    }

    fileList.push({ file, name: file.name, size: file.size });
  }

  if (skipped > 0 && incoming.length === skipped) {
    showStatus('statusMsg', 'Only PDF files are supported. No files were added.', 'error');
  }

  renderFileList();
  updateStats();
  updateMergeButton();
}

// ── removeFile ─────────────────────────────────────────────────────────────

function removeFile(index) {
  fileList.splice(index, 1);
  mergedBlob = null;
  document.getElementById('resultContainer')?.classList.remove('show');
  hideStatus('statusMsg');
  renderFileList();
  updateStats();
  updateMergeButton();
}

// ── renderFileList ─────────────────────────────────────────────────────────

function renderFileList() {
  if (!fileListEl) return;
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
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      </div>
      <span class="file-list-name" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</span>
      <span class="file-list-size">${formatBytes(item.size)}</span>
      <button class="file-list-remove" aria-label="Remove ${escapeHtml(item.name)}" data-index="${index}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    `;
    fileListEl.appendChild(li);
  });

  // Delegate remove button clicks
  fileListEl.querySelectorAll('.file-list-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index, 10);
      removeFile(idx);
    });
  });

  // Hint text
  if (fileListHint) {
    const count = fileList.length;
    fileListHint.textContent = count >= 2
      ? `${count} PDF${count > 1 ? 's' : ''} selected — files will be merged in the order shown above`
      : '1 PDF selected — add at least one more to enable merging';
  }
}

// ── updateStats ────────────────────────────────────────────────────────────

function updateStats() {
  if (!statFiles) return;
  const count = fileList.length;
  const totalBytes = fileList.reduce((sum, f) => sum + f.size, 0);

  statFiles.textContent = count;
  statSize.textContent = count > 0 ? formatBytes(totalBytes) : '0 KB';
  // Page count is only knowable after loading each PDF — show a dash until merge completes
  statPages.textContent = '—';
}

// ── updateMergeButton ──────────────────────────────────────────────────────

function updateMergeButton() {
  if (!mergeBtn) return;
  mergeBtn.disabled = fileList.length < 2;
}

// ── mergePDFs ──────────────────────────────────────────────────────────────

mergeBtn?.addEventListener('click', mergePDFs);

async function mergePDFs() {
  if (fileList.length < 2) return;

  mergedBlob = null;
  document.getElementById('resultContainer')?.classList.remove('show');
  hideStatus('statusMsg');
  mergeBtn.disabled = true;
  clearAllBtn.style.display = 'none';

  showProgress(0, 'Starting merge...');

  try {
    const { PDFDocument } = PDFLib;
    const mergedDoc = await PDFDocument.create();
    let totalPages = 0;
    const total = fileList.length;

    for (let i = 0; i < total; i++) {
      const item = fileList[i];
      showProgress(
        Math.round(5 + (i / total) * 88),
        `Merging file ${i + 1} of ${total}: ${item.name}`
      );

      let arrayBuffer;
      try {
        arrayBuffer = await item.file.arrayBuffer();
      } catch (readErr) {
        throw new Error(`Could not read "${item.name}". The file may have been moved or deleted.`);
      }

      let srcDoc;
      try {
        srcDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      } catch (parseErr) {
        throw new Error(`"${item.name}" could not be parsed. Make sure it is a valid, unencrypted PDF.`);
      }

      const pageIndices = srcDoc.getPageIndices();
      const copiedPages = await mergedDoc.copyPages(srcDoc, pageIndices);
      copiedPages.forEach(page => mergedDoc.addPage(page));
      totalPages += pageIndices.length;
    }

    showProgress(96, 'Saving merged PDF...');
    const mergedBytes = await mergedDoc.save({ useObjectStreams: true });
    mergedBlob = new Blob([mergedBytes], { type: 'application/pdf' });

    showProgress(100, 'Done!');
    hideProgress();

    // Update page count in stats now that we know it
    if (statPages) statPages.textContent = totalPages.toLocaleString();

    // Populate download description
    const desc = document.getElementById('downloadDesc');
    if (desc) {
      desc.textContent = `${total} files merged · ${totalPages} pages · ${formatBytes(mergedBlob.size)}`;
    }

    document.getElementById('resultContainer')?.classList.add('show');
    mergeBtn.disabled = false;
    clearAllBtn.style.display = 'inline-flex';

    trackEvent('pdf_merged', {
      file_count: total,
      total_pages: totalPages,
      merged_size_kb: Math.round(mergedBlob.size / 1024)
    });

  } catch (err) {
    console.error(err);
    hideProgress();
    showStatus('statusMsg', err.message || 'Merge failed. Please check your files are valid PDFs.', 'error');
    mergeBtn.disabled = fileList.length < 2;
    clearAllBtn.style.display = fileList.length > 0 ? 'inline-flex' : 'none';
    trackEvent('pdf_merge_error', { file_count: fileList.length });
  }
}

// ── downloadMerged ─────────────────────────────────────────────────────────

downloadBtn?.addEventListener('click', () => {
  if (!mergedBlob) return;
  downloadBlob(mergedBlob, 'merged.pdf');
  trackEvent('pdf_merge_downloaded', { merged_size_kb: Math.round(mergedBlob.size / 1024) });
});

// ── resetAll ───────────────────────────────────────────────────────────────

clearAllBtn?.addEventListener('click', resetAll);
mergeAgainBtn?.addEventListener('click', resetAll);

function resetAll() {
  fileList = [];
  mergedBlob = null;
  if (fileInput) fileInput.value = '';
  renderFileList();
  updateStats();
  updateMergeButton();
  document.getElementById('resultContainer')?.classList.remove('show');
  hideStatus('statusMsg');
  hideProgress();
}

// ── Utility ────────────────────────────────────────────────────────────────

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
