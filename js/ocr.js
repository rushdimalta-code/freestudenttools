// ===== OCR TOOL =====
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let selectedFile = null;
let ocrWorker = null;
let cancelled = false;
let lastOcrResult = null; // stores full structured result for docx building

const fileInput = document.getElementById('fileInput');
const startBtn = document.getElementById('startOCR');
const resetBtn = document.getElementById('resetBtn');
const removeBtn = document.getElementById('removeFile');
const cancelBtn = document.getElementById('cancelBtn');
const resultContainer = document.getElementById('resultContainer');
const resultText = document.getElementById('resultText');
const resultAd = document.getElementById('resultAd');

function showCancel() { cancelBtn.style.display = 'inline-flex'; startBtn.disabled = true; }
function hideCancel() { cancelBtn.style.display = 'none'; }

fileInput?.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  selectedFile = file;
  lastOcrResult = null;
  setFileSelected(file, 'fileInput');
  startBtn.disabled = false;
  hideStatus('statusMsg');
  resultContainer?.classList.remove('show');
  if (resultAd) resultAd.style.display = 'none';
});

removeBtn?.addEventListener('click', () => {
  selectedFile = null;
  lastOcrResult = null;
  fileInput.value = '';
  setFileSelected(null, 'fileInput');
  startBtn.disabled = true;
  resetBtn.style.display = 'none';
  hideCancel();
  resultContainer?.classList.remove('show');
  if (resultAd) resultAd.style.display = 'none';
  hideStatus('statusMsg');
  hideProgress();
});

cancelBtn?.addEventListener('click', async () => {
  cancelled = true;
  if (ocrWorker) {
    try { await ocrWorker.terminate(); } catch (e) {}
    ocrWorker = null;
  }
  hideCancel();
  hideProgress();
  showStatus('statusMsg', 'Cancelled.', 'warning');
  startBtn.disabled = false;
  resetBtn.style.display = 'inline-flex';
  trackEvent('ocr_cancelled');
});

resetBtn?.addEventListener('click', () => removeBtn?.click());

startBtn?.addEventListener('click', async () => {
  if (!selectedFile) return;

  const lang = document.getElementById('ocrLang')?.value || 'eng';
  const isPDF = selectedFile.type === 'application/pdf' || selectedFile.name.toLowerCase().endsWith('.pdf');

  cancelled = false;
  lastOcrResult = null;
  startBtn.disabled = true;
  resetBtn.style.display = 'none';
  resultContainer?.classList.remove('show');
  if (resultAd) resultAd.style.display = 'none';
  hideStatus('statusMsg');
  showCancel();
  showProgress(0, 'Initializing OCR engine...');
  showStatus('statusMsg', 'Loading OCR engine — first load may take a moment...', 'info');

  try {
    let result;
    if (isPDF) {
      result = await ocrPDF(selectedFile, lang);
    } else {
      result = await ocrImage(selectedFile, lang);
    }

    if (cancelled) return;

    showProgress(100, 'Done!');
    hideProgress();
    hideCancel();
    hideStatus('statusMsg');

    const trimmed = result.text.trim();
    if (!trimmed) {
      showStatus('statusMsg', 'No text detected. Try a clearer file or different language setting.', 'warning');
      startBtn.disabled = false;
      return;
    }

    lastOcrResult = result;
    resultText.textContent = trimmed;
    resultContainer.classList.add('show');
    if (resultAd) resultAd.style.display = 'flex';

    const words = trimmed.split(/\s+/).filter(w => w.length > 0).length;
    document.getElementById('wordCount').textContent = `${words} words`;
    document.getElementById('charCount').textContent = `${trimmed.length} characters`;

    startBtn.disabled = false;
    resetBtn.style.display = 'inline-flex';
    showStatus('statusMsg', 'Text extracted successfully!', 'success');

    trackEvent('ocr_complete', { file_type: isPDF ? 'pdf' : 'image', language: lang, word_count: words });

  } catch (err) {
    if (cancelled) return;
    console.error(err);
    hideProgress();
    hideCancel();
    showStatus('statusMsg', `Error: ${err?.message || 'Unknown error'}`, 'error');
    trackEvent('ocr_error', { file_type: isPDF ? 'pdf' : 'image' });
    startBtn.disabled = false;
  }
});

