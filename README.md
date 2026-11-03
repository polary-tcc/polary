# Polary — GitHub Pages — versão 2.1.0

Projeto preparado para **https://polary-tcc.github.io/polary/**. O ZIP tem o `index.html` diretamente na raiz, junto das pastas `assets`, `en`, `cases`, `creditos` e `privacidade`. O site já está gerado: não exige instalar nada nem executar Python na hospedagem.

## Publicar pelo navegador

1. Extraia o ZIP no computador. Abra a pasta extraída e confira que há um `index.html` e uma pasta `assets` lado a lado.
2. No repositório `polary-tcc/polary`, escolha **Add file → Upload files**.
3. Arraste **o conteúdo da pasta extraída**, incluindo as pastas inteiras. Não arraste a pasta externa criada pelo descompactador. Não abra cada subpasta para copiar os arquivos individualmente.
4. Confirme o commit. Em **Settings → Pages**, use **Deploy from a branch → main → /(root)** e salve.
5. Aguarde o processo de Pages terminar. Acesse https://polary-tcc.github.io/polary/ e atualize com **Ctrl + Shift + R** se o navegador ainda mostrar a versão antiga.

Caso sua configuração atual use `/docs`, altere para `/(root)` para usar este pacote. Se já publica de `main / root`, basta substituir os arquivos e confirmar o commit. O guia detalhado está em `PUBLICAR-NO-GITHUB.md`.

**Não suba o ZIP sem extrair. Não mova o conteúdo de assets para a raiz. Não coloque index.html dentro de outra pasta polary no repositório.**

## O que foi corrigido

A versão recebida usava `/assets/...`, `/en/` e `/cases/...`; no projeto Pages esses caminhos saíam de `/polary/`. A versão atual centraliza o endereço completo em `content/site.json` e gera todos os caminhos com `/polary/`, inclusive SEO, manifest, idiomas, logotipos e páginas internas. O `_headers` de outros provedores não é usado: GitHub Pages não o interpreta como configuração de segurança.

## Melhorias

Hero editorial com mapa interativo de marca/tecnologia/dados; detalhes mais legíveis e organização visual consistente; temas e idiomas preservados; revisão da mensagem de contato antes de abrir o aplicativo; navegação, formulários e responsividade verificados. Não foram inventados resultados do cliente nem serviços adicionais.

## Editar o conteúdo e regenerar

- `content/pt.json` e `content/en.json`: textos.
- `content/site.json`: URL e informações institucionais.
- `templates/`: estrutura e componentes.
- `assets/css/`: estilos; `assets/js/`: interações.

Depois de editar os fontes:

```bash
python3 build.py --sync
python3 tests/check_site.py
```

`--sync` atualiza os arquivos públicos na raiz para subir ao GitHub. `dist/` é a cópia gerada; não precisa enviá-la quando publicar a raiz. Não edite apenas um HTML gerado se pretende usar o build depois, pois ele será regenerado a partir dos templates.

Para outro domínio ou subpasta, altere `url` em `content/site.json` e execute o build. Também é possível usar `POLARY_URL=https://example.com/ python3 build.py --sync` no Bash. A URL atual tem `/polary/` porque é um site de projeto do GitHub Pages.

## Testes

```bash
python3 tests/check_site.py
python3 tests/test_deployment.py
node --check assets/js/main.js
node --check assets/js/theme-init.js
```

`test_deployment.py` valida as duas situações: domínio na raiz e domínio com `/polary/`. Ele restaura o build padrão ao terminar. A matriz visual é ferramenta de desenvolvimento local, não integra o pacote publicado.

## Limites

O e-mail foi preservado do projeto recebido; confirme sua titularidade e recebimento. O formulário prepara texto no navegador, sem backend de envio. O painel administrativo e o sistema PHP/MySQL da barbearia não fazem parte deste repositório. Veja os requisitos do TCC e as pendências reais em `docs/REQUISITOS_TCC.md`. Não há números de WhatsApp, endereços ou depoimentos inventados.
