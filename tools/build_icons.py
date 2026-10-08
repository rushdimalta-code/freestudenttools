#!/usr/bin/env python3
"""Playful two-tone icon set. Emits CSS (appended to css/style.css between markers)
and replaces stock emojis in visible HTML text with <span class="ic ic-NAME">.
Idempotent: re-running only re-writes the CSS block; emoji already replaced are gone."""
import re, glob, sys, urllib.parse
INK = "#2B2250"
P = dict(y="#FFD36B", m="#7FDDB4", p="#FF9DB5", s="#9DD3FF", l="#C9B8FF", o="#FFB680", w="#FFFFFF")
def svg(body):
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%s" stroke-width="1.8" '
            'stroke-linecap="round" stroke-linejoin="round">%s</svg>' % (INK, body))
I = {
 "book":  svg(f'<path d="M3 5.5c3-1.2 6-1.2 9 .8v13c-3-2-6-2-9-.8z" fill="{P["y"]}"/><path d="M21 5.5c-3-1.2-6-1.2-9 .8v13c3-2 6-2 9-.8z" fill="{P["s"]}"/>'),
 "cal":   svg(f'<rect x="3.5" y="5" width="17" height="15.5" rx="3.5" fill="{P["p"]}"/><path d="M3.5 10h17M8 3v4M16 3v4"/><circle cx="8.5" cy="14.5" r=".9" fill="{INK}"/><circle cx="12" cy="14.5" r=".9" fill="{INK}"/>'),
 "globe": svg(f'<circle cx="12" cy="12" r="9" fill="{P["s"]}"/><path d="M3 12h18M12 3c3.2 3.4 3.2 14.6 0 18M12 3c-3.2 3.4-3.2 14.6 0 18"/>'),
 "plane": svg(f'<path d="M21 3 3 10.5l6.5 2.5L12 19.5z" fill="{P["l"]}"/><path d="M9.5 13 21 3"/>'),
 "tool":  svg(f'<path d="M14.5 6.5a4 4 0 0 0 4.9 4.9l-9.6 9.6a2.1 2.1 0 0 1-3-3L16.4 8.4A4 4 0 0 1 14.5 6.5z" fill="{P["o"]}"/><path d="M14.5 6.5 17 4l2.8 2.8-2.5 2.5"/>'),
 "coin":  svg(f'<circle cx="12" cy="12" r="9" fill="{P["y"]}"/><path d="M14.8 9.2c-.6-1-1.7-1.5-2.9-1.5-1.6 0-2.7.8-2.7 2 0 3 5.8 1.3 5.8 4.3 0 1.2-1.2 2-2.9 2-1.3 0-2.4-.6-3-1.6M12 6v1.7M12 16.3V18"/>'),
 "clip":  svg(f'<rect x="5" y="4.5" width="14" height="17" rx="3" fill="{P["m"]}"/><rect x="9" y="2.5" width="6" height="4" rx="1.5" fill="{P["w"]}"/><path d="M8.5 12h7M8.5 16h4.5"/>'),
 "bank":  svg(f'<path d="M3 9.5 12 4l9 5.5z" fill="{P["l"]}"/><path d="M5.5 11.5v6M10 11.5v6M14 11.5v6M18.5 11.5v6M3.5 20h17"/>'),
 "med":   svg(f'<rect x="3" y="3" width="18" height="18" rx="5" fill="{P["p"]}"/><path d="M12 7.5v9M7.5 12h9"/>'),
 "cap":   svg(f'<path d="m2.5 9.5 9.5-5 9.5 5-9.5 5z" fill="{P["l"]}"/><path d="M6.5 12v4.3c0 1.4 2.5 2.7 5.5 2.7s5.5-1.3 5.5-2.7V12M21.5 9.5v5.5"/>'),
 "chart": svg(f'<rect x="3.5" y="12" width="4.5" height="8.5" rx="1.5" fill="{P["s"]}"/><rect x="9.8" y="5" width="4.5" height="15.5" rx="1.5" fill="{P["y"]}"/><rect x="16" y="9" width="4.5" height="11.5" rx="1.5" fill="{P["m"]}"/>'),
 "warn":  svg(f'<path d="M12 3.5 22 20.5H2z" fill="{P["y"]}"/><path d="M12 10v5M12 17.8v.2"/>'),
 "check": svg(f'<circle cx="12" cy="12" r="9.5" fill="{P["m"]}"/><path d="m7.5 12.5 3 3 6-7"/>'),
 "cross": svg(f'<circle cx="12" cy="12" r="9.5" fill="{P["p"]}"/><path d="m8.5 8.5 7 7M15.5 8.5l-7 7"/>'),
 "lungs": svg(f'<path d="M12 4v8M12 12c0 0-1.5 1.5-3 1.5M12 12c0 0 1.5 1.5 3 1.5" /><path d="M9 7C6 8 4 13 4 17c0 2 1.5 3 3 3s3-1 3-3V9z" fill="{P["p"]}"/><path d="M15 7c3 1 5 6 5 10 0 2-1.5 3-3 3s-3-1-3-3V9z" fill="{P["p"]}"/>'),
 "house": svg(f'<path d="M3.5 11 12 3.5 20.5 11" /><path d="M5.5 10v10h13V10" fill="{P["o"]}"/><rect x="10" y="14" width="4" height="6" rx="1" fill="{P["w"]}"/>'),
 "bag":   svg(f'<rect x="3.5" y="8" width="17" height="12.5" rx="3.5" fill="{P["o"]}"/><path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3.5 13.5h17"/>'),
 "doc":   svg(f'<path d="M6 3h8l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" fill="{P["s"]}"/><path d="M14 3v5h5M8 13h8M8 17h5"/>'),
 "bulb":  svg(f'<path d="M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.2 1.1 2.2h5c0-1 .4-1.6 1.1-2.2A6 6 0 0 0 12 3z" fill="{P["y"]}"/><path d="M9.5 19h5M10.5 21.5h3"/>'),
 "search":svg(f'<circle cx="10.5" cy="10.5" r="6.5" fill="{P["s"]}"/><path d="m15.5 15.5 5 5"/>'),
 "mic":   svg(f'<rect x="8.5" y="3" width="7" height="12" rx="3.5" fill="{P["p"]}"/><path d="M5 11.5a7 7 0 0 0 14 0M12 18.5V21"/>'),
 "heart": svg(f'<path d="M12 20.5C5 15.5 3 12 3 8.8A4.8 4.8 0 0 1 12 6.6a4.8 4.8 0 0 1 9 2.2c0 3.2-2 6.7-9 11.7z" fill="{P["p"]}"/>'),
 "temp":  svg(f'<path d="M10 4.5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0z" fill="{P["o"]}"/><path d="M12 9v7"/>'),
 "brain": svg(f'<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 4.5A3.2 3.2 0 0 0 6 16.5 3 3 0 0 0 9 20h3V4zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 4.5 3.2 3.2 0 0 1-2 5A3 3 0 0 1 15 20h-3V4z" fill="{P["l"]}"/>'),
 "phone": svg(f'<rect x="6.5" y="2.5" width="11" height="19" rx="3" fill="{P["m"]}"/><path d="M10.5 18.5h3"/>'),
 "card":  svg(f'<rect x="2.5" y="5" width="19" height="14" rx="3" fill="{P["l"]}"/><path d="M2.5 10h19M6 15h4"/>'),
 "pen":   svg(f'<path d="m4 20 1-4.5L16.5 4a2.1 2.1 0 0 1 3 3L8 18.5z" fill="{P["y"]}"/><path d="m14.5 6 3 3"/>'),
 "pill":  svg(f'<rect x="2.5" y="8.5" width="19" height="7" rx="3.5" transform="rotate(-35 12 12)" fill="{P["w"]}"/><path d="M12 12 8 8.2a3.4 3.4 0 0 0-1 4.8z" fill="{P["p"]}" transform="rotate(0)"/>'),
 "syr":   svg(f'<path d="m4 20 4-4M7 13l6.5-6.5 4 4L11 17zM13.5 6.5l3-3M15 8l-3-3M17.5 10.5l3-3" fill="{P["s"]}"/>'),
 "dot_g": svg(f'<circle cx="12" cy="12" r="7" fill="{P["m"]}"/>'),
 "dot_y": svg(f'<circle cx="12" cy="12" r="7" fill="{P["y"]}"/>'),
 "dot_b": svg(f'<circle cx="12" cy="12" r="7" fill="{P["s"]}"/>'),
 "star":  svg(f'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" fill="{P["y"]}"/>'),
}
MAP = {"📖":"book","📚":"book","📅":"cal","🌐":"globe","🌍":"globe","✈":"plane","🛬":"plane","🔧":"tool","💰":"coin","💸":"coin",
 "📋":"clip","📝":"clip","🏦":"bank","🏛":"bank","🏥":"med","🩺":"med","🎓":"cap","📊":"chart","⚠":"warn","✅":"check","✓":"check",
 "✗":"cross","✕":"cross","❌":"cross","🫁":"lungs","🏠":"house","🧳":"bag","💼":"bag","📄":"doc","💡":"bulb","🔍":"search","🎤":"mic",
 "💙":"heart","🌡":"temp","🧠":"brain","📱":"phone","💳":"card","✍":"pen","💊":"pill","💉":"syr","🟢":"dot_g","🟡":"dot_y","🔵":"dot_b","★":"star"}
