# Polary — edição em um único index.html

O código editável está inteiro em **index.html**: HTML, CSS dentro de `<style>` e JavaScript no final. Não há templates, gerador, JSON externo, npm ou etapa de build. O layout usa CSS próprio e JavaScript puro.

As únicas pastas de recursos são `fotos/`, `fontes/` e `imagens/`. Envie essas pastas junto do HTML. As fontes Inter e Poppins estão incluídas localmente, com suas licenças, sem depender do Google Fonts para abrir o site.

## Onde editar

| O que mudar | Onde procurar no index.html |
|---|---|
| Cores | `:root` e `html[data-theme=dark]`, no começo do CSS |
| Tamanhos e recorte das fotos | `EDIÇÃO RÁPIDA — FONTES E FOTOGRAFIAS` |
| Textos em português | `EDITE AQUI: CONTEÚDO EM PORTUGUÊS` |
| Textos em inglês | `EDITE AQUI: ENGLISH CONTENT` |
| Menu, idioma, tema e formulário | `JAVASCRIPT — menu, temas, idioma e formulário` |
| Endereço de contato | Procure `contato@polary.com.br` e substitua todas as ocorrências após confirmar o e-mail oficial |

Mantenha os IDs e atributos `data-*` usados pelo JavaScript. Os textos PT e EN estão no mesmo arquivo, em blocos identificados. A troca de idioma funciona sem carregar outra página. Estudo de caso, privacidade e créditos usam seções expansíveis nativas no mesmo index.

## Trocar fotos

A forma mais simples é substituir o arquivo na pasta mantendo o mesmo nome. Isso atualiza o português e o inglês ao mesmo tempo.

| Bloco | Arquivo | Original incluído | Proporção de exibição |
|---|---|---|---|
| Foto principal | `fotos/negocio.png` | 510 × 510 px | 1:1 |
| Projeto Paulo Ramos | `fotos/fachada.png` | 608 × 459 px | 4:3 |
| Foto ao lado do Sobre | `fotos/ambiente.png` | 510 × 510 px | 1:1 |
| Foto alternativa, não usada inicialmente | `fotos/cadeira.png` | 510 × 510 px | 1:1 sugerido |

As três fotos usadas vêm dos arquivos do TCC e mostram o **cliente Paulo Ramos**. As legendas não apresentam o ambiente como sede da Polary.

O CSS usa `width: 100%`, `aspect-ratio` e `object-fit: cover`. A foto ocupa a área sem esticar; o excesso pode ser recortado. Ajuste `object-position: 50% 50%` para mudar o ponto de atenção. Hero limitado a 510px e foto do projeto a 608px, evitando ampliar além da largura original.

Para uma nova foto, prefira 1024 × 1024 px no hero/sobre e 1200 × 900 px no projeto. Atualize `alt` para descrever a imagem real. Se mudar extensão ou proporção original, atualize também `src`, `width` e `height` nos dois blocos de idioma. As dimensões do atributo descrevem o arquivo; o CSS define o enquadramento visual.

## Publicar no GitHub Pages

Extraia e envie **o conteúdo deste pacote para a raiz do repositório polary-tcc/polary**, preservando as três pastas. O `index.html` deve ficar ao lado de `fotos`, `fontes` e `imagens`.

A configuração da publicação continua `main / (root)`, já usada na entrega anterior. Os caminhos de recursos são relativos, então funcionam dentro de `/polary/` e ao abrir o arquivo no computador. O site publicado não foi modificado nesta sessão.

Páginas de antes foram reunidas neste arquivo. Os atalhos agora são `#pt`, `#en`, `#pt-estudo-paulo-ramos`, `#pt-privacidade` e equivalentes em inglês. Links de navegação não dependem de pastas `en/` e `cases/`.

## Comportamentos preservados

Responsividade, menu mobile com Escape, temas claro/escuro, idioma PT/EN, FAQ, estudo de caso, informações de privacidade e preparação de contato. O formulário valida campos e monta uma mensagem para revisão. O envio ocorre no aplicativo de e-mail do visitante, não no servidor do site. Sem JavaScript, português, FAQ, estudo, privacidade e e-mail direto continuam acessíveis; a troca de idioma e o formulário assistido precisam de JavaScript.

Não há painel administrativo ou backend novo. Resultados não medidos, contatos, depoimentos e dados institucionais não foram inventados.

## Verificações desta entrega

- Referências locais, 54 IDs únicos e relações de labels/ARIA conferidos.
- JavaScript validado com `node --check`.
- 20 combinações de idioma e largura no navegador: de 320 a 1920px, sem overflow horizontal de documento.
- Menu mobile, Escape, idioma, tema, estudo de caso expansível e formulário verificados.
- Inter/Poppins confirmadas nos estilos aplicados; foto de 510 × 510 exibida proporcionalmente a 265 × 265 na menor largura útil.
- Não houve envio de e-mail real, implantação remota nem auditoria integral WCAG/Core Web Vitals.
