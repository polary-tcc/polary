"""One deployment URL, shared by HTML, metadata, manifest and regression checks."""
from urllib.parse import urlsplit
from html import escape
from pathlib import PurePosixPath
import os,json
from pathlib import Path
settings=json.loads((Path(__file__).parent/'content/site.json').read_text())
value=os.environ.get('POLARY_URL',settings['url']).rstrip('/')+'/'
p=urlsplit(value)
if p.scheme not in ('http','https') or not p.netloc or p.query or p.fragment:
    raise ValueError('POLARY_URL must be an absolute http(s) site URL without query or fragment')
ORIGIN=f'{p.scheme}://{p.netloc}'
BASE=p.path.rstrip('/')+'/'
if '..' in BASE.split('/') or '//' in BASE:raise ValueError('Invalid deployment path')
SITE_URL=ORIGIN+BASE

def public_path(path=''):
    return BASE+path.lstrip('/')

def absolute(path=''):
    return ORIGIN+public_path(path)

def localize_html(text):
    # Only URL attributes starting at the web root. Hash/mailto/data/http URLs remain intact.
    import re
    return re.sub(r'\b(href|src|action)="/(?!/)([^"]*)"',lambda m:m[1]+'="'+escape(public_path(m[2]),quote=True)+'"',text)
