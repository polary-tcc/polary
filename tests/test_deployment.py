"""Regression: assets, navigation and metadata must stay inside the deployment path."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import subprocess,os,json,sys
ROOT=Path(__file__).resolve().parents[1]
class HTML(HTMLParser):
 def __init__(self,text):super().__init__();self.attrs=[];self.feed(text)
 def handle_starttag(self,tag,attrs):self.attrs.append((tag,dict(attrs)))
results=[]
try:
 for url in ['https://polary-tcc.github.io/polary/','https://example.test/']:
  env={**os.environ,'POLARY_URL':url}
  subprocess.run([sys.executable,'build.py'],cwd=ROOT,env=env,check=True,capture_output=True)
  subprocess.run([sys.executable,'tests/check_site.py'],cwd=ROOT,env=env,check=True,capture_output=True)
  base=urlsplit(url).path
  for file in (ROOT/'dist').rglob('*.html'):
   page=HTML(file.read_text())
   for tag,attrs in page.attrs:
    for key in ['href','src']:
     value=attrs.get(key,'')
     if value.startswith('/'):
      assert value.startswith(base),(file,value,base)
    if attrs.get('rel')=='canonical':assert attrs['href'].startswith(url)
  m=json.loads((ROOT/'dist/site.webmanifest').read_text());assert m['start_url']==base and m['scope']==base
  assert (ROOT/'dist/.nojekyll').is_file()
  assert not (ROOT/'dist/_headers').exists()
  results.append({'url':url,'status':'passed'})
finally:
 # Leave exactly the configured production build, even when a regression fails.
 env=dict(os.environ);env.pop('POLARY_URL',None)
 subprocess.run([sys.executable,'build.py'],cwd=ROOT,env=env,check=True,capture_output=True)
print(json.dumps(results,indent=2))
