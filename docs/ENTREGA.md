# Entrega — Polary 2.0.0

## Resultado

Site institucional reestruturado com conteúdo centralizado, componentes compartilhados, design editorial, navegação objetiva, soluções vinculadas a problemas de negócio e estudo de caso baseado no TCC. HTML5/CSS3/JavaScript puro no navegador; sem dependências de runtime. O Python de build gera documentos completos, não uma aplicação dependente de JS para o conteúdo.

## Arquivos modificados ou substituídos

`index.html`, `en/index.html`, os dois cases e quatro erros agora são saídas geradas em `dist/`. `build.py` foi refeito para gerar, não apenas copiar páginas. `assets/css/site.css` e `assets/js/main.js` foram reconstruídos. `theme.css`/`theme.js` foram substituídos por `tokens.css`/`theme-init.js` e lógica de tema no script principal. Robots, sitemap e manifest são gerados. Entraram fontes de conteúdo, templates, privacidade, créditos, testes e documentação. Logotipos e ícones foram preservados. O mapa completo está no README.

## Corrigido

Menu mobile repetido; divergência PT/EN; plano comercial não documentado só em inglês; links legais vazios; obrigatoriedade diferente no contato; tokens de cor ausentes; textos de tema com cores inadequadas; metadados sem fonte única; sitemap com páginas 404; excesso de componentes ilustrativos e scripts sem função após a revisão.

## Preservado

Nome e logotipos, conceito Polaris, azul, temas, idioma com URL própria, case de cliente, FAQ, mailto, preferência persistente, navegação nativa e eventos genéricos em dataLayer. O FAQ mudou para elementos nativos acessíveis, conservando a função e melhorando a disponibilidade sem JS. A proposta comercial permanece por contato e escopo, sem preços inventados.

## Novas melhorias

Home com proposta de valor direta; soluções em linhas editoriais; método com saídas; equipe com nomes/papéis documentados; case com evidências e limitações; paridade de conteúdo; fallback de copiar mensagem; privacidade alinhada ao fluxo real; créditos com pendência do tester explícita; testes de integridade e matriz de reflow.

## Validação

Veja `TESTES.md` e o resultado estático em `tests/static-result.json`. Não confundir testes técnicos do site com aceitação humana do sistema. Reflow foi medido no navegador em 64 combinações; essa medição não substitui teste com dispositivos físicos.

## Limitações atuais

O backend e o painel não foram fornecidos. W1/W2/W3 e a homologação humana de W4 continuam parcialmente ou totalmente pendentes conforme `REQUISITOS_TCC.md`. Nenhuma métrica operacional do cliente foi inventada. Não há integração de CRM ou recebimento automático de formulário. E-mail herdado ainda depende de confirmação. O ambiente de navegador bloqueia mailto, portanto não foi validada a abertura de aplicativo externo nem realizado envio real.

## Recomendações por prioridade

1. Confirmar o e-mail oficial e testar recebimento em dispositivo com aplicativo configurado.
2. Disponibilizar backend real; implementar/homologar W2/W3 na autenticação existente.
3. Realizar testes com Paulo e um tester identificado; registrar W1/S5 e revisar inglês com pessoa identificada.
4. Atualizar os prints do TCC, sumário e diagramas para a versão real.
5. Após uso público, medir Core Web Vitals em campo e a jornada de conversão, sem tratar clique como lead recebido.
6. Só publicar resultados e depoimentos quando medidos e autorizados. Adicionar novos cases com a mesma disciplina de evidência.

## Recuperação

O ZIP original anexado foi preservado durante o trabalho. Para recuperar a versão anterior, use a versão anterior do arquivo enviado ou o ZIP original. Para voltar apenas uma alteração de conteúdo, reverta os arquivos-fonte e execute o build. Não recuperar conteúdo editando `dist/` manualmente.
