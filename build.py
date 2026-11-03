"""Build all routes with Python's standard library. No runtime dependencies."""
from pathlib import Path
from html import escape
from string import Template
import json, shutil, os
from urllib.parse import urlparse
ROOT=Path(__file__).resolve().parent
DEST=ROOT/'dist'
site=json.loads((ROOT/'content/site.json').read_text())
from paths import ORIGIN as origin, SITE_URL, BASE, absolute, public_path, localize_html
E=lambda v: escape(str(v),quote=True)
T=Template((ROOT/'templates/page.html').read_text())
DEST.mkdir(exist_ok=True)
for child in DEST.iterdir():
    if child.is_dir(): shutil.rmtree(child)
    else: child.unlink()
shutil.copytree(ROOT/'assets', DEST/'assets', ignore=shutil.ignore_patterns('founders', 'cases', 'favicon-16x16.svg', 'favicon-32x32.svg', 'apple-touch-icon.svg'))
from templates.render import header, footer, homebody, casebody, link

routes=[]
for lang in ['pt','en']:
    c=json.loads((ROOT/f'content/{lang}.json').read_text())
    base='/en/' if lang=='en' else '/'
    for kind,suffix in [('home',''),('case','cases/paulo-ramos/'),('privacy','privacidade/'),('credits','creditos/'),('404','404.html'),('404','cases/404.html')]:
        path=base+suffix
        title=c['title'];desc=c['description']
        if kind=='home': body=homebody(c,lang)
        elif kind=='case': body=casebody(c,lang);title=c['casePageTitle'];desc=c['casePageDescription']
        elif kind=='privacy':
            title=c['privacyTitle']+' | Polary';desc=c['privacyIntro']
            body=f'<article class="wrap prose section"><p class="eyebrow">POLARY</p><h1>{E(c["privacyTitle"])}</h1><p class="intro">{E(desc)}</p>'+''.join('<section><h2>'+E(a)+'</h2><p>'+E(b)+'</p></section>' for a,b in c['privacySections'])+'</article>'
        elif kind=='credits':
            title=c['creditsTitle']+' | Polary';desc=c['creditsIntro']
            tester=site['tester'] or c['testerPending']
            body=f'<article class="wrap prose section"><p class="eyebrow">POLARY / TCC</p><h1>{E(c["creditsTitle"])}</h1><p class="intro">{E(desc)}</p><section><h2>{E(c["creditsTeam"])}</h2>'+''.join('<p><strong>'+E(f['name'])+'</strong><br>'+E(f['role'][lang])+'</p>' for f in site['founders'])+f'</section><section><h2>{E(c["testerLabel"])}</h2><p>{E(tester)}</p><p>{E(c["creditsNote"])}</p></section></article>'
        else:
            title=c['notFound']+' | Polary';desc=c['notFoundText']
            body=f'<section class="wrap section error-page"><p class="eyebrow">404 / POLARY</p><h1>{E(c["notFound"])}</h1><p class="intro">{E(desc)}</p>{link(base,c["back"],"button")}</section>'
        equivalent='' if kind=='home' else {'case':'cases/paulo-ramos/','privacy':'privacidade/','credits':'creditos/','404':'404.html'}[kind]
        seo='<meta name="robots" content="noindex,follow">' if kind in ('404','credits') else f'<link rel="canonical" href="{E(absolute(path))}">'
        if kind!='404': seo+=''.join(f'<link rel="alternate" hreflang="{l}" href="{E(absolute(p+equivalent))}">' for l,p in [('pt-BR','/'),('en','/en/'),('x-default','/')])
        schema={'@context':'https://schema.org','@type':'WebPage','name':title,'url':absolute(path),'inLanguage':c['lang'],'isPartOf':{'@type':'WebSite','name':'Polary','url':SITE_URL}}
        if kind=='home': schema['about']={'@type':'Organization','name':'Polary','url':SITE_URL,'email':site['email'],'slogan':c['footerLine']}
        if kind=='case':schema['@type']='Article';schema['author']={'@type':'Organization','name':'Polary'}
        rendered=T.substitute(lang=c['lang'],title=E(title),description=E(desc),seo=seo,url=E(absolute(path)),origin=E(SITE_URL.rstrip('/')),locale='en_US' if lang=='en' else 'pt_BR',schema=json.dumps(schema,ensure_ascii=False).replace('<','\\u003c'),skip=E(c['skip']),header=header(c,lang,kind),body=body,footer=footer(c,lang))
        target=DEST/path.lstrip('/')
        if path.endswith('/'):target=target/'index.html'
        target.parent.mkdir(parents=True,exist_ok=True);target.write_text(localize_html(rendered))
        if kind not in ('404','credits'):routes.append((path,lang,equivalent))
xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'
for path,lang,suffix in routes:
    xml+=f'<url><loc>{E(absolute(path))}</loc>'+''.join(f'<xhtml:link rel="alternate" hreflang="{l}" href="{E(absolute(p+suffix))}"/>' for l,p in [('pt-BR','/'),('en','/en/')])+'</url>'
(DEST/'sitemap.xml').write_text(xml+'</urlset>')
(DEST/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: '+origin+'/sitemap.xml\n')
(DEST/'site.webmanifest').write_text(json.dumps({'name':'Polary','short_name':'Polary','start_url':BASE,'scope':BASE,'display':'browser','background_color':'#fafaf8','theme_color':'#2563eb','icons':[{'src':public_path('assets/images/site/apple-touch-icon.png'),'sizes':'180x180','type':'image/png'}]}))
(DEST/'.nojekyll').touch()
# GitHub Pages does not implement provider-specific _headers files.
print(f'URL: {SITE_URL}')
print(f'Built {len(list(DEST.rglob("*.html")))} HTML pages in {DEST}')
# Optional mirror keeps the repository root ready for Pages (main / root).
if '--sync' in __import__('sys').argv:
    for source in DEST.iterdir():
        target=ROOT/source.name
        if source.is_dir(): shutil.copytree(source,target,dirs_exist_ok=True)
        else: shutil.copy2(source,target)
    print('Generated public files mirrored to repository root.')
