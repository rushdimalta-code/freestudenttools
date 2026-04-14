// ===== CITATION GENERATOR =====
// Supports: APA 7th, MLA 9th, Chicago 17th
// Source types: website, book, journal, youtube

let currentFormat = 'apa';
let currentSource = 'website';
let savedCitations = [];
let debounceTimer = null;

// ── Format helpers ──────────────────────────────────────────────────────────

function titleCase(str) {
  if (!str) return '';
  return str.trim();
}

function initials(first) {
  if (!first) return '';
  return first.trim().split(/\s+/).map(n => n[0].toUpperCase() + '.').join(' ');
}

function monthName(n) {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return months[parseInt(n, 10) - 1] || '';
}

function shortMonth(n) {
  const months = ['Jan.','Feb.','Mar.','Apr.','May','June','July','Aug.','Sept.','Oct.','Nov.','Dec.'];
  return months[parseInt(n, 10) - 1] || '';
}

// ── APA 7th ─────────────────────────────────────────────────────────────────

function formatAPA_website(f) {
  let parts = [];
  // Author
  if (f.authorLast) {
    let author = f.authorLast;
    if (f.authorFirst) author += ', ' + initials(f.authorFirst);
    parts.push(author + '.');
  }
  // Date
  if (f.year) {
    let date = f.year;
    if (f.month) { date += ', ' + monthName(f.month); if (f.day) date += ' ' + f.day; }
    parts.push('(' + date + ').');
  } else {
    parts.push('(n.d.).');
  }
  // Title (sentence case, italics not applied in plain text)
  if (f.title) parts.push(f.title + '.');
  // Site name
  if (f.siteName) parts.push(f.siteName + '.');
  // URL
  if (f.url) parts.push(f.url);
  return parts.join(' ');
}

function formatAPA_book(f) {
  let parts = [];
  if (f.authorLast) {
    let author = f.authorLast;
    if (f.authorFirst) author += ', ' + initials(f.authorFirst);
    parts.push(author + '.');
  }
  if (f.year) parts.push('(' + f.year + ').');
  if (f.title) {
    let t = f.title;
    if (f.edition) t += ' (' + f.edition + ' ed.)';
    parts.push(t + '.');
  }
  if (f.publisher) parts.push(f.publisher + '.');
  return parts.join(' ');
}

