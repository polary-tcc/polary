# Polary — Design System

## Paleta de Cores

### Tokens Semânticos

#### Tema Claro
- `--theme-bg`: `#ffffff` - Fundo principal
- `--theme-bg-soft`: `#f4f7f6` - Superfície clara
- `--theme-panel`: `#ffffff` - Painel
- `--theme-panel-soft`: `#fbfcfc` - Superfície de painel suave
- `--theme-text`: `#081118` - Texto principal
- `--theme-text-secondary`: `#506069` - Texto secundário
- `--theme-text-muted`: `#718087` - Texto em estado-muted
- `--theme-border`: `#dfe5e4` - Borda padrão
- `--theme-border-strong`: `#cbd5d3` - Borda forte
- `--theme-header`: `rgba(255, 255, 255, .86)` - Header com fundo translúcido
- `--theme-input`: `#fbfcfc` - Fundo de input
- `--theme-elevated`: `#ffffff` - Elevação
- `--theme-grid`: `#f8faf9` - Grid de fundo

#### Tema Escuro
- `--theme-bg`: `#071015` - Fundo principal
- `--theme-bg-soft`: `#0b151b` - Superfície suave
- `--theme-panel`: `#0e1a21` - Painel
- `--theme-panel-soft`: `#101e25` - Superfície de painel suave
- `--theme-text`: `#edf5f3` - Texto principal
- `--theme-text-secondary`: `#b0bec3` - Texto secundário
- `--theme-text-muted`: `#89999f` - Texto em estado-muted
- `--theme-border`: `#213139` - Borda padrão
- `--theme-border-strong`: `#32454e` - Borda forte
- `--theme-header`: `rgba(7, 16, 21, .86)` - Header com fundo translúcido
- `--theme-input`: `#0c181e` - Fundo de input
- `--theme-elevated`: `#111f26` - Elevação
- `--theme-grid`: `rgba(255, 255, 255, .035)` - Grid de fundo com sobreposição sutil

#### Azul da Marca (Sempre Sólido)
- `--brand-blue-500`: `#2563EB` - Azul primário sólido (sempre uso este)
- `--brand-blue-600`: `#1D4ED8` - Azul de apoio mais escuro
- `--brand-blue-50`: `rgba(37, 99, 235, .15)` - Azul overlay para superfícies

#### Cores de Estado
- `--danger`: `#ff8f8f` - Erros e alertas
- `--success`: `#62d9bd` - Sucesso
- `--accent-soft`: `#123a33` - Acento suave (dark only)
- `--accent-faint`: `#0c211d` - Acento muito suave (dark only)

### Uso de Overlay vs Cor Sólida

**Regra**: Nunca use `--brand-blue-500` como transparência em sobreposições gerais. Use `--brand-blue-50` (`rgba(37, 99, 235, .15)`) para backgrounds com alpha.

Exceção: O `--brand-blue-500` (#2563EB) permanece como cor sólida para:
- Botões primários (.button--brand)
- Bordas ativas e indicadores
- Estados hover/active
- Texto de destaque

Quando precisar de transparência do azul da marca, use sempre o token `--brand-blue-50` próprio.

## Tipografia

- Fonte principal: `Inter`, com fallbacks `ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- Pesos disponíveis: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- Tamanhos deHeading:
  - H1: `clamp(36px, 6vw, 52px)` - entre 36 e 52px
  - H2: `clamp(36px, 6vw, 52px)` - entre 36 e 52px
  - Body: `18px` com line-height `1.7`
- Altura de linha: 1.5-1.7 para corpo de texto
- Largura de leitura: max-width `45ch` para parágrafos

## Componentes

### Botões
- Altura mínima: 48px
- Border radius: pill (`999px`) ou `var(--radius-md)` 16px
- Estados: hover (translateY(-1px)), active (scale(0.97) + translateY(0))
- Focus-visible: outline 2px solid var(--brand-blue-500), outline-offset 2px
- Cores: `--brand-blue-500` (#2563EB) sobre #fff no claro; mantém-se sólido no escuro

### Formulários
- Inputs: border 1px var(--line-strong), background var(--surface), radius var(--radius-md)
- Focus: border-color var(--brand-blue-500), box-shadow 0 0 0 3px rgba(37,99,235,.15)
- Erro: border-color var(--danger), box-shadow 0 0 0 3px rgba(255,143,143,.1)
- Labels: font-size 14px, font-weight 600, color var(--ink-700)

### Header
- Posição: fixed, height 80px (desktop), 72px (mobile)
- Backdrop blur: 16px
- Transição: background var(--base) var(--ease), box-shadow var(--base) var(--ease)
- Logo: SVG dark/white variant switch via html[data-theme="dark"]

### Footer
- Logo SVG oficial (dark/white variants)
- Links de navegação por coluna
- Copyright dinâmico
- Ano via `#current-year`

## Espaçamento

Escala de 4/8px: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96

- Container máximo: min(1200px, calc(100% - 40px)) no desktop
- No mobile: min(100% - 64px, 960px) @ 1024px, min(100% - 32px, 720px) @ 760px, calc(100% - 32px) @ 420px
- Respiro lateral: 20-24px no mobile, ajustar em telas muito estreitas
- Distância entre seções: 56-72px mobile, 80-112px desktop
- Padding horizontal do container: var(--space-4) = 16px

## Animações

- Transições: `--ease: cubic-bezier(.2, .8, .2, 1)`, `--fast: 180ms`, `--base: 260ms`
- Preferir opacity e transform (properties that skip layout/paint)
- Respeitar `prefers-reduced-motion: reduce`
- Animações de entrada: `--timing-entrance: 400ms` com delay em cascata (100ms increments)
- Button press: scale(0.97) em 160ms ease-out

## Interrupções e Reduzido de Movimento

- `@media (prefers-reduced-motion: reduce)` desabilita todas as animações de transform/position
- Apenas fade 0.2s ease permanece
- Animações de entrada removidas, elementos aparecem instantaneamente
- Transições de botão removidas
