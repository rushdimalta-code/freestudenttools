#!/usr/bin/env python3
"""Comprehensive audit — links, SEO, performance, orphans, redirects, 404s.
Run from repo root: python3 tools/full_site_audit.py."""
import os, re, sys, html, json, glob
from collections import defaultdict, Counter

ROOT = "/Users/rushdi/Downloads/freestudenttools"
os.chdir(ROOT)
SITE = "https://freestudenttools.com"

def rd(p):
    return open(p, encoding="utf-8", errors="replace").read()

# ---------- inventory ----------
html_files = []
for base in [".", "blog", "scholarship"]:
    for f in sorted(os.listdir(base)):
        if f.endswith(".html"):
            html_files.append(os.path.normpath(os.path.join(base, f)))
NOINDEX_INTENTIONAL = {"404.html", "search.html", "contact-thanks.html", "scholarship.html"}

# ---------- netlify redirects ----------
toml = rd("netlify.toml")
redirects = re.findall(
    r'\[\[redirects\]\]\s*from\s*=\s*"([^"]+)"\s*to\s*=\s*"([^"]+)"\s*status\s*=\s*(\d+)', toml)
redir_from = {f for f, t, s in redirects}

def file_for_url(rel):
    rel = rel.split("#")[0].split("?")[0].strip()
    if rel in ("", "/"):
        return "index.html"
    rel = rel[1:] if rel.startswith("/") else rel
    if os.path.isfile(rel):
        return rel
    if os.path.isfile(rel + ".html"):
        return rel + ".html"
    if rel.endswith("/") and os.path.isfile(rel + "index.html"):
        return rel + "index.html"
    for f, t, s in redirects:
        rx = "^" + re.escape(f).replace(r"\:id", "[^/]+").replace(r"\:splat", ".*").replace(r"\*", ".*") + "$"
        if re.match(rx, "/" + rel):
            return ("REDIRECT", t, s)
    return None

issues = defaultdict(list)

# ==================================================================
# A. INTERNAL LINKS + inbound counts (orphan analysis)
# ==================================================================
inbound = Counter()
page_keys = set()
for hf in html_files:
    k = hf[:-5]
    k = k[2:] if k.startswith("./") else k
    page_keys.add(k)

broken_links = []
for hf in html_files:
    txt = rd(hf)
    d = os.path.dirname(hf)
    for m in re.finditer(r'(?:href|src)\s*=\s*"([^"]*)"', txt):
        raw = html.unescape(m.group(1).strip())
        if not raw or raw.startswith(("data:", "#", "mailto:", "tel:", "javascript:", "blob:")):
            continue
        if re.match(r'^(https?:)?//', raw):
            continue
        if raw.startswith("/"):
            url = raw
        else:
            url = "/" + os.path.normpath(os.path.join(d, raw)).replace("\\", "/")
        res = file_for_url(url)
        if res is None:
            broken_links.append((hf, raw))
            continue
        # inbound for orphan calc
        tgt = url.split("#")[0].split("?")[0].lstrip("/")
        if tgt.endswith(".html"):
            tgt = tgt[:-5]
        if tgt.endswith("/"):
            tgt += "index"
        if tgt == "":
            tgt = "index"
        if tgt in page_keys:
            inbound[tgt] += 1

for hf, raw in broken_links:
    issues["BROKEN_INTERNAL_LINK"].append(f"{hf}  ->  {raw}")

# ---------- orphans ----------
EXPECT_NO_INBOUND = {"index", "404", "search", "contact-thanks", "scholarship", "sitemap"}
# /scholarship resolves via Netlify pretty-URL to the noindex template; not a gap
MISSING_REWRITE_OK = {"scholarship"}
for k in sorted(page_keys):
    if k in EXPECT_NO_INBOUND:
        continue
    if inbound.get(k, 0) == 0:
        issues["ORPHAN_PAGE"].append(f"{k}  (0 inbound internal links)")

