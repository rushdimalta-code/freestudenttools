// Browser language map — navigator.language prefix → Google Translate code
var FST_BROWSER_LANG_MAP = {
  'zh':'zh-CN','zh-CN':'zh-CN','zh-TW':'zh-TW','zh-HK':'zh-TW',
  'ms':'ms','id':'ms',
  'hi':'hi','ta':'ta','ml':'ml','bn':'bn','te':'te',
  'ar':'ar','fr':'fr','es':'es','ru':'ru',
  'tl':'tl','fil':'tl',
  'ko':'ko','ja':'ja'
};

// Supported lang codes
var FST_SUPPORTED = ['zh-CN','zh-TW','ms','hi','ta','ml','bn','ar','fr','es','ru','tl','ko','ja'];

var FST_LANG_LABELS = {
  'en':'EN','zh-CN':'中文','ms':'MY','hi':'हि','ta':'தமிழ்',
  'ml':'ML','bn':'BN','ar':'AR','fr':'FR','es':'ES',
  'ru':'RU','tl':'TL','ko':'한국','ja':'日本'
};

function fstGetCookieLang() {
  var m = document.cookie.match(/googtrans=\/en\/([^;]+)/);
  return m ? decodeURIComponent(m[1]) : 'en';
}

(function initLang() {
  var cookieLang = fstGetCookieLang();

  // Auto-detect on first visit (no googtrans cookie set yet)
  if (cookieLang === 'en' && !document.cookie.match(/googtrans=/)) {
    var bl = (navigator.language || navigator.userLanguage || '').replace('_','-');
    // Try exact match, then prefix match
    var mapped = FST_BROWSER_LANG_MAP[bl] || FST_BROWSER_LANG_MAP[bl.split('-')[0]];
    if (mapped && FST_SUPPORTED.indexOf(mapped) !== -1) {
      fstSwitchLang(mapped);
      return; // page reloads
    }
  }

  // Update button label for active non-English lang
  var lang = cookieLang;
  var el = document.getElementById('fstCurrentLang');
  if (el && lang !== 'en') el.textContent = FST_LANG_LABELS[lang] || lang.toUpperCase();
})();

function fstSwitchLang(lang) {
  var domains = ['', '.' + location.hostname, location.hostname];
  if (lang === 'en') {
    domains.forEach(function(d) {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/' + (d ? '; domain=' + d : '');
    });
  } else {
    var val = '/en/' + lang;
    domains.forEach(function(d) {
      document.cookie = 'googtrans=' + val + '; path=/' + (d ? '; domain=' + d : '');
    });
  }
  location.reload();
}

function fstLangToggle(e) {
  e.stopPropagation();
  var menu = document.getElementById('fstLangMenu');
  var btn = document.getElementById('langBtn');
  if (!menu) return;
  var open = menu.classList.toggle('open');
  if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

document.addEventListener('click', function(e) {
  var menu = document.getElementById('fstLangMenu');
  var btn = document.getElementById('langBtn');
  if (menu && !menu.contains(e.target) && btn && !btn.contains(e.target)) {
    menu.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    var menu = document.getElementById('fstLangMenu');
    if (menu) menu.classList.remove('open');
  }
});
