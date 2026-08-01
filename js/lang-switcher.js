var FST_LANG_LABELS = {
  'en':'EN','zh-CN':'中文','ms':'MY','hi':'हि','ta':'தமிழ்',
  'ml':'ML','bn':'BN','ar':'AR','fr':'FR','es':'ES',
  'ru':'RU','tl':'TL','ko':'한국','ja':'日本'
};

function fstGetCookieLang() {
  var m = document.cookie.match(/googtrans=\/en\/([^;]+)/);
  return m ? decodeURIComponent(m[1]) : 'en';
}

(function initLangLabel() {
  var lang = fstGetCookieLang();
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
