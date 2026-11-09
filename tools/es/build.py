# Builds the Spanish pages (es/index.html, es/gracias.html) from the English ones using dict.py,
# and adds the EN | ES switcher and hreflang links. Run after changing index.html or thank-you.html:
#   python3 tools/es/build.py
# It prints any English text with no translation yet (names and brands are expected there).
import re, sys, os
sys.path.insert(0, os.path.dirname(__file__))
from dict import T
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
missing = set()

def tr_text(m):
    raw = m.group(1)
    s = " ".join(raw.split())
    if not s or not any(c.isalpha() for c in s): return m.group(0)
    if s in T:
        lead = raw[:len(raw)-len(raw.lstrip())]; trail = raw[len(raw.rstrip()):]
        return ">" + lead + T[s] + trail + "<"
    missing.add(s); return m.group(0)

def tr_attr(m):
    k, v = m.group(1), m.group(2)
    if v in T: return f'{k}="{T[v]}"'
    if any(c.isalpha() for c in v) and not v.startswith(("http", "width=", "noindex", "/")): missing.add(f"[{k}] {v}")
    return m.group(0)

def translate(html):
    # keep <script>/<style> blocks out of the translation
    parts = re.split(r"(<script\b.*?</script>|<style\b.*?</style>)", html, flags=re.S)
    out = []
    for i, p in enumerate(parts):
        if i % 2: out.append(p); continue
        p = re.sub(r">([^<]+)<", tr_text, p)
        p = re.sub(r'\b(alt|aria-label|placeholder|title|content|data-q)="([^"]*)"', tr_attr, p)
        out.append(p)
    return "".join(out)

SWITCH = '<div class="lang-switch" aria-label="{label}"><a href="{en}" hreflang="en" lang="en"{en_cur}>EN</a><span aria-hidden="true">|</span><a href="{es}" hreflang="es" lang="es"{es_cur}>ES</a></div>\n'

def add_switch(html, en, es, cur, label):
    sw = SWITCH.format(en=en, es=es, label=label, en_cur=' aria-current="true"' if cur == "en" else "", es_cur=' aria-current="true"' if cur == "es" else "")
    i = html.index('<a class="cta" href=', html.index('<div class="nav-links"'))
    return html[:i] + sw + html[i:]

def add_hreflang(html, en, es):
    tags = (f'<link rel="alternate" hreflang="en" href="https://www.seachange.agency{en}">\n'
            f'<link rel="alternate" hreflang="es" href="https://www.seachange.agency{es}">\n'
            f'<link rel="alternate" hreflang="x-default" href="https://www.seachange.agency{en}">\n')
    return html.replace('<link rel="icon"', tags + '<link rel="icon"', 1)

PAGES = [("index.html", "es/index.html", "/", "/es"), ("thank-you.html", "es/gracias.html", "/thank-you", "/es/gracias")]
os.makedirs("es", exist_ok=True)
for src, dst, en_url, es_url in PAGES:
    en = open(src).read()
    if 'class="lang-switch"' not in en:
        en2 = add_switch(en, en_url, es_url, "en", "Language")
        en2 = add_hreflang(en2, en_url, es_url)
        open(src, "w").write(en2)
    else:
        en2 = en
    # Spanish copy from the clean English source (without the switcher), then add its own switcher
    base = en if 'class="lang-switch"' not in en else re.sub(r'<div class="lang-switch".*?</div>\n', "", en, count=1, flags=re.S)
    base = re.sub(r'<link rel="alternate" hreflang="[^"]+" href="[^"]+">\n', "", base)
    es = translate(base)
    es = es.replace('<html lang="en-GB">', '<html lang="es">', 1)
    # internal links
    es = es.replace('href="/thank-you"', 'href="/es/gracias"')
    es = re.sub(r'href="/#', 'href="/es#', es)
    es = es.replace('<a href="/" aria-label="Inicio de SeaChange"', '<a href="/es" aria-label="Inicio de SeaChange"')
    es = es.replace('<a class="cta" href="/" ', '<a class="cta" href="/es" ')
    es = es.replace('<a href="#top" aria-label="Inicio de SeaChange"', '<a href="#top" aria-label="Inicio de SeaChange"')
    es = add_switch(es, en_url, es_url, "es", "Idioma")
    es = add_hreflang(es, en_url, es_url)
    # language-specific scripts
    es = es.replace('<script src="/assets/js/home.js', '<script src="/assets/js/home-es.js?v=1" defer></script>\n<script src="/assets/js/home.js')
    open(dst, "w").write(es)
print("\n".join(sorted(missing)) or "all translated")
