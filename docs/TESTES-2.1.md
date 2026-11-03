# Testes da versão 2.1.0 — 03/11/2026

Execução técnica assistida por ChatGPT/Codex. Não substitui tester humano do sistema.

| Verificação | Resultado |
|---|---|
| Build padrão para `https://polary-tcc.github.io/polary/` | 12 páginas geradas |
| Links locais, âncoras, IDs, referências ARIA, imagens e paridade PT/EN | Zero erros |
| Regressão de implantação na raiz e em `/polary/` | Ambas aprovadas |
| Sintaxe dos dois scripts JavaScript | Aprovada |
| 64 combinações de páginas e larguras no navegador | Sem overflow horizontal |
| CSS carregado na subpasta | Corpo #FAFAF8 e mapa #101C30 observados via estilos computados |
| Menu em 320px | Abre e fecha por Escape |
| Botões do mapa | Seleção e descrição atualizadas; teclado testado em inglês |
| Tema e navegação EN/case | Preferência preservada e link PT equivalente dentro de `/polary/` |
| Contato vazio | Três campos inválidos e mensagem localizada |
| Contato com dados de teste | Prévia e link mailto codificado preparados sem navegação externa e sem envio |
| Site sem JavaScript | Navegação e e-mail direto disponíveis |
| Inspeção visual | Homepage desktop e mobile revisadas |
| Console na amostra | Apenas erros da extensão do ambiente; nenhum erro de aplicação identificado |

Larguras das quatro páginas principais: 320, 375, 390, 600, 768, 850, 851, 1024, 1440 e 1920px. Outras oito páginas: 320, 768 e 1440px. O navegador reserva 15px para a barra vertical, com largura útil de 305 a 1905px.

Não foi executado envio de e-mail real, teste físico de dispositivos, auditoria integral WCAG, Lighthouse ou medição de Core Web Vitals. A publicação no domínio do usuário só ocorrerá depois que ele atualizar o repositório; não foi declarada como realizada.

As páginas temporárias de QA e a configuração da prévia local não entram no pacote de upload. A integridade dos caminhos é testada com o mesmo prefixo do GitHub Pages, não apenas na raiz de localhost.
