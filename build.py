"""Produce only public files in dist/, using Python's standard library."""
from pathlib import Path
import shutil
ROOT = Path(__file__).resolve().parent
DEST = ROOT / 'dist'
DEST.mkdir(exist_ok=True)
for name in ['index.html', '404.html', 'en', 'cases', 'assets', 'site.webmanifest', 'robots.txt', 'sitemap.xml', 'safari-pinned-tab.svg']:
    source, target = ROOT / name, DEST / name
    if source.is_dir():
        if target.exists(): shutil.rmtree(target)
        shutil.copytree(source, target)
    else:
        shutil.copy2(source, target)
print(f'Public files ready: {DEST}')
