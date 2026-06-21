// ===== GOOGLE ANALYTICS 4 =====
const GA_MEASUREMENT_ID = 'G-WX0M0TK16J';
const ADSENSE_PUB_ID = 'ca-pub-9843476971668607';

function initGA() {
  if (window._gaInitialised) return;
  window._gaInitialised = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function() { dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    allow_google_signals: false
  });
}

function initAds() {
  if (window._adsInitialised) return;
  window._adsInitialised = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`;
  script.crossOrigin = 'anonymous';
  script.onload = function() {
    // Push all ad slots now that adsbygoogle.js is loaded
    document.querySelectorAll('ins.adsbygoogle').forEach(function() {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    });
  };
  document.head.appendChild(script);
}

// Track custom events — called from each tool JS file
window.trackEvent = function(eventName, params = {}) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, params);
  }
};

// ===== NAVIGATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Init GA + Ads if consent was previously given
  if (localStorage.getItem('cookie_consent') === 'accepted') {
    initGA();
    initAds();
  }

  // Mobile nav toggle
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
    });
  }

  // Dropdown nav
  document.querySelectorAll('.nav-dropdown-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const menu = btn.nextElementSibling;
      const isOpen = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
      // Close other dropdowns
      document.querySelectorAll('.nav-dropdown-menu').forEach(m => {
        if (m !== menu) { m.classList.remove('open'); m.previousElementSibling.setAttribute('aria-expanded', 'false'); }
      });
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.nav-dropdown-menu').forEach(m => {
      m.classList.remove('open');
      if (m.previousElementSibling) m.previousElementSibling.setAttribute('aria-expanded', 'false');
    });
  });

  // Active nav link (desktop dropdown links + mobile links)
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-dropdown-menu a, .nav-mobile a').forEach(link => {
    if (link.getAttribute('href') === currentPath) link.classList.add('active');
  });

  // Cookie consent
  initCookieConsent();

  // Click-to-browse + drag & drop on upload zones
  document.querySelectorAll('.upload-zone').forEach(zone => {
    const input = zone.querySelector('input[type="file"]');

    // Forward zone clicks to the file input.
    // e.isTrusted=false means it's the synthetic bubble from input.click() itself — skip to avoid loop.
    zone.addEventListener('click', e => {
      if (input && e.isTrusted) input.click();
    });

    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      if (input && e.dataTransfer.files.length) {
        const dt = new DataTransfer();
        dt.items.add(e.dataTransfer.files[0]);
        input.files = dt.files;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  });
});

// ===== COOKIE CONSENT =====
function initCookieConsent() {
  if (localStorage.getItem('cookie_consent')) return;
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;
  banner.classList.add('show');

  document.getElementById('cookieAccept')?.addEventListener('click', () => {
    localStorage.setItem('cookie_consent', 'accepted');
    banner.classList.remove('show');
    initGA();
    initAds();
  });

  document.getElementById('cookieDecline')?.addEventListener('click', () => {
    localStorage.setItem('cookie_consent', 'declined');
    banner.classList.remove('show');
  });
}

// ===== PAGE HERO TRUST STRIP (tool pages) =====
(function () {
  var hero = document.querySelector('.page-hero');
  if (!hero) return;
  var checkIcon = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
  var strip = document.createElement('div');
  strip.className = 'page-hero-trust';
  strip.setAttribute('aria-label', 'Key guarantees');
  strip.innerHTML =
    '<span class="page-hero-trust-item">' + checkIcon + ' Browser-only processing</span>' +
    '<span class="page-hero-trust-item">' + checkIcon + ' No file uploads</span>' +
    '<span class="page-hero-trust-item">' + checkIcon + ' No sign-up</span>' +
    '<span class="page-hero-trust-item">' + checkIcon + ' 100% free, always</span>';
  var container = hero.querySelector('.container');
  if (container) container.appendChild(strip);
})();

// ===== SCROLL ENTRANCE ANIMATIONS =====
(function () {
  const els = document.querySelectorAll('[data-animate]');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) {
    els.forEach(function(el) { el.classList.add('is-visible'); });
    return;
  }
  const io = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(function(el) { io.observe(el); });
})();

// ===== UTILITIES =====
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function showStatus(containerId, message, type = 'info') {
  const el = document.getElementById(containerId);
  if (!el) return;
  const icons = { info: 'ℹ️', success: '✅', error: '❌', warning: '⚠️' };
  el.innerHTML = `<span>${icons[type]}</span> ${message}`;
  el.className = `status-msg show ${type}`;
}

function hideStatus(containerId) {
  const el = document.getElementById(containerId);
  if (el) el.className = 'status-msg';
}

function showProgress(pct, label = '') {
  const container = document.getElementById('progressContainer');
  const fill = document.getElementById('progressFill');
  const labelEl = document.getElementById('progressLabel');
  const pctEl = document.getElementById('progressPct');
  if (!container) return;
  container.classList.add('show');
  if (fill) fill.style.width = pct + '%';
  if (labelEl && label) labelEl.textContent = label;
  if (pctEl) pctEl.textContent = Math.round(pct) + '%';
}

function hideProgress() {
  const container = document.getElementById('progressContainer');
  if (container) container.classList.remove('show');
}

function setFileSelected(file, inputId) {
  const selected = document.getElementById(inputId + 'Selected');
  if (!selected) return;
  if (!file) { selected.classList.remove('show'); return; }
  selected.classList.add('show');
  const nameEl = selected.querySelector('.file-name');
  const sizeEl = selected.querySelector('.file-size');
  if (nameEl) nameEl.textContent = file.name;
  if (sizeEl) sizeEl.textContent = formatBytes(file.size);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function downloadText(text, filename) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, filename);
}

// ===== BACK TO TOP =====
(function () {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"/></svg>';
  document.body.appendChild(btn);
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
})();