function formatAPA_journal(f) {
  let parts = [];
  if (f.authorLast) {
    let author = f.authorLast;
    if (f.authorFirst) author += ', ' + initials(f.authorFirst);
    parts.push(author + '.');
  }
  if (f.year) parts.push('(' + f.year + ').');
  if (f.articleTitle) parts.push(f.articleTitle + '.');
  let journal = '';
  if (f.journalName) journal += f.journalName;
  if (f.volume) { journal += ', ' + f.volume; if (f.issue) journal += '(' + f.issue + ')'; }
  if (f.pages) journal += ', ' + f.pages;
  if (journal) parts.push(journal + '.');
  if (f.doi) parts.push('https://doi.org/' + f.doi.replace(/^https?:\/\/doi\.org\//i, ''));
  return parts.join(' ');
}

function formatAPA_youtube(f) {
  let parts = [];
  if (f.channelName) parts.push(f.channelName + '.');
  let date = '';
  if (f.year) {
    date = f.year;
    if (f.month) { date += ', ' + monthName(f.month); if (f.day) date += ' ' + f.day; }
  }
  parts.push(date ? '(' + date + ').' : '(n.d.).');
  if (f.videoTitle) parts.push(f.videoTitle + ' [Video].');
  parts.push('YouTube.');
  if (f.url) parts.push(f.url);
  return parts.join(' ');
}

// ── MLA 9th ──────────────────────────────────────────────────────────────────

function formatMLA_website(f) {
  let parts = [];
  if (f.authorLast) {
    let author = f.authorLast;
    if (f.authorFirst) author += ', ' + f.authorFirst.trim();
    parts.push(author + '.');
  }
  if (f.title) parts.push('"' + f.title + '."');
  if (f.siteName) parts.push(f.siteName + ',');
  if (f.year) {
    let date = '';
    if (f.day) date += f.day + ' ';
    if (f.month) date += shortMonth(f.month) + ' ';
    date += f.year;
    parts.push(date + ',');
  }
  if (f.url) parts.push(f.url + '.');
  if (f.accessDate) parts.push('Accessed ' + f.accessDate + '.');
  return parts.join(' ');
}

function formatMLA_book(f) {
  let parts = [];
  if (f.authorLast) {
    let author = f.authorLast;
    if (f.authorFirst) author += ', ' + f.authorFirst.trim();
    parts.push(author + '.');
  }
  if (f.title) parts.push(f.title + '.');
  if (f.edition) parts.push(f.edition + ' ed.,');
  if (f.publisher) parts.push(f.publisher + ',');
  if (f.year) parts.push(f.year + '.');
  return parts.join(' ');
}

function formatMLA_journal(f) {
  let parts = [];
  if (f.authorLast) {
    let author = f.authorLast;
    if (f.authorFirst) author += ', ' + f.authorFirst.trim();
    parts.push(author + '.');
  }
  if (f.articleTitle) parts.push('"' + f.articleTitle + '."');
  let journal = '';
  if (f.journalName) journal += f.journalName;
  if (f.volume) journal += ', vol. ' + f.volume;
  if (f.issue) journal += ', no. ' + f.issue;
  if (f.year) journal += ', ' + f.year;
  if (f.pages) journal += ', pp. ' + f.pages;
  if (journal) parts.push(journal + '.');
  if (f.doi) parts.push('DOI: ' + f.doi + '.');
  return parts.join(' ');
}

function formatMLA_youtube(f) {
  let parts = [];
  if (f.videoTitle) parts.push('"' + f.videoTitle + '."');
  parts.push('YouTube,');
  if (f.channelName) parts.push('uploaded by ' + f.channelName + ',');
  if (f.year) {
    let date = '';
    if (f.day) date += f.day + ' ';
    if (f.month) date += shortMonth(f.month) + ' ';
    date += f.year;
    parts.push(date + ',');
  }
  if (f.url) parts.push(f.url + '.');
  return parts.join(' ');
}

// ── Chicago 17th ─────────────────────────────────────────────────────────────

function formatChicago_website(f) {
  let parts = [];
  if (f.authorLast) {
    let author = f.authorLast;
    if (f.authorFirst) author += ', ' + f.authorFirst.trim();
    parts.push(author + '.');
  }
  if (f.title) parts.push('"' + f.title + '."');
  if (f.siteName) parts.push(f.siteName + '.');
  if (f.year) parts.push(f.year + '.');
  if (f.url) parts.push(f.url + '.');
  if (f.accessDate) parts.push('Accessed ' + f.accessDate + '.');
  return parts.join(' ');
}

function formatChicago_book(f) {
  let parts = [];
  if (f.authorLast) {
    let author = f.authorLast;
    if (f.authorFirst) author += ', ' + f.authorFirst.trim();
    parts.push(author + '.');
  }
  if (f.title) parts.push(f.title + '.');
  let pubInfo = '';
  if (f.city) pubInfo += f.city + ': ';
  if (f.publisher) pubInfo += f.publisher + ', ';
  if (f.year) pubInfo += f.year;
  if (pubInfo) parts.push(pubInfo + '.');
  return parts.join(' ');
}

function formatChicago_journal(f) {
  let parts = [];
  if (f.authorLast) {
    let author = f.authorLast;
    if (f.authorFirst) author += ', ' + f.authorFirst.trim();
    parts.push(author + '.');
  }
  if (f.articleTitle) parts.push('"' + f.articleTitle + '."');
  let journal = '';
  if (f.journalName) journal += f.journalName;
  if (f.volume) journal += ' ' + f.volume;
  if (f.issue) journal += ', no. ' + f.issue;
  if (f.year) journal += ' (' + f.year + ')';
  if (f.pages) journal += ': ' + f.pages;
  if (journal) parts.push(journal + '.');
  if (f.doi) parts.push('https://doi.org/' + f.doi.replace(/^https?:\/\/doi\.org\//i, '') + '.');
  return parts.join(' ');
}

function formatChicago_youtube(f) {
  let parts = [];
  if (f.channelName) parts.push(f.channelName + '.');
  if (f.videoTitle) parts.push('"' + f.videoTitle + '."');
  parts.push('YouTube video.');
  if (f.year) {
    let date = '';
    if (f.month) date += monthName(f.month) + ' ';
    if (f.day) date += f.day + ', ';
    date += f.year;
    parts.push(date + '.');
  }
  if (f.url) parts.push(f.url + '.');
  return parts.join(' ');
}

// ── Field readers ─────────────────────────────────────────────────────────────

function getFieldValues() {
  const val = id => (document.getElementById(id)?.value || '').trim();
  return {
    authorLast:   val('authorLast'),
    authorFirst:  val('authorFirst'),
    title:        val('titleField'),
    siteName:     val('siteName'),
    url:          val('urlField'),
    accessDate:   val('accessDate'),
    year:         val('year'),
    month:        val('month'),
    day:          val('day'),
    // book
    publisher:    val('publisher'),
    edition:      val('edition'),
    city:         val('city'),
    pages:        val('pages'),
    // journal
    articleTitle: val('articleTitle'),
    journalName:  val('journalName'),
    volume:       val('volume'),
    issue:        val('issue'),
    doi:          val('doi'),
    // youtube
    channelName:  val('channelName'),
    videoTitle:   val('videoTitle'),
  };
}

// ── Generate ──────────────────────────────────────────────────────────────────

function generateCitation() {
  const f = getFieldValues();
  let result = '';
  const fmt = currentFormat;
  const src = currentSource;

  if (fmt === 'apa') {
    if (src === 'website') result = formatAPA_website(f);
    else if (src === 'book') result = formatAPA_book(f);
    else if (src === 'journal') result = formatAPA_journal(f);
    else if (src === 'youtube') result = formatAPA_youtube(f);
  } else if (fmt === 'mla') {
    if (src === 'website') result = formatMLA_website(f);
    else if (src === 'book') result = formatMLA_book(f);
    else if (src === 'journal') result = formatMLA_journal(f);
    else if (src === 'youtube') result = formatMLA_youtube(f);
  } else if (fmt === 'chicago') {
    if (src === 'website') result = formatChicago_website(f);
    else if (src === 'book') result = formatChicago_book(f);
    else if (src === 'journal') result = formatChicago_journal(f);
    else if (src === 'youtube') result = formatChicago_youtube(f);
  }

  return result.trim();
}

function updateOutput() {
  const text = generateCitation();
  const outputEl = document.getElementById('citationOutput');
  if (outputEl) {
    outputEl.textContent = text || 'Fill in the fields above to generate your citation.';
    outputEl.style.color = text ? '' : 'var(--text-muted)';
  }
  const copyBtn = document.getElementById('copyBtn');
  if (copyBtn) copyBtn.disabled = !text;
}

// ── Tabs & format switching ───────────────────────────────────────────────────

function switchSource(type) {
  currentSource = type;
  document.querySelectorAll('.source-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.source === type);
  });
  renderForm();
  updateOutput();
}

function switchFormat(fmt) {
  currentFormat = fmt;
  document.querySelectorAll('.format-radio').forEach(r => {
    r.closest('.radio-option').classList.toggle('selected', r.value === fmt);
  });
  updateOutput();
}

// ── Form rendering ────────────────────────────────────────────────────────────

function field(id, label, type = 'text', placeholder = '', optional = false, hint = '') {
  return `
    <div class="form-field">
      <label for="${id}">${label}${optional ? '<span class="field-optional">(optional)</span>' : ''}</label>
      <input type="${type}" id="${id}" placeholder="${placeholder}" autocomplete="off">
      ${hint ? `<span class="field-hint">${hint}</span>` : ''}
    </div>`;
}

function row(...fields) {
  return `<div class="form-row">${fields.join('')}</div>`;
}

const FORMS = {
  website: () => `
    ${row(field('authorLast','Author Last Name','text','Smith',true), field('authorFirst','Author First Name','text','John',true))}
    ${field('titleField','Page Title','text','How to Study Effectively')}
    ${field('siteName','Website Name','text','Khan Academy',true)}
    ${row(field('urlField','URL','url','https://example.com'), field('accessDate','Access Date','text','April 5, 2026',true))}
    ${row(field('year','Year Published','text','2024',true), field('month','Month (1–12)','text','3',true), field('day','Day','text','15',true))}`,

  book: () => `
    ${row(field('authorLast','Author Last Name','text','Smith'), field('authorFirst','Author First Name','text','John'))}
    ${field('titleField','Book Title','text','Introduction to Psychology')}
    ${row(field('publisher','Publisher','text','Oxford University Press'), field('year','Year','text','2023'))}
    ${row(field('edition','Edition','text','3rd',true), field('city','City of Publication','text','New York',true,'Used for Chicago format'))}
    ${field('pages','Page(s) Cited','text','45–67',true)}`,

  journal: () => `
    ${row(field('authorLast','Author Last Name','text','Smith'), field('authorFirst','Author First Name','text','John'))}
    ${field('articleTitle','Article Title','text','Effects of Sleep on Memory')}
    ${row(field('journalName','Journal Name','text','Nature Neuroscience'), field('year','Year','text','2023'))}
    ${row(field('volume','Volume','text','26',true), field('issue','Issue','text','4',true), field('pages','Pages','text','112–118',true))}
    ${field('doi','DOI or URL','text','10.1038/s41593-023-01234-5',true,'Enter DOI number or full URL')}`,

  youtube: () => `
    ${field('channelName','Channel / Creator Name','text','Kurzgesagt – In a Nutshell')}
    ${field('videoTitle','Video Title','text','The Fermi Paradox')}
    ${row(field('year','Year Published','text','2022',true), field('month','Month (1–12)','text','6',true), field('day','Day','text','14',true))}
    ${field('urlField','Video URL','url','https://www.youtube.com/watch?v=...')}`,
};

function renderForm() {
  const formEl = document.getElementById('sourceForm');
  if (formEl) {
    formEl.innerHTML = FORMS[currentSource]?.() || '';
    // Attach live preview listeners
    formEl.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(updateOutput, 250);
      });
    });
  }
}

