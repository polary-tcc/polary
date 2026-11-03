"""Shared semantic components and page bodies; no runtime templating in the browser."""
from pathlib import Path
from html import escape
import json
ROOT=Path(__file__).resolve().parents[1]
site=json.loads((ROOT/'content/site.json').read_text())
E=lambda v: escape(str(v),quote=True)
star='<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 0 60 39 100 50 60 61 50 100 40 61 0 50 40 39Z" fill="currentColor"/></svg>'
arrow='<span aria-hidden="true">↗</span>'
def link(href,label,cls='text-link',extra=''):
    return f'<a class="{cls}" href="{E(href)}" {extra}>{E(label)}{arrow}</a>'
def logo(home):
    return f'<a class="brand" href="{home}" aria-label="Polary"><img class="logo-light" src="/assets/images/logos/logo-exp-dark.svg" width="150" height="36" alt="Polary"><img class="logo-dark" src="/assets/images/logos/logo-exp-white.svg" width="150" height="36" alt="Polary"></a>'
def header(c,lang,kind):
    home='/en/' if lang=='en' else '/'
    suffix={'home':'','case':'cases/paulo-ramos/','privacy':'privacidade/','credits':'creditos/','404':'404.html'}[kind]
    anchors=['solucoes','cases','processo','sobre']
    links=''.join(f'<a href="{home if kind!="home" else ""}#{a}">{E(n)}</a>' for a,n in zip(anchors,c['nav']))
    langs=''.join(f'<a href="{prefix+suffix}" lang="{lg}" hreflang="{lg}"'+(' aria-current="page"' if lg==lang else '')+f'>{lg.upper()}</a>' for lg,prefix in [('pt','/'),('en','/en/')])
    return f'''<header class="site-header" id="top"><div class="wrap header-inner">{logo(home)}
<nav class="primary-nav" aria-label="{E(c['menu'])}">{links}</nav>
<div class="tools"><div class="languages" aria-label="{'Language' if lang=='en' else 'Idioma'}">{langs}</div><button class="theme-toggle" type="button" aria-label="{E(c['theme'])}" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg></button>{link(home+'#contato',c['talk'],'button header-cta')}<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" hidden>{E(c['menu'])}<span aria-hidden="true">＋</span></button></div></div>
<nav class="mobile-nav wrap" id="mobile-menu" aria-label="{'Mobile navigation' if lang=='en' else 'Navegação móvel'}">{links}{link(home+'#contato',c['talk'])}</nav></header>'''
def footer(c,lang):
    home='/en/' if lang=='en' else '/'
    return f'''<footer class="site-footer"><div class="wrap"><div class="footer-top"><div>{logo(home)}<p>{E(c['footerLine'])}</p></div><p>{E(c['footerDescription'])}</p>{link('#top',c['top'])}</div><div class="footer-bottom"><small>© 2026 {E(c['rights'])}</small><nav aria-label="{'Information' if lang=='en' else 'Informações'}"><a href="{home}privacidade/">{E(c['privacy'])}</a><a href="{home}creditos/">{E(c['credits'])}</a><a href="mailto:{E(site['email'])}">{E(site['email'])}</a></nav></div></div></footer>'''
def heading(k,title,text='',cls=''):
    return f'<div class="section-heading {cls}"><p class="eyebrow">{E(k)}</p><h2>{E(title)}</h2>'+ (f'<p class="intro">{E(text)}</p>' if text else '')+'</div>'
def casegraphic(c):
    return f'''<figure class="project-art"><div class="art-top"><span>PAULO RAMOS</span>{star}</div><div class="art-title">{E(c['caseGraphic'][0])}<br><span>{E(c['caseGraphic'][1])}</span></div><div class="art-orbits" aria-hidden="true"><i></i><i></i><i></i><b>PR</b></div><div class="art-flow">{''.join('<span>'+E(s)+'</span>' for s in c['caseFlow'])}</div><figcaption>{E(c['caseGraphicCaption'])}</figcaption></figure>'''
