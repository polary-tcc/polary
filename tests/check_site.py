"""Static invariants: broken routes, anchors, ARIA references, metadata and parity."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json,re,sys
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from paths import BASE,SITE_URL
ROOT=Path(__file__).resolve().parents[1];DIST=ROOT/'dist'
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__(convert_charrefs=True);self.tags=[];self.feed(text)
 def handle_starttag(self,tag,attrs):self.tags.append((tag,dict(attrs)))
errors=[];pages={}
for p in DIST.rglob('*.html'):
 if p.name.startswith('__'):continue
 pages[p]=Page(p.read_text())
for p,page in pages.items():
 ids=[a['id'] for t,a in page.tags if 'id'in a]
 for id in set(ids):
  if ids.count(id)>1:errors.append(f'{p}: duplicate id {id}')
 for tag,attrs in page.tags:
  for attr in ['aria-controls','aria-describedby','aria-labelledby','for']:
   for val in attrs.get(attr,'').split():
    if val not in ids:errors.append(f'{p}: {attr} missing target {val}')
  if tag=='img' and not all(x in attrs for x in ['alt','width','height']):errors.append(f'{p}: image lacks alt or dimensions')
  for attr in ['src','href']:
   href=attrs.get(attr,'');url=urlsplit(href)
   if not href or url.scheme or url.netloc:continue
   if href.startswith('/') and not url.path.startswith(BASE):
    errors.append(f'{p}: URL escapes deployment prefix: {href}')
   local=unquote(url.path[len(BASE):]) if href.startswith('/') else unquote(url.path)
   target=DIST/local if href.startswith('/') else p.parent/local
   if not url.path:target=p
   if url.path.endswith('/'):target=target/'index.html'
   target=target.resolve()
   if not target.exists():errors.append(f'{p}: missing {href}')
   if url.fragment and target in pages:
    targetids=[a.get('id') for _,a in pages[target].tags]
    if unquote(url.fragment) not in targetids:errors.append(f'{p}: broken anchor {href}')
 if len([1 for t,a in page.tags if t=='h1'])!=1:errors.append(f'{p}: expected one h1')
 if len([1 for t,a in page.tags if t=='main'])!=1:errors.append(f'{p}: expected one main')
 for match in re.findall(r'<script type="application/ld\+json">(.*?)</script>',p.read_text(),re.S):json.loads(match)
 for name in ['description','viewport']:
  if not any(t=='meta' and a.get('name')==name and a.get('content') for t,a in page.tags):errors.append(f'{p}: missing {name}')
pt=json.loads((ROOT/'content/pt.json').read_text());en=json.loads((ROOT/'content/en.json').read_text())
def shape(a,b,path=''):
 if type(a)!=type(b):errors.append(f'{path}: type mismatch');return
 if isinstance(a,dict):
  if a.keys()!=b.keys():errors.append(f'{path}: translation keys differ')
  for k in a.keys()&b.keys():shape(a[k],b[k],path+'.'+k)
 elif isinstance(a,list):
  if len(a)!=len(b):errors.append(f'{path}: translation count mismatch')
  for i,(x,y) in enumerate(zip(a,b)):shape(x,y,path+f'[{i}]')
shape(pt,en)
for p in DIST.rglob('*'):
 if p.suffix in ['.php','.sql','.env']:errors.append(f'Private backend file in public build: {p}')
print(json.dumps({'pages':len(pages),'errors':errors,'translation_parity':not any('translation' in x for x in errors),'site_url':SITE_URL,'public_bytes':sum(p.stat().st_size for p in DIST.rglob('*') if p.is_file())},ensure_ascii=False,indent=2))
sys.exit(bool(errors))