# ==================================================================
# B. REDIRECTS
# ==================================================================
for f, t, s in redirects:
    if s == "200" and t.endswith(".html") and ":" not in t and "*" not in t:
        if not os.path.isfile(t.lstrip("/")):
            issues["REDIRECT_TARGET_MISSING"].append(f"{f} -> {t} ({s})")
    if s in ("301", "302"):
        if t in redir_from:
            _ts = [x[2] for x in redirects if x[0] == t]
            if any(c != "200" for c in _ts):
                issues["REDIRECT_CHAIN"].append(f"{f} -> {t} (target is itself redirected {_ts})")
        tt = t.lstrip("/")
        if t.startswith("/") and not t.startswith("http"):
            if not (os.path.isfile(tt) or os.path.isfile(tt + ".html") or file_for_url(t)):
                issues["REDIRECT_TARGET_MISSING"].append(f"{f} -> {t} ({s})")
    # "Netlify serves existing file before redirect" gotcha
    frm = f.lstrip("/")
    def _cs_file(path):
        d = os.path.dirname(path) or "."
        b = os.path.basename(path)
        try:
            return b in os.listdir(d) and os.path.isfile(os.path.join(d, b))
        except FileNotFoundError:
            return False
    if s in ("301", "302") and (_cs_file(frm) or _cs_file(frm + ".html")):
        issues["REDIRECT_SHADOWED_BY_FILE"].append(f"{f} ({s}) — a real file exists at this path; redirect never fires")

# root pages need a clean-url rewrite
for f in sorted(os.listdir(".")):
    if not f.endswith(".html"):
        continue
    base = f[:-5]
    if base in ("index", "404"):
        continue
    if f'to = "/{f}"' not in toml and f'to = "/{base}.html"' not in toml:
        (base in MISSING_REWRITE_OK) or issues["MISSING_CLEAN_URL_REWRITE"].append(f"/{base}  (no rewrite to /{f})")

# ==================================================================
# C. SITEMAP
# ==================================================================
sm = rd("sitemap.xml")
locs = re.findall(r"<loc>([^<]+)</loc>", sm)
sm_paths = {}
for l in locs:
    p = l.replace(SITE, "").strip("/") or "index"
    sm_paths[p] = l
# every loc resolves
for p, l in sm_paths.items():
    if file_for_url("/" + p) is None and file_for_url("/" + p + "/") is None:
        issues["SITEMAP_LOC_UNRESOLVED"].append(l)
# every indexable file in sitemap
for hf in html_files:
    if hf in NOINDEX_INTENTIONAL:
        continue
    txt = rd(hf)
    if re.search(r'<meta[^>]+name=["\']robots["\'][^>]+noindex', txt, re.I):
        continue
    key = hf[:-5]
    key = key[2:] if key.startswith("./") else key
    key = "index" if key == "index" else key
    variants = {key, key + "/", key.replace("blog/", "blog/")}
    if key == "blog/index":
        variants |= {"blog", "blog/"}
    if not any(v.strip("/") in sm_paths or v in sm_paths for v in variants):
        issues["MISSING_FROM_SITEMAP"].append(key)
# noindex page wrongly in sitemap
for hf in html_files:
    txt = rd(hf)
    if re.search(r'name=["\']robots["\'][^>]+noindex', txt, re.I):
        key = hf[:-5]; key = key[2:] if key.startswith("./") else key
        if key in sm_paths or key + "/" in sm_paths:
            issues["NOINDEX_IN_SITEMAP"].append(key)
# lastmod validity
for m in re.finditer(r"<url>(.*?)</url>", sm, re.S):
    block = m.group(1)
    loc = re.search(r"<loc>([^<]+)</loc>", block)
    lm = re.search(r"<lastmod>([^<]+)</lastmod>", block)
    if not lm:
        issues["SITEMAP_NO_LASTMOD"].append(loc.group(1) if loc else "?")
    elif not re.match(r"^\d{4}-\d{2}-\d{2}", lm.group(1)):
        issues["SITEMAP_BAD_LASTMOD"].append(f"{loc.group(1)} : {lm.group(1)}")
# URL hygiene
for l in locs:
    if l.startswith("http://"):
        issues["SITEMAP_HTTP_URL"].append(l)
    if l.endswith(".html"):
        issues["SITEMAP_DOTHTML_URL"].append(l)

