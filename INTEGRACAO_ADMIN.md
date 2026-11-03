# Administração — contrato proposto, ainda não implementado

## Infraestrutura observada

O DOCX do TCC cita PHP, MySQL, HTML, CSS e JavaScript para o sistema do cliente. O ZIP recebido contém apenas o site estático. Não existe endpoint, banco, sessão ou permissão a reutilizar nesta entrega. Logo, não foi criado backend novo e não há login de demonstração.

## Escopo mínimo de edição

| Campo | Validação proposta no servidor | Publicação |
|---|---|---|
| Telefone institucional | 10 ou 11 dígitos nacionais, DDD e formato brasileiro; normalização separada da exibição | Atualizar todos os pontos e idioma equivalente |
| Endereço institucional | Rua, número, bairro, cidade, UF e CEP; CEP com oito dígitos; limites por campo | Não usar endereço do cliente |
| E-mail | Formato, tamanho e confirmação do responsável | Contato e metadados |
| Nome do tester | Nome de pessoa vinculada a relatório real e data | Créditos PT/EN |

Extras de texto, serviços, redes e imagens só entram após definição de escopo; não tornar a administração um editor de HTML arbitrário.

## Integração recomendada

1. Reutilizar autenticação e perfil administrador/proprietário do backend existente quando disponibilizado. Senhas com hash adequado, sessão no servidor, cookies HttpOnly/Secure/SameSite e autorização a cada requisição. Não guardar senha ou token de administração no frontend estático.
2. Persistir uma única configuração institucional no MySQL existente. Validar no servidor e no formulário administrativo; rejeitar campos desconhecidos e alterações por colaboradores sem permissão.
3. Proteger alterações contra CSRF, usar consultas parametrizadas, registrar autor/data/versão e manter recuperação da configuração anterior.
4. Para preservar o site estático, publicar um snapshot validado no processo de build e implantar somente após salvar com sucesso. Isso não é atualização em tempo real; o painel deve informar o estado da publicação. Uma API pública de leitura é alternativa apenas se necessária ao requisito de atualização imediata, com fallback e cache definidos.
5. Regerar metadados e páginas PT/EN a partir da mesma fonte. Nunca entregar dados privados do sistema financeiro no endpoint público.

Endpoints conceituais (nomes propostos, não existentes): `GET /api/site-settings` entrega somente dados públicos; `PATCH /api/admin/site-settings` exige autorização e versão esperada. A definição final deve seguir as convenções do backend real, sem adicionar servidores paralelos.

## Casos obrigatórios antes de considerar W2/W3 concluídos

Visitante não acessa edição; colaborador sem privilégio recebe rejeição; administrador altera contato válido; dados inválidos não são persistidos; mudança aparece em todos os pontos PT/EN; outro dispositivo recebe a atualização; erro de banco/publicação é exibido sem afirmar sucesso; rollback restaura a versão anterior; teste humano identificado aprova o fluxo.
