# ðŸ“œ Guia de ContribuiÃ§Ã£o & Ciclo de Vida SDLC

## ðŸŒ¿ GovernanÃ§a de Branches
- \main\: Branch de produÃ§Ã£o estÃ¡vel.
- \develop\: Branch de integraÃ§Ã£o contÃ­nua.
- \eature/[epic-id]-[nome]\: Branches de novas funcionalidades.
- \ix/[issue-id]-[nome]\: Branches de correÃ§Ãµes de bugs.

## âœï¸ ConvenÃ§Ã£o de Commits (Conventional Commits)
- \eat:\ Nova funcionalidade.
- \ix:\ CorreÃ§Ã£o de bug.
- \docs:\ DocumentaÃ§Ã£o.
- \efactor:\ RefatoraÃ§Ã£o sem alteraÃ§Ã£o de comportamento.
- \	est:\ Testes automatizados.
- \chore:\ ManutenÃ§Ã£o de configs e dependÃªncias.

## ðŸ“‹ Fluxo de Pull Requests
1. Toda PR deve referenciar uma Issue existente (\Closes #123\).
2. A esteira de CI (Lint, Typecheck, Testes) deve passar com 100% de sucesso.
3. NecessÃ¡ria aprovaÃ§Ã£o de code review antes do merge na \develop\ ou \main\.