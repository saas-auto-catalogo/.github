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
2. A esteira de CI (typecheck, build e testes) deve passar — ver seção abaixo.
3. Code review obrigatório antes do merge em `main`.

## CI (GitHub Actions)

Workflows rodam em `push` e `pull_request` na branch `main`.

| Repositório | Workflow | O que valida |
|-------------|----------|--------------|
| **backend-api** | `ci.yml` | Job `unit`: prisma validate, typecheck, test:qa, parser, normalization, diff, meta-feed, meta-connector, vehicles. Job `integration`: migrate + seed + `test:ci` (auth, rbac, dashboard, feeds, db, email) com Postgres e Redis |
| **frontend-app**, **backoffice-app**, **marketing-site-blog** | `ci.yml` | Reutiliza workflow do repo `.github`: typecheck + build |
| **ai-content-worker** | `ci.yml` | typecheck + vitest |

Reproduzir CI do backend localmente:

```bash
docker compose up -d
export DATABASE_URL=postgresql://postgres:postgres@localhost:5432/auto_catalogo_db?schema=public
export REDIS_URL=redis://localhost:6379
npx prisma migrate deploy && npm run prisma:seed
npm run test:ci
```

### Branch protection (configuração manual)

Após os workflows passarem em `main`, configure em **Settings → Branches → main**:

- **Require status checks:** `unit` e `integration` (backend-api); `ci` (demais repos)

## Dependências entre repositórios

Funcionalidades que cruzam frontend e backend devem declarar `blocked-by` na issue do GitHub. Consulte o [roadmap](./docs/wiki/roadmap.md) antes de iniciar trabalho em épicos abertos (#19 Settings, #20 Onboarding).

## Documentação

- Atualize o README do repositório ao mudar stack, rotas ou setup local.
- Detalhes operacionais vão na [wiki](./docs/wiki/README.md) do repositório `.github`.