# ==================================================================
# D. SEO per indexable page
# ==================================================================
titles = defaultdict(list)
descs = defaultdict(list)
seo_pages = [h for h in html_files if h not in NOINDEX_INTENTIONAL]
# scholarship/* are 239 near-identical templated pages — sample for per-page SEO but still dedup-check titles
for hf in seo_pages:
    txt = rd(hf)
    low = txt.lower()
    is_noindex = bool(re.search(r'name=["\']robots["\'][^>]+noindex', txt, re.I))
    # h1
    h1s = re.findall(r"<h1\b", low)
    if len(h1s) == 0:
        issues["SEO_NO_H1"].append(hf)
    elif len(h1s) > 1:
        issues["SEO_MULTIPLE_H1"].append(f"{hf} ({len(h1s)} h1)")
    # title
    tm = re.search(r"<title>(.*?)</title>", txt, re.S | re.I)
    if not tm or not tm.group(1).strip():
        issues["SEO_NO_TITLE"].append(hf)
    else:
        t = html.unescape(re.sub(r"\s+", " ", tm.group(1)).strip())
        titles[t].append(hf)
        if len(t) > 65:
            issues["SEO_TITLE_TOO_LONG"].append(f"{hf} ({len(t)}): {t[:70]}")
        if len(t) < 15:
            issues["SEO_TITLE_TOO_SHORT"].append(f"{hf} ({len(t)}): {t}")
    # meta description
    dm = re.search(r'<meta[^>]+name=["\']description["\'][^>]*?\scontent="([^"]*)"', txt, re.S | re.I) \
         or re.search(r"<meta[^>]+name=[\"']description[\"'][^>]*?\scontent='([^']*)'", txt, re.S | re.I)
    if not dm or not dm.group(1).strip():
        issues["SEO_NO_META_DESC"].append(hf)
    else:
        dd = html.unescape(re.sub(r"\s+", " ", dm.group(1)).strip())
        descs[dd].append(hf)
        if len(dd) > 165:
            issues["SEO_META_DESC_TOO_LONG"].append(f"{hf} ({len(dd)})")
        if len(dd) < 50:
            issues["SEO_META_DESC_TOO_SHORT"].append(f"{hf} ({len(dd)})")
    # canonical
    cm = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\'](.*?)["\']', txt, re.I)
    if not cm:
        issues["SEO_NO_CANONICAL"].append(hf)
    else:
        c = cm.group(1).strip()
        if not c.startswith("https://freestudenttools.com"):
            issues["SEO_CANONICAL_NOT_ABSOLUTE"].append(f"{hf} : {c}")
        else:
            # self-referential check
            key = hf[:-5]; key = key[2:] if key.startswith("./") else key
            want = "/" if key == "index" else "/" + key
            got = c.replace("https://freestudenttools.com", "") or "/"
            got_n = got.rstrip("/") or "/"
            want_n = want.rstrip("/") or "/"
            if key.startswith("blog/") and key != "blog/index":
                pass  # blog uses clean url, ok
            if got_n not in (want_n, want_n + ".html") and not (key == "blog/index" and got_n in ("/blog", "/blog/")):
                if key != "scholarship":  # noindex template
                    issues["SEO_CANONICAL_MISMATCH"].append(f"{hf}: canonical={got}  expected≈{want}")
    # OG / twitter
    for tag, patt in [("og:title", r'property=["\']og:title["\']'),
                      ("og:description", r'property=["\']og:description["\']'),
                      ("og:url", r'property=["\']og:url["\']'),
                      ("og:image", r'property=["\']og:image["\']'),
                      ("twitter:card", r'name=["\']twitter:card["\']')]:
        if not re.search(patt, txt, re.I):
            issues[f"SEO_MISSING_{tag.replace(':','_').upper()}"].append(hf)
    # lang attr
    if not re.search(r"<html[^>]+lang=", txt, re.I):
        issues["SEO_NO_LANG_ATTR"].append(hf)
    # viewport + charset
    if "name=\"viewport\"" not in txt and "name='viewport'" not in txt:
        issues["SEO_NO_VIEWPORT"].append(hf)
    # JSON-LD on key non-scholarship pages
    if not hf.startswith("scholarship/") and "application/ld+json" not in txt:
        issues["SEO_NO_JSONLD"].append(hf)

for t, fs in titles.items():
    if len(fs) > 1:
        issues["SEO_DUPLICATE_TITLE"].append(f'"{t[:60]}" x{len(fs)}: {", ".join(fs[:4])}')
for d, fs in descs.items():
    if len(fs) > 1:
        issues["SEO_DUPLICATE_META_DESC"].append(f'"{d[:55]}..." x{len(fs)}: {", ".join(fs[:4])}')

