"""Temporary same-origin frames for browser reflow checks; never deploy __qa.html."""
from pathlib import Path
routes=['/','/en/','/cases/paulo-ramos/','/en/cases/paulo-ramos/','/privacidade/','/en/privacidade/','/creditos/','/en/creditos/','/404.html','/en/404.html','/cases/404.html','/en/cases/404.html']
widths=[320,375,390,600,768,850,851,1024,1440,1920]
s='<!doctype html><title>Polary QA (temporary)</title><style>body{margin:16px;font:14px Arial;background:#ddd}section{margin-bottom:30px}iframe{height:850px;border:0;display:block;background:white}</style>'
for route in routes:
 for w in (widths if route in routes[:4] else [320,768,1440]):
  s+=f'<section><h2>{route} — {w}px</h2><iframe title="{route} {w}" src="{route}" width="{w}" data-route="{route}" data-width="{w}"></iframe></section>'
(Path(__file__).resolve().parents[1]/'dist/__qa.html').write_text(s)
