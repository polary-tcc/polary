# Polary — refatoração de 29/10/2026

## Identidade e diagnóstico

Preservados: nome, logo vetorial original, metáfora Polaris, posicionamento “Estratégia antes da tecnologia”, família Inter, azul #2563EB e superfícies claras/escuras existentes. A comunicação apresenta consultoria de estratégia, tecnologia e dados. Empresas com rotinas fragmentadas são o público sugerido pelo conteúdo; não há pesquisa de audiência anexada.

Confirmado no código original: múltiplas camadas de sobrescritas em site.css, theme.css e refinement.css; navegação interceptada por main.js e refinement.js; preenchimento contextual sobrescrevendo mensagens; painéis fechados com atraso; diferenças de marcação entre PT/EN; campos opcionais aumentando esforço de contato. A página inglesa contém planos que não existem na portuguesa: foram preservados e receberam estilos próprios, sem inventar condições comerciais nem traduzi-los para a página PT sem validação do escopo.

Confirmado em navegador nesta revisão: composição anterior e nova; comportamento de FAQ, menu e validação; transbordamento de card na menor largura, corrigido. Hipóteses não validadas com pessoas: compreensão da proposta e efeito das alterações sobre conversão.

## Alterações

| Arquivo | Seção/seletor | Alteração | Princípio | Verificação |
|---|---|---|---|---|
| assets/css/theme.css | :root e data-theme | Tokens semânticos centralizados; cores sólidas e contraste de texto | Consistência | Troca de tema e inspeção visual |
| assets/css/site.css | Componentes e media queries | Substituição da cascata antiga por folha única, responsiva e organizada | Manutenção e reflow | Matriz de larguras no navegador |
| index.html; en/index.html | .hero | Proposta concreta e diagrama conceitual de operação conectada | Clareza da proposta de valor | Desktop e tela estreita |
| HTML de home/cases | .brand | Mesmo SVG de marca em header/rodapé e ambos os idiomas | Consistência | Assets locais encontrados |
| Homes | .solution-content | Problema atendido e entregas por serviço | PAS e escaneabilidade | Inspeção do conteúdo |
| Homes | .process-flow | Etapas ligadas a entregas e decisões | Redução de incerteza | Lista semântica preservada |
| Homes e cases | .case-copy; .case-story-content | Estado em desenvolvimento e ilustração identificada | Transparência | Inspeção de conteúdo |
| Homes | #contact-form | Remoção de Empresa/WhatsApp; instrução antes da ação; nome/e-mail/necessidade obrigatórios | Redução de esforço | Validação vazia no navegador |
| main.js | links internos | Hash e histórico nativos; foco no destino | Navegação por teclado | Hash #solucoes e foco confirmados |
| main.js | menu | Escape, clique externo, fechamento ao sair do header e breakpoint de 1160px | Menu não modal | Abertura/fechamento/Escape |
| main.js | FAQ | Respostas legíveis no HTML; JS inicializa estado fechado | Melhoria progressiva | Abertura e aria-expanded |
| main.js | painéis | Ocultação imediata; mensagem já digitada preservada | Prevenção de perda de dados | Expansão e comparação EN |
| main.js | analytics | Início, erro de formulário, FAQ e localização de CTA; sem dados pessoais | Mensuração | Revisão estática |
| theme.js | theme-color | Cor clara alinhada ao fundo #ffffff | Coerência | Tema persistido após navegação |
| build.py | exportação | Pasta pública por lista permitida | Separação entre fonte e publicação | Execução do script |

Removidos `assets/css/refinement.css` e `assets/js/refinement.js`: as responsabilidades foram incorporadas aos arquivos principais. Nenhuma migração de framework ou dependência foi adicionada.

## Mapa AIDA

| Seção | Etapa principal | Técnica | Próxima ação |
|---|---|---|---|
| Hero | Atenção | Proposta concreta, hierarquia e dois CTAs distintos | Explorar o projeto ou conversar |
| Problemas e soluções | Interesse | Problema, consequência e entrega | Identificar a necessidade |
| Processo | Interesse | Etapas e critérios claros | Entender como o trabalho acontece |
| Case, princípios, IA e equipe | Desejo | Exemplo específico, contexto e transparência | Avaliar adequação |
| FAQ e contato | Ação | Respostas e redução de campos | Preparar e enviar o e-mail no próprio aplicativo |

## Validação realizada

- `node --check` nos arquivos JavaScript: aprovado.
- Oito documentos HTML: referências locais, âncoras, IDs duplicados e controles ARIA verificados; zero erros encontrados.
- Navegador: home PT, tema claro/escuro, persistência do tema após navegação, FAQ, formulário vazio, foco e hash em navegação.
- Menu mobile: abertura e fechamento com Escape confirmados.
- Inglês: três expansões de planos presentes; primeira expansão e comparação abertas com sucesso.
- Matriz de reflow: home e case PT/EN em frames de 320, 375, 390, 768, 1024, 1159, 1160, 1440 e 1920px. O navegador reservou 15px para a barra vertical; largura útil observada de 305 a 1905px. Sem overflow de página após corrigir o card na menor largura. Isso não substitui teste em dispositivos físicos.
- Console consultado: registros de erro da extensão do ambiente; nenhum erro da aplicação identificado na amostra consultada.
- Conteúdo principal permanece visível sem depender de observer/animação. FAQ disponível no HTML sem JS. Submit desativado no HTML e ativado após inicialização; link de contato direto permanece disponível.

## Limites e pendências

Não foi feito envio de e-mail real, implantação pública, auditoria WCAG completa, teste com leitor de tela, teste de zoom em dispositivo físico ou medição de Core Web Vitals. Não se declara conformidade AA ou ganho de conversão.

O fluxo mailto depende de aplicativo configurado no dispositivo. Eventos no dataLayer não significam analytics conectado nem lead recebido. Mensagens permanecem no formulário; não há confirmação de recebimento.

Confirmar comercialmente os planos existentes apenas no inglês antes de unificar sua oferta com PT. Fotos fornecidas não foram adicionadas sem confirmar a correspondência das pessoas. Não foram inventados depoimentos, métricas, preços ou prazos.
