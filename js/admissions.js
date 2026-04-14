/**
 * admissions.js — University Admissions Tracker
 * FreeStudentTools.com
 */

(function () {
  'use strict';

  /* ===== STATE ===== */
  const state = {
    all: [],
    filtered: [],
    page: 1,
    perPage: 12,
    search: '',
    country: '',
    region: '',
    stream: '',
    level: '',
    intake: '',
    accommodation: false,
    status: '',
    dateFrom: '',
    dateTo: '',
    sort: 'ranking',
    expandedId: null
  };

  /* ===== INIT ===== */
  document.addEventListener('DOMContentLoaded', function () {
    if (!window.UNI_DATA) {
      showError('University data failed to load. Please refresh the page.');
      return;
    }
    state.all = window.UNI_DATA.universities;
    populateFilters();
    applyFilters();
    bindEvents();
    setLastUpdated();
  });

  function setLastUpdated() {
    const el = document.getElementById('lastUpdated');
    if (el && window.UNI_DATA) el.textContent = window.UNI_DATA.lastUpdated;
  }

  /* ===== POPULATE FILTER DROPDOWNS ===== */
  function populateFilters() {
    const data = window.UNI_DATA;

    fillSelect('filterCountry', data.countries);
    fillSelect('filterRegion', data.regions);
    fillSelect('filterStream', data.streams);
    fillSelect('filterLevel', data.levels);
    fillSelect('filterIntake', data.intakes);
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
    bind('filterRegion', 'change', function (e) { state.region = e.target.value; state.page = 1; applyFilters(); });
    bind('filterStream', 'change', function (e) { state.stream = e.target.value; state.page = 1; applyFilters(); });
    bind('filterLevel', 'change', function (e) { state.level = e.target.value; state.page = 1; applyFilters(); });
    bind('filterIntake', 'change', function (e) { state.intake = e.target.value; state.page = 1; applyFilters(); });
    bind('filterStatus', 'change', function (e) { state.status = e.target.value; state.page = 1; applyFilters(); });
    bind('filterAccom', 'change', function (e) { state.accommodation = e.target.checked; state.page = 1; applyFilters(); });
    bind('filterDateFrom', 'change', function (e) { state.dateFrom = e.target.value; state.page = 1; applyFilters(); });
    bind('filterDateTo', 'change', function (e) { state.dateTo = e.target.value; state.page = 1; applyFilters(); });
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
      results = results.filter(function (u) {
        return u.name.toLowerCase().includes(state.search) ||
          u.shortName.toLowerCase().includes(state.search) ||
          u.country.toLowerCase().includes(state.search) ||
          u.streams.some(function (s) { return s.toLowerCase().includes(state.search); });
      });
    }

    if (state.country) results = results.filter(function (u) { return u.country === state.country; });
    if (state.region) results = results.filter(function (u) { return u.region === state.region; });
    if (state.stream) results = results.filter(function (u) { return u.streams.includes(state.stream); });
    if (state.level) results = results.filter(function (u) { return u.levels.includes(state.level); });
    if (state.accommodation) results = results.filter(function (u) { return u.accommodation && u.accommodation.available; });

    if (state.intake || state.level || state.status || state.dateFrom || state.dateTo) {
      results = results.filter(function (u) {
        return u.admissions.some(function (a) {
          if (state.intake && a.intake !== state.intake) return false;
          if (state.level && a.level !== state.level) return false;
          if (state.status && a.status !== state.status) return false;
          if (state.dateFrom && a.deadline < state.dateFrom) return false;
          if (state.dateTo && a.deadline > state.dateTo) return false;
          return true;
        });
      });
    }

    results = sortResults(results);
    state.filtered = results;
    state.page = 1;
    render();
  }

  function sortResults(arr) {
    return arr.slice().sort(function (a, b) {
      if (state.sort === 'ranking') return (a.ranking || 9999) - (b.ranking || 9999);
      if (state.sort === 'name') return a.name.localeCompare(b.name);
      if (state.sort === 'country') return a.country.localeCompare(b.country);
      if (state.sort === 'deadline') {
        const aDeadline = earliestUpcoming(a);
        const bDeadline = earliestUpcoming(b);
        if (!aDeadline && !bDeadline) return 0;
        if (!aDeadline) return 1;
        if (!bDeadline) return -1;
        return aDeadline.localeCompare(bDeadline);
      }
      return 0;
    });
  }

  function earliestUpcoming(uni) {
    const today = new Date().toISOString().split('T')[0];
    const upcoming = uni.admissions.filter(function (a) {
      return a.deadline >= today && (a.status === 'open' || a.status === 'upcoming' || a.status === 'closing_soon');
    }).sort(function (a, b) { return a.deadline.localeCompare(b.deadline); });
    return upcoming.length ? upcoming[0].deadline : null;
  }

  function clearAll() {
    state.search = ''; state.country = ''; state.region = ''; state.stream = '';
    state.level = ''; state.intake = ''; state.status = ''; state.accommodation = false;
    state.dateFrom = ''; state.dateTo = '';
    ['searchInput', 'filterCountry', 'filterRegion', 'filterStream', 'filterLevel',
     'filterIntake', 'filterStatus', 'filterDateFrom', 'filterDateTo'].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    const accom = document.getElementById('filterAccom');
    if (accom) accom.checked = false;
    state.page = 1;
    applyFilters();
  }

  /* ===== RENDER ===== */
  function render() {
    const grid = document.getElementById('uniGrid');
    const countEl = document.getElementById('resultCount');
    const loadBtn = document.getElementById('loadMore');
    if (!grid) return;

    const total = state.filtered.length;
    const visible = state.filtered.slice(0, state.page * state.perPage);

    if (countEl) countEl.textContent = total.toLocaleString() + ' universit' + (total === 1 ? 'y' : 'ies') + ' found';

    if (total === 0) {
      grid.innerHTML = '<div class="no-results"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><p>No universities match your filters.</p><button class="btn btn-secondary btn-sm" onclick="document.getElementById(\'clearFilters\').click()">Clear all filters</button></div>';
      if (loadBtn) loadBtn.style.display = 'none';
      return;
    }

    grid.innerHTML = visible.map(renderCard).join('');

    // Bind expand toggles
    grid.querySelectorAll('.card-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = btn.getAttribute('data-id');
        toggleExpand(id);
      });
    });

    if (loadBtn) {
      loadBtn.style.display = visible.length < total ? 'block' : 'none';
    }
  }

  function renderCard(uni) {
    const nextDeadline = earliestUpcoming(uni);
    const statusInfo = getStatusInfo(uni);
    const isExpanded = state.expandedId === uni.id;

    const streamTags = uni.streams.slice(0, 3).map(function (s) {
      return '<span class="tag">' + esc(s) + '</span>';
    }).join('') + (uni.streams.length > 3 ? '<span class="tag tag-more">+' + (uni.streams.length - 3) + '</span>' : '');

    const levelBadges = uni.levels.map(function (l) {
      return '<span class="level-badge level-' + l.toLowerCase() + '">' + esc(l) + '</span>';
    }).join('');

    const accomBadge = uni.accommodation && uni.accommodation.available
      ? '<span class="accom-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> Housing</span>'
      : '';

    const expandedContent = isExpanded ? renderExpanded(uni) : '';

    return '<article class="uni-card" id="card-' + esc(uni.id) + '">' +
      '<div class="uni-card-header">' +
        '<div class="uni-meta">' +
          '<div class="uni-rank-flag"><span class="rank-badge">#' + esc(String(uni.ranking)) + '</span> ' +
            '<span class="flag-emoji">' + getFlagEmoji(uni.countryCode) + '</span>' +
            '<span class="uni-country">' + esc(uni.country) + '</span>' +
          '</div>' +
          '<h3 class="uni-name"><a href="' + esc(uni.website) + '" target="_blank" rel="noopener">' + esc(uni.name) + '</a></h3>' +
          '<div class="uni-tags">' + streamTags + '</div>' +
        '</div>' +
        '<div class="uni-card-aside">' +
          '<div class="status-block ' + statusInfo.cls + '">' +
            '<span class="status-dot"></span>' +
            '<span>' + esc(statusInfo.label) + '</span>' +
          '</div>' +
          (nextDeadline ? '<div class="deadline-display"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> ' + formatDate(nextDeadline) + '</div>' : '') +
          '<div class="uni-levels">' + levelBadges + '</div>' +
          (accomBadge ? accomBadge : '') +
        '</div>' +
      '</div>' +
      '<div class="uni-card-footer">' +
        '<button class="card-toggle btn btn-ghost btn-sm" data-id="' + esc(uni.id) + '" aria-expanded="' + isExpanded + '">' +
          (isExpanded ? 'Hide details' : 'View deadlines & housing') +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left:4px;transform:rotate(' + (isExpanded ? '180deg' : '0') + ')"><polyline points="6 9 12 15 18 9"/></svg>' +
        '</button>' +
        '<a href="' + esc(uni.website) + '" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">Official site</a>' +
      '</div>' +
      (isExpanded ? '<div class="uni-expanded">' + expandedContent + '</div>' : '') +
    '</article>';
  }

  function renderExpanded(uni) {
    // Admissions table
    const rows = uni.admissions.map(function (a) {
      const sc = statusClass(a.status);
      return '<tr>' +
        '<td><strong>' + esc(a.level) + '</strong></td>' +
        '<td>' + esc(a.intake) + ' ' + esc(String(a.year)) + '</td>' +
        '<td>' + (a.openDate ? formatDate(a.openDate) : '—') + '</td>' +
        '<td><strong>' + formatDate(a.deadline) + '</strong></td>' +
        '<td>' + (a.notificationDate ? formatDate(a.notificationDate) : '—') + '</td>' +
        '<td><span class="status-pill ' + sc + '">' + statusLabel(a.status) + '</span></td>' +
        '<td>' + (a.tuitionUSD ? '$' + a.tuitionUSD.toLocaleString() + '/yr' : '—') + '</td>' +
        '<td><a href="' + esc(a.link) + '" target="_blank" rel="noopener" class="apply-link">Apply</a></td>' +
        '</tr>';
    }).join('');

    const tableHtml = '<div class="expanded-section">' +
      '<h4>Application Deadlines</h4>' +
      '<div class="table-wrap"><table class="deadlines-table"><thead><tr><th>Level</th><th>Intake</th><th>Opens</th><th>Deadline</th><th>Notification</th><th>Status</th><th>Tuition</th><th></th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
    '</div>';

    // Accommodation section
    let accomHtml = '';
    if (uni.accommodation) {
      if (uni.accommodation.available) {
        accomHtml = '<div class="expanded-section accom-section">' +
          '<h4><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Housing on campus</h4>' +
          '<p>' + esc(uni.accommodation.notes) + '</p>' +
          '<div class="accom-types">' + uni.accommodation.types.map(function (t) { return '<span class="accom-type-tag">' + esc(t) + '</span>'; }).join('') + '</div>' +
          (uni.accommodation.link ? '<a href="' + esc(uni.accommodation.link) + '" target="_blank" rel="noopener" class="accom-link">Housing information &rarr;</a>' : '') +
        '</div>';
      } else {
        accomHtml = '<div class="expanded-section accom-section accom-na">' +
          '<h4>Housing</h4>' +
          '<p>On-campus accommodation not listed. Check university website for partner housing options.</p>' +
        '</div>';
      }
    }

    // Guide sections (cost of living, maps, rentals, contacts, leisure)
    const guide = (window.UNI_GUIDE && window.UNI_GUIDE[uni.id]) ? window.UNI_GUIDE[uni.id] : null;
    let guideHtml = '';

    if (guide) {
      // ── Language ──────────────────────────────────────────────────────────
      guideHtml += '<div class="expanded-section guide-section">' +
        '<h4><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:5px"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>Course Language</h4>' +
        '<p><strong>' + esc(guide.courseLanguage) + '</strong> &nbsp;·&nbsp; ' + esc(guide.languageNotes) + '</p>' +
        '</div>';

      // ── Cost of Living ────────────────────────────────────────────────────
      if (guide.costOfLiving) {
        const col = guide.costOfLiving;
        const currency = col.currency || 'USD';
        const updated = col.lastUpdated || window.UNI_GUIDE.lastUpdated;
        const colRows = Object.keys(col.monthly).map(function (key) {
          const row = col.monthly[key];
          return '<tr>' +
            '<td style="font-size:0.83rem;color:var(--text-secondary)">' + esc(row.label) + '</td>' +
            '<td style="text-align:right;font-weight:600;white-space:nowrap">' + currency + ' ' + row.min.toLocaleString() + '–' + row.max.toLocaleString() + '/mo</td>' +
          '</tr>';
        }).join('');

        const otherRows = col.otherMonthly ? Object.entries(col.otherMonthly).map(function ([key, val]) {
          const label = key.charAt(0).toUpperCase() + key.slice(1);
          const note = val.note ? ' <span style="font-size:0.75rem;color:var(--text-muted)">(' + esc(val.note) + ')</span>' : '';
          return '<tr>' +
            '<td style="font-size:0.83rem;color:var(--text-secondary)">' + esc(label) + note + '</td>' +
            '<td style="text-align:right;font-weight:600;white-space:nowrap">' + currency + ' ' + val.min.toLocaleString() + '–' + val.max.toLocaleString() + '/mo</td>' +
          '</tr>';
        }).join('') : '';

        guideHtml += '<div class="expanded-section guide-section col-section">' +
          '<h4><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:5px"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>Estimated Monthly Cost of Living' +
          ' <span style="font-weight:400;font-size:0.75rem;color:var(--text-muted);margin-left:6px">Updated ' + esc(updated) + '</span></h4>' +
          (col.notes ? '<p style="font-size:0.83rem;color:var(--text-secondary);margin-bottom:10px">' + esc(col.notes) + '</p>' : '') +
          '<div class="col-grid">' +
            '<div><div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);margin-bottom:6px">Accommodation</div>' +
            '<table style="width:100%;border-collapse:collapse">' + colRows + '</table></div>' +
            (otherRows ? '<div><div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);margin-bottom:6px">Other Monthly Expenses</div>' +
            '<table style="width:100%;border-collapse:collapse">' + otherRows + '</table></div>' : '') +
          '</div>' +
          (col.source ? '<a href="' + esc(col.source) + '" target="_blank" rel="noopener" style="font-size:0.78rem;color:var(--primary);display:inline-block;margin-top:8px">Source: Numbeo ↗</a>' : '') +
          '<div style="font-size:0.75rem;color:var(--text-muted);margin-top:6px">Estimates only. Costs vary by lifestyle. Verify with university cost calculator.</div>' +
        '</div>';
      }

      // ── Google Map ────────────────────────────────────────────────────────
      const mapsKey = (window.FST_CONFIG && window.FST_CONFIG.GOOGLE_MAPS_KEY) ? window.FST_CONFIG.GOOGLE_MAPS_KEY : '';
      if (guide.mapQuery) {
        let mapSection = '';
        if (mapsKey) {
          const encodedQ = encodeURIComponent(guide.mapQuery);
          mapSection = '<iframe ' +
            'src="https://www.google.com/maps/embed/v1/search?key=' + mapsKey + '&q=' + encodedQ + '" ' +
            'width="100%" height="280" style="border:0;border-radius:8px;display:block" ' +
            'allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" ' +
            'title="Map of ' + esc(uni.name) + '"></iframe>';
        } else {
          const mapsLink = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(guide.mapQuery);
          mapSection = '<a href="' + mapsLink + '" target="_blank" rel="noopener" class="map-placeholder-link">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
            'View ' + esc(uni.name) + ' on Google Maps ↗' +
          '</a>';
        }

        // Airport quick link
        const airportHtml = guide.nearestAirport ?
          '<div class="nearby-chip"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/></svg> Nearest airport: ' +
          '<a href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent((guide.nearestAirport.mapsQuery || guide.nearestAirport.name)) + '" target="_blank" rel="noopener">' +
          esc(guide.nearestAirport.name) + ' (' + esc(guide.nearestAirport.code) + ') — ' + guide.nearestAirport.distanceKm + ' km ↗</a></div>' : '';

        guideHtml += '<div class="expanded-section guide-section">' +
          '<h4><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:5px"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>Location &amp; Getting Around</h4>' +
          airportHtml +
          mapSection +
        '</div>';
      }

      // ── Rental Links ──────────────────────────────────────────────────────
      if (guide.rentalLinks && guide.rentalLinks.length) {
        const rentalChips = guide.rentalLinks.map(function (r) {
          return '<a href="' + esc(r.url) + '" target="_blank" rel="noopener" class="rental-link-chip">' +
            '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' +
            esc(r.label) + '</a>';
        }).join('');

        guideHtml += '<div class="expanded-section guide-section">' +
          '<h4><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:5px"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>Find Accommodation in ' + esc(guide.city) + '</h4>' +
          '<div class="rental-links-grid">' + rentalChips + '</div>' +
          '<div style="font-size:0.75rem;color:var(--text-muted);margin-top:8px">Links open live availability on third-party platforms. Always verify listings before committing.</div>' +
        '</div>';
      }

      // ── Important Contacts ────────────────────────────────────────────────
      if (guide.importantContacts) {
        const ic = guide.importantContacts;
        guideHtml += '<div class="expanded-section guide-section">' +
          '<h4><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:5px"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.64h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 17z"/></svg>Important Contacts</h4>' +
          '<div class="contacts-grid">' +
          (ic.police ? '<div class="contact-card"><div class="contact-icon" style="background:#EFF6FF;color:#2563EB"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div><div><strong style="font-size:0.84rem">' + esc(ic.police.name) + '</strong><div style="font-size:0.8rem;color:var(--text-muted)">' + esc(ic.police.number) + '</div>' + (ic.police.address ? '<div style="font-size:0.78rem;color:var(--text-muted)">' + esc(ic.police.address) + '</div>' : '') + '</div></div>' : '') +
          (ic.hospital ? '<div class="contact-card"><div class="contact-icon" style="background:#FEF2F2;color:#DC2626"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/></svg></div><div><strong style="font-size:0.84rem">' + esc(ic.hospital.name) + '</strong><div style="font-size:0.78rem;color:var(--text-muted)">' + esc(ic.hospital.address || '') + '</div>' + (ic.hospital.url ? '<a href="' + esc(ic.hospital.url) + '" target="_blank" rel="noopener" style="font-size:0.78rem;color:var(--primary)">Visit website ↗</a>' : '') + '</div></div>' : '') +
          '<div class="contact-card"><div class="contact-icon" style="background:#FFF7ED;color:#D97706"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div><div><strong style="font-size:0.84rem">Emergency Number</strong><div style="font-size:1rem;font-weight:700;color:#DC2626">' + esc(ic.emergencyNumber || '112') + '</div></div></div>' +
          '</div>' +
        '</div>';
      }

      // ── Leisure ───────────────────────────────────────────────────────────
      if (guide.leisure && guide.leisure.length) {
        const leisureItems = guide.leisure.map(function (l) {
          const inner = '<div><strong style="font-size:0.83rem">' + esc(l.name) + '</strong><div style="font-size:0.78rem;color:var(--text-muted)">' + esc(l.type) + '</div></div>';
          return l.url ?
            '<a href="' + esc(l.url) + '" target="_blank" rel="noopener" class="leisure-card">' + inner + '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>' :
            '<div class="leisure-card leisure-card-plain">' + inner + '</div>';
        }).join('');

        guideHtml += '<div class="expanded-section guide-section">' +
          '<h4><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:5px"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Leisure, Parks &amp; Things to Do</h4>' +
          '<div class="leisure-grid">' + leisureItems + '</div>' +
        '</div>';
      }
    }

    return tableHtml + accomHtml + guideHtml;
  }

  function toggleExpand(id) {
    state.expandedId = state.expandedId === id ? null : id;
    render();
    if (state.expandedId) {
      const card = document.getElementById('card-' + id);
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  /* ===== STATUS HELPERS ===== */
  function getStatusInfo(uni) {
    const statuses = uni.admissions.map(function (a) { return a.status; });
    if (statuses.includes('closing_soon')) return { cls: 'status-warning', label: 'Closing soon' };
    if (statuses.includes('open')) return { cls: 'status-open', label: 'Open' };
    if (statuses.includes('results_pending')) return { cls: 'status-pending', label: 'Results pending' };
    if (statuses.includes('upcoming')) return { cls: 'status-upcoming', label: 'Upcoming' };
    if (statuses.includes('results_released')) return { cls: 'status-closed', label: 'Results out' };
    return { cls: 'status-closed', label: 'Closed' };
  }

  function statusClass(s) {
    const map = { open: 'status-open', closing_soon: 'status-warning', upcoming: 'status-upcoming', results_pending: 'status-pending', results_released: 'status-closed', closed: 'status-closed' };
    return map[s] || 'status-closed';
  }

  function statusLabel(s) {
    const map = { open: 'Open', closing_soon: 'Closing soon', upcoming: 'Upcoming', results_pending: 'Results pending', results_released: 'Results released', closed: 'Closed' };
    return map[s] || s;
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
    const grid = document.getElementById('uniGrid');
    if (grid) grid.innerHTML = '<div class="no-results"><p style="color:var(--error)">' + esc(msg) + '</p></div>';
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

    // TODO: Replace with your newsletter API endpoint (Mailchimp, Beehiiv, ConvertKit, etc.)
    // Example: POST to https://api.yournewsletterservice.com/subscribe
    setTimeout(function () {
      showFormMsg('newsletter-msg', 'You\'re in. Weekly deadline alerts coming your way.', 'success');
      form.reset();
      if (btn) { btn.disabled = false; btn.textContent = 'Get weekly alerts'; }
    }, 800);
  }

  function showFormMsg(id, msg, type) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg;
    el.className = 'form-msg form-msg-' + type;
    el.style.display = 'block';
  }

  /* ===== CALENDAR QUICK-SELECT ===== */
  window.setDateRange = function (preset) {
    const today = new Date();
    let from, to;
    if (preset === 'this_month') {
      from = new Date(today.getFullYear(), today.getMonth(), 1);
      to = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    } else if (preset === 'next_3') {
      from = today;
      to = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
    } else if (preset === 'next_6') {
      from = today;
      to = new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());
    } else if (preset === 'this_year') {
      from = new Date(today.getFullYear(), 0, 1);
      to = new Date(today.getFullYear(), 11, 31);
    }
    if (from && to) {
      const fmt = function (d) { return d.toISOString().split('T')[0]; };
      const df = document.getElementById('filterDateFrom');
      const dt = document.getElementById('filterDateTo');
      if (df) { df.value = fmt(from); state.dateFrom = fmt(from); }
      if (dt) { dt.value = fmt(to); state.dateTo = fmt(to); }
      state.page = 1;
      applyFilters();
    }
  };

})();

/* ===== LAST UPDATED TIMESTAMP ===== */
(function() {
  if (!window.UNI_DATA) return;
  const d = window.UNI_DATA.lastUpdated;
  const el = document.getElementById('lastUpdated');
  if (el) el.textContent = d;
  const tel = document.getElementById('lastUpdatedTime');
  if (tel) {
    try {
      const diff = Math.floor((Date.now() - new Date(d)) / 86400000);
      tel.textContent = diff === 0 ? '(today)' : diff === 1 ? '(yesterday)' : `(${diff} days ago)`;
    } catch(e) {}
  }
  // Also stamp the hero stats
  const stamp = document.querySelector('.hero-stat:last-child strong');
  if (stamp && stamp.textContent === 'Free') {
    // keep as-is
  }
})();
