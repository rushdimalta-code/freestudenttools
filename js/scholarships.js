/**
 * scholarships.js — Scholarship Tracker
 * FreeStudentTools.com
 */

(function () {
  'use strict';

  /* ===== STATE ===== */
  const state = {
    all: [],
    filtered: [],
    page: 1,
    perPage: 10,
    search: '',
    country: '',
    stream: '',
    level: '',
    amountType: '',
    competition: '',
    deadlineFrom: '',
    deadlineTo: '',
    sort: 'deadline',
    expandedId: null
  };

  /* ===== INIT ===== */
  document.addEventListener('DOMContentLoaded', function () {
    if (!window.SCHOLARSHIP_DATA) {
      showError('Scholarship data failed to load. Please refresh.');
      return;
    }
    state.all = window.SCHOLARSHIP_DATA.scholarships;
    populateFilters();
    applyFilters();
    bindEvents();
    setLastUpdated();
  });

  function setLastUpdated() {
    const el = document.getElementById('lastUpdated');
    if (el && window.SCHOLARSHIP_DATA) el.textContent = window.SCHOLARSHIP_DATA.lastUpdated;
  }

  /* ===== POPULATE FILTERS ===== */
  function populateFilters() {
    const data = window.SCHOLARSHIP_DATA;
    fillSelect('filterCountry', data.countries);
    fillSelect('filterStream', data.streams);
    fillSelect('filterLevel', ['Bachelor', 'Master', 'PhD']);
    fillSelect('filterCompetition', data.competitionLevels.filter(function (c) { return c !== 'All'; }));
  }

  function fillSelect(id, items) {
    const el = document.getElementById(id);
    if (!el) return;
    items.forEach(function (item) {
      const opt = document.createElement('option');
      opt.value = item;
      opt.textContent = item;
      el.appendChild(opt);
    });
  }

  /* ===== EVENT BINDING ===== */
  function bindEvents() {
    bind('searchInput', 'input', debounce(function (e) {
      state.search = e.target.value.trim().toLowerCase();
      state.page = 1;
      applyFilters();
    }, 250));

    bind('filterCountry', 'change', function (e) { state.country = e.target.value; state.page = 1; applyFilters(); });
    bind('filterStream', 'change', function (e) { state.stream = e.target.value; state.page = 1; applyFilters(); });
    bind('filterLevel', 'change', function (e) { state.level = e.target.value; state.page = 1; applyFilters(); });
    bind('filterAmount', 'change', function (e) { state.amountType = e.target.value; state.page = 1; applyFilters(); });
    bind('filterCompetition', 'change', function (e) { state.competition = e.target.value; state.page = 1; applyFilters(); });
    bind('filterDeadlineFrom', 'change', function (e) { state.deadlineFrom = e.target.value; state.page = 1; applyFilters(); });
    bind('filterDeadlineTo', 'change', function (e) { state.deadlineTo = e.target.value; state.page = 1; applyFilters(); });
    bind('sortSelect', 'change', function (e) { state.sort = e.target.value; applyFilters(); });
    bind('clearFilters', 'click', clearAll);
    bind('loadMore', 'click', loadMore);
    bind('newsletterForm', 'submit', handleNewsletter);
  }

  function bind(id, event, fn) {
    const el = document.getElementById(id);
    if (el) el.addEventListener(event, fn);
  }

  /* ===== FILTER LOGIC ===== */
  function applyFilters() {
    let results = state.all.slice();

    if (state.search) {
      results = results.filter(function (s) {
        return s.name.toLowerCase().includes(state.search) ||
          (s.provider || '').toLowerCase().includes(state.search) ||
          (s.university || '').toLowerCase().includes(state.search) ||
          s.country.toLowerCase().includes(state.search) ||
          s.streams.some(function (st) { return st.toLowerCase().includes(state.search); }) ||
          (s.eligibility || '').toLowerCase().includes(state.search);
      });
    }

    if (state.country) results = results.filter(function (s) { return s.country === state.country; });
    if (state.stream) results = results.filter(function (s) {
      return s.streams.includes(state.stream) || s.streams.includes('All streams');
    });
    if (state.level) results = results.filter(function (s) { return s.levels.includes(state.level); });
    if (state.amountType) results = results.filter(function (s) { return s.amountType === state.amountType; });
    if (state.competition) results = results.filter(function (s) { return s.competitionLevel === state.competition; });
    if (state.deadlineFrom) results = results.filter(function (s) { return s.deadline >= state.deadlineFrom; });
    if (state.deadlineTo) results = results.filter(function (s) { return s.deadline <= state.deadlineTo; });

    results = sortResults(results);
    state.filtered = results;
    state.page = 1;
    render();
  }

  function sortResults(arr) {
    return arr.slice().sort(function (a, b) {
      if (state.sort === 'deadline') {
        if (!a.deadline && !b.deadline) return 0;
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return a.deadline.localeCompare(b.deadline);
      }
      if (state.sort === 'name') return a.name.localeCompare(b.name);
      if (state.sort === 'country') return a.country.localeCompare(b.country);
      if (state.sort === 'amount') {
        const order = { full: 0, partial: 1, tuition_only: 2, living_only: 3, varies: 4 };
        return (order[a.amountType] || 99) - (order[b.amountType] || 99);
      }
      return 0;
    });
  }

  function clearAll() {
    state.search = ''; state.country = ''; state.stream = ''; state.level = '';
    state.amountType = ''; state.competition = ''; state.deadlineFrom = ''; state.deadlineTo = '';
    ['searchInput', 'filterCountry', 'filterStream', 'filterLevel', 'filterAmount',
     'filterCompetition', 'filterDeadlineFrom', 'filterDeadlineTo'].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    state.page = 1;
    applyFilters();
  }

  /* ===== RENDER ===== */
  function render() {
    const list = document.getElementById('scholarshipList');
    const countEl = document.getElementById('resultCount');
    const loadBtn = document.getElementById('loadMore');
    if (!list) return;

    const total = state.filtered.length;
    const visible = state.filtered.slice(0, state.page * state.perPage);

    if (countEl) countEl.textContent = total.toLocaleString() + ' scholarship' + (total === 1 ? '' : 's') + ' found';

    if (total === 0) {
      list.innerHTML = '<div class="no-results"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><p>No scholarships match your filters.</p><button class="btn btn-secondary btn-sm" onclick="document.getElementById(\'clearFilters\').click()">Clear all filters</button></div>';
      if (loadBtn) loadBtn.style.display = 'none';
      return;
    }

    list.innerHTML = visible.map(renderCard).join('');

    list.querySelectorAll('.card-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = btn.getAttribute('data-id');
        toggleExpand(id);
      });
    });

    if (loadBtn) loadBtn.style.display = visible.length < total ? 'block' : 'none';
  }

  function renderCard(s) {
    const isExpanded = state.expandedId === s.id;
    const amountBadge = getAmountBadge(s.amountType);
    const statusBadge = getStatusBadge(s.status, s.deadline);
    const urgency = deadlineUrgency(s.deadline);

    const levelTags = s.levels.map(function (l) {
      return '<span class="level-badge level-' + l.toLowerCase() + '">' + esc(l) + '</span>';
    }).join('');

    const streamTags = s.streams.slice(0, 3).map(function (st) {
      return '<span class="tag">' + esc(st) + '</span>';
    }).join('') + (s.streams.length > 3 ? '<span class="tag tag-more">+' + (s.streams.length - 3) + '</span>' : '');

    const expandedHtml = isExpanded ? renderExpanded(s) : '';

    return '<article class="schol-card" id="scard-' + esc(s.id) + '">' +
      '<div class="schol-card-body">' +
        '<div class="schol-meta">' +
          '<div class="schol-top">' +
            amountBadge +
            '<span class="flag-country">' + getFlagEmoji(s.countryCode) + ' ' + esc(s.country) + '</span>' +
          '</div>' +
          '<h3 class="schol-name">' + esc(s.name) + '</h3>' +
          '<p class="schol-provider">' + esc(s.provider || '') + (s.university ? ' &bull; ' + esc(s.university) : '') + '</p>' +
          '<div class="schol-amount-desc">' + esc(s.amountDesc) + '</div>' +
          '<div class="schol-tags">' + levelTags + streamTags + '</div>' +
        '</div>' +
        '<div class="schol-aside">' +
          statusBadge +
          (s.deadline ? '<div class="schol-deadline' + (urgency ? ' urgent' : '') + '"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><span>Deadline: ' + formatDate(s.deadline) + '</span></div>' : '') +
          (s.competitionLevel ? '<div class="competition-level comp-' + s.competitionLevel.toLowerCase().replace(/\s+/g, '-') + '"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> ' + esc(s.competitionLevel) + '</div>' : '') +
        '</div>' +
      '</div>' +
      '<div class="schol-card-footer">' +
        '<button class="card-toggle btn btn-ghost btn-sm" data-id="' + esc(s.id) + '">' +
          (isExpanded ? 'Hide details' : 'Eligibility & requirements') +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-left:4px;transform:rotate(' + (isExpanded ? '180deg' : '0') + ')"><polyline points="6 9 12 15 18 9"/></svg>' +
        '</button>' +
        '<a href="' + esc(s.link) + '" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Apply / Learn more</a>' +
      '</div>' +
      (isExpanded ? '<div class="schol-expanded">' + expandedHtml + '</div>' : '') +
    '</article>';
  }

  function renderExpanded(s) {
    let html = '<div class="expanded-cols">';

    // Eligibility
    html += '<div class="exp-block">' +
      '<h4><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-2px;margin-right:4px"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>Who can apply</h4>' +
      '<p>' + esc(s.eligibility) + '</p>' +
    '</div>';

    // Requirements
    if (s.requirements && s.requirements.length) {
      html += '<div class="exp-block">' +
        '<h4><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-2px;margin-right:4px"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>What you need</h4>' +
        '<ul class="requirements-list">' +
          s.requirements.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') +
        '</ul>' +
      '</div>';
    }

    html += '</div>'; // expanded-cols

    // Notes
    if (s.notes) {
      html += '<div class="exp-note"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>' + esc(s.notes) + '</div>';
    }

    // Key dates
    html += '<div class="exp-dates">' +
      (s.deadline ? '<div class="exp-date-item"><span>Deadline</span><strong>' + formatDate(s.deadline) + '</strong></div>' : '') +
      (s.notificationDate ? '<div class="exp-date-item"><span>Notification</span><strong>' + formatDate(s.notificationDate) + '</strong></div>' : '') +
    '</div>';

    // Apply CTA + cross-reference guide
    html += '<div class="schol-apply-row">' +
      '<a href="' + esc(s.link) + '" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">' +
        '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>' +
        'Apply / Learn more at official page' +
      '</a>' +
      (s.university ? '<a href="admissions.html?search=' + encodeURIComponent(s.university) + '" class="btn btn-ghost btn-sm" style="font-size:0.8rem">' +
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>' +
        'View ' + esc(s.university) + ' on Admissions page' +
      '</a>' : '') +
    '</div>';

    // Country guide note
    if (s.country) {
      html += '<div class="schol-country-note">' +
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>' +
        'For cost of living, accommodation, maps, and student contacts in ' + esc(s.country) + ', visit our <a href="admissions.html?country=' + encodeURIComponent(s.country) + '" style="color:var(--primary)">Admissions page ↗</a>' +
      '</div>';
    }

    return html;
  }

  function toggleExpand(id) {
    state.expandedId = state.expandedId === id ? null : id;
    render();
    if (state.expandedId) {
      const card = document.getElementById('scard-' + id);
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  /* ===== BADGE HELPERS ===== */
  function getAmountBadge(type) {
    const map = {
      full: ['amount-full', 'Fully funded'],
      partial: ['amount-partial', 'Partial funding'],
      tuition_only: ['amount-tuition', 'Tuition only'],
      living_only: ['amount-living', 'Living costs'],
      varies: ['amount-varies', 'Varies']
    };
    const info = map[type] || ['amount-varies', 'Funding'];
    return '<span class="amount-badge ' + info[0] + '">' + info[1] + '</span>';
  }

  function getStatusBadge(status, deadline) {
    const today = new Date().toISOString().split('T')[0];
    if (status === 'open') return '<span class="status-block status-open"><span class="status-dot"></span>Open</span>';
    if (status === 'closing_soon') return '<span class="status-block status-warning"><span class="status-dot"></span>Closing soon</span>';
    if (status === 'upcoming') return '<span class="status-block status-upcoming"><span class="status-dot"></span>Upcoming</span>';
    if (deadline && deadline < today) return '<span class="status-block status-closed"><span class="status-dot"></span>Closed</span>';
    return '<span class="status-block status-upcoming"><span class="status-dot"></span>Upcoming</span>';
  }

  function deadlineUrgency(deadline) {
    if (!deadline) return false;
    const diff = (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 30;
  }

  /* ===== UTILS ===== */
  function formatDate(d) {
    if (!d) return '—';
    try {
      return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) { return d; }
  }

  function getFlagEmoji(code) {
    if (!code || code.length !== 2) return '';
    if (code === 'EU') return '🇪🇺';
    const offset = 0x1F1E6 - 65;
    return String.fromCodePoint(code.charCodeAt(0) + offset) + String.fromCodePoint(code.charCodeAt(1) + offset);
  }

  function esc(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function debounce(fn, ms) {
    let t;
    return function () {
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(this, arguments); }.bind(this, ...arguments), ms);
    };
  }

  function showError(msg) {
    const el = document.getElementById('scholarshipList');
    if (el) el.innerHTML = '<div class="no-results"><p style="color:var(--error)">' + esc(msg) + '</p></div>';
  }

  function loadMore() {
    state.page++;
    render();
  }

  /* ===== NEWSLETTER ===== */
  function handleNewsletter(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value.trim();
    if (!email || !email.includes('@')) {
      showFormMsg('newsletter-msg', 'Please enter a valid email address.', 'error');
      return;
    }
    const btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Subscribing...'; }
    // TODO: wire to your newsletter API
    setTimeout(function () {
      showFormMsg('newsletter-msg', 'Done. You\'ll hear about new scholarships every week.', 'success');
      form.reset();
      if (btn) { btn.disabled = false; btn.textContent = 'Get scholarship alerts'; }
    }, 800);
  }

  function showFormMsg(id, msg, type) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg;
    el.className = 'form-msg form-msg-' + type;
    el.style.display = 'block';
  }

  /* ===== DEADLINE PRESETS ===== */
  window.setScholarDeadlineRange = function (preset) {
    const today = new Date();
    let from, to;
    if (preset === 'next_month') {
      from = today;
      to = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    } else if (preset === 'next_3') {
      from = today;
      to = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
    } else if (preset === 'next_6') {
      from = today;
      to = new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());
    }
    if (from && to) {
      const fmt = function (d) { return d.toISOString().split('T')[0]; };
      const df = document.getElementById('filterDeadlineFrom');
      const dt = document.getElementById('filterDeadlineTo');
      if (df) { df.value = fmt(from); state.deadlineFrom = fmt(from); }
      if (dt) { dt.value = fmt(to); state.deadlineTo = fmt(to); }
      state.page = 1;
      applyFilters();
    }
  };

})();

/* ===== LAST UPDATED TIMESTAMP ===== */
(function() {
  if (!window.SCHOLARSHIP_DATA) return;
  const d = window.SCHOLARSHIP_DATA.lastUpdated;
  const el = document.getElementById('lastUpdated');
  if (el) el.textContent = d;
  const tel = document.getElementById('lastUpdatedTime');
  if (tel) {
    try {
      const diff = Math.floor((Date.now() - new Date(d)) / 86400000);
      tel.textContent = diff === 0 ? '(today)' : diff === 1 ? '(yesterday)' : `(${diff} days ago)`;
    } catch(e) {}
  }
})();