LABEL = {"check":"Yes","cross":"No","warn":"Warning"}
EM = re.compile("(" + "|".join(map(re.escape, MAP)) + ")[️‍]?")
SKIP = {"script","style","title","option","textarea","noscript","svg"}

def css():
    out = ["/* BEGIN icons */",
           ".ic{display:inline-block;width:1.15em;height:1.15em;vertical-align:-.2em;background:center/contain no-repeat;flex-shrink:0}"]
    for n, s in I.items():
        out.append(".ic-%s{background-image:url(\"data:image/svg+xml,%s\")}" % (n, urllib.parse.quote(s, safe="/:=,' ()-.")))
    out.append("/* END icons */")
    return "\n".join(out)

def span(m):
    n = MAP[m.group(1)]
    a = ' role="img" aria-label="%s"' % LABEL[n] if n in LABEL else ' aria-hidden="true"'
    return '<span class="ic ic-%s"%s></span>' % (n, a)

def convert(html):
    parts = re.split(r"(<!--.*?-->|<[^>]+>)", html, flags=re.S); stack = []; n = 0
    for i, p in enumerate(parts):
        if p.startswith("<"):
            if p.startswith("<!--"): continue
            m = re.match(r"<(/?)([a-zA-Z0-9]+)", p)
            if m:
                tag = m.group(2).lower()
                if tag in SKIP:
                    if m.group(1): 
                        if stack and stack[-1] == tag: stack.pop()
                    elif not p.endswith("/>"): stack.append(tag)
            continue
        if not stack and EM.search(p):
            parts[i], k = EM.subn(span, p); n += k
    return "".join(parts), n

if __name__ == "__main__":
    css_path = "css/style.css"; c = open(css_path).read()
    c = re.sub(r"\n?/\* BEGIN icons \*/.*?/\* END icons \*/", "", c, flags=re.S).rstrip("\n") + "\n\n" + css() + "\n"
    open(css_path, "w").write(c)
    if "--css-only" in sys.argv: sys.exit()
    files = [f for g in ("*.html", "blog/*.html", "scholarship/*.html") for f in glob.glob(g)]
    tot = 0
    for f in files:
        s = open(f).read(); t, k = convert(s)
        if k: open(f, "w").write(t); tot += k
    print("replaced", tot, "emoji across", len(files), "files")
