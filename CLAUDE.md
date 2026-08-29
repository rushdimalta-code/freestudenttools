# CLAUDE.md — Free Student Tools

_Last updated: 2026-08-29 (rev 25)_

---

## Project Purpose

Public static web app offering free browser-based tools for students. All processing is client-side — files never leave the user's device. No accounts, no sign-up, no paywalls.

Monetisation: Google AdSense (pub ID: `ca-pub-9843476971668607`). **Review submitted 2026-06-16 19:16** — awaiting approval (2–4 weeks). Replace placeholder slot IDs after approval.

---

## Current State

**Live at:** freestudenttools.com (Netlify, auto-deploys from `main`)

**Tools (7):**
- `ocr.html` — OCR scanner via Tesseract.js (15+ languages)
- `pdf-converter.html` — PDF to Word/Excel via PDF.js + docx.js + SheetJS
- `compressor.html` — PDF compressor via pdf-lib
- `image-compressor.html` — Image compressor via Canvas API (JPG, PNG, WebP)
- `pdf-merger.html` — PDF merger via pdf-lib (up to 10 files)
- `pdf-extractor.html` — PDF page extractor via pdf-lib
- `citation-generator.html` — APA 7th, MLA 9th, Chicago 17th — pure JS, no network

**University Hub (7 pages):**
- `admissions.html` — deadline tracker (data from `data/universities.js` + `data/universities_all.js`)
- `scholarships.html` — 239 scholarships, filter by country/funding/level/deadline/competition
- `scholarship.html` — individual scholarship detail page (dynamic, `noindex` JS template; real pages are the 239 static `scholarship/*.html` files)
- `scholarship-guide.html` — long-form guide (5,000 words)
- `compare.html` — side-by-side university comparison, 1,000 ranked universities, 16 streams
- `compare-scholarships.html` — side-by-side scholarship comparison (any 2 of 239); popular pairs quick-pick; WebApplication + FAQPage + BreadcrumbList JSON-LD
- `tips.html` — student tips guide (5,000 words) — Article + FAQPage schema

**Canonical counts:** see `tools/SITE-FACTS.md` — 239 scholarships · 27 universities with full deadline data · 1,000 ranked universities · 48 blog guides · 7 document tools. Update **every** occurrence when a number changes (design.md §44).

**Blog (live 2026-06-17):** 48 posts, all in `blog/` — Article + FAQPage + BreadcrumbList JSON-LD, CCO voice, kie.ai hero images in `assets/blog/`. Full list = the 48 `/blog/` `<loc>` entries in `sitemap.xml`. Source wiki: `/Users/rushdi/Downloads/Scholarships/` — Karpathy pattern.

**Static pages:** `about.html`, `contact.html`, `privacy.html`, `terms.html`, `404.html`, `contact-thanks.html`

---

## Stack

- Static HTML/CSS/JS — one HTML file per tool, no build step
- Hosted on Netlify (free tier) — `netlify.toml` configures caching headers + redirects
- `css/style.css` — single shared stylesheet, CSS variables via `:root`
- `js/common.js` — shared: GA4, AdSense deferred load, dropdown nav, cookie consent, back-to-top, scroll animations, utilities
- `js/config.js` — `window.FST_CONFIG` with `GOOGLE_MAPS_KEY` (currently empty)
- `data/` — JS data files exposed as `window.*` globals (see Data Files section)
- No backend, no auth, no user accounts

---

## Data Files

| File | Global | Contents |
|---|---|---|
| `data/universities.js` | `window.UNI_DATA` | **27** universities — full admissions, accommodation, deadline, streams (verified via Playwright 2026-06-22) |
| `data/universities_all.js` | `window.UNI_ALL` | 1,000 ranked universities — name, country, ranking, streams. **Auto-generated — never edit manually** |
| `data/uni_guide.js` | `window.UNI_GUIDE` | 42 entries + 5 aliases — city, CoL, rental links, contacts, leisure |
| `data/courses.js` | `window.COURSES_DATA` | 16 academic streams — curriculum, assessment, careers, uni-specific programme info |
| `data/scholarships_data.js` | `window.SCHOLARSHIP_DATA` | **246 scholarships** — compact JSON, last updated 2026-06-16 |

To regenerate `universities_all.js`: `python3 tools/fetch_all_universities.py`

**Editing `scholarships_data.js`:** Always keep it as compact JSON (no indent). Use this to reformat if needed:
```python
python3 -c "
import re, json
with open('data/scholarships_data.js') as f: c = f.read()
m = re.search(r'window\.SCHOLARSHIP_DATA\s*=\s*(\{[\s\S]+\});', c)
d = json.loads(m.group(1))
open('data/scholarships_data.js','w').write('window.SCHOLARSHIP_DATA = ' + json.dumps(d, separators=(',',':'), ensure_ascii=False) + ';\n')
print(len(d['scholarships']), 'scholarships')
"
```

---

## Analytics & Ads

**GA4:** `G-WX0M0TK16J` — set in `js/common.js`. Fires only after cookie consent.

**AdSense:** `ca-pub-9843476971668607` — loaded via `initAds()` in `js/common.js` after cookie consent. Ad slot IDs in HTML pages are **placeholders** (`1111111111`, `2222222222`, `3333333333`) — replace with real slot IDs from AdSense dashboard after account approval.

**Cookie consent:** Both GA and AdSense are gated behind the cookie banner. `localStorage.cookie_consent === 'accepted'` triggers both.

---

## SEO & GEO

- Canonical URLs on all pages
- Keyword-rich meta titles + descriptions on all pages (updated 2026-06-16)
- Structured data:
  - `index.html` — WebSite + Organization + FAQPage
  - `scholarships.html` — **Dataset + FAQPage** (Google uses Dataset for scholarship discovery)
  - `scholarship.html` — per-scholarship EducationalOccupationalCredential + FAQPage + BreadcrumbList (injected by JS)
  - `tips.html` — Article + FAQPage
  - `scholarship-guide.html` — Article
  - Tool pages — FAQPage