def homebody(c,lang):
    base='/en/' if lang=='en' else '/'
    h=c['hero']; d=c['diagram']
    hero=f'''<section class="hero wrap" id="inicio" aria-labelledby="hero-title"><p class="eyebrow"><span class="signal"></span>{E(c['eyebrow'])}</p><div class="hero-grid"><div class="hero-copy"><h1 id="hero-title">{E(h[0])}<br>{E(h[1])}<br><em>{E(h[2])}</em></h1><p class="hero-intro">{E(c['intro'])}</p><div class="actions">{link('#contato',c['talk'],'button')}{link('#cases',c['projects'])}</div></div><div class="direction" role="img" aria-label="{E(c['diagramLabel'])}"><div class="orbital" aria-hidden="true"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="orbit orbit-three"></div><div class="orbit orbit-four"></div><div class="axis axis-h"></div><div class="axis axis-v"></div><div class="north-star">{star}</div><span class="orbit-point point-one"></span><span class="orbit-point point-two"></span><span class="orbit-point point-three"></span></div><span class="direction-label label-one">{E(d[0])}</span><span class="direction-label label-two">{E(d[1])}</span><span class="direction-label label-three">{E(d[2])}</span><span class="direction-bottom">{E(d[3])}</span></div></div><div class="hero-bottom"><span>POLARY / {E(c['eyebrow'])}</span><a href="#problemas">{E(c['scroll'])}<span aria-hidden="true">↓</span></a></div></section>'''
    problem=f'''<section class="section problem" id="problemas"><div class="wrap problem-grid"><p class="eyebrow">{E(c['problemKicker'])}</p><div><h2>{E(c['problemTitle'])}</h2><p class="intro">{E(c['problemIntro'])}</p></div></div></section>'''
    solutions=heading(c['solutionsKicker'],c['solutionsTitle'],c['solutionsIntro'])
    for i,s in enumerate(c['solutions']):
        solutions+=f'''<article class="solution-row"><span class="index">0{i+1}</span><div><h3>{E(s['title'])}</h3><p class="solution-problem">{E(s['problem'])}</p><ul class="deliverables">{''.join('<li>'+E(x)+'</li>' for x in s['items'])}</ul></div><div class="solution-detail"><p>{E(s['text'])}</p><p class="benefit">{E(s['benefit'])}</p>{link('#contato',c['solutionLink'],'text-link',f'data-need="{i}"')}</div></article>'''
    solutions=f'<section class="section wrap" id="solucoes">{solutions}</section>'
    case=f'''<section class="section project-section" id="cases"><div class="wrap">{heading(c['caseKicker'],c['caseTitle'])}<div class="project-grid">{casegraphic(c)}<div class="project-copy"><p class="eyebrow">{E(c['caseType'])}</p><h3>{E(c['caseName'])}</h3><p class="status"><span class="signal"></span>{E(c['caseStatus'])}</p><p class="intro">{E(c['caseSummary'])}</p><ul class="tags">{''.join('<li>'+E(t)+'</li>' for t in c['caseTags'])}</ul>{link(base+'cases/paulo-ramos/',c['caseLink'],'button button-outline')}</div></div></div></section>'''
    steps=''.join(f'<li><span class="index">0{i+1}</span><h3>{E(s[0])}</h3><p>{E(s[1])}</p><small>{E(s[2])}</small></li>' for i,s in enumerate(c['steps']))
    method=f'<section class="section wrap" id="processo">{heading(c["methodKicker"],c["methodTitle"],c["methodIntro"])}<ol class="timeline">{steps}</ol></section>'
    founders=''.join(f'<div class="person"><span class="monogram" aria-hidden="true">{"GS" if i==0 else "LC"}</span><div><h3>{E(f["name"])}</h3><p>{E(f["role"][lang])}</p></div></div>' for i,f in enumerate(site['founders']))
    about=f'''<section class="section about-section" id="sobre"><div class="wrap about-grid"><div class="about-symbol" aria-hidden="true">{star}<span>POLARIS / POLARY</span></div><div>{heading(c['aboutKicker'],c['aboutTitle'])}{''.join('<p class="intro">'+E(p)+'</p>' for p in c['aboutText'])}<dl class="values">{''.join('<div><dt>'+E(v[0])+'</dt><dd>'+E(v[1])+'</dd></div>' for v in c['values'])}</dl></div><div class="team"><p class="eyebrow">{E(c['team'])}</p>{founders}</div></div></section>'''
    faq=f'<section class="section wrap faq-grid">{heading(c["faqKicker"],c["faqTitle"])}<div class="faq-list">'+''.join(f'<details><summary>{E(q)}<span aria-hidden="true">＋</span></summary><p>{E(a)}</p></details>' for q,a in c['faq'])+'</div></section>'
    def field(name,index,type='text',auto=''):
        return f'<div class="field"><label for="{name}">{E(c["labels"][index])} <span aria-hidden="true">*</span></label><input id="{name}" name="{name}" type="{type}" autocomplete="{auto}" maxlength="{100 if index==0 else 200}" required aria-describedby="{name}-error"><span class="field-error" id="{name}-error"></span></div>'
    contact=f'''<section class="section contact-section" id="contato"><div class="wrap contact-grid"><div>{heading(c['contactKicker'],c['contactTitle'],c['contactIntro'])}<div class="direct-contact"><p>{E(c['emailLabel'])}</p><a href="mailto:{E(site['email'])}">{E(site['email'])} {arrow}</a></div></div><form id="contact-form" aria-describedby="form-note"><p id="form-note" class="form-note">{E(c['formNote'])}</p><div class="form-row">{field('nome',0,auto='name')}{field('email',1,'email','email')}</div><div class="field"><label for="necessidade">{E(c['labels'][2])} <span aria-hidden="true">*</span></label><select id="necessidade" name="necessidade" required aria-describedby="necessidade-error">{''.join('<option value="'+('' if i==0 else str(i))+'">'+E(v)+'</option>' for i,v in enumerate(c['options']))}</select><span class="field-error" id="necessidade-error"></span></div><div class="field"><label for="mensagem">{E(c['labels'][3])} <small>({E(c['optional'])})</small></label><textarea id="mensagem" name="mensagem" rows="4" maxlength="2000" aria-describedby="mensagem-error"></textarea><span class="field-error" id="mensagem-error"></span></div><div class="actions"><button class="button" type="submit" disabled>{E(c['submit'])}{arrow}</button><button class="text-link copy-button" type="button" hidden>{E(c['copy'])}</button></div><p class="form-status" id="form-status" role="status" aria-live="polite"></p><p class="form-note">{E(c['privacyNote'])} <a href="{base}privacidade/">{E(c['privacy'])}</a></p><noscript>{E(c['nojs'])}</noscript></form></div></section>'''
    return hero+problem+solutions+case+method+about+faq+contact

