"""Local-only matrix matching the real /polary/ deployment path."""
from pathlib import Path
import sys,shutil
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT))
from paths import BASE
preview=ROOT/'preview';target=preview/BASE.lstrip('/')
target.mkdir(parents=True,exist_ok=True);shutil.copytree(ROOT/'dist',target,dirs_exist_ok=True)
routes=['','en/','cases/paulo-ramos/','en/cases/paulo-ramos/','privacidade/','en/privacidade/','creditos/','en/creditos/','404.html','en/404.html','cases/404.html','en/cases/404.html']
widths=[320,375,390,600,768,850,851,1024,1440,1920]
s='<!doctype html><meta charset="utf-8"><title>Polary QA</title><style>body{margin:16px;font:14px Arial;background:#ddd}section{margin-bottom:30px}iframe{height:850px;border:0;display:block;background:white}</style>'
for i,route in enumerate(routes):
 for w in (widths if i<4 else [320,768,1440]):
  url=BASE+route;s+=f'<section><h2>{url} — {w}px</h2><iframe title="{url} {w}" src="{url}" width="{w}" data-route="{url}" data-width="{w}"></iframe></section>'
s+=f'<h2>Sem JS</h2><iframe id="nojs" sandbox="allow-same-origin" title="No JavaScript" src="{BASE}" width="390"></iframe>'
(preview/'__qa.html').write_text(s)
print('Matrix ready in preview/__qa.html; never upload preview/.')
