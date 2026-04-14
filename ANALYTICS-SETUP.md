# Analytics & Daily Email Report Setup

## What gets tracked automatically

| Event | Trigger |
|-------|---------|
| `ocr_complete` | OCR finished successfully (file type, language, word count) |
| `ocr_error` | OCR failed |
| `ocr_cancelled` | User clicked Cancel |
| `pdf_converted` | PDF converted to Word/Excel (format, page count) |
| `pdf_convert_error` | Conversion failed |
| `pdf_convert_cancelled` | User cancelled conversion |
| `translation_complete` | Translation succeeded (languages, char count, input method) |
| `translation_limit_hit` | ⚠️ MyMemory daily limit reached for a user |
| `translation_error` | Translation API failed |
| `pdf_compressed` | Compression done (level, original KB, compressed KB, saving %) |
| `pdf_compress_error` | Compression failed |
| `pdf_compress_cancelled` | User cancelled compression |

---

## Step 1 — Create a Google Analytics 4 Account (Free)

1. Go to https://analytics.google.com
2. Click **Start measuring**
3. Account name: `FreeStudentTools`
4. Property name: `freestudenttools.com`
5. Select **Web** as platform
6. Enter your website URL: `https://freestudenttools.com`
7. Click **Create stream**
8. Copy your **Measurement ID** — it looks like `G-XXXXXXXXXX`

---

## Step 2 — Add Your Measurement ID to the Site

Open `/js/common.js` and replace line 3:

```javascript
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
```

Replace `G-XXXXXXXXXX` with your actual ID, e.g.:

```javascript
const GA_MEASUREMENT_ID = 'G-AB12CD34EF';
```

---

## Step 3 — Set Up Daily Email Report (Google Looker Studio)

1. Go to https://lookerstudio.google.com (free, sign in with Google)
2. Click **Create → Report**
3. Choose **Google Analytics** as data source
4. Select your `FreeStudentTools` property
5. Click **Add to report**

### Build your daily usage report:

Add these charts to the report:

- **Scorecard**: Event count filtered to `ocr_complete` → "OCR Uses Today"
- **Scorecard**: Event count filtered to `pdf_converted` → "PDF Conversions Today"
- **Scorecard**: Event count filtered to `translation_complete` → "Translations Today"
- **Scorecard**: Event count filtered to `pdf_compressed` → "PDF Compressions Today"
- **Scorecard**: Event count filtered to `translation_limit_hit` → "⚠️ Translation Limit Hits"
- **Time series chart**: All events over time
- **Table**: Event name + count (all events today)

### Schedule daily email:

1. In Looker Studio, click **Share → Schedule email delivery**
2. Add your email address
3. Set frequency: **Daily**
4. Set time: e.g. 8:00 AM
5. Click **Save**

You will now receive a daily email every morning showing exactly how many times each tool was used the previous day, and crucially — how many times users hit the MyMemory translation limit.

---

## Step 4 — Monitor Translation Limit Hits

In GA4 directly:
1. Go to **Reports → Engagement → Events**
2. Look for `translation_limit_hit`
3. If this number is rising, it means users are regularly hitting MyMemory's free limit

**Action threshold**: If `translation_limit_hit` exceeds 20/day, consider upgrading to:
- **DeepL API Free**: 500,000 chars/month free (sign up at deepl.com/pro-api)
- Replace MyMemory URL in `/js/translator.js` with DeepL endpoint

---

## Summary — Monthly Cost

| Service | Cost |
|---------|------|
| Google Analytics 4 | Free |
| Google Looker Studio | Free |
| Daily email reports | Free |
| MyMemory Translation API | Free (per-user limits) |
| All other tools | Free (browser-based) |

**Total: $0/month for full monitoring**
