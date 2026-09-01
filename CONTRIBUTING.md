# Guia de Contribuição e Ciclo de Vida SDLC

## Governança de branches

- `main` — produção estável
- `develop` — integração contínua (quando usada)
- `feat/issue-N-descricao` — novas funcionalidades
- `fix/issue-N-descricao` — correções de bugs

## Convenção de commits (Conventional Commits)

- `feat:` — nova funcionalidade
- `fix:` — correção de bug
- `docs:` — documentação
- `refactor:` — refatoração sem mudança de comportamento
- `test:` — testes automatizados
- `chore:` — manutenção de configs e dependências

## Fluxo de pull requests

1. Toda PR deve referenciar uma issue existente (`Closes #123`).
2. A esteira de CI (lint, typecheck, testes) deve passar.
3. Code review obrigatório antes do merge em `main`.

## Dependências entre repositórios

Funcionalidades que cruzam frontend e backend devem declarar `blocked-by` na issue do GitHub. Consulte o [roadmap](./docs/wiki/roadmap.md) antes de iniciar trabalho em épicos abertos (#19 Settings, #20 Onboarding).

## Documentação

- Atualize o README do repositório ao mudar stack, rotas ou setup local.
- Detalhes operacionais vão na [wiki](./docs/wiki/README.md) do repositório `.github`.
