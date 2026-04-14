# COMMAND.md — Quick Restart Context
# FreeStudentTools.com — freestudenttools/

Read this file at the start of any new session to resume immediately without re-exploring the repo.

---

## What this project is

Static HTML/CSS/JS website — no backend, no auth. All tools run client-side.
Monetisation: Google AdSense.
Local dev server: `python3 -m http.server 8899 --directory .` → http://localhost:8899

---

## File map (key files only)

| File | Purpose |
|---|---|
| `index.html` | Homepage — hero, tools grid, student hub section, footer |
| `admissions.html` | Admission deadlines table (filter by region/level/status) |
| `scholarships.html` | Scholarships browser (filter by country/type/level) |
| `compare.html` | **University + Course comparison tool** (see below) |
| `tips.html` | Student tips guide with localStorage checklist |
| `css/style.css` | Shared styles — do not duplicate in page `<style>` blocks |
| `js/common.js` | Shared JS: nav hamburger, cookie banner |
| `js/admissions.js` | Admissions page logic |
| `js/scholarships.js` | Scholarships page logic |
| `data/universities.js` | `window.UNI_DATA` — 40 universities (Tier 1), full admissions/accommodation/streams |
| `data/universities_all.js` | `window.UNI_ALL` — 1,000 ranked universities (Tier 2), basic fields: name/country/ranking/website/streams. Auto-generated — DO NOT EDIT manually |
| `data/uni_guide.js` | `window.UNI_GUIDE` — 47 keys (incl. 5 ID aliases), city, CoL, rental links, contacts, leisure |
| `data/courses.js` | `window.COURSES_DATA` — 16 streams, curriculum, assessment, uni-specific programme info |
| `data/scholarships_data.js` | Scholarships database |
| `tools/fetch_all_universities.py` | Regenerates `universities_all.js`. Run: `python3 tools/fetch_all_universities.py` |

---

## compare.html — what's built

Full unified tool: pick 2 universities from **1,040 total** (40 Tier 1 full + 1,000 Tier 2 ranked, 164 countries) + optional course/stream filter. Tier 1 and Tier 2 are merged client-side with deduplication.

**Sections rendered:**
1. Course Details panel (if stream selected) — curriculum, assessment, career outcomes, uni-specific programme names
2. Summary cards (ranking, country, next deadline)
3. Comparison table:
   - Overview (ranking, country, levels, website)
   - Subjects & Streams (common streams highlighted green)
   - Tuition Fees
   - Intakes & Deadlines
   - Accommodation
   - City & Location (Google Maps link, campus city)
   - Nearest Airport (distance + map link)
   - Course Language (with notes)
   - Cost of Living (housing ranges, food, transport, source link)
   - Student Housing Resources (rental portal links)
   - Facilities & Campus Life (leisure tags)
   - Important Contacts (emergency number, police, hospital)

URL params: `?a=mit&b=oxford` — shareable links.

---

## data/uni_guide.js — coverage

**42 guide entries** (40 canonical + 5 aliases):
- Aliases at bottom of file (post-assignment): `tu_munich`, `ntu_sg`, `umelbourne`, `utoronto`, `utokyo`
- All 40 `universities.js` IDs are covered

**Per-entry fields:**
```
city, courseLanguage, languageNotes, mapQuery,
nearestAirport { name, code, distanceKm, mapsQuery },
costOfLiving { currency, monthly { dormRoom, sharedApartment, studioApartment, twoBedroomApt },
               otherMonthly { food, transport, utilities }, source, notes },
rentalLinks [ { label, url } ],
importantContacts { police, hospital, emergencyNumber },
leisure [ { name, type, url? } ]
```

---

## data/courses.js — coverage

**16 streams:** Computer Science, Engineering, Business, Sciences, Medicine, Law,
Arts & Humanities, Social Sciences, Economics, Architecture, Design, Mathematics,
Education, Agriculture, Journalism, Music

**Per-stream fields:**
```
description, icon,
typicalCurriculum { Bachelor, Master, PhD } — duration, core, electives/specialisations, capstone/focus/funding,
assessment { Bachelor, Master, PhD },
careers [],
universities { [uniId]: { programName, notes, admissionsLink } }
```

---

## Key rules (from CLAUDE.md)

- Each tool = separate HTML file, independent
- No paid API calls without confirming with user
- No backend — everything client-side
- Check `tools/` before writing new scripts
- No framework, no build step — plain HTML/CSS/JS

---

## Outstanding / next tasks

- [ ] Audit compare.html in browser (test MIT vs Oxford, CS stream; test non-elite e.g. Griffith vs Naples)
- [ ] Add more universities to `courses.js` uni-specific entries (currently ~10–15 per stream)
- [ ] Expand `uni_guide.js` coverage beyond 40 universities (add CoL/contacts for Tier 2 universities)
- [ ] AdSense unit slots are placeholders — user to insert actual ad unit IDs when account approved
- [ ] Consider GA4 or search console setup once live (see ANALYTICS-SETUP.md)

## To refresh the university database

```bash
cd /Users/guest123/Desktop/freestudenttools
python3 tools/fetch_all_universities.py
# Rewrites data/universities_all.js from Hipolabs API + QS rankings map
```

---

## How to add a new university to uni_guide.js

1. Add entry keyed by `id` from `universities.js` (check `UNI_DATA.universities[].id`)
2. Follow the field schema above
3. If the `id` differs from the guide key, add a post-assignment alias at the bottom:
   `window.UNI_GUIDE.new_id = window.UNI_GUIDE.existing_key;`
4. Verify: `node -e "const vm=require('vm'),fs=require('fs'),s={window:{}};vm.createContext(s);vm.runInContext(fs.readFileSync('data/uni_guide.js','utf8'),s);console.log(Object.keys(s.window.UNI_GUIDE).length)"`

---

## How to add a new course stream to courses.js

1. Add entry under `window.COURSES_DATA.streams["Stream Name"]`
2. Required fields: `description`, `icon`, `typicalCurriculum`, `assessment`, `careers`, `universities`
3. Add the stream name to relevant university `streams` arrays in `universities.js`
