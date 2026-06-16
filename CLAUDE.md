# CLAUDE.md — Free Student Tools

_Last updated: 2026-06-16_

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

**University Hub (5 pages):**
- `admissions.html` — 1,500+ universities, deadline tracker
- `scholarships.html` — 800+ scholarships, filter by country/funding/level
- `scholarship-guide.html` — Long-form guide (5,000 words) — linked from nav + scholarships page
- `compare.html` — Side-by-side university comparison
- `tips.html` — Student tips guide (5,000 words) — Article + FAQPage schema

**Static pages:** `about.html`, `contact.html`, `privacy.html`, `terms.html`

---

## Stack

- Static HTML/CSS/JS — one HTML file per tool, no build step
- Hosted on Netlify (free tier) — `netlify.toml` configures caching headers + redirects
- `css/style.css` — single shared stylesheet, CSS variables via `:root`
- `js/common.js` — shared: GA4, AdSense deferred load, dropdown nav, cookie consent, back-to-top, utilities
- `data/` — JSON data files for university/scholarship content
- No backend, no auth, no user accounts

---

## Analytics & Ads

**GA4:** `G-WX0M0TK16J` — set in `js/common.js`. Fires only after cookie consent.

**AdSense:** `ca-pub-9843476971668607` — loaded via `initAds()` in `js/common.js` after cookie consent. Ad slot IDs in HTML pages are **placeholders** (`1111111111`, `2222222222`, `3333333333`) — replace with real slot IDs from AdSense dashboard after account approval.

**Cookie consent:** Both GA and AdSense are gated behind the cookie banner. `localStorage.cookie_consent === 'accepted'` triggers both.

---

## SEO & GEO

- Canonical URLs on all pages
- Meta descriptions + OG/Twitter tags on all pages
- Structured data: FAQPage on tool pages; Article + FAQPage on tips.html; Article on scholarship-guide.html; WebSite + Organization + FAQPage on index.html
- `sitemap.xml` — 17 URLs, correct priorities
- `robots.txt` — all major AI crawlers allowed (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
- `llms.txt` — present, structured for AI citation
- Related tool chips at bottom of each tool page (internal linking)

---

## Navigation

Desktop nav uses **dropdown groups** (managed via JS in `common.js`):
- **University Hub** → Admissions Tracker, Scholarships Finder, Scholarship Guide, Compare Degrees, Student Tips
- **Tools** → OCR Scanner, PDF Converter, PDF Compressor, Image Compressor, PDF Merger, PDF Page Extractor, Citation Generator

Active nav link is set by JS in `common.js` — do **not** hardcode `class="active"` in HTML nav links.

Mobile nav: flat list with section labels (`.nav-mobile-label`), also active class set by JS.

---

## AdSense — Why It Was Rejected & What's Fixed

**Fixed (2026-06-16):**
- Contact form was broken (`YOUR_FORM_ID` placeholder) → now uses Netlify Forms
- `scholarship-guide.html` was orphaned (zero internal links) → now in nav + linked from scholarships page
- AdSense script was loading before cookie consent → now deferred via `initAds()`

**Still required before reapplying:**
- Confirm Netlify Forms email notifications are configured (Netlify dashboard → Forms)
- Add slot IDs only after account is approved
- Consider adding one more content guide (e.g. OCR or PDF tools guide) to increase editorial depth

---

## Cross-sell — easedit.co

easedit.co CTAs are live on three high-intent pages, placed between main content and SEO section:
- `admissions.html` — "Got a university interview coming up?"
- `scholarships.html` — "Scholarship shortlisted? Most awards include an interview round."
- `compare.html` — "Narrowed it down to your top picks? The next step is the interview."

Keep these CTAs. Do not remove on future edits.

---

## Key Rules

- Each tool is a separate HTML file — keep them independent
- No paid API calls without confirming with user first
- New tools follow the same pattern — check existing HTML files before building
- Never hardcode `class="active"` on nav links — JS sets it via current URL
- New pages must be added to: nav HTML (all pages), `sitemap.xml`, and `llms.txt`
- Ad slot IDs in HTML are placeholders until AdSense approves the account — do not treat them as real
- easedit.co CTAs on admissions/scholarships/compare — keep them, don't overwrite

---

## File Reference

| File | Purpose |
|---|---|
| `js/common.js` | GA4, AdSense, nav dropdowns, cookie consent, back-to-top, shared utilities |
| `css/style.css` | All styles — single file, CSS variables |
| `netlify.toml` | Deploy config, cache headers, security headers |
| `sitemap.xml` | All 17 pages, updated manually on new page adds |
| `robots.txt` | AI crawler permissions |
| `llms.txt` | AI citation structured content |
| `data/` | University, scholarship, admissions JSON data |
| `workflows/` | SOPs per tool |
| `ANALYTICS-SETUP.md` | GA4 setup guide (historical — GA is now live) |
