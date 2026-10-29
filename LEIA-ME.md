# Polary — projeto refatorado

HTML, CSS e JavaScript vanilla. Paleta, Inter, logotipos, rotas PT/EN e eventos `polary_interaction` preservados.

## Abrir localmente

Na pasta do projeto, execute `python -m http.server 8000` e abra http://localhost:8000/. A versão inglesa fica em /en/.
Use um servidor HTTP, não abra o HTML diretamente pelo protocolo file://.

## Publicar

Execute `python build.py` e publique somente o conteúdo de `dist/` na hospedagem estática. O script copia uma lista explícita de arquivos públicos, sem ferramentas, documentação ou arquivos de trabalho. Não é necessário instalar dependências.

O domínio canônico continua https://polary.com.br. Altere metadados, robots e sitemap se mudar o domínio. A configuração de página 404 depende da hospedagem.

## Estrutura

- `assets/css/theme.css`: cores da marca e tokens semânticos dos dois temas.
- `assets/css/site.css`: componentes, layout e responsividade.
- `assets/css/plans.css`: opções de proposta já existentes na página inglesa.
- `assets/js/main.js`: menu, FAQ, navegação, formulário e eventos.
- `assets/js/theme.js`: preferência de tema e metadado theme-color.
- `RELATORIO_REFATORACAO.md`: alterações, AIDA, testes e limites.

O formulário prepara um e-mail no aplicativo do visitante. Não há envio automático nem backend de recebimento. Sem JavaScript, use o e-mail direto.