// ===== OCR IMAGE — returns { text, pages: [{ data, width, height }] } =====
async function ocrImage(file, lang) {
  ocrWorker = await Tesseract.createWorker(lang, 1, {
    logger: m => {
      if (cancelled) return;
      if (m.status === 'recognizing text') showProgress(m.progress * 100, 'Recognizing text...');
      else if (m.status === 'loading tesseract core') showProgress(10, 'Loading OCR engine...');
      else if (m.status === 'initializing tesseract') showProgress(20, 'Initializing...');
      else if (m.status === 'loading language traineddata') showProgress(40, 'Loading language data...');
      else if (m.status === 'initializing api') showProgress(60, 'Preparing...');
    }
  });

  if (cancelled) { await ocrWorker.terminate(); ocrWorker = null; return { text: '', pages: [] }; }

  showProgress(70, 'Processing image...');

  // Get image dimensions
  const img = new Image();
  const url = URL.createObjectURL(file);
  await new Promise(res => { img.onload = res; img.src = url; });
  const width = img.naturalWidth;
  const height = img.naturalHeight;
  URL.revokeObjectURL(url);

  const { data } = await ocrWorker.recognize(file);
  await ocrWorker.terminate();
  ocrWorker = null;

  return { text: data.text, pages: [{ data, width, height }] };
}

// ===== OCR PDF — returns { text, pages: [{ data, width, height }] } =====
async function ocrPDF(file, lang) {
  showProgress(5, 'Loading PDF...');
  const arrayBuffer = await file.arrayBuffer();
  if (cancelled) return { text: '', pages: [] };

  const pdfData = new Uint8Array(arrayBuffer);
  const pdf = await pdfjsLib.getDocument({
    data: pdfData,
    useWorkerFetch: false,
    isEvalSupported: false,
    useSystemFonts: true
  }).promise;
  const totalPages = pdf.numPages;

  showProgress(10, `PDF loaded — ${totalPages} page(s). Starting OCR...`);
  ocrWorker = await Tesseract.createWorker(lang);
  if (cancelled) { await ocrWorker.terminate(); ocrWorker = null; return { text: '', pages: [] }; }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let allText = '';
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    if (cancelled) break;
    showProgress(10 + (i / totalPages) * 85, `Scanning page ${i} of ${totalPages}...`);

    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport }).promise;

    const { data } = await ocrWorker.recognize(canvas);
    pages.push({ data, width: viewport.width, height: viewport.height });
    if (data.text.trim()) {
      allText += (totalPages > 1 ? `--- Page ${i} ---\n` : '') + data.text + '\n\n';
    }
  }

  await ocrWorker.terminate();
  ocrWorker = null;
  canvas.remove();

  return { text: allText, pages };
}

// ===== COPY =====
document.getElementById('copyText')?.addEventListener('click', () => {
  const text = resultText?.textContent;
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copyText');
    btn.textContent = '✅ Copied!';
    setTimeout(() => { btn.textContent = '📋 Copy'; }, 2000);
  });
});

// ===== DOWNLOAD DOCX =====
document.getElementById('downloadDocx')?.addEventListener('click', async () => {
  if (!lastOcrResult) return;
  const name = selectedFile ? selectedFile.name.replace(/\.[^.]+$/, '') : 'extracted-text';
  const btn = document.getElementById('downloadDocx');
  btn.textContent = '⏳ Building...';
  btn.disabled = true;
  try {
    const blob = await buildOcrDocx(lastOcrResult);
    downloadBlob(blob, name + '.docx');
  } catch (e) {
    console.error(e);
    showStatus('statusMsg', `Word export failed: ${e?.message}`, 'error');
  } finally {
    btn.textContent = '⬇️ Download .docx';
    btn.disabled = false;
  }
});

