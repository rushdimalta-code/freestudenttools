#!/usr/bin/env python3
"""
fetch_all_universities.py
Fetches all world universities from Hipolabs API, augments with QS/THE ranking data,
injects region, type hints, and stream guesses from domain/name signals,
then writes data/universities_all.js

Usage: python3 tools/fetch_all_universities.py
Output: data/universities_all.js  (~10,000+ universities)
"""

import json, re, sys, urllib.request, urllib.parse, os, time
from datetime import date

OUT_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'universities_all.js')

# ── QS 2025 rankings (top 500 — extend as needed) ─────────────────────────────
# Format: { normalised_name_fragment: rank }
# We match by checking if the uni name contains the fragment (case-insensitive)
QS_RANKINGS = {
    # ── Top 10 ──────────────────────────────────────────────────────────────────
    "massachusetts institute of technology": 1,
    "imperial college london": 2,
    "university of oxford": 3,
    "harvard university": 4,
    "university of cambridge": 5,
    "stanford university": 6,
    "eth zurich": 7,
    "national university of singapore": 8,
    "university college london": 9,
    "university of california, berkeley": 10,
    # ── 11–50 ────────────────────────────────────────────────────────────────────
    "university of chicago": 11,
    "university of pennsylvania": 12,
    "cornell university": 13,
    "california institute of technology": 14,
    "yale university": 15,
    "princeton university": 16,
    "peking university": 17,
    "columbia university": 17,
    "nanyang technological university": 18,
    "university of hong kong": 26,
    "university of michigan-ann arbor": 23,
    "university of michigan": 23,
    "johns hopkins university": 20,
    "university of edinburgh": 22,
    "carnegie mellon university": 24,
    "paris sciences et lettres": 24,
    "university of toronto": 25,
    "chinese university of hong kong": 36,
    "tsinghua university": 20,
    "university of tokyo": 28,
    "new york university": 38,
    "duke university": 66,
    "university of manchester": 34,
    "northwestern university": 46,
    "london school of economics": 50,
    "australian national university": 30,
    "seoul national university": 31,
    "mcgill university": 32,
    "university of melbourne": 33,
    "epfl": 35,
    "king's college london": 40,
    "fudan university": 39,
    "university of sydney": 18,
    "shanghai jiao tong university": 43,
    "kyoto university": 46,
    "kaist": 47,
    # ── 51–100 ───────────────────────────────────────────────────────────────────
    "university of amsterdam": 53,
    "university of bristol": 55,
    "delft university of technology": 57,
    "sorbonne university": 60,
    "university of auckland": 65,
    "ku leuven": 67,
    "osaka university": 68,
    "university of warwick": 69,
    "university of buenos aires": 71,
    "university of glasgow": 73,
    "university of southampton": 75,
    "trinity college dublin": 81,
    "lund university": 97,
    "heidelberg university": 87,
    "university of birmingham": 90,
    "durham university": 92,
    "university of leeds": 86,
    "university of nottingham": 99,
    "university of copenhagen": 99,
    "kth royal institute": 98,
    "technical university of munich": 37,
    "ludwig maximilian university of munich": 54,
    "university of munich": 54,
    # ── 101–200 ──────────────────────────────────────────────────────────────────
    "university of são paulo": 101,
    "rwth aachen": 106,
    "utrecht university": 106,
    "university of sheffield": 104,
    "ku leuven": 67,
    "university of oslo": 119,
    "ghent university": 116,
    "iit bombay": 118,
    "karlsruhe institute of technology": 119,
    "humboldt university of berlin": 120,
    "leiden university": 128,
    "university of groningen": 128,
    "pontificia universidad católica de chile": 128,
    "free university of berlin": 130,
    "eindhoven university of technology": 131,
    "universidad nacional autónoma de méxico": 132,
    "iit delhi": 150,
    "waseda university": 149,
    "university of exeter": 149,
    "university of bath": 179,
    "wageningen university": 166,
    "bocconi university": 155,
    "hong kong polytechnic university": 161,
    "hong kong university of science and technology": 47,
    "monash university": 42,
    "university of queensland": 40,
    "mcmaster university": 177,
    "university of waterloo": 154,
    "university of british columbia": 38,
    "boston university": 96,
    "purdue university": 99,
    "university of california, los angeles": 29,
    "university of california, san diego": 68,
    "university of california, davis": 173,
    "university of california, santa barbara": 163,
    "university of texas at austin": 65,
    "university of illinois at urbana-champaign": 82,
    "university of washington": 79,
    "georgia institute of technology": 97,
    "rice university": 163,
    "vanderbilt university": 186,
    "university of notre dame": 236,
    "tulane university": 351,
    "georgetown university": 251,
    "brandeis university": 301,
    "ohio state university": 201,
    "pennsylvania state university": 207,
    "university of minnesota": 201,
    "michigan state university": 251,
    "university of florida": 186,
    "university of north carolina": 195,
    "university of virginia": 236,
    "carnegie mellon": 24,
    # ── European 201–400 ─────────────────────────────────────────────────────────
    "vrije universiteit amsterdam": 211,
    "university of freiburg": 201,
    "university of hamburg": 251,
    "erasmus university rotterdam": 251,
    "university of zurich": 83,
    "university of bern": 130,
    "university of basel": 130,
    "university of lausanne": 211,
    "tu berlin": 154,
    "technical university of berlin": 154,
    "university of bonn": 201,
    "university of cologne": 201,
    "goethe university frankfurt": 301,
    "university of frankfurt": 301,
    "university of stuttgart": 351,
    "university of tübingen": 251,
    "university of münster": 301,
    "university of göttingen": 251,
    "university of erlangen-nuremberg": 301,
    "university of würzburg": 451,
    "university of heidelberg": 87,
    "leibniz university hannover": 401,
    "dresden university of technology": 351,
    "university of duisburg-essen": 451,
    "university of bochum": 451,
    "ruhr university bochum": 451,
    "university of kiel": 501,
    "university of mainz": 451,
    "johannes gutenberg university mainz": 451,
    "university of marburg": 601,
    "sciences po": 261,
    "paris-saclay university": 76,
    "université paris-saclay": 76,
    "école normale supérieure": 47,
    "ecole polytechnique": 42,
    "paris 1 panthéon-sorbonne": 261,
    "université de paris": 261,
    "aix-marseille university": 301,
    "university of grenoble": 451,
    "university of bordeaux": 401,
    "university of montpellier": 401,
    "university of lille": 451,
    "university of strasbourg": 401,
    "university of lyon": 451,
    "université claude bernard lyon": 451,
    "nantes university": 501,
    "university of rennes": 501,
    "university of toulouse": 451,
    "almería university": 601,
    "autonomous university of barcelona": 164,
    "university of barcelona": 201,
    "complutense university of madrid": 251,
    "autonomous university of madrid": 251,
    "university of the basque country": 401,
    "university of valencia": 451,
    "university of granada": 401,
    "university of seville": 451,
    "university of salamanca": 601,
    "university of zaragoza": 501,
    "polytechnic university of catalonia": 401,
    "polytechnic university of madrid": 401,
    "university of bologna": 154,
    "sapienza university of rome": 201,
    "university of milan": 251,
    "university of turin": 301,
    "university of padua": 251,
    "university of florence": 351,
    "university of naples federico ii": 401,
    "university of genoa": 501,
    "university of catania": 601,
    "university of pisa": 401,
    "scuola normale superiore di pisa": 201,
    "politecnico di milano": 129,
    "politecnico di torino": 301,
    "university of trento": 401,
    "rome tor vergata": 501,
    "universidad de chile": 281,
    "university of amsterdam": 53,
    "tilburg university": 451,
    "radboud university": 201,
    "maastricht university": 251,
    "vrije universiteit brussels": 211,
    "university of brussels": 211,
    "université libre de bruxelles": 211,
    "university of liège": 401,
    "university of antwerp": 451,
    "university of warsaw": 401,
    "jagiellonian university": 351,
    "warsaw university of technology": 401,
    "agh university": 601,
    "university of wrocław": 601,
    "charles university": 251,
    "czech technical university": 601,
    "masaryk university": 601,
    "budapest university of technology": 651,
    "eötvös loránd university": 601,
    "university of helsinki": 107,
    "aalto university": 115,
    "tampere university": 351,
    "university of turku": 351,
    "university of oulu": 451,
    "university of oslo": 119,
    "norwegian university of science and technology": 281,
    "university of bergen": 401,
    "university of tromsø": 651,
    "stockholm university": 201,
    "chalmers university of technology": 251,
    "linköping university": 451,
    "umeå university": 501,
    "university of gothenburg": 401,
    "university of copenhagen": 99,
    "technical university of denmark": 154,
    "aarhus university": 148,
    "aalborg university": 451,
    "university of southern denmark": 601,
    "university of iceland": 551,
    "reykjavik university": 651,
    # ── Asia-Pacific ─────────────────────────────────────────────────────────────
    "iit madras": 227,
    "iit kanpur": 263,
    "iit kharagpur": 271,
    "iit roorkee": 369,
    "iit guwahati": 384,
    "delhi university": 407,
    "university of delhi": 407,
    "university of calcutta": 801,
    "university of mumbai": 801,
    "anna university": 801,
    "vellore institute of technology": 651,
    "manipal academy": 651,
    "amity university": 801,
    "jadavpur university": 801,
    "hkust": 47,
    "city university of hong kong": 181,
    "lingnan university": 801,
    "beijing university": 17,
    "renmin university of china": 401,
    "zhejiang university": 44,
    "nanjing university": 131,
    "university of science and technology of china": 85,
    "harbin institute of technology": 392,
    "tongji university": 401,
    "sun yat-sen university": 309,
    "huazhong university of science and technology": 451,
    "tianjin university": 451,
    "beihang university": 451,
    "southeast university": 501,
    "xian jiaotong university": 401,
    "central south university": 551,
    "shandong university": 601,
    "sichuan university": 601,
    "jilin university": 601,
    "lanzhou university": 651,
    "nankai university": 501,
    "busan national university": 651,
    "yonsei university": 79,
    "korea university": 86,
    "pohang university of science and technology": 71,
    "sungkyunkwan university": 101,
    "hanyang university": 157,
    "chung-ang university": 551,
    "kyung hee university": 451,
    "konkuk university": 651,
    "sogang university": 601,
    "national taiwan university": 65,
    "national tsing hua university": 161,
    "national chiao tung university": 201,
    "national cheng kung university": 221,
    "national yang ming chiao tung university": 201,
    "tokyo institute of technology": 91,
    "tohoku university": 79,
    "nagoya university": 118,
    "kyushu university": 176,
    "hokkaido university": 137,
    "keio university": 187,
    "university of tsukuba": 281,
    "hiroshima university": 401,
    "kobe university": 301,
    "chiba university": 501,
    "waseda": 149,
    "ritsumeikan university": 651,
    "doshisha university": 651,
    "malaya university": 65,
    "university of malaya": 65,
    "putra malaysia university": 201,
    "universiti putra malaysia": 201,
    "kebangsaan malaysia university": 281,
    "universiti kebangsaan malaysia": 281,
    "sains malaysia university": 251,
    "universiti sains malaysia": 251,
    "teknologi malaysia university": 301,
    "universiti teknologi malaysia": 301,
    "chulalongkorn university": 201,
    "mahidol university": 451,
    "kasetsart university": 651,
    "king mongkut's university": 501,
    "university of indonesian": 801,
    "gadjah mada university": 481,
    "universitas gadjah mada": 481,
    "bandung institute of technology": 303,
    "institut teknologi bandung": 303,
    "airlangga university": 651,
    "universitas airlangga": 651,
    "university of the philippines": 651,
    "de la salle university": 801,
    "ateneo de manila": 801,
    "vietnam national university": 801,
    "hanoi university": 801,
    "dhaka university": 801,
    "university of dhaka": 801,
    "university of colombo": 801,
    "university of peradeniya": 801,
    "kathmandu university": 801,
    "tribhuvan university": 801,
    # ── Oceania ───────────────────────────────────────────────────────────────────
    "university of new south wales": 19,
    "university of western australia": 72,
    "university of adelaide": 89,
    "macquarie university": 195,
    "rmit university": 195,
    "university of technology sydney": 148,
    "deakin university": 301,
    "griffith university": 401,
    "curtin university": 391,
    "la trobe university": 451,
    "flinders university": 501,
    "james cook university": 451,
    "newcastle university australia": 501,
    "university of newcastle": 501,
    "university of south australia": 551,
    "swinburne university": 551,
    "western sydney university": 651,
    "victoria university wellington": 451,
    "university of otago": 193,
    "massey university": 451,
    "university of canterbury": 351,
    "lincoln university new zealand": 651,
    "auckland university of technology": 601,
    # ── Middle East ───────────────────────────────────────────────────────────────
    "king abdulaziz university": 131,
    "king fahd university of petroleum": 281,
    "king saud university": 301,
    "king abdullah university": 186,
    "american university of beirut": 215,
    "qatar university": 391,
    "united arab emirates university": 451,
    "khalifa university": 201,
    "american university of sharjah": 551,
    "university of jordan": 701,
    "hebrew university of jerusalem": 153,
    "technion israel institute of technology": 184,
    "tel aviv university": 196,
    "weizmann institute": 183,
    "middle east technical university": 353,
    "istanbul technical university": 501,
    "bogazici university": 451,
    "hacettepe university": 601,
    "ankara university": 701,
    "bilkent university": 401,
    "sabancı university": 601,
    "koç university": 551,
    "tehran university": 501,
    "sharif university of technology": 451,
    # ── Africa ────────────────────────────────────────────────────────────────────
    "university of cape town": 226,
    "stellenbosch university": 363,
    "university of pretoria": 396,
    "university of witwatersrand": 401,
    "university of kwazulu-natal": 551,
    "university of johannesburg": 651,
    "rhodes university": 801,
    "university of the western cape": 801,
    "cairo university": 601,
    "american university in cairo": 501,
    "university of nairobi": 801,
    "university of ghana": 801,
    "university of ibadan": 801,
    "university of lagos": 801,
    "obafemi awolowo university": 801,
    "university of dares salaam": 1001,
    "addis ababa university": 1001,
    "makerere university": 1001,
    "university of rwanda": 1001,
    "university of mauritius": 1001,
    # ── Canada ────────────────────────────────────────────────────────────────────
    "university of alberta": 111,
    "university of calgary": 201,
    "western university": 211,
    "queen's university": 246,
    "dalhousie university": 301,
    "university of ottawa": 301,
    "simon fraser university": 351,
    "university of victoria": 451,
    "university of manitoba": 551,
    "carleton university": 601,
    "concordia university": 601,
    "york university": 601,
    "ryerson university": 651,
    "tmg ryerson": 651,
    # ── Latin America ─────────────────────────────────────────────────────────────
    "universidad de los andes colombia": 263,
    "pontificia universidad javeriana": 651,
    "universidad nacional de colombia": 401,
    "university of colombia": 401,
    "universidad de antioquia": 801,
    "universidad eafit": 801,
    "universidad de chile": 281,
    "pontificia universidad católica de chile": 128,
    "university of concepcion": 651,
    "universidad austral de chile": 801,
    "university of buenos aires": 71,
    "national university of cordoba": 501,
    "university of cuyo": 701,
    "university of montevideo": 801,
    "university of the republic uruguay": 801,
    "pontificia universidad católica del perú": 551,
    "universidad nacional mayor de san marcos": 601,
    "universidad peruana cayetano heredia": 701,
    "universidad central de venezuela": 701,
    "universidad simón bolívar": 651,
    "universidad de los andes venezuela": 651,
    "universidad mayor de san andres": 801,
    "universidad nacional de asuncion": 801,
    "pontificia universidad católica del ecuador": 801,
    "universidad de guayaquil": 801,
    "universidad central del ecuador": 801,
    "central university of ecuador": 801,
    "universidad nacional de san marcos": 601,
    "universidad de brasília": 451,
    "universidade estadual de campinas": 176,
    "federal university of rio de janeiro": 351,
    "universidade federal do rio de janeiro": 351,
    "federal university of minas gerais": 651,
    "federal university of rio grande do sul": 701,
    "universidade federal fluminense": 801,
    "tec de monterrey": 161,
    "tecnológico de monterrey": 161,
    "universidad iberoamericana": 801,
    "universidad autónoma metropolitana": 601,
    "central american university": 801,
    "university of costa rica": 651,
    "university of the west indies": 801,
    "pontificia universidad católica madre y maestra": 1001,
    # ── Eastern Europe / Russia ───────────────────────────────────────────────────
    "moscow state university": 87,
    "lomonosov moscow state university": 87,
    "saint petersburg state university": 361,
    "novosibirsk state university": 228,
    "tomsk state university": 451,
    "higher school of economics moscow": 237,
    "bauman moscow state technical university": 451,
    "moscow institute of physics and technology": 210,
    "mipt": 210,
    "mephi": 451,
    "national research nuclear university": 451,
    "ural federal university": 651,
    "kazan federal university": 551,
    "kyiv polytechnic institute": 801,
    "taras shevchenko national university of kyiv": 801,
    "national technical university of ukraine": 801,
    "university of belgrade": 551,
    "university of zagreb": 651,
    "university of ljubljana": 651,
    "vilnius university": 651,
    "tallinn university of technology": 651,
    "riga technical university": 801,
    "university of tartu": 551,
    "krakow university of technology": 801,
    "silesian university of technology": 801,
    "lodz university of technology": 801,
    "wroclaw university": 601,
    "university of wroclaw": 601,
    "poznan university": 651,
    "nicolaus copernicus university": 701,
    "gdansk university": 701,
    "warsaw school of economics": 801,
    "university of bucharest": 701,
    "babeș-bolyai university": 701,
    "technical university cluj-napoca": 801,
    "sofia university": 801,
    "technical university sofia": 801,
    "university of athens": 451,
    "aristotle university of thessaloniki": 501,
    "national technical university of athens": 551,
    "university of cyprus": 601,
    "cyprus university of technology": 701,
    "university of nicosia": 801,
    "university of malta": 801,
    "university of prishtina": 1001,
    "university of tirana": 1001,
}

