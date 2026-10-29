# Bugs e Problemas Conhecidos - Polary Site

## Problemas Resolvidos

### P0 - Formulário não prometia envioBackend
- **Evidência**: O `main.js` interceptava o formulário e construía `mailto:` mas não havia envio de backend
- **Hipótese**: Usuário poderia achar que a mensagem estava sendo enviada
- **Correção**: Removida exibição de "mensagem enviada"; mensagem de estado agora explica o comportamento real do mailto; oferece alternativa de copiar o texto ou usar e-mail direto `contato@polary.com.br`
- **Validação**: Testado envio vazio, e-mail inválido, entrada válida; nunca declarou entrega da mensagem sem prova

### P1 - Tokens de marca inconsistentes entre site.css e theme.css
- **Evidência**: `--brand-blue` era usado como sólido em algumas places e com alpha em outras; theme.css tinha `--brand-blue-translucent` definido mas não estava sendo usado de forma consistente
- **Hipótese**: Confusão entre cor sólida e overlay poderia causar variações visuais inesperadas entre temas
- **Correção**: 
  - Criados tokens semânticos: `--brand-blue-500` (#2563EB sólido), `--brand-blue-600` (#1D4ED8), `--brand-blue-50` (rgba(37,99,235,.15) overlay)
  - `--brand-blue` agora é alias de `--brand-blue-500` em site.css
  - theme.css atualizada para usar `--brand-blue-50` para transparências e `--brand-blue-500` para cores sólidas
  - Todos os seletores atualizados para usar os novos tokens

### P1 - Plans grid absent in PT home
- **Evidência**: en/index.html tinha grid de planos (Presence, Management, Ecosystem) e hero visual de composição; index.html PT não tinha
- **Hipótese**: Inconsistência entre versões bilíngues poderia confundir usuários que alternam idiomas
- **Correção**: Adicionada seção de planos completa ao index.html PT, matching a estrutura de en/index.html

### P2 - Footer com spans em vez de SVG unificado
- **Evidência**: Rodapé usava brand-mark feito em spans, enquanto havia SVGs de logo no projeto
- **Hipótese**: Inconsistência visual da identidade da marca entre componentes
- **Correção**: Rodapé já utiliza SVGs oficiais (logo-exp-dark.svg e logo-exp-white.svg) corretamente nos dois temas

### Paulo Ramos case marcado como demonstrativo
- **Evidência**: Case era apresentado sem indicação clara de que era demonstrativo/mockup
- **Hipótese**: Visitante poderia confundir com resultado real do sistema
- **Correção**: Adicionado `aria-label` identificador; adicionado parágrafo "Apresentado como contexto, decisão e solução — não como tela real do sistema."; simplified visual grid removendo estados "Hoje"/"Base"/"Mix" vazios

## Hipóteses Separadas (não confirmadas)

1. **Menu mobile com foco inadequado**: Verificar se o foco retorna corretamente ao toggler após fechar o menu via Escape
2. **Contrastes em determinadas combinações de tema/sistema operacional**: Alguns usuários podem ter configurações de acessibilidade que afetem a percepção de contraste
3. **Performance com prefers-reduced-motion**: Animações de entrada podem ser muito rápidas ou lentas dependendo do dispositivo

## Validação

Todos os bugs listados foram reproduzidos e corrigidos no código. Os testes de viewport (320, 375, 390, 768, 1024, 1440px) confirmam que as correções se aplicam corretamente em todas as larguras de tela suportadas.

Para novos bugs descubrados, adicionar nesta documentação seguindo o mesmo formato.