// ── Copy ──────────────────────────────────────────────────────────────────────

async function copyCitation(text, btn) {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
  if (btn) {
    const original = btn.innerHTML;
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
    btn.disabled = true;
    setTimeout(() => { btn.innerHTML = original; btn.disabled = false; }, 2000);
  }
}

// ── Saved list ────────────────────────────────────────────────────────────────

function addToList() {
  const text = generateCitation();
  if (!text || text === 'Fill in the fields above to generate your citation.') return;
  const formatLabels = { apa: 'APA 7th', mla: 'MLA 9th', chicago: 'Chicago 17th' };
  const sourceLabels = { website: 'Website', book: 'Book', journal: 'Journal', youtube: 'YouTube' };
  savedCitations.push({
    id: Date.now(),
    format: formatLabels[currentFormat] || currentFormat,
    sourceType: sourceLabels[currentSource] || currentSource,
    text,
  });
  renderCitationsList();
  showAddFeedback();
}

function showAddFeedback() {
  const btn = document.getElementById('addToListBtn');
  if (!btn) return;
  const orig = btn.innerHTML;
  btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Added!';
  setTimeout(() => { btn.innerHTML = orig; }, 1500);
}

function removeCitation(id) {
  savedCitations = savedCitations.filter(c => c.id !== id);
  renderCitationsList();
}

