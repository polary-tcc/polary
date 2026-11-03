# Arquitetura e sistema visual

## Separação de responsabilidades

| Caminho | Responsabilidade |
|---|---|
| `content/site.json` | Dados compartilhados e domínio |
| `content/pt.json`, `content/en.json` | Copy e interface localizada |
| `templates/page.html` | Estrutura semântica e metadados comuns |
| `templates/render.py` | Header, footer, home, case e componentes |
| `build.py` | Rotas, exportação e SEO |
| `assets/css/tokens.css` | Marca e temas semânticos |
| `assets/css/site.css` | Fundação, navegação, seções, formulário e reflow |
| `assets/js/theme-init.js` | Tema inicial antes da pintura |
| `assets/js/main.js` | Menu, tema, eventos e contato |
| `tests/` | Verificações e matriz local |
| `docs/` | Decisões, fontes e resultados |
| `dist/` | Única pasta publicável, regenerável |

Uma mudança de header/footer é aplicada em todas as rotas pelo build. Traduções têm paridade de chaves e listas verificada. O template usa escape de conteúdo textual; não interpola entradas do visitante em HTML. Dados estruturados têm escape de `<` para evitar fechamento involuntário de script.

## Informação e conversão

A home apresenta: proposta → contexto do problema → três soluções → projeto documentado → método → origem/equipe → objeções → contato. Cada seção cumpre um papel. O case é uma página de cliente, com estágio e limites explícitos, não uma página de produto SaaS da Polary.

O CTA primário abre o contato. O secundário leva ao case. CTAs de soluções selecionam a necessidade correspondente sem apagar o texto digitado. Não são usados contadores de resultados, depoimentos sem autorização, preços nem prazos genéricos.

## Sistema visual

Azul da marca herdado: #2563EB; acento em texto/ações #245DE5 no claro. Fundo #FAFAF8, texto #172537, secundário #56616C. No escuro, fundo #0E141D, texto #F0F3F9, secundário #B0BDCF e acento #9BB8FF. Os papéis de texto, fundo, borda, foco e erro são semânticos, não dependem da seção.

Tipografia local do sistema (Arial/Helvetica/sans-serif) para eliminar fontes externas e requisições de terceiros. O Guia de Marca não define família obrigatória. Títulos fluidos e corpo 16–18px, com entrelinha generosa. Metadados de apoio menores não carregam instruções essenciais. Grade máxima 1280px; margens de 20–48px por lado conforme largura. Espaçamentos baseados em múltiplos de 8px, com ajustes ópticos. Raios discretos; divisórias editoriais substituem excesso de cards.

O gráfico principal traduz a convergência de marca, dados e tecnologia. Não representa dados quantitativos nem uma funcionalidade de software. O case usa arte tipográfica própria, identificada como conceito. O símbolo deve orientar a narrativa, sem cobrir conteúdo ou receber interações artificiais.

## Acessibilidade

Um h1 por página, landmarks, labels associados, aviso de erro com `aria-describedby`, `aria-invalid`, região de status, foco no primeiro inválido e skip link. Menu é disclosure não modal: links nativos, Escape devolve foco e mudança de breakpoint fecha. FAQ com `details/summary` funciona sem JS. Sem JS, a navegação permanece disponível e o e-mail direto continua utilizável. Formulário sem JS não pode enviar acidentalmente dados pela URL.

Tema acompanha o sistema quando não há escolha gravada; acesso a localStorage protegido por try/catch. Movimentos limitados a feedback breve; CSS respeita `prefers-reduced-motion` e cores forçadas. Não se declara certificação WCAG. Testes com leitores de tela, zoom e dispositivos físicos precisam de verificação humana.

## Segurança, desempenho e SEO

Sem dependências de runtime, trackers externos, credenciais ou chamadas de API. O formulário só prepara mailto; cópia usa texto puro. Eventos contêm apenas tipo/local da interação, sem campos do formulário, com limite de 100 entradas em memória. CSP e cabeçalhos foram propostos em arquivo de configuração; sua aplicação depende do provedor e deve ser verificada após implantação. Não se afirma que o arquivo `_headers` tenha efeito em qualquer hospedagem.

Hero em CSS/SVG elimina foto pesada. Logos têm dimensões explícitas. Não há imagens de conteúdo que exijam lazy loading; só pequenos logotipos/ícones. Recursos legados não usados ficam fora do build público. Script principal é deferido; apenas inicialização de tema, pequena e local, precede o CSS.

Metadados específicos, canonical, hreflang recíproco, Open Graph, Twitter Card sem perfil social inventado, JSON-LD WebPage/Organization/Article e sitemap sem páginas de erro. O domínio é configurável. Créditos e 404 têm noindex. URL da página em inglês preserva correspondência no seletor de idioma.

## Crescimento

Novos cases devem ter fonte, estágio, entregáveis e resultados medidos separados de expectativas. Novas integrações exigem atualizar privacidade e CSP. Um painel administrativo deve usar a autenticação e o backend existentes do sistema, sem criar outro servidor por conveniência. Não transformar arquivo JSON público em repositório de dados pessoais.
