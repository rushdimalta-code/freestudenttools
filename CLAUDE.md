# CLAUDE.md — Free Student Tools

_Last updated: 2026-06-16 (rev 4)_

---

## Project Purpose

Public static web app offering free browser-based tools for students. All processing is client-side — files never leave the user's device. No accounts, no sign-up, no paywalls.

Monetisation: Google AdSense (pub ID: `ca-pub-9843476971668607`). Account created; **not yet approved** — reapply after verifying contact form and content depth.

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

**University Hub (6 pages):**
- `admissions.html` — deadline tracker (data from `data/universities.js` + `data/universities_all.js`)
- `scholarships.html` — 246 scholarships, filter by country/funding/level/deadline/competition
- `scholarship.html` — individual scholarship detail page (dynamic, loads from `scholarships_data.js` via `?id=` param)
- `scholarship-guide.html` — long-form guide (5,000 words)
- `compare.html` — side-by-side university comparison, 1,040+ universities, 16 streams
- `tips.html` — student tips guide (5,000 words) — Article + FAQPage schema

**Static pages:** `about.html`, `contact.html`, `privacy.html`, `terms.html`

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
| `data/universities.js` | `window.UNI_DATA` | 40 Tier-1 universities — full admissions, accommodation, deadline, streams |
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
- `sitemap.xml` — **263 URLs**: 17 core pages + **246 individual scholarship profile URLs** (`/scholarship/:id`)
- `robots.txt` — all major AI crawlers allowed (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
- `llms.txt` — updated with scholarship database section for AI citation
- Internal linking: scholarship cards link to detail pages (`/scholarship.html?id=...`), not directly to external sites

---

## Scholarship Detail Pages — `scholarship.html`

Each of the 246 scholarships has a dedicated SEO URL:
- Clean URL: `freestudenttools.com/scholarship/chevening`
- Query param: `freestudenttools.com/scholarship.html?id=chevening`

Netlify redirect in `netlify.toml`:
```toml
[[redirects]]
  from = "/scholarship/:id"
  to = "/scholarship.html?id=:id"
  status = 200
```

`scholarship.html` is a single page that dynamically renders any scholarship from `SCHOLARSHIP_DATA`. It sets `<title>`, meta description, canonical URL, and all JSON-LD via JavaScript after reading the `?id=` param. Uses **absolute paths** (`/css/style.css`, `/js/common.js`, `/data/scholarships_data.js`) because it is served via a Netlify 200-rewrite — relative paths would resolve incorrectly at `/scholarship/xxx`.

The detail page renders:
- Hero with funding amount, status badge, competition level, levels covered
- About / eligibility section
- Requirements checklist
- Application timeline (deadline + notification date)
- FAQ accordion (with JSON-LD FAQPage injected into `<head>`)
- Sidebar: quick facts, levels/streams chips, apply button (→ official site), related scholarships
- easedit.co CTA (for interview prep cross-sell)

**SEO target keywords per page:** `[Scholarship Name] 2026`, `[Scholarship Name] eligibility`, `[Scholarship Name] deadline`, `how to apply for [Scholarship Name]`

---

## Daily Auto-Refresh — `tools/update_university_data.py`

GitHub Actions cron at **06:00 UTC daily**. Does two things:

1. **University deadlines** — tries to scrape official admissions pages (unreliable; uses heuristic date extraction)
2. **Scholarship statuses** — recalculates `open` / `closing_soon` / `upcoming` / `closed` from today vs. deadline date

**Bot guard (≥50 check):** If `scholarships_data.js` contains ≥50 scholarships, the bot skips replacing the list entirely — only refreshes status fields. This makes the 246 manually-curated scholarships permanent against bot overwrites.

**Honest status of data freshness:**
- `status` field (open/upcoming/closed): refreshes daily ✓
- Actual deadline dates: manually maintained — accurate as of last edit ✗ (scraping is unreliable)
- New scholarship cycles: need manual update when annual windows shift

---

## Navigation

Desktop nav uses **dropdown groups** (managed via JS in `common.js`):
- **University Hub** → Admissions Tracker, Scholarships Finder, Scholarship Guide, Compare Degrees, Student Tips
- **Tools** → OCR Scanner, PDF Converter, PDF Compressor, Image Compressor, PDF Merger, PDF Page Extractor, Citation Generator

Active nav link is set by JS in `common.js` — do **not** hardcode `class="active"` in HTML nav links.

`scholarship.html` is NOT in the nav (it's a detail page accessed from scholarship cards) — this is intentional.

---

## Visual Design (CDO — 2026-06-16 rev 3)

`index.html` + `css/style.css`:

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

Design tokens: `--primary: #1A73E8` · `--success: #10B981` · `--orange: #F7941D` · purple `#7C3AED`
Font: Inter (400–800) via Google Fonts. Hero bg: dark navy `#0B1120 → #0F2456 → #1A1040`.

---

## AdSense — Why It Was Rejected & What's Fixed

**Fixed (2026-06-16):**
- Contact form was broken (`YOUR_FORM_ID` placeholder) → now uses Netlify Forms
- `scholarship-guide.html` was orphaned (zero internal links) → now in nav + linked from scholarships page
- AdSense script was loading before cookie consent → now deferred via `initAds()`
- Content depth massively increased: 246 scholarships, individual detail pages for all 246, Dataset + FAQPage schema

**Still required before reapplying:**
- Confirm Netlify Forms email notifications are configured (Netlify dashboard → Forms)
- Replace placeholder AdSense slot IDs (`1111111111` etc.) with real slot IDs after approval
- Consider adding one more content guide (e.g. OCR or PDF tools guide)

---

## Cross-sell — easedit.co

CTAs on four high-intent pages:
- `admissions.html` — "Got a university interview coming up?"
- `scholarships.html` — "Scholarship shortlisted? Most awards include an interview round."
- `compare.html` — "Narrowed it down to your top picks? The next step is the interview."
- `scholarship.html` (detail page) — inline CTA in main content + sidebar CTA

Keep all these CTAs. Do not remove on future edits.

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

---

## File Reference

| File | Purpose |
|---|---|
| `js/common.js` | GA4, AdSense, nav dropdowns, cookie consent, back-to-top, shared utilities |
| `js/scholarships.js` | Scholarship finder — filter, sort, render, expand cards. `perPage: 200` shows all 246 at once. Init uses readyState-aware retry loop (2s timeout) |
| `css/style.css` | All styles — single file, CSS variables |
| `netlify.toml` | Deploy config, cache headers, security headers, `/scholarship/:id` redirect |
| `sitemap.xml` | 263 URLs — 17 core pages + 246 scholarship profile URLs |
| `robots.txt` | AI crawler permissions |
| `llms.txt` | AI citation structured content — includes scholarship database section |
| `data/` | JS data files — universities, scholarships, guides, courses |
| `tools/fetch_all_universities.py` | Regenerates `data/universities_all.js` from Hipolabs API + QS rankings |
| `tools/update_university_data.py` | Daily status refresh — university deadlines + scholarship open/closed status |
| `js/config.js` | `window.FST_CONFIG` — Google Maps API key |
| `COMMAND.md` | Full dev-workflow reference: file map, data schemas, compare.html internals, how to add unis/streams/scholarships |
