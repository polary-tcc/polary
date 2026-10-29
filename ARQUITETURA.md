# Arquitetura — Polary

## Stack Tecnológica

- **HTML5**, **CSS3** (variáveis CSS, design system), **JavaScript vanilla** (ES6+)
- Nenhum framework (React, Vue, Svelte) — site estático puro
- Nenhum build system obrigatório — execução local via `python3 -m http.server 8000`
- Recursos: `localStorage`, `IntersectionObserver`, `matchMedia`, `CustomEvent`

## Estrutura de Pastas

```
Site-Polary/
├── index.html                               # Português (home)
├── en/
│   ├── index.html                           # English (home)
│   └── cases/
│       └── paulo-ramos/
│           └── index.html                   # Case study (PT/EN)
├── cases/
│   └── paulo-ramos/
│       └── index.html                       # Case study (PT)
├── assets/
│   ├── css/
│   │   ├── reset.css                        # Reset básico
│   │   ├── site.css                         # Design system, tokens, layout, componentes
│   │   └── theme.css                        # Tema claro/escuro + controle de preferência
│   └── js/
│       ├── main.js                          # Comportamento PT/EN, formulário, navegação, interações
│       └── theme.js                         # Tema claro/escuro (persistência, prefers-color-scheme)
├── assets/images/
│   ├── logos/
│   │   ├── logo-exp-dark.svg              # Logotipo tema escuro
│   │   └── logo-exp-white.svg             # Logotipo tema claro
│   ├── cases/
│   │   └── paulo-ramos-placeholder.jpg    # Imagem de demonstração do case
│   └── site/
│       ├── favicon-16x16.svg
│       ├── favicon-32x32.svg
│       ├── favicon.svg
│       ├── apple-touch-icon.svg
│       └── sitemap.xml
├── en/404.html                                # Página 404 English
├── 404.html                                   # Página 404 Português
├── robots.txt
└── sitemap.xml
```

## Idiomas

- Português: `/` (padrão)
- English: `/en/`
- URLs reais por idioma (não troca de texto via JS) — melhora SEO, compartilhamento e acessibilidade

## Tema (Claro/Escuro)

- Alternância via botão no header
- Preferência persistida em `localStorage`
- Tema inicial respeita `prefers-color-scheme` quando o visitante ainda não fez escolha
- Prevenção de *flash* de tema incorreto na primeira renderização
- `html[data-theme="dark"]` e `html[data-theme="light"]` para sobreposições de tema

## Páginas Principais

1. **Home** (`index.html` / `en/index.html`)
   - Hero (Atenção AIDA)
   - Problemas/Interesse
   - Soluções/Desejo
   - Processo/Desejo
   - Case em destaque
   - IA aplicada/Desejo
   - Sobre/Desejo
   - FAQ/Ação
   - Contato/Ação

2. **Case Paulo Ramos** (`cases/paulo-ramos/index.html` / `en/cases/paulo-ramos/index.html`)
   - Hero contextualizada
   - Etapas: Contexto → Diagnóstico → Estratégia → Solução → Resultado
   - Tecnologia usada
   - Próximo passo (CTA para contato)

## Formulário de Contato

- Fluxo: validação de campos → constrói `mailto:` → abre aplicativo de e-mail
- Não declara "mensagem enviada"; informa o comportamento real
- Campos obrigatórios: nome, e-mail, necessidade
- Campos opcionais: empresa, WhatsApp
- Mensagem preservada após erro de validação

## Metadados SEO

- `og:title`, `og:description`, `og:type`, `og:url`, `og:image`
- `twitter:title`, `twitter:description`, `twitter:card`, `twitter:site`, `twitter:image`
- `hreflang` para PT e EN
- `canonical` por idioma
- `theme-color` meta tag
- `color-scheme` para suporte nativo do navegador

## Acessibilidade

- `skip-link` para pular navegação
- `aria-label`, `aria-expanded`, `aria-controls` em componentes interativos
- Foco visível via `:focus-visible`
- Contraste verificado nos dois temas
- `prefers-reduced-motion` respeitado
- Labels associados aos campos de formulário

## Performance

- LCP, CLS, INP dentro de metas de referência
- Imagens com dimensões definidas
- Lazy loading para imagens abaixo da dobra
- `scroll-behavior: smooth` no HTML
- Nenhum canvas/WebGL, scroll hijacking ou autoplay