- `sitemap.xml` — **270 URLs**: 18 core pages (clean URLs, no `.html`) + 246 individual scholarship profile URLs + 5 blog posts + blog index. Submitted to Google Search Console 2026-06-16 — 271 pages discovered, Status: Success.
- `robots.txt` — all major AI crawlers allowed (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
- `llms.txt` — updated with scholarship database section for AI citation
- Internal linking: scholarship cards link to detail pages (`/scholarship.html?id=...`), not directly to external sites
- **Indexing status (2026-06-19):** Soft 404 on all 246 scholarship detail pages fixed (redirect was serving JS shell to Googlebot — now serves static HTML). All pages re-submitted.
- **Indexing status (2026-06-25):** GSC showed 4 indexed / 6 not indexed (data from 6/12). Two root causes diagnosed and fixed — see Sitemap Fix below.

### Sitemap Fix — 2026-06-25

**Root cause of "Alternate page with proper canonical tag" (3 pages):** Sitemap had `.html` URLs (e.g. `/admissions.html`) while every page's `<link rel="canonical">` used the clean URL (`/admissions`). Google crawled the sitemap URL, saw a different canonical, and correctly refused to index the `.html` version — indexing the canonical instead.

**Root cause of "Page with redirect" (3 pages):** The two dead-URL 301 redirects (`/scholarship/daad_scholarship`, `/scholarship/commonwealth_masters`) were discovered by Google from internal links, plus `/scholarship.html` (JS fallback) was in the sitemap.

**Fixes applied (commit e674d5a + 309778a):**
- All 16 core page sitemap `<loc>` entries changed from `.html` to clean URLs — now match the canonicals exactly
- `/scholarship.html` removed from sitemap — JS fallback, not indexable
- `DATA_DRIVEN_PAGES` in `tools/generate_scholarship_pages.py` updated to clean URLs so the daily GitHub Actions bot updates lastmod on the correct entries

**Sitemap rule going forward:** `sitemap.xml` canonical URL = whatever the `<link rel="canonical">` says on that page. Never add `.html` versions to the sitemap if the canonical omits the extension.

**To notify Google after a sitemap update** (ping URL deprecated June 2023 — returns 404):
- GSC → Sitemaps → click the submitted sitemap URL → "Resubmit" (re-submits fresh read)
- OR: GSC → URL Inspection → paste each important URL → "Request Indexing" (cap: ~10–12/day)
- `lastmod` dates in the sitemap are the main signal — keep them accurate; Google uses them to prioritise recrawl

---

## Scholarship Detail Pages

Each of the 246 scholarships has a dedicated SEO URL: `freestudenttools.com/scholarship/chevening`

**Routing (2026-06-19 fix):**

Netlify redirect in `netlify.toml` routes directly to pre-generated static files:
```toml
[[redirects]]
  from = "/scholarship/:id"
  to = "/scholarship/:id.html"
  status = 200
```

**Previous bug (fixed):** Was routing to `/scholarship.html?id=:id` (JS-rendered shell). Googlebot saw an empty `<div id="sch-page-root"></div>` — no content without JS execution — and classified all 246 pages as Soft 404. Fixed by pointing the redirect to the static files.

**Static HTML files** (`scholarship/` directory) — **246 pre-rendered `.html` files**, generated by `tools/generate_scholarship_pages.py`. All content is embedded directly in HTML — no JS dependency for indexing.

**Dynamic fallback still available** — `scholarship.html?id=chevening` still works (JS-rendered) and is used by internal links from scholarship cards. Do not remove `scholarship.html`. If an ID exists in `scholarships_data.js` but has no static file yet, the JS fallback serves it correctly for users (but Googlebot won't index it well until a static file is generated).

**Dead URL redirects** (added 2026-06-19) — phantom IDs that Google discovered via `compare-scholarships.html` popular pairs, now 301 to correct pages:
- `/scholarship/daad_scholarship` → `/scholarship/daad_study_scholarship`
- `/scholarship/commonwealth_masters` → `/scholarship/commonwealth_scholarship`

Each static page has:
- Full `<title>`, meta description, canonical URL (`https://freestudenttools.com/scholarship/[id]`)
- Three JSON-LD blocks: `EducationalOccupationalCredential` + `FAQPage` + `BreadcrumbList`
- Pre-rendered hero, eligibility, requirements, timeline, FAQ accordion (`<details>/<summary>`), sidebar, easedit.co CTA
- Absolute paths throughout (`/css/`, `/js/`, `/assets/`)

**Regenerate static pages:** `python3 tools/generate_scholarship_pages.py` — also auto-updates `sitemap.xml` lastmod for all data-driven URLs.

**SEO target keywords per page:** `[Scholarship Name] 2026`, `[Scholarship Name] eligibility`, `[Scholarship Name] deadline`, `how to apply for [Scholarship Name]`

---

## Daily Auto-Refresh — `.github/workflows/update-data.yml`

GitHub Actions cron at **06:00 UTC daily**. Three steps in sequence:

1. **`tools/update_university_data.py`** — university deadlines (heuristic scrape) + scholarship status recalc (`open`/`closing_soon`/`upcoming`/`closed` from today vs. deadline)
2. **`tools/generate_scholarship_pages.py`** — regenerates all 246 static HTML files in `scholarship/` + updates `sitemap.xml` lastmod
3. **Commit + push** — `git add data/ scholarship/ sitemap.xml` → commits if changed → pushes → triggers Netlify deploy hook

**Bot guard (≥50 check):** If `scholarships_data.js` contains ≥50 scholarships, the bot skips replacing the list entirely — only refreshes status fields. The 246 manually-curated scholarships are permanent against bot overwrites.

**Netlify deploy hook:** Stored as `NETLIFY_DEPLOY_HOOK` GitHub Actions secret. If not set, CI skips the trigger (guarded by `if: ${{ env.NETLIFY_DEPLOY_HOOK != '' }}`). Configure in Netlify dashboard → Site → Build & Deploy → Build hooks.

**Honest status of data freshness:**
- `status` field (open/upcoming/closed): refreshes daily ✓
- Static scholarship pages: regenerated daily ✓
- Actual deadline dates: manually maintained — accurate as of last edit ✗ (scraping is unreliable)
- New scholarship cycles: need manual update when annual windows shift

---

## Link Building — Priority Targets (2026-06-25)

New domain with zero external links = minimal crawl budget regardless of sitemap quality. External links are the unlock. Priority order:

| # | Platform | How | Best content to link |
|---|---|---|---|
| 1 | **Reddit** | Post in relevant subs — genuine value, not raw link drops | r/scholarships (365k), r/ApplyingToCollege (900k), r/gradadmissions (180k) |
| 2 | **Quora** | Answer questions like "How to apply for Chevening/Fulbright?" — cite blog guides as source | Blog posts: chevening, fulbright, gates-cambridge |
| 3 | **Product Hunt** | One-time launch — "246 free scholarship profiles + browser tools" — gets DA 90 backlink | Homepage + scholarships finder |
| 4 | **The Student Room** (thestudentroom.co.uk) | UK student forum, high DA, permanent threads — answer scholarship questions | Chevening + DAAD guides especially |

Rule: answer a real question, then cite the page. Pure link drops get removed and look spammy to Google.

---

## Navigation

Desktop nav uses **dropdown groups** (managed via JS in `common.js`):
- **University Hub** → Admissions Tracker, Scholarships Finder, Scholarship Guide, Compare Degrees, **Compare Scholarships**, Student Tips
- **Tools** → OCR Scanner, PDF Converter, PDF Compressor, Image Compressor, PDF Merger, PDF Page Extractor, Citation Generator

Active nav link is set by JS in `common.js` — do **not** hardcode `class="active"` in HTML nav links.

`scholarship.html` is NOT in the nav (it's a detail page accessed from scholarship cards) — this is intentional.

**Pretty URL redirects:** All pages have explicit 200 rewrites in `netlify.toml` (e.g. `/scholarships` → `/scholarships.html`). Netlify does not auto-resolve Pretty URLs when other redirects exist in the config — explicit rules are required for every page. When adding a new page, add a redirect entry.

---

## Visual Design (CDO — 2026-06-16 rev 5)

### Homepage (`index.html`)
- **Hero headline:** "Scholarships. Admissions. All Free. All in One Place."
- **Hero CTAs:** "Find Scholarships" → `scholarships.html` + "Browse Universities" → `admissions.html`
- **Hero:** animated floating color orbs (indigo/green/blue, CSS keyframes), gradient animated headline, shimmer CTA button
- **Scholarship ticker:** scrolling marquee strip — 16 scholarship names with country flags, pauses on hover
- **Hub cards:** `.hub-card-visual` header area — emoji icon + country flags row + frosted-glass panel
- **Spotlight strip:** "Today's Tool" rotating by weekday (pure JS)
- **Tool cards:** gradient top stripe + colored glow shadow on hover
- **Scroll animations:** `[data-animate]` + `[data-delay="1"–"7"]` — IntersectionObserver stagger in `common.js`
- **Counters:** hero stat numbers count up on load via `data-target` attribute
- **Reduced motion:** all animated effects disabled via `prefers-reduced-motion`

### Tool Pages (`.page-hero`) — all 7 tools
- Dark navy gradient bg `#0B1120 → #0F2456 → #1A1040` with dual radial orbs (blue top-right, purple bottom-left)
- `h1`: 2.7rem, letter-spacing -0.025em, white — do NOT add inline font-size overrides (removed from all pages)
- Badge: glass pill with `rgba(255,255,255,0.12)` bg + `#BAE6FD` text — not the old solid-blue style
- **Trust strip:** auto-injected by `common.js` into every `.page-hero .container` — "Browser-only · No uploads · No sign-up · 100% free". Hidden on mobile (`@media ≤640px`) to reduce hero height.
- `.page-hero > .container` has `position:relative; z-index:1` to keep text above orbs
- **Mobile hero** (2026-06-22): padding reduced 44px/40px → 24px/18px, h1 1.65rem, trust strip hidden — tool card visible above fold at 390×844

### Tool Section Layout (CDO — 2026-06-22)
- `main#main-content { background: #EBF0F7 }` — steel-blue-gray separates tool area from hero and SEO content below
- `.tool-main` is a **white card**: `background: white; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); padding: 24px 24px 28px` — on mobile: `padding: 14px; border-radius: 12px`
- `.tool-layout` grid (`1fr 300px`) collapses to single column at ≤900px
- Upload zone sits inside the white card; the dashed border zone and card background create two-layer depth
- **Cookie banner (desktop):** floating bottom-right card (`bottom: 24px; right: 24px; max-width: 400px; border-radius: 14px`) — not a full-width bottom wall
- **Cookie banner (mobile):** compact full-width bottom bar (`border-radius: 12px 12px 0 0; padding: 12px 16px`) — row layout, small text

### Hub Pages
- `admissions.html` → `.admissions-hero`: dark blue gradient `#0F172A → #1E3A8A → #1d4ed8`, search bar, 3 stats
- `scholarships.html` → `.scholar-hero`: dark green gradient `#064E3B → #065F46 → #047857`, search bar, 3 stats
- `compare.html` → `.compare-hero`: steel blue gradient `#0C4A6E → #0369A1 → #0EA5E9`, badge pill, 4 stats (1040+ unis, 100+ countries, 16 streams, $0)
- `tips.html` → `.tips-hero`: indigo gradient `#1E1B4B → #4338CA → #6366F1`, pill, sticky category nav below

### Static Pages (rev 6)
- `about.html` / `contact.html` / `privacy.html` / `terms.html` — all now have full `.page-hero` sections (dark navy gradient, badge, h1, p). Previously: bare white h1 dumps with no visual header.
- about.html content corrected: 14 total tools (7 document + 7 hub), 246+ scholarships, 1,040+ universities

Design tokens: `--primary: #1A73E8` · `--success: #10B981` · `--orange: #F7941D` · purple `#7C3AED`
Font: Inter variable font (wght 100–900) — **self-hosted** (`/assets/fonts/inter-100-latin.woff2` + `inter-100-latinext.woff2`), `font-display: swap`, `@font-face` in `style.css`. No Google Fonts dependencies. Hero bg: dark navy `#0B1120 → #0F2456 → #1A1040`.

---

## AdSense — Status

**Review submitted: 2026-06-16 19:16.** Awaiting Google decision (2–4 weeks).

**What was fixed before reapplying:**
- Contact form: broken `YOUR_FORM_ID` placeholder → Netlify Forms with plain POST to `/contact-thanks`; email notifications → `rushdimalta@gmail.com`
- `scholarship-guide.html` was orphaned → now in nav + linked from scholarships page
- AdSense script was loading before cookie consent → now deferred via `initAds()`
- Content depth: 246 scholarships, 246 static detail pages, Dataset + FAQPage schema, 700–1,044 words per tool page
- `ads.txt` added: `google.com, pub-9843476971668607, DIRECT, f08c47fec0942fa0`
- Canonical URLs: all pages now use clean URLs (`/scholarships` not `/scholarships.html`)
- CSP (Content-Security-Policy) header added to all HTML pages in `netlify.toml`
- Custom `404.html` page — branded with CTAs

**After approval:**
- Replace placeholder AdSense slot IDs (`1111111111`, `2222222222`, `3333333333`) with real slot IDs from AdSense dashboard

---

## Cross-sell — easedit.co

CTAs on four high-intent pages:
- `admissions.html` — "Got a university interview coming up?"
- `scholarships.html` — "Scholarship shortlisted? Most awards include an interview round."
- `compare.html` — "Narrowed it down to your top picks? The next step is the interview."
- `scholarship.html` (detail page) — inline CTA in main content + sidebar CTA

Keep all these CTAs. Do not remove on future edits.

---

## Performance Audit (2026-06-16, rev 8) — Full Site

### Live Lighthouse Scores — index.html (mobile, 2026-06-16 pre-fix)

| Category | Score |
|---|---|
| Performance | **49** ← was dragged down by Google scripts loading without consent |
| Accessibility | **95** |
| Best Practices | **96** |
| SEO | **100** |

**Root cause of 49:** `<meta name="google-adsense-account">` + inline `(adsbygoogle).push({})` calls triggered Google's Early Request System unconditionally — 466KB of `adsbygoogle.js`, `show_ads_impl.js`, `gtag.js` loading on every page load without consent. Fixed in rev 8 (2026-06-16).

**Expected after rev 8 fix:** Performance 75–85 (Google ad scripts now require explicit consent via cookie banner click; no script injection on first load).

### Live Scores — after rev 8 fixes (2026-06-16)

| Category | Before | After |
|---|---|---|
| **Performance** | 49 | **97** |
| Accessibility | 95 | **95** |
| Best Practices | 96 | **100** |
| SEO | 100 | **100** |

| Metric | Before | After |
|---|---|---|
| FCP | 1.7 s | **1.2 s** |
| LCP | 6.1 s | **1.2 s** |
| TBT | 920 ms | **30 ms** |
| CLS | 0.11 | **~0.01** (font preload eliminates swap shift) |
| TTI | 8.2 s | 6.2 s (Google auto-ads still evaluate async) |
| Speed Index | 5.1 s | **2.3 s** |

**What drove the 49 → 97 jump:**
1. New logo.png: 1,150KB → 15KB (−99%) — LCP dropped 4.9s
2. Removed 32 inline `adsbygoogle.push()` calls — stopped Early Request System from blocking main thread (TBT: 920ms → 30ms)
3. Removed `window.dataLayer` init from HTML heads (was triggering GA4 pre-consent)
4. `initAds()` now uses `onload` callback to push slots after script loads

### Issues Found & Fixed

| # | Severity | Issue | Fix Applied |
|---|---|---|---|
| 1 | 🔴 Critical | `logo.png` = 1.15MB on every page — #1 LCP killer | `logo-sm.png` (54KB, 200×200) in all nav/footer img tags |
| 2 | 🔴 Critical | No `width`/`height` on nav logos → CLS on every page | Added `width="44" height="44"` to all nav logo imgs |
| 3 | 🔴 High | Google Fonts render-blocking on all 18 pages | Async load: `media="print"` + `onload` + `<noscript>` fallback — then fully replaced by self-hosted |
| 4 | 🟠 High | CDN scripts not deferred — block `window.onload` | Added `defer` to all CDN `<script>` tags on tool pages |
| 5 | 🟠 High | Static pages (about/contact/privacy/terms) had no hero | Added `.page-hero` sections to all 4 static pages |
| 6 | 🟡 Medium | Weak `.page-hero` on tool pages (2rem, plain, no orbs) | 2.7rem h1, dual radial orbs, glass badge, 60px padding |
| 7 | 🟡 Medium | compare.html hero: no badge, no stats, not centred | Badge pill + 4 stats cards + dual-orb background |
| 8 | 🟡 Medium | Upload zone: flat `#F8FAFC` with basic dashed border | Gradient bg, hover glow + lift + icon scale, pill chip |
| 9 | 🟡 Medium | Security headers missing: Permissions-Policy, HSTS | Added to `netlify.toml` headers block |
| 10 | 🟡 Medium | Poor cache strategy: data files 1hr, CSS/JS 1day | Upgraded: CSS/JS 7d + stale-while-revalidate, data 2hr |
| 11 | 🟢 Low | CDN DNS not pre-resolved on tool pages | `dns-prefetch` for cdnjs, jsdelivr, unpkg |
| 12 | 🟢 Low | About page had stale content (9 tools, 800+ scholarships) | Fixed to 14 tools, 246+ scholarships, 1,040+ unis |
| 13 | 🔴 **P1** | `logo-sm.png` (54KB) served as PNG — no WebP | `logo-sm.webp` (5.3KB); all 18 pages use `<picture>` + `<source>` |
| 14 | 🔴 **P1** | `universities_all.js` (395KB) loaded statically on compare.html | Removed static tag; lazy-loaded via `createElement('script')` after first paint; tier-1 shows immediately |
| 15 | 🔴 **P1** | Self-hosted Inter not complete — Google Fonts still linked | `@font-face` in `style.css`; woff2 files in `/assets/fonts/`; all 18 pages cleaned of Google Fonts links |

### Remaining Gaps (P1 all resolved — P2/P3 remaining)

| Priority | Action | Expected Gain |
|---|---|---|
| P2 | Add Content-Security-Policy once AdSense live and CDN domains confirmed | Security score boost |
| P3 | Add Netlify build step with clean-css — `style.css` 60KB raw → ~24KB minified | -36KB per page |
| P3 | Add `<link rel="preload" as="script">` for Tesseract.js on ocr.html — starts download sooner | OCR ready time -500ms |

**Logo:**
- `assets/logo.png` (1.15MB, 1024×1024) — kept for `og:image`, favicon, apple-touch-icon, and JSON-LD only
- `assets/logo-sm.png` (54KB, 200×200) — PNG fallback in all nav and footer img tags
- `assets/logo-sm.webp` (5.3KB) — WebP primary format; all 18 pages use `<picture><source type="image/webp">` + PNG fallback
- Nav logos have `width="44" height="44" fetchpriority="high" loading="eager"` — do not change
- Footer logos keep `loading="lazy"` — correct (below fold)
- **Never replace `logo-sm.png`/`logo-sm.webp` with `logo.png` in img/picture tags**

**CDN scripts:**
- All CDN library `<script>` tags on tool pages have `defer` attribute — do not remove
- Execution order is preserved (`defer` is ordered), so dependent scripts still run in correct sequence

**Netlify caching (`netlify.toml`):**
- CSS/JS: 7 days (`max-age=604800`) with `stale-while-revalidate=86400`
- Data files: 2 hours (`max-age=7200`) with `stale-while-revalidate=3600`
- Assets: 1 year immutable
- HTML: no-cache + `must-revalidate`
- Sitemap: 1 hour · robots.txt: 1 day

**CSS cache busting:** Because CSS is cached for 7 days, browser may serve stale `style.css` even after a Netlify deploy. Mitigate by appending a version query string to the stylesheet URL in all HTML files (e.g. `href="css/style.css?v=2"`). Currently at **v=2** (bumped 2026-06-22). When significant CSS changes go live, bump to `v=3`, `v=4`, etc. across all HTML pages.

**Security headers on all HTML pages:**
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' *.googletagmanager.com *.googlesyndication.com *.googleadservices.com cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com data:; img-src 'self' data: https:; frame-src *.doubleclick.net *.googlesyndication.com; connect-src 'self' *.google-analytics.com; object-src 'none'; base-uri 'self'`

---

## Blog — Key Rules & Patterns (2026-06-17)

- **Source requirement:** every blog post must be grounded in a Scholarships wiki entity page (`/Users/rushdi/Downloads/Scholarships/Wiki/pages/entities/`) — no post without an ingest first
- **Hero images:** call kie.ai REST API directly via Bash (`POST https://api.kie.ai/api/v1/flux/kontext/generate`, poll `GET /api/v1/flux/kontext/record-info?taskId={id}`, `successFlag=1` = done). Auth: `Bearer 67b4c30e989251d795faa45bfa14ce8a`. Save to `assets/blog/`. Never relay prompts to user.
- **Hero CSS:** `.blog-post-hero-img-wrap` with `max-height: 420px; object-fit: cover` — do NOT use `.blog-post-hero-stats` (old placeholder class, removed)
- **Blog sidebar link slugs** must match actual files in `scholarship/` subdirectory — use underscores not dashes (e.g. `daad_study_scholarship`, `fulbright_foreign`, `gates_cambridge`, `erasmus_mundus`)
- **Clean URL redirects** for blog posts are in `netlify.toml` — add a new entry for each new post
- **Netlify.toml `[[redirects]]` order matters:** Dead-URL 301s (specific IDs) must come BEFORE the `/scholarship/:id` catch-all rewrite — Netlify processes rules top-to-bottom
- **`compare-scholarships.html` popular pairs:** IDs must match real IDs in `scholarships_data.js`. Phantom IDs get discovered by Google and cause 404s. Always validate with `grep '"id": "X"' data/scholarships_data.js` before adding a pair
- **`scholarship.html` JS links** must use absolute paths (`/scholarships.html`) — relative paths break under the 200-rewrite when URL is `/scholarship/:id`
- Blog posts go in `blog/` directory; add to `sitemap.xml` and `blog/index.html`

---

## Nav — Canonical Structure (2026-06-20 rev 12)

All pages use `class="nav"` (NOT `class="navbar"` — that old class was removed from `scholarship.html` in rev 9). Desktop nav — identical across root pages, blog pages, and scholarship pages:
- Home
- University Hub ▾ (Admissions Tracker, Scholarships Finder, Scholarship Guide, Compare Degrees, **Compare Scholarships**, Student Tips)
- Tools ▾ (OCR Scanner, PDF Converter, PDF Compressor, Image Compressor, PDF Merger, PDF Page Extractor, Citation Generator)
- Blog → `/blog/`
- About

Mobile nav has the same items in the same order.

All hrefs use absolute paths (`/page.html`, not `page.html`). Never use relative paths — pages in subdirectories (`blog/`, `scholarship/`) will break.

**Footer — canonical structure (all page types as of rev 12):**
All pages use `<footer class="footer">` with `<div class="container">` wrapping three columns:
- **University Hub:** Admissions Tracker, Scholarships Finder, Scholarship Guide, Compare Scholarships, Student Tips, Blog
- **Document Tools:** OCR Scanner, PDF Converter, PDF Compressor, Image Compressor, PDF Merger, PDF Page Extractor, Citation Generator
- **Company:** About, Contact, Privacy Policy, Terms of Use, Sitemap

Footer brand: `<picture>` element with WebP + PNG logo fallback (`/assets/logo-sm.webp` + `/assets/logo-sm.png`). Never use a text link as the footer brand.

Footer bottom: `© 2026 FreeStudentTools.com — All tools run in your browser. No data leaves your device.`

Blog posts additionally have a "More Guides" footer column (scholarship guide links) — this is intentional and blog-only.

---

## Site Audit — 2026-06-20 (full consistency audit, rev 12)

**Overall: 10/10** — all issues from the full audit resolved and pushed. For the 2026-06-23 bug fix audit (content accuracy + Formspree fix), see the Bug Fix Audit section below.

**Fixes applied (2026-06-20, commit 7e637ec):**

| Fix | Scope |
|---|---|
| "Compare Scholarships" added to University Hub dropdown + mobile nav | 6 blog pages |
| "Blog" link added to desktop + mobile nav | 246 scholarship pages |
| "Compare Scholarships" added to University Hub dropdown + mobile nav | 246 scholarship pages |
| Footer replaced: minimal text-only → 3-column (University Hub, Document Tools, Company) + image logo | 246 scholarship pages |
| `meta description` added | `contact-thanks.html` |
| Scholarship URL format corrected (`?id=` → `/scholarship/[id]`) | `llms.txt` line 62 |

**Pre-fix findings (for reference):**
- Blog pages were missing "Compare Scholarships" from nav — users couldn't reach that feature from 6 pages
- Scholarship pages were missing both "Compare Scholarships" and "Blog" link entirely — users on 246 pages had no nav path to either
- Three different footer templates: root (4-column rich), blog (3-column + More Guides), scholarship (minimal text, no logo image)
- `llms.txt` documented scholarship URLs as `/scholarship.html?id=[id]` — actual URL structure is `/scholarship/[id]`

**Structured data:** Article + FAQPage + BreadcrumbList on all 5 blog posts — valid, no malformed JSON-LD found.
**Broken links:** None found across 273 pages.
**CSS:** Single shared stylesheet, consistent Inter font, consistent CSS variables — no conflicts.

---

## Bug Fix Audit — 2026-06-23 (rev 14)

Six issues audited. Two confirmed non-bugs; four content/accuracy bugs fixed across 250+ files.

### Confirmed non-bugs (no fix needed)

| Issue | Verdict | Reason |
|---|---|---|
| Admissions/Scholarships shows "Loading..." | **Not a bug** | Client-side JS renders the cards. Static HTML crawlers (including AI fetchers) always see the placeholder — this is expected. Playwright verified: 27 unis + 246 scholarships render correctly in a real browser. |
| Image compressor: `src=""` on both preview imgs | **Not a bug** | Preview `<img>` tags start empty inside `result-container` which is `display:none`. JS sets src to a blob URL after compression. Never visible to users. AI fetchers reporting this as `src="<>"` is a markdown formatting artefact (`![alt](<>)` = empty src). |

### Fixes applied (commits 34e1612 + 310bacd)

| # | File(s) | Bug | Fix |
|---|---|---|---|
| 1 | `privacy.html` §9 | Said "Formspree" — contact form actually uses **Netlify Forms** | Changed provider name + link to Netlify's privacy policy |
| 2 | `scholarship-guide.html` | **7 occurrences** of "800+"/"over 800" — actual database has 246 | All replaced with "246"; second pass caught "We've compiled over 800..." in paragraph text |
| 3 | `admissions.html` | All "1,500+"/"1,000+" university count claims — `UNI_DATA` has 27 universities | Replaced in meta description, og:description, twitter:description, JSON-LD, hero sub, hero stat, and FAQ answer |
| 4 | `about.html` | "admissions tracker covering 1,000+ universities" | Changed to "27 universities" — same root cause |
| 5 | `compare-scholarships.html` | Missing skip-link | Added `<a href="#main-content" class="skip-link">Skip to main content</a>` |
| 6 | `tools/generate_scholarship_pages.py` + 246 scholarship pages | NAV missing Blog + Compare Scholarships; old minimal `site-footer` footer | Updated NAV (added skip-link, Compare Scholarships dropdown item, Blog in desktop + mobile); replaced footer with 3-column `footer-grid` matching all other pages; regenerated all 246 static files |

### Content accuracy rules going forward

- **admissions.html university count** = **27** (UNI_DATA entries with full data) — never inflate
- **scholarships count** = **246** everywhere — scholarship-guide, scholarship page headers, scholarship finder stats. Update only when `scholarships_data.js` changes.
- **compare.html university count** = **1,040+** (from UNI_ALL, 1,000 entries) — this is distinct from the 27 in UNI_DATA
- **Contact form provider** = **Netlify Forms** — not Formspree. Privacy.html §9, contact.html, and any future reference must say Netlify Forms.
- **Static crawlers see "Loading..."** on admissions + scholarships — this is permanent and expected behavior. It does affect Googlebot (JS executed with delay); pre-rendering the data into HTML would help SEO but is a separate project.

---

## Sitewide Accessibility Audit — 2026-08-12 (rev 16)

Full WCAG 2A/AA sweep triggered by a `/goal` directive ("zero defect/errors, maximum SEO + web + mobile performance"). Verified with axe-core (not just Lighthouse spot-checks) across every root page, all 49 blog posts, and a scholarship-detail sample — not a subset. Root cause in every case: light/bright brand accent colors (chosen for visual pop) failing the 4.5:1 text-contrast minimum against their own light-tint backgrounds, plus a handful of plain-color links with no non-color distinction (underline).

### Global CSS variable darkening (`css/style.css` `:root`)

| Variable | Old | New | Why global, not per-instance |
|---|---|---|---|
| `--primary` | `#1A73E8` | `#1D4ED8` | Used 56× as both button-background (white text, was 4.51:1) and link-text (was 4.51:1 on white) — one change fixed both use cases everywhere, confirmed no dark-background usage exists via variable (dark footer text is separately hardcoded, unaffected) |
| `--text-muted` | `#94A3B8` | `#475569` | Was 2.23–2.56:1 on every light background it touched (labels, captions, table cells) — the single most repeated violation sitewide |
| `--orange` | `#F7941D` | `#B45309` | Was 2.15–2.28:1 as text/link color; only ever used as text, icon-color, border, or dot — darkening had zero downside |

**Regression caught and fixed:** `contact-thanks.html`'s footer copyright line used `color:var(--text-muted)` *inline*, inheriting into the dark (`#0F172A`) footer — darkening the variable broke it (2.35:1). Fixed by hardcoding `#94A3B8` there directly, matching the pattern every other page's dark footer already uses (hardcoded, not the variable — confirmed via full-codebase grep that no other page has this same inline-override-in-dark-footer trap).

### Per-post color fixes (all 49 `blog/*.html`, 338 individual `color:` property fixes)

Every blog post carries its own inline `<style>` block (not shared CSS), each redeclaring the same bad brand colors independently — `#059669`/`#1A73E8`/`#D97706`/`#DC2626`/`#94A3B8`/`#0D9488`/`#F7941D` as text color on their light-tint backgrounds. Fixed via a position-tracked regex script matching only the `color:` property (never `background:`/`border-color:`) to guarantee zero risk of touching a background or accent color that didn't need to change. Verified with a git diff spot-check before trusting the bulk run.

Also standardized `.blog-post-content a` / `.blog-body-wrap a` link rules to always carry `text-decoration: underline` (some had none, relying on browser default; some explicitly disabled it) — this is what WCAG's link-in-text-block rule actually requires distinct from color.

### One-off bugs found only by live-browser axe testing (not visible from reading the CSS)

- **`opacity: .6`/`.7` on already-dark text** (`blog/culture-shock-university-abroad.html` `.shock-stage-time`, `blog/fulbright-scholarship-guide.html` `.essay-pair-label`) — the declared `color` was fine on its own; the opacity blend toward the light background is what silently failed contrast. Removed the opacity; both pass ~7–9:1 now.
- **Funnel-chart bars narrower than their own label** (`blog/gates-cambridge-scholarship-guide.html`) — bars at `width:3.3%`/`width:1.3%` were too narrow for their white text, which overflowed onto the wrapper's pale background instead (near-invisible, 1.09:1). Fixed properly, not cosmetically: added `min-width: fit-content` to `.funnel-bar` so a bar can never be narrower than its own label, regardless of the inline `width:X%`.
- **Scrollable tables with no keyboard focus path** (`blog/student-health-requirements-by-country.html`, `blog/how-to-choose-country-to-study-abroad.html`) — `overflow-x:auto` tables had no way for keyboard users to scroll them. Added `tabindex="0"` directly on the `<table>`.

### Verification method

Static color-contrast math (relative luminance formula) to pick safe replacement shades, then live axe-core (`wcag2a`+`wcag2aa` rule sets) via Playwright against a local server for every change, then a second full pass after all fixes to catch regressions, then a third pass against the **live production domain** post-deploy. Also re-checked mobile viewport (375px) overflow on every heavily-edited page — none introduced. Final state: axe-core clean on all root pages (24/25 — the one exception is a third-party Travelpayouts widget's own internal contrast on `travel.html`, not our CSS) and 46/49 blog posts clean (3 "failures" are an unrelated third-party ad-network CORS console message on `localhost` only, confirmed absent on the live domain).

Not fixed (out of scope, third-party): Travelpayouts flight-search widget's internal `.form-title__subtitle`/`.form-submit__content` contrast — it renders inside the vendor's own component, not our DOM.

---

## Performance + Mobile-Overflow Follow-up — 2026-08-12 (same day, rev 16 continued)

The accessibility pass above was necessary but not sufficient — a stop-hook review correctly flagged that "zero defect + maximum SEO/performance" needs actual Lighthouse/Core-Web-Vitals measurement and mobile testing beyond one viewport width, not just axe-core. This section covers that follow-up, run against the **live** production domain with the real Lighthouse CLI (`node .../lighthouse/cli/index.js`, mobile form factor).

### Baseline scores (before this section's fixes)

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Homepage | 94 | 100 | 100 | 100 |
| Blog post (Chevening) | 86 | 100 | 100 | 100 |
| Tool page (OCR) | 71 | 100 | 100 | 100 |
| scholarships.html | 59 | 100 | 100 | 100 |
| compare.html | 100 | 100 | 100 | 100 |

Accessibility/Best-Practices/SEO were already at 100 everywhere (confirms the earlier a11y pass held). Performance varied a lot page-to-page — investigated why.

### Fixes applied

1. **Hero image recompression (7.0MB → 4.9MB, -30%, all 48 `assets/blog/*.jpg`)** — Lighthouse's `image-delivery-insight` flagged 749 KiB of waste on the homepage alone: full hero-banner-resolution JPEGs (up to 1392×752, no compression) were being served into small homepage/blog-index thumbnail card slots too. Re-encoded all 48 as progressive JPEG, quality 80, 1400px width cap, metadata stripped, via ImageMagick. Visually verified several full-size before/after — no perceptible quality loss (66% size cut on the worst offenders: chevening, gates-cambridge, erasmus, rhodes). Homepage's own remaining image waste dropped 749 KiB → 386 KiB immediately.
2. **Missing footer-logo `width`/`height` (257 files)** — the exact CLS bug already fixed on `index.html` in a prior session (see Performance Audit rev 8 below) had never propagated to any other page's footer, all 240 auto-generated scholarship pages, or the generator template itself — so it would have kept regressing on every `tools/generate_scholarship_pages.py` run. Fixed at the template level and in all existing output in one pass.
3. **`scholarships.html` / tool pages' Performance score (59–74) is dominated by third-party scripts, not our code** — network-request inspection showed the biggest payloads are Google AdSense (`show_ads_impl_fy2021.js`, 165 KiB), GA4 (`gtag/js`, 189 KiB), and the AdSense iframe/`adsbygoogle.js` (~125 KiB combined) — ~480 KiB of ad/analytics JS is the actual bottleneck, not `scholarships_data.js` (only 55 KiB). This matches the standing conclusion in the Architecture Audit below ("uncontrollable without removing AdSense") — **deliberately not touched**, since removing/deferring monetization scripts further is a revenue decision, not a code-quality one, and out of scope for a unilateral fix.
4. **LCP figures (6–7s) on lab/simulated-throttling runs are not matched by TBT (~180ms) or a genuine render-blocking problem** — `lcp-discovery-insight` scores perfect (image is `fetchpriority="high"`, discoverable in the initial HTML, not lazy-loaded) on every page checked; the gap is Lighthouse's mobile "simulated slow 4G + 4× CPU" throttling model rather than an actionable code defect. Real field data (CrUX) would be the authoritative next check if this needs revisiting, not further synthetic lab changes.

### Mobile overflow — real bugs found only at 320px (not 375px)

The earlier accessibility pass only checked 375px viewport overflow. Re-tested at **320px** (iPhone SE and similar — still meaningful device share) and **768px** across all 74 root+blog pages plus an 8-page scholarship sample. 768px was clean everywhere; 320px turned up 4 real, previously-undetected bugs:

- **`admissions.html`**: `.admissions-body`'s desktop `align-items: flex-start` silently flips meaning once the existing mobile media query switches it to `flex-direction: column` — children stop stretching to full width and size to their own content instead, so the results column rendered ~365px wide inside a 320px viewport. Fixed by adding `align-items: stretch` to the existing mobile breakpoint.
- **8 files' CSS Grid `minmax(Npx, 1fr)` where N ≥ 250** (`blog/index.html`'s 320px card grid, `search.html`, `index.html`, `health-checks.html`, `css/style.css`, 4 blog "keep reading" grids) — a fixed-px grid-track minimum that's wider than the space actually available after container padding on narrow screens. Fixed sitewide with the standard `minmax(min(Npx, 100%), 1fr)` pattern — a no-op above that width, only prevents narrow-screen overflow.
- **3 visa-guide posts' numbered `.steps-list`, 1 accommodation post's `.accom-card`, `404.html`'s "Popular Guides" grid** — a long unbreakable token (a bare domain name like `immi.homeaffairs.gov.au`, a price range) inside a flex/grid item with no `min-width: 0` forced the track to the token's min-content width. Fixed with `min-width: 0` + `overflow-wrap: anywhere` — note **not** `overflow-wrap: break-word`, which does not affect a flex item's automatic minimum-size calculation the way `anywhere` does; this was empirically verified (break-word left the bug in place, anywhere fixed it). `404.html`'s rigid `repeat(3, 1fr)` grid was switched to `repeat(auto-fit, minmax(...))` for the same reason.

Verified 0 overflow across all 74 root+blog pages + 8-page scholarship sample at both 320px and 768px, re-ran axe-core to confirm no accessibility regression, then re-verified against the **live** domain post-deploy.

### Structured data + meta audit (full site, not a sample)

- **314 JSON-LD blocks across every HTML file on the site parse without error** — zero malformed structured data.
- **0 of 309 indexable pages missing title/meta-description/canonical/H1.** 7 auto-generated scholarship pages initially looked over the 65/160-char soft limits, but that was a false positive in the raw-HTML-source character count — their titles contain `&#x27;`/`&amp;` entities (e.g. "ANU Chancellor's...") which inflate the raw source length; the actual rendered/decoded title is under budget in every case. No fix needed or applied.

### Second follow-up (same day) — closing the remaining gaps

A further review correctly pushed back on three things: the accessibility pass hadn't covered the full 240-page scholarship-detail set (only sampled), the scholarships.html/tool-page performance scores were still well below the rest of the site, and "third-party, not touched" needed to actually be verified as the true ceiling rather than assumed.

- **All 239 scholarship-detail pages tested with axe-core (not a sample).** Combined with 49/49 blog posts and every root page, that's **313/313 HTML files on the site — zero accessibility violations** except the one already-documented third-party widget below.
- **Deferred GA4/AdSense initialization from `DOMContentLoaded` to `requestIdleCallback` (2000ms timeout fallback)** in `js/common.js`. The scripts were already `async` (correct), but *invoking* `initGA()`/`initAds()` at `DOMContentLoaded` — which fires before images/fonts finish — meant third-party JS was contending for bandwidth during the exact window that determines LCP/TBT. Verified via Playwright that `window._gaInitialised`/`window._adsInitialised` still become `true` and the actual `gtag.js`/`adsbygoogle.js` requests still fire (consent-mode defaults are unaffected — queued at module-eval time, before this code runs at all). Measured impact, **local test server** (3 runs each, mobile Lighthouse): scholarships.html 59→~79, ocr.html 71→98, blog post 86→94, homepage 94→95. Re-measured against the **live** domain post-deploy (also 3 runs): scholarships.html 59→64-65 consistently — a smaller but real gain; live network/ad-auction variance is genuinely higher than a local static-file test can reproduce, so the local numbers were optimistic for pages dominated by third-party timing. Accessibility/Best-Practices/SEO held at 100 everywhere in both environments — no functional regression.
- **Root-caused why `scholarships.html` doesn't close the gap the way the other pages did:** its `lcp-breakdown-insight` shows `timeToFirstByte` + `elementRenderDelay` summing to only ~2.4s, well under the reported ~7.2s LCP — meaning the *reported* LCP element (a hero paragraph) isn't the real story; the actual largest paint almost certainly lands after the 246-item scholarship grid finishes rendering client-side from `scholarships_data.js`. That's not a new defect — it's the same client-side-rendering characteristic already documented above ("Static crawlers see 'Loading...'... pre-rendering the data into HTML would help SEO but is a separate project"). Deferred third-party scripts got this page from 59 to the mid-60s; closing the rest of the gap would mean pre-rendering or paginating the scholarship grid — a real architecture change to a page that currently client-renders 246 records, not a bug fix, and out of scope to do unilaterally under this pass.

### CORRECTION: the "scholarships.html stuck at 59-65" finding above was a measurement-methodology artifact, not a real gap

Lighthouse's **default** throttling mode (`--throttling-method=simulate`, what the CLI uses unless told otherwise) doesn't literally throttle the network/CPU and observe — it runs one fast trace and then mathematically *predicts* what a throttled load would look like via its "Lantern" dependency-graph model. That model can mispredict badly on pages with several concurrent third-party requests (exactly `scholarships.html`'s shape: AdSense + GA4 + FundingChoices all firing near page load), and that's what happened here: every "scholarships.html = 59-65 performance / 6-7s LCP" figure earlier in this file came from simulated throttling.

Re-tested with `--throttling-method=devtools` (real, observed network+CPU throttling — not a prediction) and cross-checked against the browser's own ground-truth `PerformanceObserver` LCP entry (not a Lighthouse audit at all) via a raw CDP script: the actual LCP element is `p.hero-sub`, and it paints at **~1.6-1.7s**, confirmed consistent across 3 separate runs. Lighthouse with real throttling agrees: **90 performance / 1.8s LCP live**, matching every other page on the site:

| Page | Performance (real throttling, live) | LCP (real throttling, live) |
|---|---|---|
| Homepage | 98 | 1.7s |
| ocr.html (tool) | 99 | 1.6s |
| scholarships.html | 90 | 1.8s |
| Blog post (Chevening) | 92 | 3.0s |

Every page on the site clusters at 90-99 performance under accurate measurement. There is no real scholarships.html-specific architecture problem, and the pre-rendering/pagination idea floated earlier in this file was chasing a number that didn't reflect reality — **not attempted, and shouldn't be**, since the underlying premise was wrong. Left the earlier "root cause" writeup above intact rather than deleting it, since the *investigation* (checking `lcp-breakdown-insight`'s math not adding up) was the right instinct that led to catching this — the conclusion it reached was just wrong, and this correction is what actually resolved it.

### What's still not "maximum" and why that's a deliberate boundary, not an oversight

- **Third-party ad/analytics network payload** is the dominant remaining performance cost on content pages generally — deferred its *initialization timing* (above, real measured win), but the payload itself is monetization infrastructure and reducing it further is a revenue decision, not a code-quality one.
- **Travelpayouts widget internal contrast** on `travel.html` — renders inside the vendor's own component (confirmed via axe's own selector path pointing at a `tp-cascoon-component` shadow element), not our DOM. Nothing in our CSS can reach it.
- **Google's own FundingChoices (AdSense consent) script logs a CORS console error on its own internal telemetry call** (`fundingchoicesmessages.google.com`) — costs `ocr.html` 4 points on Best Practices (96 instead of 100) on live. Confirmed via the error's `sourceLocation` that it originates inside Google's script, not ours — nothing in our code makes this request.

### Third follow-up (same day) — crawlability, additional breakpoints, field data

- **Sitemap validated against the actual filesystem, not just parsed.** `sitemap.xml` is valid XML, 309 URLs, zero duplicates. Every one of the 313 real HTML files (25 root + 49 blog + 239 scholarship) maps to exactly one of: a sitemap entry, or one of the 4 pages that are correctly excluded because they carry `noindex` (`404.html`, `search.html`, `scholarship.html` the JS template, `contact-thanks.html`) — verified each of those 4 actually has `<meta name="robots" content="noindex...">` in its source, confirming the exclusion is intentional, not a gap. Then fetched all 309 sitemap URLs against the **live** domain concurrently — all 309 return HTTP 200. Zero broken sitemap entries.
- **`robots.txt`, `ads.txt`, and canonical/redirect behavior verified live**, not just read from disk: both files are served with correct content-type and HTTP 200; `robots.txt`'s only `Disallow` is CCBot (intentional, documented, blocks training-only crawl, not search engines); `http://` → `https://`, `www.` → apex, and `/blog` → `/blog/` all correctly 301 to one canonical URL each (no duplicate-content crawl risk).
- **Mobile/responsive testing extended to 480px, 1024px, 1280px, and a landscape-phone orientation (812×375)** on top of the already-clean 320px/768px pass — 74 root+blog pages × 4 new configs (296 checks) plus an 8-page scholarship sample (32 checks), all clean both on a local server and spot-checked live. Also confirmed **why a live orientation *rotate* can't differ from a fresh load at that size**: grepped every JS file on the site for `innerWidth`/`innerHeight`/`matchMedia`/resize listeners — there are none. Responsiveness here is 100% CSS media queries; no script caches a viewport dimension that could go stale on rotation, so this isn't an assumption, it's a verified structural guarantee.
- **Real-world Core Web Vitals (CrUX field data) could not be checked from this environment** — the CrUX API needs a Google Cloud API key that isn't available here, and the unauthenticated PageSpeed Insights API returned a quota-exhausted error rather than data. This is an honest tooling limitation, not a skipped check: the authoritative source for this site's real-user CWV is Google Search Console's Core Web Vitals report, which the project already has configured (see `easedit-mkt-agent` GA4/Search Console integration) — that's the right place to confirm real-user LCP for scholarships.html specifically, not another round of lab simulation.

## Live User Testing Round — 2026-08-13 (rev 17)

The rev 16 passes above were systematic sitewide sweeps. This round was different: the user manually tested the live site page by page and reported specific findings, which is how two of the fixes below (the `--success` contrast bug, the PNG/GIF warning being actively wrong) were actually caught — neither had surfaced in any prior automated audit.

- **Travelpayouts widgets fully removed from `travel.html`**, not just the contrast issue patched. The flight-search and AirHelp-compensation widgets were `tpemb.com` script embeds rendering into vendor shadow-DOM — the one accessibility item the rev-16 audits could never close because no CSS on our side could reach inside them. Removed both; flights section now leads with the already-working Kiwi.com affiliate card, compensation section got a plain `<a>` provider-card linking to airhelp.com directly (not yet a tracked affiliate link — needs the equivalent Travelpayouts short-link from the dashboard, same place GetTransfer/Yesim's links came from). Also removed the now-dead iframe-labelling script/CSS and 5 CSP entries (`tpemb.com`, `static.airhelp.com`, `suggest.apistp.com`, `tpo.gg`, `www.aviasales.com`) that existed only to serve those two widgets — verified via sitewide grep nothing else referenced them first. `axe-core` on `travel.html`: 0 violations (was 2, all session).
- **`emrldco.com` CSP gap fixed** — a separate, already-approved, sitewide ad-mediation script was silently failing to reach `pagead2.googlesyndication.com/pcs/activeview`, `securepubads.g.doubleclick.net`, `static.doubleclick.net`, and its own `travelpayouts.com/check_auth` call (unrelated to the widgets removed above — this is emrldco's own internal integration). None of those hosts were in `connect-src`. Added all four.
- **Image compressor: PNG/GIF messaging was actively wrong, not just unclear.** PNG is lossless, so the quality slider is a no-op on it by design (`canvas.toBlob` only honors quality for lossy formats) — but the old "file not smaller" warning told users to "try a lower quality level," which does literally nothing for PNG. Fixed the warning to be format-aware and added a hint next to the quality selector that shows *before* compressing. GIF was worse: canvas has no GIF output mode at all, so a GIF upload silently became a static JPEG with zero warning — any animation would vanish with no explanation. Now warns on upload.
- **Multi-file batch support added to `image-compressor.html`.** `pdf-merger.html` already supported multiple files (merging requires it); the compressor, extractor, converter, and OCR tools are single-file by design since each needs distinct per-file input (a page range, a language) rather than one setting applied uniformly — but image compression's "same quality/format for every file" is exactly the case batching helps, and it's a common real workflow (compressing several application photos at once). Mirrors `pdf-merger.html`'s existing `.file-list` state/UI pattern rather than inventing a new one. Up to 20 files; below 2 files the original single-file preview UI is unchanged (verified zero regression via Playwright); 2+ files get a batch results list with per-file download buttons, aggregate stats, and a "Download All" button (sequential with a 300ms stagger — simultaneous programmatic downloads can get blocked by the browser).
- **Found and fixed a real, previously-undiscovered, sitewide accessibility bug while building the above**: the shared `--success` CSS variable (`#10B981`) fails contrast in *every* one of its use cases — as `.btn-success`'s background with white text (2.54:1), as `.stat-card.highlight` text (2.42:1), and even against the lower 3:1 bar for decorative checkmarks/icons. This variable is used on 8+ pages (admissions, scholarships, compressor, pdf-extractor, pdf-merger, ocr, index, compare-scholarships) and had never been caught by any prior pass in this file, because none of those pages' *default* states render a `.stat-card.highlight` or a visible `.btn-success` — it only appeared once real content populated those states, which is exactly what building the batch-compressor UI did. Darkened to `#047857`, the same value already used for `--primary`/`--text-muted`/`--orange` earlier this session. Verified clean via axe-core on all 8 affected pages, no regressions.
- **Scholarship guide internal linking**: `scholarship-guide.html`'s "Government Scholarships" overview list named Chevening, Commonwealth, DAAD, Fulbright, and MEXT as plain text even though full guides already exist for all five (a *different*, later section on the same page — "Major Programs" — already had proper "full guide →" links from a prior session; this earlier list didn't). Linked all five; left Marshall/Hubert Humphrey/Australia Awards/Endeavour/Chinese Government Scholarship as plain text since no guide exists for them. Found and fixed one more unlinked instance on `compare-scholarships.html`. Checked `tips.html`/`about.html`/`admissions.html` for the same pattern — clean.
- **PDF extractor and OCR "where's the output?" — confirmed not bugs**, via actual functional tests (a real generated 20-page test PDF, a real OCR'd test image), not just code review. Both display their output correctly — a download card with stats for the extractor, an extracted-text panel with Copy/Download buttons for OCR — immediately below the "success" status message. Easy to miss if you don't scroll past the banner, but nothing to fix.

All of the above committed to `main` and verified live via fresh (cache-busted) fetches and Playwright runs against the production domain, not just local testing.

---

## GSC Indexing Investigation — 2026-08-25 (rev 18)

Google Search Console sent a "New reasons prevent pages from being indexed... Excluded by 'noindex' tag" alert (Aug 23) against a backdrop of 227 not-indexed / 95 indexed pages. Investigated with real data instead of acting on the alert at face value — queried the Search Console API directly (service account credentials already live for this property via `easedit-mkt-agent/config/ga4_service_account.json`, `webmasters.readonly` scope, same one `monitor.py` uses for the daily FST report).

**The noindex alert is a false alarm, not a bug.** Site-wide grep confirms `noindex` exists on exactly 4 files — `404.html`, `search.html`, `scholarship.html` (the unrendered JS template), `contact-thanks.html` — all already documented above as intentional. No `X-Robots-Tag` header rules exist in `netlify.toml` either, so there's no hidden second source. Ran the URL Inspection API (`urlInspection().index().inspect`) against a random sample of 35 real sitemap URLs (25 scholarship pages + 10 others, seeded for reproducibility): **zero** came back "excluded by noindex tag." GSC is just surfacing the same 4 known/intentional pages — nothing to fix.

**The real story behind 227/322 not indexed** — coverage-state breakdown from that same 35-URL sample:

| Coverage state | Share |
|---|---|
| Discovered – currently not indexed | 43% |
| URL is unknown to Google | 29% |
| Submitted and indexed | 26% |
| Crawled – currently not indexed | 3% |

This is Google deprioritizing crawl/index of a large batch of near-identical, database-generated scholarship detail pages (239 of them) — a crawl-budget/quality-priority decision on Google's end, not a technical defect on ours. Same root cause already diagnosed in the 2026-08-05 "239 orphaned pages" finding above. The fix applied then (static A–Z index added to `scholarships.html`, linking every scholarship detail page) is confirmed **live in production** (`curl`-verified against `freestudenttools.com/scholarships`) — it just hasn't moved Google's indexing decision yet as of this check.

**Sitemap itself confirmed healthy via `sitemaps().list` API** — 309 URLs submitted, 0 errors, 0 warnings, last successfully downloaded by Google 2026-08-24 (one day before this check).

**Conclusion — no code fix applied.** There was nothing broken to fix: the noindex alert is expected behavior on 4 intentional pages, and the unindexed-scholarship-page gap is a content-volume/crawl-priority issue already addressed with internal linking, not something further code changes resolve. Re-check indexing in 2-3 weeks; if the gap hasn't narrowed, the next lever is making individual scholarship pages more differentiated (real content depth work), not another technical audit.

---

## Redesign Programme — started 2026-08-28 (rev 19)

The user supplied `design.md` — a full "student decision & application platform" redesign spec (repositioning FST from a tools directory to a DISCOVER → COMPARE → FUND → APPLY → PREPARE → ARRIVE journey; 51 sections; global design system, per-page specs, component library, phased priority order).

### Direction — approved
- **Mockups built** (`scratchpad/fst-mockups/`, 17 standalone HTML pages + `mockup.css`): homepage, scholarship finder, admissions tracker, compare universities, scholarship detail, compare scholarships, guides hub, guide template, health requirements, document-tool UI (+ OCR variant), travel, about, contact, privacy, terms, plus a design-system reference. Visual direction ("calm editorial + utility", Inter, navy/teal, 1200px grid) signed off by the user. These are throwaway visual artifacts — not production code.

### Key architectural finding
**Nav + footer are hand-written in all 313 HTML pages.** `js/common.js` only wires *behaviour* (dropdown/mobile toggles, active-link, cookie consent, guide-cat-strip injection, back-to-top) — it does **not** inject the `<nav>`/`<footer>` markup. So any nav/footer/redesign change without a build step = editing 313 files by hand. This is why the redesign needs a build step first.

### Plan (review-then-push on every phase; FST has no staging — `main` = production)
- **Phase 0 — build step (NOT started).** Introduce Eleventy (or plain Node templating). Hard rules, agreed with user: (1) flat `.html` filenames preserved — **zero URL changes**; (2) built output committed to the repo so a broken build never blocks a Netlify deploy; (3) normalised before/after HTML parity diff on every migrated page, blocking; (4) no client framework/hydration — HTML in, HTML out; (5) `netlify.toml` frozen; (6) no new programmatic thin pages. First step = wire build + migrate one low-traffic page (`terms.html`) + parity diff, no deploy until diff approved.
- **Phase 1 — trust + counts (SHIPPED, see below).**
- **Phase 2+ — nav/footer/homepage + hub redesigns**, on top of the build step, phased per design.md §46.

### Phase 1 — shipped 2026-08-28 (commit `aff5f67`)
Text/attribute-only changes across 16 files. **No** href/asset/CSS/JS/layout/nav/footer/`sitemap.xml`/`netlify.toml` changes.
- **New `tools/SITE-FACTS.md`** — single source of truth for counts + approved privacy phrasing (design.md §44). Check it before changing any number.
- **Count reconciliation** (verified against live data files): scholarships 246/246+/245/240 → **239** (`SCHOLARSHIP_DATA.scholarships.length`); guides 35 & 43 → **48** (`blog/*.html` = sitemap post count); universities-with-full-data 25+ → **27** (`UNI_DATA.universities.length`); ranked list "top 1,500"/"1,040+" → **1,000** (`UNI_ALL.universities.length`). Touched index, about, admissions, scholarships, scholarship-guide, compare, compare-scholarships, scholarship.html, blog/index, 404, llms.txt, 3 blog posts. `scholarships.html` `<title>` + OG/Twitter titles changed ("246+" → "239") — now accurate, keyword phrases retained.
- **Privacy-claim accuracy** (GA4 + AdSense + contact form are live): removed "we collect zero personal data / no tracking" (`index.html`), "no uploads, no tracking, no data sales — ever" (`privacy.html`), "no data sales" (`about.html`). `about.html` "Fourteen tools" → "seven document tools + five-part Hub".
- **Full-site audit** (`scratchpad/fst_audit.py`): 313 pages → **0 broken internal links**; 84 redirect rules → **0 bad targets, 0 chains**; orphans = 2 (`contact-thanks`, `search`) both intentional `noindex` utility pages → 0 real orphans; sitemap → 0 unresolved `<loc>`. Performance: zero asset/request change → Lighthouse-neutral.
- **Push note:** the `update-data.yml` "daily site refresh" bot commits to `main` every day 06:00 UTC (regenerates `scholarship/*.html`, bumps `data/*.js` dates, rewrites `sitemap.xml`). Phase 1 was rebased over 15 such commits — **zero file overlap** — and all counts re-verified against the post-rebase data files before pushing.

---

## Full-Site Audit — 2026-08-28 (rev 20)

Comprehensive audit of all 313 pages: internal links, orphans, redirects, 404s, SEO (structure / canonical / titles / meta / social tags), performance signals, robots.txt, llms.txt, and every external link. Auditor: `scratchpad/fst_full_audit.py` (10 categories). Shipped in commits `b10c8b0` + `53a0c88`.

**Result — PASS on all 10 internal categories, 0 issues:**
- 0 broken internal links (313 pages), 0 real orphans (`contact-thanks` + `search` are intentional noindex utility pages), 0 bad redirects / chains / loops (84 rules), 0 unresolved sitemap `<loc>`.
- Every indexable page: 1 `<h1>`, `<title>` ≤65 chars (entity-decoded) and unique, unique meta description, self-referential absolute canonical, OG + Twitter tags, `lang` + `viewport`, JSON-LD. No duplicate titles or descriptions.

**Fixes applied:**
- **`/js/lang-switcher.js` + `/js/search-index.js`** had no `?v=` cache-bust on 72 pages → added `?v=20260808` (they were the only un-busted assets; risked stale multilang JS for 7 days after any change).
- **4 blog posts** (`cheap-flights`, `duolingo-english-test-guide-2026`, `ielts-speaking-test-guide`, `international-student-first-week-arrival-guide`) — newer template variant where `.blog-post-hero-img` has `max-height` but no reserved aspect box, and the `<img>` had no `width`/`height` → CLS on the LCP image. Added `width="1200" height="630"` (all 4 heroes are 1200×630).
- **`sitemap.xml`** — `compare-scholarships` was the only `<url>` missing `<lastmod>` → added.
- **35 dead external links** (browser-UA-verified 404) remapped to each institution's verified-200 root domain (same approach as the 2026-08-05 batch): 28 bank student-account deep links in `compare.html`, 6 government visa/health pages in `health-checks.html`, 1 in `data/scholarships_data.js`.

**External links — 424 unique URLs checked (browser user-agent):** 286 OK · 51 bot-blocked 403 (Cloudflare/WAF; fine for real users) · 4 JS template-literal false positives · **38 unverifiable `000`** (Cloudflare/Akamai JS challenge — `chevening.org`, `rhodeshouse.ox.ac.uk`, `canada.ca`, `campuschina.org`, `studyjapan.go.jp`, Russian banks, etc.; presumed live, **flagged for manual browser spot-check, NOT remapped**) · 35 confirmed dead → fixed. `nordea.dk` (405) / `commerzbank.de` (555) / `kotak.com` (403) left as-is — page alive, HEAD/method blocked, not a true 404.

**Verified non-issues:** ~245 images the raw scan flagged for "no dimensions" all sit in fixed-height / `aspect-ratio` containers (`.read-next-img`, `.guide-home-img` h:160, `.blog-card-img` h:200, `.blog-post-hero` h:420) → no layout shift. `/scholarship` (bare) resolves via Netlify pretty-URL to the noindex template — not a 404. `netlify.toml` unchanged.

Re-run the auditor with `python3 scratchpad/fst_full_audit.py` (or keep a copy in `tools/`).

---

## Recommendations Batch — `freestudenttools_claude_code_changes.md` (rev 21, 2026-08-28)

Second, tighter spec ("improve coherence, don't rebuild visual identity"). Shipped in commits `b81b9e3` (Wave 1 homepage `9190fa2` came first), `a4090e0`, `7ef4a0a`, `c214f51`. Every batch re-ran `tools/full_site_audit.py` → 0 issues.

**Data note:** the spec asked for "246 scholarships / 47 guides / 1,500 universities" — none of those exist in the data files (239 / 48 / 1,000). Implemented with the **real** numbers per the spec's own rule #7 (no fabricated data).

| # | Status |
|---|---|
| 1 · stats source of truth | ✅ `data/site-stats.js` — `window.FST_STATS` (239 / 196 open / 27 detailed unis / 1,000 index / 48 guides / 7 tools / 60 countries) + `FST_STAT_LABELS` + a self-contained renderer filling `[data-stat="KEY"]`. Self-executing script tag, no shared-file cache bump. Homepage + admissions counts converted. |
| 2 · admissions 27-vs-index | ✅ Explicit everywhere: 27 = detailed deadline/intake/housing tracking, 1,000+ = broader discovery index. Hero, about-strip, both FAQ answers reworded; "Coverage spans including" grammar bug fixed. |
| 3 · homepage task-first | ✅ Hero restored to "Scholarships. Admissions. All Free. All in One Place." + spec supporting line; CTAs "Find scholarships" / "Compare universities"; action selector 5→**4** cards per spec copy; `.hx-actions` grid 5→4 col. |
| 5 · Travel → Student Travel | ✅ Already "International Student Travel Hub" (title/H1/meta). No change. |
| 6 · university comparison result | ✅ `compare.html` — after the existing grouped table: **Estimated total annual cost** panel (tuition + living-midpoint×12, combined only when both USD, shows $/yr delta + which is lower); **Where each stands out** neutral bullets ("does not pick a winner"); CTA row (Explore A / Explore B / deadlines / scholarships). `_colTotals[]` surfaces the monthly total already computed in `costOfLivingRows()`. Methodology + data disclaimer untouched. |
| 7 · scholarship comparison | ✅ `compare-scholarships.html` — **At a glance** compact card (Funding/Degree/Destination/Deadline/Competition); **Which may fit you better?** conditional "X may be more relevant if you…" from funding/level/competition/deadline ("not a personalised eligibility check"); **Build your shortlist** CTA. |
| 10 · internal-linking ecosystem | ✅ Verified already substantial — 239 scholarship pages → related + comparison + finder + guide (generator); guides → products (#16) + tools; tools → next tools (#11); compare pages → admissions + scholarships. Only missing node = country hub (#9, build-step). |
| 11 · tool "What's next?" | ✅ Static contextual 4-card section after `</main>` on all 7 tool pages. New `.tool-next` CSS. |
| 12 · tool privacy strip | ✅ `common.js` injects "🔒 Your file stays on your device · Browser-based · No upload · No account · No storage" above every `.upload-zone`. New `.upload-privacy-note` CSS. |
| 13 · contextual Easedit | ✅ Banners already page-contextual; button label → "Practise with Easedit →" ×3. |
| 16 · guide "what to do next" | ✅ `.guide-next-actions` product-action block (2–3 topic-matched links into the tools/databases, not more posts) on all 48 guides, before "Keep reading". |
| 21 · analytics events | ✅ `common.js` delegated `[data-track]` → `trackEvent`. Homepage wired (`home_task_click` 8, `home_tool_click` 7, `home_guide_click` 6); compare pages wired. Tool `tool_started/completed` still to wire in each tool JS. |
| 15 · unique SEO titles/meta | ✅ Audit: 0 duplicate titles / descriptions across 313 pages. |
| 19 · performance | ✅ Audit clean; asset `?v=` bumped site-wide `20260808 → 20260829` (313 files + generator `ASSET_VERSION`) so CSS/JS changes propagate. |

**Blocked — need the build step (can't hand-edit 313 pages without breaking the gated link/SEO audit):**
- #4 nav simplification (nav is hand-coded in every page; `common.js` only wires behaviour)
- #9 country hubs (`/study/[country]`) — new template + generation
- #14 URL restructure (`/universities/[uni]`, redirects for everything)
- #17 country SEO flywheel (depends on #9)

**Still to do (no build step):** #18 mobile + #20 accessibility spot-check of the new components (`.hx-*`, `.tool-next`, `.guide-next-actions`, `.upload-privacy-note`); wiring `tool_started`/`tool_completed` events into the 7 tool JS files.

---

## Strategy pivot + Phase 0 build step (rev 22–23, 2026-08-28)

After shipping the recommendations batch, stepped back to "what actually improves this site's success." The answer is **not more architecture** — it's content quality. Two facts: AdSense rejected the site "low value content" (Jul 2026), and GSC shows 227/322 pages not indexed. Same story — Google thinks large parts of the site are thin. Ranked plan: (1) noindex the thin scholarship pages, (2) scale the blog (the proven SEO+GEO engine), (3) email deadline alerts as the one retention hook, (4) instrument the two high-intent funnels, (5) mobile UX of the data-heavy pages. Deprioritised: nav redesign, country hubs (#9 — bad timing to add thin pages), URL restructure (#14 — pure risk).

### #1 — Index-quality curation (SHIPPED, `8961191`)
`tools/generate_scholarship_pages.py` now has `KEEP_INDEXED` (139 ids: national government schemes, multilateral bank/UN programmes, globally-recognised named fellowships, the 10 blog-backed ones). The other **100 scholarship pages → `<meta robots="noindex, follow">`** — overwhelmingly single-institution awards (NUS / Harvard GSAS / Warwick / Leiden / Imperial / UCL / Manchester / Toronto / UBC …) where the university's own page always outranks a third-party listing. Pages stay live + in the finder + A-Z index — just out of Google's index. New `prune_sitemap_noindex()` removes them from `sitemap.xml` (239 → 139 scholarship `<loc>`; sitemap 309 → 209 URLs). Re-check GSC "indexed" count in 3–4 weeks — it should rise as a share of a smaller, higher-quality set.

### #4 — Funnel instrumentation (SHIPPED, `ce01e0a`)
- **All `js/*.js` page/tool scripts were unversioned** (audit blind spot — the `PERF_ASSET_NO_CACHEBUST` regex only matched leading-slash paths). Versioned all 10 to `/js/X.js?v=20260829`; audit regex fixed.
- `data-track="scholarship_apply"` on every official-site Apply link (generator + finder's 2 outbound links) — the primary conversion event.
- `data-track` `scholarship_filter` on all 6 finder filters; `trackEvent('tool_started', {tool})` on file-select in all 6 upload tools (completion events like `pdf_compressed` already existed → completion rate now computable).

### Phase 0 — Eleventy build step (STARTED, `71ece52` + `3aa129f`)
Incremental static templating so the nav/footer become one canonical partial (unblocks recommendation #4 nav redesign). Eleventy 3.0, no framework, `input: src/` → `output: .` (repo root), Eleventy only globs `src/**` and does not clean output → the other ~270 root `.html` files are untouched. Flat `<name>.html` filenames → zero URL changes. `netlify.toml` frozen, `publish = "."` unchanged — **Netlify does not run the build**, it serves committed static HTML; a broken local build can't block a deploy. `npm run build` regenerates migrated pages; commit the output.
- `src/_includes/`: `layout.njk` + `_nav.njk` (verbatim canonical nav, 16-lang switcher, guide-cat-strip) + `_footer.njk` (canonical 4-col footer).
- **Migrated so far (4/25 root pages):** `terms`, `privacy`, `contact`, `about`. Diffs = consistency fixes only (css/js → absolute paths, footer headings `<h2>/<h3>` → `<h4>`, missing "Scholarship Guide" footer link added, indentation).
- **Remaining 21** are NOT uniform: ~4 on a divergent template (`cookies`/`404`/`contact-thanks`/`search` — different footer markup, stub navs), ~3 content pages with 185–213-line inline `<style>` (`tips`/`scholarship-guide`/`health-checks`), ~13 complex app/tool pages (`index`/`admissions`/`compare`×2/`scholarships`/`travel` + 7 tools — inline style + JS + ad slots + live tool JS, real regression risk). Each needs individual migration + browser check. Once all root pages are on `layout.njk`, swap `_nav.njk` for the redesigned nav — one file, applies everywhere.

### #5 — Mobile UX of data-heavy pages (SHIPPED, `49e6949`)
- `admissions.html`: on ≤768px the filter sidebar collapses behind a "Filter universities" toggle (active-count badge, fires `admissions_filter`) so results show immediately. Logic in `admissions.js`.
- `compare.html` + `compare-scholarships.html`: on mobile the row-label column is `position:sticky; left:0` so context stays visible while scrolling comparison columns, plus a "← Scroll to compare →" hint.
- Still wants a real-device spot check.

### #2 — 4 new blog guides (SHIPPED, `33d7c1f`)
Blog **48 → 52 posts**. Targeting confirmed search-demand gaps: `how-to-email-a-professor-phd-position`, `proof-of-funds-student-visa`, `scholarship-rejected-how-to-reapply`, `motivation-letter-vs-scholarship-essay-vs-sop`. Each ~1,500–1,900-word article, Article + FAQPage (4 Q&A) + BreadcrumbList schema, ≥3 question H2s, kie.ai hero (<130 KB), sidebar quick-ref + TOC, inline tool CTA, "what should you do next?" block. Wired into `blog/index.html` (Application Strategy section), `sitemap.xml`, `llms.txt`; guide count updated in `data/site-stats.js`, homepage `data-stat`, `404.html`, `SITE-FACTS.md`. **`how-to-email-a-professor-phd-position-hero.jpg` is a placeholder** — kie.ai failed 4× on that concept; regenerate when convenient.

### Still to do (ranked)
- **Keep scaling the blog** — 52 → 80–100. This is the growth lever. Next gaps worth covering: "how to email a professor" follow-ups (research proposal, funding-first countries), country-specific proof-of-funds deep dives, "waitlisted for a scholarship — what now".
- **#3 email deadline alerts** — the one retention hook. Needs backend: Netlify scheduled function + email provider (Resend/SendGrid) querying `scholarships_data.js` / `universities.js` deadlines. Not built — infra decision required.
- **Phase 0 migration** — parked at 4/25 root pages (terms/privacy/contact/about). Layout has `pageStyles`/`cssPreload`/`keywords`/`jsonldRaw` hooks now. The remaining pages need careful per-page `<head>`-fidelity migration (the `tips`/`scholarship-guide` auto-extraction attempt dropped og:title/og:type/keywords/@graph and was reverted). Only finish this if the nav redesign becomes a priority.
- **#4 nav redesign** — after Phase 0 completes, swap `src/_includes/_nav.njk` for the STUDY ABROAD / PREPARE / TOOLS / TRAVEL / GUIDES structure.

Every change this session re-ran `tools/full_site_audit.py` → **0 issues** throughout.

---

## Indexing diagnosis + deeper sitemap cut (rev 24, 2026-08-28)

GSC "Pages" export showed the real problem: **~230 URLs "Discovered – currently not indexed", Last crawled: N/A** — Google has not crawled them at all. Not a per-page quality verdict; a **crawl-budget / domain-authority** starvation. Even footer-linked core pages (`/about`, `/terms`, `/contact`, all tool pages, ~28 blog posts) sit uncrawled. Cause: a young, low-backlink domain whose sitemap was ~60% near-identical templated scholarship pages → Google throttles crawl of the whole domain.

Commercial context: at ~110 users/week, AdSense-approved income ≈ $1–5/mo. **Decision (owner): do not reapply to AdSense until traffic is materially higher.** No urgency to chase the "low value content" rejection. The blog grows slowly on its own via Bing + ChatGPT citations.

### Bot-vs-human analytics (SHIPPED, `d4574d8`)
GA4 only auto-filters the IAB spider list; cloud-datacenter scrapers get through and were inflating the China row (15 users / ~1s sessions / today's screenshot). JS-only, additive, passive listeners:
- `js/common.js` — `human_interaction` (fired once on first scroll/key/pointer/touch/wheel) + `engaged_10s` (10s of *visible* page time). A hit-and-leave scraper fires neither. Both carry `automation: navigator.webdriver`.
- `js/lang-switcher.js` — `translate_ready` / `translate_blocked` (onload / onerror / 4s timeout on the Google Translate script). `translate_blocked` positively identifies Great-Firewall sessions, which otherwise look identical to a bounce.
- **Usage:** in GA4 Explore, add segment "session includes `human_interaction`" as a comparison → bot-free view. Propagates to returning visitors over ~7 days (JS cache); new visitors immediately. No site-wide `?v=` bump done (analytics-only, 7-day rollout acceptable).

### Sitemap cut 213 → 122 (SHIPPED, `063485e`)
`KEEP_INDEXED` in `tools/generate_scholarship_pages.py` cut **139 → 48** — only scholarships with genuine standalone brand/search demand (Chevening, Fulbright, DAAD ×4, Erasmus ×2, Gates Cambridge, Rhodes, Marshall, Commonwealth, MEXT ×3, GKS ×2, Türkiye, Knight-Hennessy, Clarendon, Weidenfeld, Eiffel, Swedish Institute, Holland, Orange Tulip, Stipendium Hungaricum, Mastercard Foundation, Aga Khan, Inlaks, ICCR, Vanier, Banting, NSF GRFP, Soros, Rotary Peace, Cambridge Trust ×2, Gates Millennium, Jack Kent Cooke, Humphrey, MSCA, CSC China, Swiss Excellence, Austrian OeAD, Italy Gov, Ireland Gov, LPDP Indonesia, KASP Saudi, NZ Gov). Heuristic list — **refine against GSC Pages impression data when available**.
- 191 scholarship pages now `noindex, follow` (was 100); still live, still in the finder + the `scholarships.html` A-Z index (regenerated to all 239 → **no orphans**), just out of Google's index + sitemap.
- Sitemap: 53 blog + 21 root + 48 scholarship = **122** (was 213). Audit 0 issues.
- Re-check GSC "indexed" count + crawl activity in 3–4 weeks. If the good pages start getting crawled, the cut worked.

### Not done (owner deferred until deciding to actively grow the site)
- **Backlinks** (8–15 real ones) — the actual fix for crawl-demand starvation. Biggest lever, real outreach effort.
- **Category pages** replacing scholarship-page sprawl (~8 curated pages: "PhD scholarships in Germany", "Fully funded, no IELTS", etc.).
- **Manual Request Indexing** for top ~25 pages in GSC.
- **AdSense reapplication** — explicitly on hold pending traffic growth.
- Keep scaling the blog (52 → 80–100) — still the passive growth engine, continue when convenient.

---

## Stat consistency + honest ad wording (rev 25, 2026-08-29, `8fdf6f8`)

External review (Gemini, two passes) flagged number inconsistencies. Verified every cited figure against the code — most claims were stale/hallucinated ("246+ scholarships" exists nowhere; admissions page does NOT say "1,500 universities"), but three real drift bugs found and fixed:
- `index.html` hero strip: **"9 Free Tools" → 7**, **"48 Student Guides" → 52** (both hardcoded `data-target`; now match `data/site-stats.js`, which is the single source of truth — `tools:7`, `guides:52`).
- `compare.html`: **"1,040+" universities → "1,000+"** (×2 — visible hero stat + intro line; contradicted its own meta/FAQ. `universities_all.js` header says "Contains 1000 universities", 1000 entries confirmed).
- `tips.html`: **"1,500+ universities tracked" → "1,000+"**.
- `admissions.html` was already correct and well-worded (27 detailed / 1,000+ discovery, all `data-stat`-driven).
- **Still not fully centralised:** the `index.html` / `compare.html` hero count-up stats use hardcoded `data-target` (drives the IntersectionObserver animation), not `data-stat`. Fixed the literals to match `site-stats.js`; wiring the animation to `site-stats.js` is a deferred nicety, not done.

**About page ad wording (`about.html`) — removed false claims.** Was: *"Google AdSense serves display ads on the site"* and *"The site runs on display advertising."* Both untrue — AdSense is **not approved** (rejected Jul 2026), ad slots are placeholders, nothing serves. Now: *"We plan to fund the site with display advertising. No ads are running yet."* + *"No subscriptions, no premium tiers, no paywalls — ever… None is running yet."* **Kept** `<meta name="google-adsense-account" content="…">` on all pages — that's the site-ownership verification hook for a future application, not a user-facing claim. The site-wide cookie-banner line ("serve relevant ads") left as-is — forward-looking consent language, and changing it touches 300+ files.

**Competition rating methodology.** The 239 generated scholarship pages showed "Competition: Very High" + a bar with no basis. Added a one-line caption under the bar (generator): *"Reflects acceptance rate vs. applications received, from published data where available"* + link to `/compare-scholarships.html#competition` (that page already carries a full methodology paragraph; added the `id` anchor).

**Owner decision unchanged:** not reapplying to AdSense until traffic is materially higher. These were accuracy/trust fixes worth doing on their own merit, not AdSense prep.

---

## Key Rules

- Each tool is a separate HTML file — keep them independent
- No paid API calls without confirming with user first
- Never hardcode `class="active"` on nav links — JS sets it via current URL
- New pages must be added to: nav HTML (all pages), `sitemap.xml`, and `llms.txt`
- Ad slot IDs are placeholders until AdSense approves — do not treat them as real
- `data/universities_all.js` is auto-generated — never edit manually
- `data/scholarships_data.js` must always be **compact JSON** (no indent) — use the reformat snippet above
- `scholarship.html` must use **absolute paths** for all resources (`/css/`, `/js/`, `/data/`) — relative paths break under Netlify 200-rewrite
- easedit.co CTAs on admissions/scholarships/compare/scholarship — keep them, don't overwrite
- When adding scholarships: add to `scholarships_data.js` (compact format), update `lastUpdated`, update stats in `index.html` and `scholarships.html`, update this file
- **Never add inline `.page-hero h1 { font-size }` overrides** — global CSS handles it at 2.7rem. All overrides were removed in rev 5
- **Never replace `logo-sm.png` with `logo.png` in img tags** — og:image uses full logo, img tags use `<picture>` with WebP + PNG
- **Never add Google Fonts links** — Inter is fully self-hosted in `/assets/fonts/`; `@font-face` is in `css/style.css`
- **`compare.html` lazy-loads `universities_all.js`** — do not add it back as a static script tag; the dynamic loader in the IIFE handles it

### Upload Zone Rules (2026-06-22)
- All 6 tool page upload zones are `<label class="upload-zone" id="uploadZone" style="display:block">` — NOT `<div>`. This is the cross-browser click-to-browse fix (Safari blocks `input.click()` from JS handlers on different elements; `<label>` association is native and works everywhere).
- The `<input type="file">` inside the label has `display: none` (CSS). Do NOT change to `opacity: 0` or `position: absolute` — browsers block the file picker on opacity-0 inputs (anti-phishing).
- `label.upload-zone { display: block; }` must remain in `css/style.css`. The `style="display:block"` on the element itself is belt-and-suspenders for cached CSS.
- **`js/common.js` has NO click handler for upload zones** — the label handles it natively. The drop handler IS still in common.js (uses `DataTransfer` + `input.dispatchEvent(new Event('change'))`).
- **CSS cache busting:** Netlify caches `css/style.css` for 7 days. When making CSS changes that must reach users immediately, bump the version in all HTML files: `href="css/style.css?v=N"`. Currently at `v=2`. Increment N for the next significant update. Update all 17+ HTML pages (use the Python one-liner: `python3 -c "import os,re; [open(f,'w').write(re.sub(r'style\.css\?v=\d+','style.css?v=N',open(f).read())) for f in os.listdir('.') if f.endswith('.html')]"`)

---

## File Reference

| File | Purpose |
|---|---|
| `js/common.js` | GA4, AdSense, nav dropdowns, cookie consent, back-to-top, scroll animations, **page-hero trust strip auto-inject** |
| `js/scholarships.js` | Scholarship finder — filter, sort, render, expand cards. `perPage: 200` shows all 246 at once. Init uses readyState-aware retry loop (2s timeout) |
| `css/style.css` | All styles — single file, CSS variables |
| `netlify.toml` | Deploy config, cache headers, security+CSP headers, all Pretty URL 200 rewrites, `/scholarship/:id` rewrite, `/contact-thanks` redirect |
| `sitemap.xml` | 265 URLs — 19 core pages + 246 scholarship profile URLs. Auto-updated daily by generator. |
| `404.html` | Branded 404 page — CTAs to scholarships/admissions/compare/home |
| `contact-thanks.html` | Post-form-submission thank-you page (Netlify Forms redirects here) |
| `compare-scholarships.html` | Scholarship comparison tool — any 2 of 246, popular pairs, full side-by-side table |
| `ads.txt` | AdSense authorized seller file — required for ad network approval |
| `robots.txt` | AI crawler permissions |
| `llms.txt` | AI citation structured content — includes scholarship database section |
| `data/` | JS data files — universities, scholarships, guides, courses |
| `tools/fetch_all_universities.py` | Regenerates `data/universities_all.js` from Hipolabs API + QS rankings |
| `tools/update_university_data.py` | Daily status refresh — university deadlines + scholarship open/closed status |
| `tools/generate_scholarship_pages.py` | Generates 246 static HTML files in `scholarship/` + updates `sitemap.xml` lastmod. Run after any data change. |
| `.github/workflows/update-data.yml` | GitHub Actions daily cron: data refresh → page regen → commit + push → Netlify deploy hook |
| `js/config.js` | `window.FST_CONFIG` — Google Maps API key |
| `COMMAND.md` | Full dev-workflow reference: file map, data schemas, compare.html internals, how to add unis/streams/scholarships |
