#!/usr/bin/env python3
"""
update_university_data.py
FreeStudentTools — Daily University & Scholarship Data Updater

Fetches admission deadlines and scholarship info from official university
websites and updates data/universities.js and data/scholarships_data.js.

Usage:
    python3 tools/update_university_data.py

Schedule (GitHub Actions cron): runs daily at 06:00 UTC
See .github/workflows/update-data.yml

Requirements:
    pip install requests beautifulsoup4 lxml python-dotenv

Environment variables (.env):
    OPENAI_API_KEY=...     (optional — used for content parsing/summarising)
    NOTIFY_EMAIL=...       (optional — send email on update failures)
"""

import json
import os
import re
import time
import datetime
import requests
from pathlib import Path
from bs4 import BeautifulSoup

# ─── CONFIG ──────────────────────────────────────────────────────────────────

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
UNI_JS   = DATA_DIR / "universities.js"
SCH_JS   = DATA_DIR / "scholarships_data.js"

TODAY = datetime.date.today().isoformat()

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (compatible; FreeStudentToolsBot/1.0; "
        "+https://freestudenttools.com/bot)"
    ),
    "Accept-Language": "en-US,en;q=0.9",
}

REQUEST_TIMEOUT = 15   # seconds
DELAY_BETWEEN   = 2    # seconds between requests (be polite)

# ─── UNIVERSITY SOURCES ───────────────────────────────────────────────────────
# Each entry: university id + official admissions/scholarships page to scrape.
# Extend this list to cover all 1,500 target universities.

UNIVERSITY_SOURCES = [
    # United States
    {"id": "mit",        "admissions_url": "https://admissions.mit.edu/apply",         "grad_url": "https://gradapply.mit.edu"},
    {"id": "harvard",    "admissions_url": "https://college.harvard.edu/admissions",    "grad_url": "https://gsas.harvard.edu"},
    {"id": "stanford",   "admissions_url": "https://admission.stanford.edu",            "grad_url": "https://gradadmissions.stanford.edu"},
    {"id": "uc_berkeley","admissions_url": "https://admissions.berkeley.edu",           "grad_url": "https://grad.berkeley.edu"},
    {"id": "yale",       "admissions_url": "https://admissions.yale.edu",               "grad_url": "https://gsas.yale.edu"},
    {"id": "columbia",   "admissions_url": "https://undergrad.admissions.columbia.edu", "grad_url": "https://gsas.columbia.edu"},
    {"id": "cmu",        "admissions_url": "https://admission.cmu.edu",                 "grad_url": "https://apply.cmu.edu"},
    {"id": "caltech",    "admissions_url": "https://admissions.caltech.edu",            "grad_url": "https://gradoffice.caltech.edu"},
    # United Kingdom
    {"id": "oxford",     "admissions_url": "https://www.ox.ac.uk/admissions/undergraduate", "grad_url": "https://www.ox.ac.uk/admissions/graduate"},
    {"id": "cambridge",  "admissions_url": "https://www.undergraduate.study.cam.ac.uk/applying", "grad_url": "https://www.graduate.study.cam.ac.uk"},
    {"id": "imperial",   "admissions_url": "https://www.imperial.ac.uk/study/apply/undergraduate", "grad_url": "https://www.imperial.ac.uk/study/apply/postgraduate-taught"},
    {"id": "ucl",        "admissions_url": "https://www.ucl.ac.uk/prospective-students/undergraduate/applying-ucl", "grad_url": "https://www.ucl.ac.uk/prospective-students/graduate/applying-ucl"},
    {"id": "edinburgh",  "admissions_url": "https://www.ed.ac.uk/studying/undergraduate/applying", "grad_url": "https://www.ed.ac.uk/studying/postgraduate/applying"},
    # Australia
    {"id": "umelbourne", "admissions_url": "https://study.unimelb.edu.au/how-to-apply", "grad_url": "https://study.unimelb.edu.au/how-to-apply/graduate"},
    {"id": "usydney",    "admissions_url": "https://www.sydney.edu.au/study/how-to-apply.html", "grad_url": "https://www.sydney.edu.au/study/how-to-apply/postgraduate-coursework.html"},
    {"id": "anu",        "admissions_url": "https://www.anu.edu.au/study/apply", "grad_url": "https://www.anu.edu.au/study/apply"},
    # Canada
    {"id": "utoronto",   "admissions_url": "https://future.utoronto.ca", "grad_url": "https://www.sgs.utoronto.ca/apply"},
    {"id": "mcgill",     "admissions_url": "https://www.mcgill.ca/applying/instructions", "grad_url": "https://www.mcgill.ca/grad-admissions"},
    # Singapore
    {"id": "nus",        "admissions_url": "https://www.nus.edu.sg/oam/undergraduate-admissions", "grad_url": "https://www.nus.edu.sg/registrar/prospective-students/graduate/admissions"},
    {"id": "ntu_sg",     "admissions_url": "https://admissions.ntu.edu.sg", "grad_url": "https://www.ntu.edu.sg/admissions/graduate"},
    # Add more universities here ...
]