// ===== DOWNLOAD TXT =====
document.getElementById('downloadTxt')?.addEventListener('click', () => {
  const text = resultText?.textContent;
  if (!text) return;
  const name = selectedFile ? selectedFile.name.replace(/\.[^.]+$/, '') : 'extracted-text';
  downloadText(text, name + '.txt');
});

// ===== BUILD FORMATTED WORD DOCUMENT FROM OCR STRUCTURED DATA =====
async function buildOcrDocx(result) {
  const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = docx;

  const allParagraphs = [];

  result.pages.forEach((pageResult, pageIdx) => {
    const { data, width } = pageResult;

    // Page separator for multi-page docs
    if (result.pages.length > 1) {
      allParagraphs.push(new Paragraph({
        children: [new TextRun({ text: `— Page ${pageIdx + 1} —`, color: '999999', italics: true, size: 18 })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 320, after: 160 }
      }));
    }

    // Calculate average line height to detect relative font sizes
    const lineHeights = [];
    (data.blocks || []).forEach(block => {
      (block.paragraphs || []).forEach(para => {
        (para.lines || []).forEach(line => {
          if (line.text?.trim()) lineHeights.push(line.bbox.y1 - line.bbox.y0);
        });
      });
    });

    const avgH = lineHeights.length
      ? lineHeights.reduce((a, b) => a + b, 0) / lineHeights.length
      : 20;

    // Process each block → paragraph → line
    (data.blocks || []).forEach(block => {
      (block.paragraphs || []).forEach(para => {
        const paraLines = (para.lines || []).filter(l => l.text?.trim());
        if (!paraLines.length) return;

        paraLines.forEach(line => {
          const text = line.text?.trim();
          if (!text) return;

          const lineH = line.bbox.y1 - line.bbox.y0;
          const ratio = lineH / avgH;

          // Detect alignment from x position relative to page width
          const lineCenter = (line.bbox.x0 + line.bbox.x1) / 2;
          const pageCenterDiff = Math.abs(lineCenter - width / 2);
          const isCentered = pageCenterDiff < width * 0.12;
          const alignment = isCentered ? AlignmentType.CENTER : AlignmentType.LEFT;

          // Font size: scale from line height (approximate points)
          const ptSize = Math.max(18, Math.min(48, Math.round(lineH * 0.65)));

          // Heading detection by size ratio
          if (ratio > 1.7) {
            allParagraphs.push(new Paragraph({
              text,
              heading: HeadingLevel.HEADING_1,
              alignment,
              spacing: { before: 240, after: 120 }
            }));
            return;
          }

          if (ratio > 1.25) {
            allParagraphs.push(new Paragraph({
              text,
              heading: HeadingLevel.HEADING_2,
              alignment,
              spacing: { before: 180, after: 80 }
            }));
            return;
          }

          // Build word-level runs with bold/italic from Tesseract
          const runs = [];
          (line.words || []).forEach((word, wi) => {
            if (!word.text?.trim()) return;
            const isBold = word.font_name?.toLowerCase().includes('bold') || false;
            const isItalic = word.font_name?.toLowerCase().includes('italic') || false;
            runs.push(new TextRun({
              text: word.text + (wi < line.words.length - 1 ? ' ' : ''),
              bold: isBold,
              italics: isItalic,
              size: ptSize
            }));
          });

          // Fallback if no word data
          if (!runs.length) {
            runs.push(new TextRun({ text, size: ptSize }));
          }

          allParagraphs.push(new Paragraph({
            children: runs,
            alignment,
            spacing: { after: 80 }
          }));
        });

        // Space between paragraphs
        allParagraphs.push(new Paragraph({
          children: [new TextRun({ text: '' })],
          spacing: { after: 60 }
        }));
      });
    });
  });

  const doc = new Document({
    sections: [{
      properties: {},
      children: allParagraphs.length
        ? allParagraphs
        : [new Paragraph({ children: [new TextRun({ text: 'No text content found.' })] })]
    }]
  });

  return await Packer.toBlob(doc);
}
