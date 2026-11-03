# Diagnóstico técnico e estratégico — 31/10/2026

## 1. Estado recebido

ZIP com 214 entradas, incluindo ferramentas auxiliares que não pertencem ao produto servido. Aplicação estática: home PT/EN, case Paulo Ramos PT/EN, quatro páginas de erro, CSS e dois scripts. `build.py` já separava arquivos públicos por lista permitida. Não havia dependências necessárias para rodar o site nem um backend de aplicação. As pastas de ferramentas não são vulnerabilidades por si só, mas não devem entrar na publicação.

A marca possui missão, visão e valores no Guia de Marca. O posicionamento conecta estratégia, identidade, tecnologia e gestão de dados. O guia não especifica uma tabela formal de tokens ou uma família tipográfica obrigatória. O azul #2563EB e os logotipos vieram do site recebido. A síntese verbal “Dados que guiam, marcas que lideram” foi explicitamente indicada no briefing.

## 2. Problemas com evidência

| Prioridade | Evidência e local original | Causa / impacto | Tratamento |
|---|---|---|---|
| Alta | `en/index.html`: três planos, expansões e tabela de comparação ausentes em PT | Conteúdo comercial duplicado manualmente, sem correspondência no guia institucional | Retirar pacotes não documentados; conservar soluções confirmadas e contato por escopo |
| Alta | `index.html`: dois links seguidos “Como trabalhamos” no menu mobile | Marcação repetida | Componente de navegação gerado uma única vez por idioma |
| Alta | `index.html`: `#politica-privacidade` e `#termos-uso` sem IDs de destino | Links legais adicionados sem páginas correspondentes | Página PT/EN que descreve os fluxos reais de privacidade; retirar link de termos inexistentes |
| Alta | `main.js`: `form.noValidate = true` e validação só de nome/e-mail/necessidade; textarea PT `required`, EN opcional | Regras HTML/JS e traduções divergentes | Mensagem opcional nos dois idiomas, limites e validação centralizada com erros associados |
| Alta | `site.css`: textos usando `--ink-950` e `--brand-blue-50` sem definição nas folhas recebidas | Tokens indefinidos e mistura de cores fixas com temas | Sistema de tokens semânticos para fundo/texto/acento/erro/foco nos dois temas |
| Média | `site.css`: `.process-flow h3`, `.console-top`, `.demo-caption` usam cores fixas ou variáveis ausentes | Partes não respondem de forma consistente ao tema | Componentes reconstruídos com tokens de tema |
| Média | `sitemap.xml`: inclui quatro páginas 404 | Sitemap trata páginas de erro como conteúdo indexável | Excluir erros e créditos do sitemap; `noindex` em ambos |
| Média | `index.html` e `en/index.html`: nomes/biografias e estruturas distintos | Conteúdo espalhado e pouca rastreabilidade | Dados compartilhados da equipe e árvore equivalente PT/EN |
| Média | `main.js`: listeners e ramos de planos, diagnóstico e comparação dependem de HTML existente apenas em EN | Acoplamento a oferta não confirmada | Retirar os ramos de planos; preservar intenção contextual nos CTAs de soluções |
| Média | Metadados, `site.webmanifest`, robots e sitemap com `polary.com.br` fixo | Troca de hospedagem exige edições múltiplas | Um domínio de configuração e variável de build |
| Alta / integração | Requisitos W2/W3 exigem autenticação e persistência; ZIP não contém PHP, MySQL ou painel | Dependência externa ausente | Documentar contrato e pendência; não simular autenticação com localStorage |
| Alta / evidência | W1 exige tester real; nenhum identificado nos documentos | Não há prova de homologação do sistema | Página de créditos transparente e configuração do nome apenas após teste real |
| Alta / conteúdo | Relatórios e TCC descrevem propostas e resultados esperados | Risco de transformar hipótese em resultado comercial | Case distingue contexto, escopo proposto e medições ainda necessárias |

Os arquivos `README.md`, `ALTERACOES.md` e `RELATORIO_REFATORACAO.md` recebidos descrevem uma revisão anterior; suas afirmações de testes não foram usadas como evidência desta entrega.

## 3. O que manter

HTML/CSS/JS, identidade nominal e logotipos, temas com preferência persistente, URLs reais por idioma, case bilíngue, FAQ, formulário mailto, melhoria progressiva, redução de movimento e o evento genérico `polary_interaction`. Não havia coletor de analytics externo funcional a preservar.

## 4. O que refatorar

Arquitetura de conteúdo, componentes repetidos, composição de páginas, copy, metadados, CSS, validações e documentação. Todas as páginas recebem o mesmo cabeçalho, rodapé, controles e sistema visual. A confiança é construída com processo, equipe identificada e estudo de caso rastreável, sem métricas ou depoimentos artificiais.

## 5. O que remover

Pacotes comerciais só em EN sem validação institucional, links sem destino, código de planos sem aplicação após a revisão, dependência de Google Fonts, CSS de sobrescrita/variáveis ausentes, ícones sem função e gráficos que poderiam parecer telas reais. Ferramentas auxiliares do ZIP não entram na nova distribuição. O original foi mantido intacto na conversa como recuperação.

## 6. O que desenvolver

Templates compartilhados, dados de marca em fonte única, traduções equivalentes, sitemap de conteúdo válido, privacidade factual, créditos, fallback de cópia do contato, testes repetíveis, relatório de evidências e plano de integração administrativa.

## 7. Arquitetura recomendada

Conteúdo JSON → renderização por templates Python → documentos HTML completos em `dist/`. CSS separado em tokens e componentes. JS limitado a interações, sem renderizar textos essenciais. O gerador não é backend e não altera a stack que roda no navegador. Veja `ARQUITETURA.md`.

## 8. Execução por prioridade

1. P0: separar Polary/cliente, conferir fontes, preservar original e registrar limites.
2. P1: corrigir divergências e navegação; criar componentes, conteúdo e tokens comuns.
3. P1: reestruturar home/case, contato e acessibilidade básica.
4. P2: gerar SEO, privacidade, créditos, assets públicos e cabeçalhos propostos.
5. P2: testar páginas, interações e reflow; corrigir problemas observados.
6. P3: entregar fonte, build e relatórios. Próxima etapa externa: integrar o backend real e homologar com pessoas.
