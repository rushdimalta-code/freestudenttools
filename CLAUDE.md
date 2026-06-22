# CLAUDE.md — Free Student Tools

_Last updated: 2026-06-23 (rev 14)_

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
- `scholarships.html` — 246 scholarships, filter by country/funding/level/deadline/competition
- `scholarship.html` — individual scholarship detail page (dynamic, loads from `scholarships_data.js` via `?id=` param)
- `scholarship-guide.html` — long-form guide (5,000 words)
- `compare.html` — side-by-side university comparison, 1,040+ universities, 16 streams
- `compare-scholarships.html` — side-by-side scholarship comparison (any 2 of 246+); popular pairs quick-pick; WebApplication + FAQPage + BreadcrumbList JSON-LD
- `tips.html` — student tips guide (5,000 words) — Article + FAQPage schema

**Blog (live 2026-06-17):**
- `blog/index.html` — blog listing page
- `blog/chevening-scholarship-guide.html` — Chevening guide, 2,081 words
- `blog/fulbright-scholarship-guide.html` — Fulbright guide, 2,027 words
- `blog/daad-scholarship-guide.html` — DAAD guide, 2,013 words
- `blog/gates-cambridge-scholarship-guide.html` — Gates Cambridge guide, 1,999 words
- `blog/erasmus-mundus-guide.html` — Erasmus Mundus guide, 1,959 words
- All 5 posts: Article + FAQPage + BreadcrumbList JSON-LD, CCO voice, kie.ai hero images in `assets/blog/`
- Source wiki: `/Users/rushdi/Downloads/Scholarships/` — Karpathy pattern, 5 entity pages

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
- `sitemap.xml` — **265 URLs**: 19 core pages + **246 individual scholarship profile URLs** (`/scholarship/:id`). Submitted to Google Search Console 2026-06-16 — 264 pages discovered, Status: Success. All pages submitted for indexing via URL Inspection 2026-06-19.
- `robots.txt` — all major AI crawlers allowed (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
- `llms.txt` — updated with scholarship database section for AI citation
- Internal linking: scholarship cards link to detail pages (`/scholarship.html?id=...`), not directly to external sites
- **Indexing status (2026-06-19):** Soft 404 on all 246 scholarship detail pages fixed (redirect was serving JS shell to Googlebot — now serves static HTML). All pages re-submitted. Core pages expected indexed within 2–5 days; scholarship detail pages 2–4 weeks.

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