SCHOLARSHIP_SOURCES = [
    {"id": "fulbright_foreign",  "url": "https://foreign.fulbrightonline.org"},
    {"id": "chevening",          "url": "https://www.chevening.org/scholarships"},
    {"id": "gates_cambridge",    "url": "https://www.gatescambridge.org"},
    {"id": "clarendon_oxford",   "url": "https://www.ox.ac.uk/clarendon"},
    {"id": "daad_phd",           "url": "https://www.daad.de/en/study-and-research-in-germany/scholarships"},
    {"id": "mext_japan",         "url": "https://www.mext.go.jp/en/policy/education/highered/title02/detail02/sdetail02/1373897.htm"},
    {"id": "gks_korea",          "url": "https://www.studyinkorea.go.kr/en/sub/gks/allnew_gks_k.do"},
    {"id": "csc_china",          "url": "https://www.campuschina.org/scholarships/index.html"},
    {"id": "erasmus_mundus",     "url": "https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en"},
    {"id": "rhodes",             "url": "https://www.rhodeshouse.ox.ac.uk/scholarships"},
    # Add more scholarship sources here ...
]

# ─── HELPERS ─────────────────────────────────────────────────────────────────

def fetch(url: str) -> BeautifulSoup | None:
    """Fetch a page and return a BeautifulSoup object. Returns None on failure."""
    try:
        resp = requests.get(url, headers=HEADERS, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        return BeautifulSoup(resp.text, "lxml")
    except Exception as e:
        print(f"  [WARN] Failed to fetch {url}: {e}")
        return None


def extract_dates(soup: BeautifulSoup, keywords: list[str]) -> list[str]:
    """
    Very lightweight heuristic: look for date strings near keywords.
    Real extraction requires per-university parsing — override in university-
    specific functions below or use the AI-assisted parser (see ai_parse).
    """
    text = soup.get_text(" ", strip=True)
    found = []
    # ISO date pattern
    iso = re.findall(r"\b(20\d{2}[-/]\d{1,2}[-/]\d{1,2})\b", text)
    # Common human format: "1 January 2026", "January 1, 2026"
    human = re.findall(
        r"\b(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+20\d{2})\b",
        text, flags=re.IGNORECASE
    )
    found.extend(iso[:10])
    found.extend(human[:10])
    return found


def load_existing_js(path: Path) -> dict:
    """Read the existing JS data file and parse the JSON object inside it."""
    if not path.exists():
        return {}
    text = path.read_text(encoding="utf-8")
    # Strip the window.VAR_NAME = ... wrapper
    match = re.search(r"window\.\w+\s*=\s*(\{[\s\S]+\});?\s*$", text)
    if not match:
        return {}
    try:
        return json.loads(match.group(1))
    except json.JSONDecodeError:
        return {}


def write_js(path: Path, var_name: str, data: dict) -> None:
    """Write data dict back as a JS file with window.VAR_NAME = {...}."""
    js = f"window.{var_name} = {json.dumps(data, indent=2, ensure_ascii=False)};\n"
    path.write_text(js, encoding="utf-8")
    print(f"  [OK] Wrote {path.name} ({len(data.get('universities', data.get('scholarships', [])))!r} items)")


# ─── UNIVERSITY-SPECIFIC PARSERS ──────────────────────────────────────────────
# Add per-university logic here as you expand coverage.
# Each function receives a soup object and the existing admission record dict,
# and should return an updated dict (or the original if nothing changed).

def parse_mit_deadlines(soup: BeautifulSoup, record: dict) -> dict:
    """Example: MIT uses a simple key-dates table on their admissions page."""
    if soup is None:
        return record
    # Look for specific date patterns — this is a simplified example
    dates = extract_dates(soup, ["deadline", "apply", "decision"])
    if dates:
        print(f"    Dates found on MIT page: {dates[:5]}")
    # In a real implementation, update record["admissions"] here
    return record


UNIVERSITY_PARSERS = {
    "mit": parse_mit_deadlines,
    # Add more: "oxford": parse_oxford_deadlines, etc.
}


# ─── MAIN UPDATE LOOP ─────────────────────────────────────────────────────────

def update_universities() -> None:
    print("\n=== Updating university admission data ===")
    data = load_existing_js(UNI_JS)
    if not data:
        print("  [WARN] Could not load existing universities.js — using empty template")
        data = {"lastUpdated": TODAY, "universities": []}

    uni_map = {u["id"]: u for u in data.get("universities", [])}
    changed = 0

    for source in UNIVERSITY_SOURCES:
        uid = source["id"]
        print(f"\n  Processing {uid}...")

        if uid not in uni_map:
            print(f"    [SKIP] {uid} not in seed data — add to universities.js first")
            continue

        record = uni_map[uid]
        parser = UNIVERSITY_PARSERS.get(uid)

        # Fetch admissions page
        soup = fetch(source["admissions_url"])
        time.sleep(DELAY_BETWEEN)

        if parser and soup:
            record = parser(soup, record)
            changed += 1
        elif soup:
            # Generic fallback — just note we checked
            dates = extract_dates(soup, ["deadline", "application", "apply"])
            if dates:
                print(f"    Possible dates: {dates[:3]}")
            changed += 1

        uni_map[uid] = record

    data["universities"] = list(uni_map.values())
    data["lastUpdated"] = TODAY
    write_js(UNI_JS, "UNI_DATA", data)
    print(f"\n  Done — {changed} universities checked")


def update_scholarships() -> None:
    print("\n=== Updating scholarship data ===")
    data = load_existing_js(SCH_JS)
    if not data:
        print("  [WARN] Could not load existing scholarships_data.js")
        data = {"lastUpdated": TODAY, "scholarships": []}

    sch_map = {s["id"]: s for s in data.get("scholarships", [])}
    changed = 0

    for source in SCHOLARSHIP_SOURCES:
        sid = source["id"]
        print(f"\n  Processing {sid}...")

        soup = fetch(source["url"])
        time.sleep(DELAY_BETWEEN)

        if soup is None:
            continue

        # Look for deadline dates on the page
        dates = extract_dates(soup, ["deadline", "apply", "close"])
        if dates and sid in sch_map:
            # Heuristic: if we find a future date, update the deadline field
            for d in dates[:5]:
                try:
                    # Normalise ISO date
                    parsed = datetime.date.fromisoformat(d[:10])
                    if parsed > datetime.date.today():
                        old = sch_map[sid].get("deadline", "")
                        if str(parsed) != old:
                            print(f"    Deadline update: {old} → {parsed}")
                            sch_map[sid]["deadline"] = str(parsed)
                        break
                except ValueError:
                    continue

        changed += 1

    data["scholarships"] = list(sch_map.values())
    data["lastUpdated"] = TODAY
    write_js(SCH_JS, "SCHOLARSHIP_DATA", data)
    print(f"\n  Done — {changed} scholarships checked")


# ─── ENTRYPOINT ───────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print(f"FreeStudentTools data updater — {TODAY}")
    update_universities()
    update_scholarships()
    print("\nAll done.")