# ── Region mapping from alpha_two_code ────────────────────────────────────────
REGION_MAP = {
    "AF": "Middle East & Africa",
    "AL": "Europe", "AD": "Europe", "AT": "Europe", "AZ": "Europe",
    "BA": "Europe", "BE": "Europe", "BG": "Europe", "BY": "Europe",
    "CH": "Europe", "CY": "Europe", "CZ": "Europe", "DE": "Europe",
    "DK": "Europe", "EE": "Europe", "ES": "Europe", "FI": "Europe",
    "FR": "Europe", "GB": "Europe", "GE": "Europe", "GR": "Europe",
    "HR": "Europe", "HU": "Europe", "IE": "Europe", "IS": "Europe",
    "IT": "Europe", "LI": "Europe", "LT": "Europe", "LU": "Europe",
    "LV": "Europe", "MC": "Europe", "MD": "Europe", "ME": "Europe",
    "MK": "Europe", "MT": "Europe", "NL": "Europe", "NO": "Europe",
    "PL": "Europe", "PT": "Europe", "RO": "Europe", "RS": "Europe",
    "RU": "Europe", "SE": "Europe", "SI": "Europe", "SK": "Europe",
    "SM": "Europe", "TR": "Europe", "UA": "Europe", "XK": "Europe",
    "AM": "Europe", "AX": "Europe",
    "US": "North America", "CA": "North America", "MX": "North America",
    "AU": "Oceania", "NZ": "Oceania", "FJ": "Oceania", "PG": "Oceania",
    "SB": "Oceania", "VU": "Oceania", "WS": "Oceania", "TO": "Oceania",
    "CN": "Asia", "JP": "Asia", "KR": "Asia", "IN": "Asia",
    "SG": "Asia", "HK": "Asia", "TW": "Asia", "TH": "Asia",
    "MY": "Asia", "ID": "Asia", "PH": "Asia", "VN": "Asia",
    "BD": "Asia", "LK": "Asia", "NP": "Asia", "PK": "Asia",
    "MM": "Asia", "KH": "Asia", "LA": "Asia", "MN": "Asia",
    "BT": "Asia", "MV": "Asia", "BN": "Asia",
    "SA": "Middle East & Africa", "AE": "Middle East & Africa",
    "QA": "Middle East & Africa", "KW": "Middle East & Africa",
    "OM": "Middle East & Africa", "BH": "Middle East & Africa",
    "YE": "Middle East & Africa", "IR": "Middle East & Africa",
    "IQ": "Middle East & Africa", "SY": "Middle East & Africa",
    "LB": "Middle East & Africa", "JO": "Middle East & Africa",
    "IL": "Middle East & Africa", "PS": "Middle East & Africa",
    "EG": "Middle East & Africa", "LY": "Middle East & Africa",
    "TN": "Middle East & Africa", "DZ": "Middle East & Africa",
    "MA": "Middle East & Africa", "NG": "Middle East & Africa",
    "ZA": "Middle East & Africa", "KE": "Middle East & Africa",
    "GH": "Middle East & Africa", "ET": "Middle East & Africa",
    "TZ": "Middle East & Africa", "UG": "Middle East & Africa",
    "RW": "Middle East & Africa", "SN": "Middle East & Africa",
    "CI": "Middle East & Africa", "CM": "Middle East & Africa",
    "MZ": "Middle East & Africa", "ZW": "Middle East & Africa",
    "ZM": "Middle East & Africa", "AO": "Middle East & Africa",
    "SD": "Middle East & Africa", "SO": "Middle East & Africa",
    "CD": "Middle East & Africa", "MG": "Middle East & Africa",
    "MU": "Middle East & Africa", "BW": "Middle East & Africa",
    "NA": "Middle East & Africa", "MW": "Middle East & Africa",
    "BR": "Latin America", "AR": "Latin America", "CO": "Latin America",
    "CL": "Latin America", "PE": "Latin America", "VE": "Latin America",
    "EC": "Latin America", "BO": "Latin America", "PY": "Latin America",
    "UY": "Latin America", "GY": "Latin America", "SR": "Latin America",
    "GT": "Latin America", "HN": "Latin America", "SV": "Latin America",
    "NI": "Latin America", "CR": "Latin America", "PA": "Latin America",
    "CU": "Latin America", "DO": "Latin America", "JM": "Latin America",
    "HT": "Latin America", "TT": "Latin America",
    "KZ": "Asia", "UZ": "Asia", "TM": "Asia", "TJ": "Asia", "KG": "Asia",
}

