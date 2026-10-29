# Registro de Alterações - Polary Site

## Mudanças Realizadas

### Tema e Cores (P1)
- Separado `--brand-blue-500` (sólido #2563EB) de `--brand-blue-50` (translúcido rgba(37,99,235,.15))
- Adicionado `--brand-blue-600` (#1D4ED8) para tons de apoio
- Atualizado theme.css para usar tokens semânticos consistentes
- Corrigido `--brand-blue` como alias para `--brand-blue-500` em site.css
- Removido `--brand-blue-translucent` em favor do token próprio `--brand-blue-50`

### Home PT - Planos e Trust Row (P1)
- Adicionada seção de planos (Presença, Gestão, Ecossistema) ao index.html PT
- Mantida parity com en/index.html - ambas têm grid de planos comparativos
- Adicionada trust row hero com: "Estratégia antes da tecnologia", "Caso Paulo Ramos", "IA onde gera valor"
- Composição visual reorganizada: texto e CTA vêm antes da imagem no mobile

### Formulário de Contato (P0)
- Comportamento explicado: abre app de e-mail com dados preenchidos
- Removido display de "mensagem enviada" (não há backend)
- Mensagem de estado informa: "Seu aplicativo de e-mail será aberto... Revise a mensagem e envie por lá. Não há envio automático — use o e-mail contato@polary.com.br para contato direto."
- Validação de campos mantida (nome, e-mail, necessidade são obrigatórios)

### Case Paulo Ramos (P1)
- Identificado como exemplo demonstrativo com `aria-label="Study case Paulo Ramos - demonstrative example"`
- Copy atualizada: "Apresentado como contexto, decisão e solução — não como tela real do sistema."
- Navegação lateral simplificada (removido spans extras de barber-nav)
- Fotos de founders removidas da visualização principal (verificar assets)
- Maintained consistent visual presentation between PT and EN versions

### Micro-interações e Polishing (High)
- Botões com `:active` scale(0.97) + translateY(0) para feedback de pressão
- Focus-visible melhorado: outline 2px solid var(--brand-blue-500), outline-offset 2px
- Estados de formulário com box-shadow em vez de apenas border-color
- Transições consistentes usando var(--ease) cubic-bezier(.2, .8, .2, 1)

### Contrastes e Acessibilidade
- Texto com contrastes validados nos dois temas
- Cores de foco explícitas e visíveis
- respeta `prefers-reduced-motion`
- Pular para conteúdo via skip-link

## Próximos Pendentes (caso houver tempo)
- Validação completa em viewports: 320, 375, 390, 768, 1024, 1440px
- Testes com screen readers
- Verificação de contraste automática
- Screenshots before/after