# ==================================================================
# E. PERFORMANCE signals
# ==================================================================
# image dimensions / lazy-load  (CLS-safe if parent container reserves space via CSS)
GLOBAL_CSS = rd("css/style.css")
def _reserves(css_text, classes):
    for c in classes.split():
        if not c: continue
        for m in re.finditer(r"\.(" + re.escape(c) + r")(?:\s*\{|[ ,>.:][^{}]*\{)([^{}]*)\}", css_text):
            if re.search(r"(aspect-ratio|min-height|(?<!line-)height\s*:\s*\d|padding-bottom\s*:\s*\d{2}|padding-top\s*:\s*\d{2})", m.group(2)):
                return True
    return False
for hf in html_files:
    txt = rd(hf)
    inline_css = "".join(re.findall(r"<style[^>]*>(.*?)</style>", txt, re.S | re.I))
    page_css = GLOBAL_CSS + inline_css
    for im in re.finditer(r"<img\b([^>]*)>", txt, re.I):
        tag = im.group(0)
        src = re.search(r'src=["\']([^"\']+)', tag)
        srcv = src.group(1) if src else None
        if not srcv or "data:" in srcv:
            continue
        has_dims = ("width=" in tag and "height=" in tag)
        has_lazy = 'loading="lazy"' in tag or "loading='lazy'" in tag
        has_eager = 'fetchpriority="high"' in tag or 'loading="eager"' in tag
        ancestor_classes = " ".join(re.findall(r'class=["\']([^"\']*)', txt[max(0, im.start()-280):im.start()]))
        cls_safe = _reserves(page_css, ancestor_classes) or 'style="aspect-ratio' in txt[max(0, im.start()-280):im.start()]
        if not has_dims and not cls_safe:
            issues["PERF_IMG_NO_DIMENSIONS"].append(f"{hf}: {srcv}")
        if not has_lazy and not has_eager and not has_dims:
            issues["PERF_IMG_NO_LOADING_ATTR"].append(f"{hf}: {srcv}")
# asset versioning consistency
ver_refs = Counter(re.findall(r'/(?:css|js)/[a-z0-9_.-]+\?v=(20\d{6})', "\n".join(rd(h) for h in html_files if not h.startswith("scholarship/"))))
if len(ver_refs) > 1:
    issues["PERF_ASSET_VERSION_INCONSISTENT"].append(str(dict(ver_refs)))
nover = 0
for hf in html_files:
    if hf.startswith("scholarship/"): continue
    txt = rd(hf)
    for a in re.finditer(r'(?:href|src)=["\'](/?(?:css|js)/[a-z0-9_.-]+\.(?:css|js))(["\'?])', txt):
        if a.group(2) != "?":
            nover += 1
if nover:
    issues["PERF_ASSET_NO_CACHEBUST"].append(f"{nover} css/js refs without ?v=")
# large assets
for f in glob.glob("assets/**/*", recursive=True) + glob.glob("css/*") + glob.glob("js/*"):
    if os.path.isfile(f):
        sz = os.path.getsize(f)
        if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp", ".gif")) and sz > 300_000:
            issues["PERF_LARGE_IMAGE"].append(f"{f} ({sz//1024} KB)")
        if f.lower().endswith((".css", ".js")) and sz > 160_000:
            issues["PERF_LARGE_ASSET"].append(f"{f} ({sz//1024} KB)")
# render-blocking / script hygiene on homepage-type pages
for hf in ["index.html"] + [h for h in html_files if h.endswith(".html") and "/" not in h[2:]][:1]:
    txt = rd(hf)
    head = txt.split("</head>")[0]
    for s in re.finditer(r"<script\b([^>]*)>", head, re.I):
        at = s.group(1)
        if "src=" in at and "async" not in at and "defer" not in at:
            issues["PERF_BLOCKING_SCRIPT_IN_HEAD"].append(f"{hf}: {s.group(0)[:80]}")

# ==================================================================
# F. robots.txt / llms.txt
# ==================================================================
rob = rd("robots.txt")
if "Sitemap:" not in rob:
    issues["ROBOTS_NO_SITEMAP_DIRECTIVE"].append("robots.txt")
elif f"{SITE}/sitemap.xml" not in rob:
    issues["ROBOTS_SITEMAP_URL_WRONG"].append(re.findall(r"Sitemap:.*", rob))