function renderCitationsList() {
  const listEl = document.getElementById('citationsList');
  const exportBar = document.getElementById('exportBar');
  if (!listEl) return;

  if (savedCitations.length === 0) {
    listEl.innerHTML = `
      <div class="empty-state">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        <p style="margin:0;font-size:0.875rem">No saved citations yet. Generate a citation and click "Add to List".</p>
      </div>`;
    if (exportBar) exportBar.style.display = 'none';
    return;
  }

  listEl.innerHTML = savedCitations.map(c => `
    <div class="citation-item">
      <div class="citation-item-header">
        <div class="citation-item-meta">
          <span class="citation-format-badge">${c.format}</span>
          ${c.sourceType}
        </div>
        <div style="display:flex;gap:6px">
          <button class="btn btn-ghost btn-sm" onclick="copyCitation(${JSON.stringify(c.text)}, this)" aria-label="Copy citation">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            Copy
          </button>
          <button class="btn btn-danger btn-sm" onclick="removeCitation(${c.id})" aria-label="Remove citation">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
            Remove
          </button>
        </div>
      </div>
      <div class="citation-item-text">${escapeHtml(c.text)}</div>
    </div>`).join('');

  if (exportBar) exportBar.style.display = '';
}

function copyAllCitations() {
  const text = savedCitations.map(c => c.text).join('\n\n');
  const btn = document.getElementById('copyAllBtn');
  copyCitation(text, btn);
}

function downloadList() {
  const text = savedCitations.map(c => `[${c.format} — ${c.sourceType}]\n${c.text}`).join('\n\n');
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'citations.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function clearForm() {
  const formEl = document.getElementById('sourceForm');
  if (formEl) formEl.querySelectorAll('input').forEach(i => { i.value = ''; });
  updateOutput();
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Init ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Source tabs
  document.querySelectorAll('.source-tab').forEach(tab => {
    tab.addEventListener('click', () => switchSource(tab.dataset.source));
  });

  // Format radios
  document.querySelectorAll('.format-radio').forEach(radio => {
    radio.addEventListener('change', () => {
      switchFormat(radio.value);
      document.querySelectorAll('.radio-option').forEach(el => el.classList.remove('selected'));
      radio.closest('.radio-option').classList.add('selected');
    });
  });

  // Action buttons
  document.getElementById('generateBtn')?.addEventListener('click', () => { updateOutput(); });
  document.getElementById('addToListBtn')?.addEventListener('click', addToList);
  document.getElementById('clearFormBtn')?.addEventListener('click', clearForm);
  document.getElementById('copyBtn')?.addEventListener('click', () => {
    const text = generateCitation();
    copyCitation(text, document.getElementById('copyBtn'));
  });
  document.getElementById('copyAllBtn')?.addEventListener('click', copyAllCitations);
  document.getElementById('downloadListBtn')?.addEventListener('click', downloadList);

  // Initial render
  renderForm();
  renderCitationsList();
  updateOutput();
});
