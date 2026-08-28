# Site facts — single source of truth for counts & claims

_Last reconciled: 2026-08-28_

design.md §44 requires one consistent set of numbers across the whole site.
Before changing any count in a page, check it against this table and update
**every** occurrence, not just the one you noticed.

| Fact | Value | Source of truth | Notes |
|---|---|---|---|
| `scholarships` | **239** | `data/scholarships_data.js` (`window.SCHOLARSHIP_DATA.scholarships.length`) | Was shown as 246 / 246+ / 245 / 240 in various places |
| `scholarship_countries` | 60+ | manual (not verified this pass) | Left as-is; verify before changing |
| `admissions_universities_full` | **27** | `data/universities.js` (`window.UNI_DATA`) | Universities with full deadline / intake / housing data |
| `ranked_universities` | **1,000** | `data/universities_all.js` (`window.UNI_ALL`) | Searchable ranked list; was shown as "1,500" and "1,040+" |
| `guides` | **48** | `ls blog/*.html` minus `index.html` = 48; matches 48 post `<loc>` entries in `sitemap.xml` | Homepage showed 35; `llms.txt`, `404.html` and old CLAUDE.md said 43 — both stale |
| `document_tools` | **7** | OCR, PDF→Word/Excel, PDF compressor, image compressor, PDF merger, PDF extractor, citation generator | |
| `hub_pages` | **5** | admissions, scholarships finder, scholarship guide, university compare, tips | `about.html` previously said "University Hub (7)" |
| `homepage_stat_tools` | **9** | 7 document tools + compare + admissions (homepage framing) | Kept as-is; a framing choice, not a bug |

\* blog/ also contains index.html; post count verified against sitemap.xml `/blog/` entries.

## Privacy / trust wording

Accurate claims only. GA4 (`G-WX0M0TK16J`) and Google AdSense (`ca-pub-9843476971668607`)
are live, plus a contact form — so **do not** write "no tracking", "zero data",
"we collect zero personal data", or "no data sales — ever".

Approved phrasing:
- ✅ "Your files never leave your device."
- ✅ "We never upload or store the documents you process with our tools."
- ✅ "No account and no email required to use the tools."
- ✅ "We use privacy-respecting analytics and display ads to keep the site free — see our Privacy page."
- ❌ "No tracking." ❌ "We collect zero personal data." ❌ "No data sales — ever."

## Pages that carry these numbers

index.html · about.html · admissions.html · scholarships.html ·
scholarship-guide.html · compare.html · compare-scholarships.html ·
scholarship.html (noindex template) · blog/index.html · 404.html
