// ===== GOOGLE ANALYTICS 4 =====
// Replace G-XXXXXXXXXX with your actual GA4 Measurement ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

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
    anonymize_ip: true,        // GDPR: mask last IP octet
    allow_google_signals: false // no cross-device tracking
  });
}

// Track custom events — called from each tool JS file
window.trackEvent = function(eventName, params = {}) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, params);
  }
};

// ===== NAVIGATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Init GA if consent was previously given
  if (localStorage.getItem('cookie_consent') === 'accepted') {
    initGA();
  }

  // Mobile nav toggle
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => mobileNav.classList.toggle('open'));
  }

  // Active nav link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    if (link.getAttribute('href') === currentPath) link.classList.add('active');
  });

  // Cookie consent
  initCookieConsent();

  // Drag & drop on upload zones
  document.querySelectorAll('.upload-zone').forEach(zone => {
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      const input = zone.querySelector('input[type="file"]');
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
    initGA(); // Start GA only after user accepts
  });

  document.getElementById('cookieDecline')?.addEventListener('click', () => {
    localStorage.setItem('cookie_consent', 'declined');
    banner.classList.remove('show');
  });
}

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