def casebody(c,lang):
    base='/en/' if lang=='en' else '/'
    facts=''.join('<div><dt>'+E(a)+'</dt><dd>'+E(b)+'</dd></div>' for a,b in c['caseFacts'])
    out=f'''<section class="case-hero wrap"><a class="text-link" href="{base}#cases">← {E(c['returnProjects'])}</a><p class="eyebrow">{E(c['caseType'])}</p><h1>{E(c['caseHero'])}</h1><p class="hero-intro">{E(c['caseIntro'])}</p><dl class="case-facts">{facts}</dl></section><div class="wrap">{casegraphic(c)}</div>'''
    out+='<div class="wrap case-story">'
    for k,t,p in c['caseSections']:
        out+=f'<section class="story-row"><p class="eyebrow">{E(k)}</p><div><h2>{E(t)}</h2><p class="intro">{E(p)}</p></div></section>'
    out+='</div>'
    out+=f'<section class="section wrap">{heading(c["caseKicker"],c["scopeTitle"])}<div class="scope-grid">'+''.join('<article><h3>'+E(a)+'</h3><p>'+E(b)+'</p></article>' for a,b in c['caseScope'])+'</div></section>'
    out+=f'<section class="section project-section"><div class="wrap">{heading(c["caseStatus"],c["evidenceTitle"])}<div class="table-scroll"><table><caption class="sr-only">{E(c["evidenceTitle"])}</caption><thead><tr>'+''.join('<th scope="col">'+E(x)+'</th>' for x in c['evidenceHeads'])+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+E(x)+'</td>' for x in r)+'</tr>' for r in c['evidence'])+'</tbody></table></div><div class="source-note"><h3>'+E(c['sourcesTitle'])+'</h3><p>'+E(c['sourcesText'])+'</p></div></div></section>'
    out+=f'<section class="section wrap case-cta"><h2>{E(c["caseCta"])}</h2><p class="intro">{E(c["caseCtaText"])}</p>{link(base+"#contato",c["talk"],"button")}</section>'
    return out
