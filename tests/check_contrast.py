"""WCAG contrast of the principal solid color pairs; not a full WCAG audit."""
import json,sys
from pathlib import Path
def luminance(h):
 vals=[int(h[i:i+2],16)/255 for i in (1,3,5)]
 v=[x/12.92 if x<=.04045 else ((x+.055)/1.055)**2.4 for x in vals]
 return sum(a*b for a,b in zip(v,[.2126,.7152,.0722]))
pairs=[('light text','#172537','#fafaf8'),('light secondary','#56616c','#fafaf8'),('light secondary on surface','#56616c','#f0f1ee'),('light accent','#245de5','#fafaf8'),('light button','#ffffff','#245de5'),('light error','#b42318','#f0f1ee'),('dark text','#f0f3f9','#0e141d'),('dark secondary','#b0bdcf','#0e141d'),('dark secondary on surface','#b0bdcf','#151e2a'),('dark accent','#9bb8ff','#0e141d'),('dark button','#101b30','#9bb8ff'),('dark error','#ffb4ab','#151e2a'),('case heading','#f5f1e8','#10223c'),('case accent','#9cbcff','#10223c'),('case caption','#bac9df','#10223c')]
pairs += [('board text','#eaf1ff','#101c30'),('board muted','#afc1df','#101c30'),('board selected button','#ffffff','#284d91'),('board inactive button','#c2d1eb','#15243e')]
results=[]
for label,fg,bg in pairs:
 a,b=sorted([luminance(fg),luminance(bg)]);ratio=(b+.05)/(a+.05)
 results.append({'pair':label,'ratio':round(ratio,2),'passes_4_5':ratio>=4.5})
print(json.dumps(results,indent=2))
sys.exit(not all(r['passes_4_5'] for r in results))
