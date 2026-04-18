# Workflow: Daily University & Scholarship Data Refresh

**Objective:** Keep admissions deadlines and scholarship data current without manual work.  
**Schedule:** 06:00 UTC daily via GitHub Actions.  
**Owner:** FreeStudentTools Data Bot (automated)

---

## Inputs
- `data/universities.js` — Tier 1 university seed data (40 universities, manually curated)
- `data/scholarships_data.js` — Scholarship seed data (~800+ entries)
- `tools/update_university_data.py` — scraper/updater script

## Tool Sequence
1. GitHub Actions triggers on cron schedule (`.github/workflows/update-data.yml`)
2. `python3 tools/update_university_data.py` — fetches each university admissions page, extracts deadline dates, updates records
3. `git commit` only if data changed — no empty commits
4. `git push origin main` — GitHub push triggers Netlify auto-deploy (if repo is connected)
5. Netlify deploy hook called as fallback if repo not connected to Netlify

## Outputs
- Updated `data/universities.js` with fresh deadlines and `lastUpdated` date
- Updated `data/scholarships_data.js` with refreshed deadline dates
- New Netlify deployment (live within ~30 seconds)

## Edge Cases
- **Fetch failure:** `update_university_data.py` prints `[WARN]` and continues — partial update is committed
- **No changes detected:** `git diff --staged --quiet` exits 0 — no commit, no redeploy (saves build minutes)
- **GitHub Actions rate limit:** cron jobs do not count against API rate limits
- **Netlify build hook not set:** step is skipped with `if: env.NETLIFY_DEPLOY_HOOK != ''`

---

## One-Time Setup (required before first run)

### Step 1 — Push repo to GitHub
```bash
cd /Users/guest123/Desktop/freestudenttools
git remote add origin https://github.com/YOUR_USERNAME/freestudenttools.git
git push -u origin main
```

### Step 2 — Connect Netlify to GitHub (replaces drag-and-drop)
1. Netlify dashboard → your site → **Site configuration → Build & deploy → Link repository**
2. Choose GitHub → select `freestudenttools` repo → branch `main`
3. Build command: *(leave blank — static site)*
4. Publish directory: `.`
5. Save → Netlify will redeploy on every push automatically

### Step 3 — Add Netlify deploy hook as GitHub secret (fallback)
1. Netlify → Site configuration → Build & deploy → **Build hooks** → Add hook → name it `github-actions`
2. Copy the hook URL
3. GitHub repo → Settings → Secrets and variables → Actions → **New secret**
4. Name: `NETLIFY_DEPLOY_HOOK`, value: the hook URL from step above

### Step 4 — Verify first run
1. GitHub → Actions tab → `Daily University & Scholarship Data Refresh`
2. Click **Run workflow** to trigger manually and confirm it completes green

---

## Extending Coverage
To add more universities to the daily scrape, add entries to `UNIVERSITY_SOURCES` in `tools/update_university_data.py`:
```python
{"id": "your_uni_id", "admissions_url": "https://...", "grad_url": "https://..."},
```
The `id` must match an existing entry in `data/universities.js`.

To add per-university date parsing, implement a parser function and register it in `UNIVERSITY_PARSERS`.