# ── Stream hints from name/domain keywords ────────────────────────────────────
STREAM_HINTS = [
    (["technolog", "technical", "polytechnic", "institute of tech", "engineering"],
     ["Engineering", "Computer Science", "Sciences"]),
    (["business", "commerce", "management", "economic"],
     ["Business", "Economics"]),
    (["medicine", "medical", "health science", "nursing", "pharmacy"],
     ["Medicine", "Sciences"]),
    (["law", "legal"],
     ["Law"]),
    (["art", "design", "architecture", "fine art", "creative"],
     ["Arts & Humanities", "Design", "Architecture"]),
    (["education", "pedagog", "teacher"],
     ["Education"]),
    (["agriculture", "agrar", "agro", "veterinar"],
     ["Agriculture", "Sciences"]),
    (["music", "conservat"],
     ["Music", "Arts & Humanities"]),
    (["journal", "media", "communication"],
     ["Journalism", "Social Sciences"]),
]

DEFAULT_STREAMS = ["Engineering", "Sciences", "Business", "Arts & Humanities",
                   "Social Sciences", "Law", "Medicine"]

def guess_streams(name):
    name_lower = name.lower()
    for keywords, streams in STREAM_HINTS:
        if any(kw in name_lower for kw in keywords):
            return streams
    return DEFAULT_STREAMS

