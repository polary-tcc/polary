# Rastreabilidade de requisitos do TCC

Esta entrega refatora o site institucional fornecido. O sistema da barbearia não está no ZIP. Ler um requisito não comprova sua implementação. Legenda: concluído, parcial ou pendente.

| ID | Situação | Evidência / dependência |
|---|---|---|
| W1 — tester | Parcial | Página de créditos PT/EN e campo `tester` em `content/site.json`. Nome real não fornecido; aparece a pendência de homologação. Não inventar tester nem usar IA como tester humano. |
| W2 — painel e escopo de edição | Parcial | Conteúdo centralizado e escopo/contrato documentado em `INTEGRACAO_ADMIN.md`. Painel autenticado depende do backend não fornecido. |
| W3 — telefone/endereço | Pendente | Dados institucionais não confirmados e backend ausente. Campos null na configuração não são um painel nem persistência autenticada. Não usar dados da barbearia como dados da Polary. |
| W4 — inglês | Parcial | 12 páginas com pares PT/EN; paridade de estrutura automática; menus, labels, status e erros traduzidos; revisão textual assistida realizada nesta entrega em 31/10/2026. Homologação por pessoa com domínio do idioma ainda pendente. |
| S1 — salário como despesa | Pendente nesta auditoria | Não há sistema/backend para executar. Requisito permanece no escopo proposto do case, sem alegação de funcionamento. |
| S2 — gastos por período | Pendente nesta auditoria | Mesmo limite. Validar bordas de datas, total e subtotais no sistema real. |
| S3 — PDF/relatório | Pendente nesta auditoria | Não há gerador de recibos no ZIP. Validar PDF, acentos e correspondência com lançamentos. |
| S4 — validação | Parcial | Formulário do site valida obrigatórios, nome, e-mail, seleção e tamanho. Validações do sistema e servidor não podem ser auditadas sem código. |
| S5 — tester/relatório | Parcial | Relatório técnico do site entregue. Relatório humano do sistema e assinatura/identificação do tester permanecem pendentes. |
| S6 — centros de custos | Pendente nesta auditoria | Tabela e integração ao financeiro não estão no ZIP. Não criar fachada de sistema financeiro no site institucional. |
| D1 — imagens atuais | Pendente | A mudança de interface exige refazer prints do TCC. A arte do case é conceitual e nunca deve ser usada como print do sistema. |
| D2 — sumário funcional | Pendente | Documentação TCC recebida contém sumário digitado e seções em aberto. Não foi alterada nesta tarefa de refatoração do site. |
| D3 — inglês da documentação | Pendente | Abstract e demais partes do DOCX precisam de revisão própria; tradução do site não equivale à revisão do DOCX. |
| D4 — redes | Pendente | Confirmar com professor se é topologia ou redes sociais. Não publicar perfis ou diagrama de implantação sem prova. |

## Como validar os itens do site

1. `python3 build.py` e `python3 tests/check_site.py` para integridade estrutural e traduções.
2. Abrir home, case, privacidade, créditos e 404 nos dois idiomas.
3. Confirmar texto do tester em créditos com o relatório humano após a homologação e atualizar somente então `tester`.
4. Após integração, testar como visitante, colaborador e administrador: visitante/colaborador não podem editar; salvar telefone/endereço deve persistir entre dispositivos e atualizar os pontos PT/EN após a publicação.
5. Registrar quem revisou o inglês e quando. Incluir passos, resultados reais e bugs no relatório humano.

## Checklist atualizado

- [x] Site institucional refatorado sem alteração da stack do navegador.
- [x] Conteúdo PT/EN equivalente e testes técnicos de interface registrados.
- [x] Identidade, equipe e case rastreados às fontes.
- [x] Escopo de administração definido documentalmente.
- [ ] W1 concluído com tester real identificado.
- [ ] W2 concluído com painel autenticado e persistente.
- [ ] W3 concluído com telefone/endereço oficiais e editáveis.
- [ ] W4 homologado por revisor de inglês identificado.
- [ ] S1–S6 auditados e homologados no sistema real.
- [ ] D1–D4 concluídos na documentação final.

## Próximas informações necessárias

Código do backend PHP/MySQL e ambiente de testes; nome e relatório do tester; contato oficial da Polary; eventual domínio definitivo; validação humana do inglês; prints do sistema real e esclarecimento do item “Redes”. Essas lacunas não impediram a conclusão da refatoração do site estático, mas impedem declarar o TCC inteiro concluído.
