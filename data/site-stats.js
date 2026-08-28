/* =====================================================================
   FreeStudentTools — single source of truth for site statistics
   (recommendation #1). Never hard-code counts into individual pages;
   use <span data-stat="KEY"></span> and let common.js renderStats() fill it.
   Keep in sync with tools/SITE-FACTS.md and the underlying data files.
   ===================================================================== */
window.FST_STATS = {
  // scholarships — data/scholarships_data.js (window.SCHOLARSHIP_DATA.scholarships)
  scholarships_total: 239,          // every record in the database
  scholarships_open: 196,           // status "open" right now
  // universities
  universities_detailed: 27,        // data/universities.js — full deadline/intake/housing tracking
  universities_index: 1000,         // data/universities_all.js — broader discovery index
  // guides — blog/*.html (excl. index) == sitemap /blog/ post entries
  guides: 48,
  // browser tools
  tools: 7,
  // countries represented across the scholarship database (not independently re-verified)
  countries: 60
};

/* Distinct, honest labels (recommendation #1). */
window.FST_STAT_LABELS = {
  scholarships_total:    'scholarships in database',
  scholarships_open:     'scholarships open now',
  universities_detailed: 'universities with detailed admissions tracking',
  universities_index:    'universities in the broader index',
  guides:                'in-depth student guides',
  tools:                 'free browser tools',
  countries:             'countries'
};

/* Renderer — fills [data-stat="KEY"] text from FST_STATS, and any element
   with [data-stat-label="KEY"] from FST_STAT_LABELS.
   data-stat-plus="1" appends "+".  Self-contained so pages only need this one
   <script src="/data/site-stats.js"> tag (no shared-file cache bump needed). */
(function () {
  function render() {
    var S = window.FST_STATS, L = window.FST_STAT_LABELS || {};
    if (!S) return;
    document.querySelectorAll('[data-stat]').forEach(function (el) {
      var k = el.getAttribute('data-stat');
      if (!(k in S)) return;
      var n = S[k];
      var txt = n >= 1000 ? n.toLocaleString('en-US') : String(n);
      if (el.getAttribute('data-stat-plus') === '1') txt += '+';
      el.textContent = txt;
    });
    document.querySelectorAll('[data-stat-label]').forEach(function (el) {
      var k = el.getAttribute('data-stat-label');
      if (L[k]) el.textContent = L[k];
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
