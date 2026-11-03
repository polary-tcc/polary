# Atualização 2.1.0 — 03/11/2026

## Diagnóstico da publicação atual

O repositório público `polary-tcc/polary` foi lido nesta sessão. O `index.html` publicado no código aponta estilos e scripts para `/assets/...` e navegação para `/en/`, `/cases/...` e `/`. No GitHub Pages de projeto, o site solicitado fica em `/polary/`; os caminhos antigos saem dessa pasta. A cópia também continha metadados de outra hospedagem e arquivos-fonte soltos na raiz. Não foi necessário inventar outro domínio nem recriar a aplicação.

A leitura do repositório foi permitida; a conexão disponível não tem permissão de escrita. Nenhuma alteração foi enviada ao GitHub. Esta entrega é o pacote para o responsável atualizar sua publicação.

## Correções técnicas

`paths.py` deriva host e prefixo de uma única URL em `content/site.json`. Build, canonical, hreflang, Open Graph, JSON-LD, sitemap, manifest e rotas compartilham essa configuração. Os links públicos agora começam por `/polary/`; links hash, mailto e externos permanecem com sua função original. O pacote tem `index.html` na raiz, evitando confusão entre fonte e pasta publicável.

Há teste de regressão tanto para `https://polary-tcc.github.io/polary/` quanto para uma URL sem subpasta. `.nojekyll` acompanha o pacote. O arquivo `_headers`, específico de outros provedores, não é incluído como configuração pública porque GitHub Pages não o implementa.

## Melhorias da experiência

- Hero editorial com mapa de direção interativo, em vez da ilustração puramente decorativa.
- Marca, tecnologia e dados têm botões nativos, descrição localizada, estado `aria-pressed` e uso por teclado.
- Composição de soluções, divisórias, método, apresentação do case e seção sobre ajustadas.
- Animação de entrada breve, sem loops, respeitando redução de movimento.
- Contato prepara uma mensagem para revisão na página; o visitante decide abrir o aplicativo de e-mail ou copiar.
- Editar um campo invalida a prévia anterior, evitando cópia de uma mensagem desatualizada.
- Documentação direta para upload de pastas e configuração `main / root`.

As fontes do TCC, os logotipos, os idiomas, os temas e o tratamento honesto do case permanecem. Não foram adicionados resultados, clientes, preços, depoimentos ou contatos sem documentação.

## O que continua pendente

Confirmação do e-mail institucional, backend/administração, tester humano, aceite do cliente e validação humana final do inglês. Não há envio automático pelo formulário, nem métricas de resultados implantados. Essas pendências já estavam registradas na versão anterior.

## Como usar a documentação anterior

Os documentos de diagnóstico e arquitetura de 31/10/2026 registram a refatoração 2.0. Esta atualização prevalece para domínio, caminhos, CSS de experiência e fluxo de contato. O guia principal de publicação agora é o README da raiz e `PUBLICAR-NO-GITHUB.md`. O relatório de testes atual é `TESTES-2.1.md`.
