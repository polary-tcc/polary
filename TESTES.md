# Relatório técnico de testes — 31/10/2026

Responsável pela execução assistida: ChatGPT/Codex, nesta sessão. Isto é evidência técnica do site, não identificação de tester humano do sistema. Nenhum nome de colega, cliente ou professor foi inventado. Ambiente: navegador Chromium remoto e verificações de código locais. Não representa teste em dispositivos físicos.

## Resultados

| ID | Caso / passos | Resultado observado | Situação |
|---|---|---|---|
| CT01 | Gerar projeto com `python3 build.py` | 12 páginas HTML geradas | Passou |
| CT02 | Verificar destinos locais, âncoras, IDs, atributos ARIA, alt/dimensões e metadados | Zero erros nas 12 páginas | Passou |
| CT03 | Comparar chaves, tipos e tamanhos de listas PT/EN | Estruturas equivalentes | Passou |
| CT04 | `node --check` em ambos os arquivos JS | Sintaxe válida | Passou |
| CT05 | Matriz de reflow no navegador | 64 combinações sem overflow de documento | Passou |
| CT06 | Home PT em 320px: abrir menu e pressionar Escape | Menu abre, fecha e `aria-expanded` volta a false | Passou |
| CT07 | Alterar tema na home e navegar para EN/case | Tema escolhido preservado e rótulos localizados | Passou |
| CT08 | Abrir FAQ por controle nativo PT e EN | Resposta expandida com atributo `open` | Passou |
| CT09 | Enviar formulário vazio PT e EN | Três campos obrigatórios inválidos; status em cada idioma | Passou |
| CT10 | Preencher nome, e-mail inválido e necessidade; enviar por Enter | Erro específico de e-mail em PT, foco/estado de erro | Passou |
| CT11 | Enviar dados válidos para abrir mailto | Ambiente bloqueou protocolo externo. Abertura de aplicativo e recebimento não comprovados; nenhum e-mail real enviado | Limitado |
| CT12 | Ler páginas sem JS em iframe sandbox sem scripts | Navegação visível, cinco FAQs disponíveis, e-mail direto presente e submit desativado | Passou |
| CT13 | Trocar idioma na página do case | Link equivalente mantém `/cases/paulo-ramos/` no outro idioma | Passou |
| CT14 | Verificar 15 pares principais de cores sólidas | Todos com contraste ≥4,5:1; menor razão 5,33:1 | Passou |
| CT15 | Consultar erros do navegador durante a amostra de navegação | Apenas erros da extensão do ambiente observados; nenhum erro da aplicação identificado na amostra | Passou na amostra |
| CT16 | Checar publicação sem documentos privados/ferramentas/fontes externas | Apenas saída pública e assets permitidos; nenhum backend/segredo introduzido | Passou na inspeção |

## Matriz de reflow

Home e case PT/EN: 320, 375, 390, 600, 768, 850, 851, 1024, 1440 e 1920px (40 combinações). Privacidade, créditos e as quatro rotas 404: 320, 768 e 1440px (24 combinações). O navegador reserva 15px para a barra vertical: largura útil medida entre 305 e 1905px. Foram inspecionados visualmente hero claro/escuro, tela estreita e case. Medição de overflow não prova ausência de qualquer sobreposição interna; a inspeção visual complementa, mas não substitui testes físicos.

A página `__qa.html` é temporária, gerada por `tests/make_browser_matrix.py`, e removida pelo build final. Ela não integra a publicação.

## Bugs encontrados nesta refatoração

| ID | Gravidade | Reprodução | Correção / estado |
|---|---|---|---|
| B01 | Média | Em 320px, área de tema encolhia para 24px e SVG para zero | Botão não encolhe; ajuste de logo/gaps em 360px; 40px de controle e ícone de 19px confirmados |
| B02 | Baixa / desenvolvimento | Rebuild apagava diretório raiz de dist e a prévia deixava de localizar arquivos novos | Preservar diretório raiz e limpar somente filhos; prévia reiniciada; reconstrução posterior servida corretamente |
| B03 | Limite do ambiente | Ação mailto bloqueada pela política do navegador remoto | Sem contorno; documentado. Testar em dispositivo com cliente de e-mail configurado |

Os problemas identificados no código recebido e suas soluções estão em `DIAGNOSTICO.md`.

## Desempenho e Core Web Vitals

A carga principal usa HTML completo, dois CSS locais, inicialização pequena de tema e JS deferido, sem dependências, fontes externas, vídeos ou imagens pesadas de hero. Os tamanhos reais dos arquivos estão em `tests/performance-budget.json`. Esse orçamento descreve bytes, não tempo de carregamento, Lighthouse ou dados de campo.

Não foram medidos LCP/INP/CLS em condições reais, não há histórico CrUX/RUM e não foi executado Lighthouse. Portanto não há nota de desempenho nem alegação de Core Web Vitals aprovados. Próxima medição: testar URL pública definitiva em rede móvel, verificar LCP do título/hero, CLS em carga inicial e INP nos controles; coletar percentil 75 de dados de campo após tráfego suficiente.

## Verificações ainda necessárias

- Recebimento do e-mail institucional; abertura de mailto e cópia com permissões de clipboard reais.
- Revisão humana de inglês e teste com cliente/tester identificado.
- VoiceOver/NVDA/TalkBack, zoom 200–400%, landscape, teclados móveis e dispositivos físicos.
- Aplicação efetiva de CSP e demais cabeçalhos no provedor e resposta HTTP 404 para URLs desconhecidas.
- Aceitação do backend real, permissões, persistência, finanças e relatórios; fora dos arquivos fornecidos.

Não se declara conformidade integral WCAG 2.2, certificação de segurança, resultado de conversão ou homologação do sistema.