for bot in ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"]:
    if re.search(rf"User-agent:\s*{bot}\s*\nDisallow:\s*/", rob):
        issues["ROBOTS_AI_CRAWLER_BLOCKED"].append(bot)
if os.path.isfile("llms.txt"):
    ll = rd("llms.txt")
    for u in re.findall(r"https://freestudenttools\.com(/[^\s)]+)", ll):
        if file_for_url(u) is None:
            issues["LLMS_TXT_DEAD_URL"].append(u)

# ==================================================================
# REPORT
# ==================================================================
print("=" * 72)
print(f"COMPREHENSIVE AUDIT — {len(html_files)} HTML files "
      f"(root {sum(1 for h in html_files if '/' not in h[2:])}, "
      f"blog {sum(1 for h in html_files if h.startswith('blog/'))}, "
      f"scholarship {sum(1 for h in html_files if h.startswith('scholarship/'))})")
print(f"netlify redirects: {len(redirects)}   sitemap <loc>: {len(locs)}")
print("=" * 72)

CATS = [
 ("BROKEN LINKS / 404s", ["BROKEN_INTERNAL_LINK"]),
 ("ORPHANS", ["ORPHAN_PAGE"]),
 ("REDIRECTS", ["REDIRECT_TARGET_MISSING","REDIRECT_CHAIN","REDIRECT_SHADOWED_BY_FILE","MISSING_CLEAN_URL_REWRITE"]),
 ("SITEMAP", ["SITEMAP_LOC_UNRESOLVED","MISSING_FROM_SITEMAP","NOINDEX_IN_SITEMAP","SITEMAP_NO_LASTMOD","SITEMAP_BAD_LASTMOD","SITEMAP_HTTP_URL","SITEMAP_DOTHTML_URL"]),
 ("SEO — structure", ["SEO_NO_H1","SEO_MULTIPLE_H1","SEO_NO_TITLE","SEO_NO_META_DESC","SEO_NO_CANONICAL","SEO_NO_LANG_ATTR","SEO_NO_VIEWPORT","SEO_NO_JSONLD"]),
 ("SEO — canonical", ["SEO_CANONICAL_NOT_ABSOLUTE","SEO_CANONICAL_MISMATCH"]),
 ("SEO — titles/desc length & dupes", ["SEO_TITLE_TOO_LONG","SEO_TITLE_TOO_SHORT","SEO_META_DESC_TOO_LONG","SEO_META_DESC_TOO_SHORT","SEO_DUPLICATE_TITLE","SEO_DUPLICATE_META_DESC"]),
 ("SEO — social tags", ["SEO_MISSING_OG_TITLE","SEO_MISSING_OG_DESCRIPTION","SEO_MISSING_OG_URL","SEO_MISSING_OG_IMAGE","SEO_MISSING_TWITTER_CARD"]),
 ("PERFORMANCE", ["PERF_IMG_NO_DIMENSIONS","PERF_IMG_NO_LOADING_ATTR","PERF_ASSET_VERSION_INCONSISTENT","PERF_ASSET_NO_CACHEBUST","PERF_LARGE_IMAGE","PERF_LARGE_ASSET","PERF_BLOCKING_SCRIPT_IN_HEAD"]),
 ("robots.txt / llms.txt", ["ROBOTS_NO_SITEMAP_DIRECTIVE","ROBOTS_SITEMAP_URL_WRONG","ROBOTS_AI_CRAWLER_BLOCKED","LLMS_TXT_DEAD_URL"]),
]
total = 0
for name, keys in CATS:
    n = sum(len(issues[k]) for k in keys)
    total += n
    mark = "PASS ✅" if n == 0 else f"{n} ⚠"
    print(f"\n### {name}: {mark}")
    for k in keys:
        for v in issues[k][:25]:
            print(f"  [{k}] {v}")
        if len(issues[k]) > 25:
            print(f"  ... +{len(issues[k])-25} more [{k}]")
print("\n" + "=" * 72)
print(f"TOTAL ISSUES: {total}")
print("=" * 72)
# machine-readable summary for external-link stage
json.dump({k: issues[k] for k in issues}, open("/private/tmp/claude-501/-Users-rushdi-Downloads-Trials/68df55cf-35af-49f2-afcd-58381e1e23c5/scratchpad/audit_issues.json","w"), indent=1)