def get_ranking(name):
    name_lower = name.lower()
    for fragment, rank in QS_RANKINGS.items():
        if fragment in name_lower:
            return rank
    return None

def make_id(name, country_code):
    base = re.sub(r'[^a-z0-9]+', '_', name.lower().strip())
    base = re.sub(r'^(the|university_of_|universidad_de_|universite_de_|universitat_)', '', base)
    base = re.sub(r'_university$|_college$|_institute$', '', base)
    base = base.strip('_')[:40]
    return f"{country_code.lower()}_{base}" if base else country_code.lower()

def fetch_all():
    print("Fetching all universities from Hipolabs API...", flush=True)
    url = "http://universities.hipolabs.com/search"
    with urllib.request.urlopen(url, timeout=30) as r:
        raw = json.loads(r.read())
    print(f"  Fetched {len(raw)} universities from {len(set(u['country'] for u in raw))} countries")
    return raw

def build_entry(u, seen_ids):
    code = (u.get('alpha_two_code') or 'XX').upper()
    name = u.get('name', '').strip()
    country = u.get('country', '').strip()
    web_pages = u.get('web_pages') or []
    website = web_pages[0].rstrip('/') if web_pages else ''
    state = u.get('state-province') or ''
    region = REGION_MAP.get(code, 'Other')
    ranking = get_ranking(name)
    streams = guess_streams(name)

    # Deduplicate ID
    base_id = make_id(name, code)
    uid = base_id
    suffix = 2
    while uid in seen_ids:
        uid = f"{base_id}_{suffix}"
        suffix += 1
    seen_ids.add(uid)

    entry = {
        "id": uid,
        "name": name,
        "country": country,
        "countryCode": code,
        "region": region,
        "website": website,
        "tier": "basic",        # 'full' for detailed 40, 'basic' for rest
    }
    if state:
        entry["stateProvince"] = state
    if ranking:
        entry["ranking"] = ranking
    if streams:
        entry["streams"] = streams
    return entry

