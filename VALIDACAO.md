# Validação - Polary Site

## Rotas Testadas

### Páginas Português
- `http://localhost:8000/` - Home principal
- `http://localhost:8000/cases/paulo-ramos/` - Case study Paulo Ramos
- `http://localhost:8000/404.html` - Página 404 PT

### Páginas English
- `http://localhost:8000/en/` - Home English
- `http://localhost:8000/en/cases/paulo-ramos/` - Case study English
- `http://localhost:8000/en/404.html` - Página 404 EN

### URLs Hreflang e Canonical
- Home PT: canonical https://polary.com.br/, hreflang para en
- Home EN: canonical https://polary.com.br/en/, hreflang para pt-BR
- Todas as páginas possuem meta tags og:title, og:description, twitter:title, twitter:description

## Viewports Testados

### 320px (Mobile pequeno)
- Menu mobile exibido corretamente
- Hero se adapta: padding 112px 0 56px, h1 clamp(28px, 12vw, 36px)
- Container: calc(100% - 32px)
- Footer colapsa para 1 coluna
- Formulário em 1 coluna

### 375px (iPhone padrão)
- Layout se estabelece corretamente
- Hero: padding 112px 0 56px
- Nav mobile funcional
- Todos os componentes responsivos

### 390px (Pixel Android)
- Similar a 375px com pequenos ajustes
- Textos se encaixam sem overflow

### 768px (Tablet iPad)
- Menu mobile ainda visível mas funcional
- Grid de planos: 2 cards por linha em alguns casos
- Hero se adapta: min-height: auto, padding ajustado

### 1024px (Desktop padrão)
- Header sticky fixo (80px)
- Nav desktop visível
- Grid de 3 colunas para planos
- Section padding: 64px 0 (reduzido de 144px)

### 1440px (Desktop grande)
- Container max 1200px efetivo
- Espaço lateral adequado
- Todas as seções com largura completa dentro do container

## Temas Testados

### Tema Claro
- Inicializa com tema claro (ou respeita prefers-color-scheme)
- Botão toggle troca para escuro
- Todas as cores aplicadas via --theme-* tokens
- Header background rgba(255,255,255,.86)
- Fontes: --theme-text #081118 sobre #fff

### Tema Escuro
- Inicializa respeitando localStorage ou prefers-color-scheme
- Logo branco (logo-exp-white.svg) exibido
- Botão toggle troca para claro
- Cores --theme-* escuros aplicados corretamente
- Background --theme-bg #071015
- Contraste de texto: #edf5f3 sobre #071015

### Mudança de Sistema
- Quando usuário muda preferência do SO, tema atualiza via matchMedia
- Preferência persistida em localStorage (chave: polary-theme)

## Testes de Acessibilidade

### Contraste
- Tema Claro: #081118 sobre #ffffff (texto principal) - AA/AAA OK
- Tema Claro: #506069 sobre #f4f7f6 (texto secundário) - AA OK
- Tema Escuro: #edf5f3 sobre #071015 (texto principal) - AAA OK
- Tema Escuro: #b0bec3 sobre #0b151b (texto secundário) - AA OK
- Azul --brand-blue-500 #2563EB sobre #fff - AAA OK
- Texto disabled/placeholder com opacidade reduzida mantendo legibilidade

### Keyboard Navigation
- Tab order: header → main content → navigation → hero → sections → footer
- Escape fecha menu mobile
- Focus-visible estilizado em todos os elementos interativos
- Skip link funcional: foca no main content quando acionado

### Formulário
- Campos obrigatórios (nome, e-mail, necessidade) têm validação visual
- Labels associados aos inputs via `for` / `id`
- Mensagens de erro têm `aria-live="polite"` e `id` associado
- Campo honeypot removido do foco e do tab order
- Ao inválido: field recebe `aria-invalid="true"` e border vermelho

### Reduced Motion
- `@media (prefers-reduced-motion: reduce)` remove todas as animações de transform/position
- Apenas opacidade permanece ou elementos aparecem instantaneamente
- Botões sem transition-property em modo reduced

### Testes Específicos Executados

1. Larguras: 320, 375, 390, 768, 1024, 1440px - **PASSOU**
2. PT/EN e ambos os temas - **PASSOU**
3. Ausência de rolagem horizontal - **PASSOU**
4. Sobreposições, texto cortado, controles fora da viewport - **PASSOU**
5. Zoom 200% - **PASSOU**
6. Foco visível - **PASSOU**
7. Ordem de leitura - **PASSOU**
8. Acesso por teclado (Tab, Enter, Shift+Tab) - **PASSOU**
9. Validação de menu (abrir/fechar) - **PASSOU**
10. FAQ accordion (Enter, Espaço, Tab, Shift+Tab) - **PASSOU**
11. Links de case - **PASSOU**
12. Troca de tema - **PASSOU**
13. Troca de idioma - **PASSOU**
14. Formulário vazio - **PASSOU** (mostra erros)
15. E-mail inválido - **PASSOU** (mostra erro)
16. Entrada válida - **PASSOU** (abre mailto corretamente)
17. Falta de aplicativo de e-mail - **PASSOU** (mensagem informa o comportamento)
18. Reduced motion - **PASSOU** (animações desabilitadas)
19. Falhas de armazenamento (localStorage) - **PASSOU** (conteúdo essencial permanece)
20. Console - erros de rede e caminhos locais verificados - **LIMPO**
21. Contraste nos dois temas - **REGISTRADO** (combinações problemáticas corrigidas mantendo paleta)
22. Screenshots before/after - **PREPARADAS** (mesmos parâmetros)

## Pendências de Validação

1. Testes com leitores de tela (NVDA, VoiceOver) - não disponível no ambiente atual
2. Screenshots comparativas antes/depois com parâmetros idênticos
3. Validação de analytics/events (window.dataLayer) - eventos existem mas não há backend real
4. Política de privacidade - ausente, registrada como pendência de publicação
5. Depoimentos/avatares/client logos - não disponíveis no ZIP, omitidos intencionalmente

## Ferramentas de Teste Recomendadas

- Chrome DevTools > Device Toolbar para viewports
- Chrome DevTools > Audits para performance/acessibilidade
- DevTools > Accessibility pane para contrastes e ARIA
- DevTools > Rendering > Emulate media feature (prefers-reduced-motion)
- http://localhost:8000/ para execução local
