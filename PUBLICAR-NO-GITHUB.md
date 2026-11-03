# Como publicar esta versão no seu endereço atual

**Endereço:** https://polary-tcc.github.io/polary/  
**Repositório:** polary-tcc/polary  
**Pasta de publicação:** raiz `/` da branch `main`.

## Antes de enviar

Baixe uma cópia atual do repositório com **Code → Download ZIP** para ter um backup. Extraia o novo pacote. O `index.html` deve ficar no mesmo nível da pasta `assets`.

| Item | Onde deve ficar no repositório |
|---|---|
| Homepage | `index.html` |
| Estilos | `assets/css/tokens.css`, `assets/css/site.css`, `assets/css/experience.css` |
| Comportamentos | `assets/js/main.js`, `assets/js/theme-init.js` |
| Inglês | `en/index.html` |
| Estudo de caso | `cases/paulo-ramos/index.html` |
| Fontes para futuras alterações | `content/`, `templates/`, `build.py`, `paths.py` |
| Instruções e evidências | `README.md`, `PUBLICAR-NO-GITHUB.md`, `docs/`, `tests/` |

Arraste essas pastas como pastas. Não copie somente os arquivos que aparecem dentro delas: isso desmonta os caminhos do site.

## Configuração no GitHub

No repositório, vá a **Settings → Pages → Build and deployment**:

- Source: **Deploy from a branch**.
- Branch: **main**.
- Folder: **/(root)**.
- Save.

Não é necessário configurar GitHub Actions nem servidor Python. Se o GitHub não aceitar uma substituição pelo navegador, use um clone local, copie os arquivos por cima e faça commit/push normalmente. Não é necessário apagar o histórico nem recriar o repositório.

## Conferir depois da publicação

Abra estas páginas:

- https://polary-tcc.github.io/polary/
- https://polary-tcc.github.io/polary/en/
- https://polary-tcc.github.io/polary/cases/paulo-ramos/
- https://polary-tcc.github.io/polary/privacidade/

Teste troca de idioma/tema, menu mobile, botões Marca/Tecnologia/Dados, FAQ e preparação da mensagem. A preparação não envia e-mail. O envio só ocorre no aplicativo escolhido por você.

Caso ainda apareça sem estilo, abra https://polary-tcc.github.io/polary/assets/css/experience.css. Após a atualização correta, esse endereço deve mostrar texto CSS, não uma página 404. Confirme também que `tokens.css` e `site.css` estão na mesma pasta, respeitando maiúsculas e minúsculas. Depois use Ctrl + Shift + R.

O tempo de publicação depende do processo do GitHub Pages; confira a execução em **Actions** antes de concluir que o upload falhou.

## Documentação oficial consultada

- https://docs.github.com/pt/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## O que não foi alterado remotamente

Esta entrega é um pacote para você subir. O repositório e a publicação no GitHub não foram modificados nesta sessão. A conexão disponível permitiu somente leitura do repositório.