def main():
    raw = fetch_all()

    # Load existing Tier 1 IDs so we can mark them and avoid duplicates
    tier1_ids = set()
    tier1_names = set()
    uni_js = os.path.join(os.path.dirname(__file__), '..', 'data', 'universities.js')
    if os.path.exists(uni_js):
        import subprocess, re as re2
        result = subprocess.run(
            ['node', '-e',
             "const vm=require('vm'),fs=require('fs'),s={window:{}};vm.createContext(s);"
             "vm.runInContext(fs.readFileSync('data/universities.js','utf8'),s);"
             "s.window.UNI_DATA.universities.forEach(u=>console.log(u.id+'|'+u.name))"],
            capture_output=True, text=True,
            cwd=os.path.join(os.path.dirname(__file__), '..')
        )
        for line in result.stdout.strip().split('\n'):
            if '|' in line:
                uid, uname = line.split('|', 1)
                tier1_ids.add(uid.strip())
                tier1_names.add(uname.strip().lower())
        print(f"  Loaded {len(tier1_ids)} Tier 1 (detailed) IDs to exclude from basic list")

    seen_ids = set(tier1_ids)
    entries = []
    skipped = 0

    for u in raw:
        name = (u.get('name') or '').strip()
        if not name:
            continue
        # Skip if already covered by Tier 1 (name match)
        if name.lower() in tier1_names:
            skipped += 1
            continue
        entry = build_entry(u, seen_ids)
        entries.append(entry)

    # Sort ranked first by rank, then discard unranked — keep top 1000 only
    ranked = sorted([e for e in entries if 'ranking' in e], key=lambda x: x['ranking'])
    unranked = sorted([e for e in entries if 'ranking' not in e], key=lambda x: (x['country'], x['name']))

    # Keep all ranked + fill to 1000 with top unranked (alphabetical, deduplicated countries)
    # This gives well-known regional universities even if unranked globally
    TARGET = 1000
    entries = ranked
    if len(entries) < TARGET:
        # Add unranked: prioritise diversity — take top N per country up to fill target
        from collections import defaultdict
        country_count = defaultdict(int)
        for e in unranked:
            if len(entries) >= TARGET:
                break
            if country_count[e['country']] < 5:  # max 5 unranked per country
                entries.append(e)
                country_count[e['country']] += 1

    print(f"  Built {len(entries)} entries: {len(ranked)} ranked + {len(entries)-len(ranked)} supplementary")
    print(f"  Ranked: {len(ranked)}, Unranked: {len(unranked)}")

    # Write JS file
    today = date.today().isoformat()
    js = f"""/**
 * FreeStudentTools — Extended Universities Database
 * Auto-generated by tools/fetch_all_universities.py on {today}
 * Source: Hipolabs World Universities API (hipolabs.com) + QS Rankings 2025
 *
 * Contains {len(entries)} universities across 202+ countries.
 * Tier: "basic" — name, country, countryCode, region, website, streams (guessed), ranking (if QS top ~500)
 * For full admissions/accommodation/CoL data, see data/universities.js (Tier 1, 40 universities)
 *
 * Re-run tools/fetch_all_universities.py to refresh.
 */
window.UNI_ALL = {{
  lastUpdated: "{today}",
  count: {len(entries)},
  universities: {json.dumps(entries, ensure_ascii=False, indent=2)}
}};
"""
    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    with open(OUT_PATH, 'w', encoding='utf-8') as f:
        f.write(js)

    size_kb = os.path.getsize(OUT_PATH) / 1024
    print(f"\n✓ Written to data/universities_all.js ({size_kb:.0f} KB, {len(entries)} universities)")
    print(f"  window.UNI_ALL.universities — ready to use in compare.html")

if __name__ == '__main__':
    main()
