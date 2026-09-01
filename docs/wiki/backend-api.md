# Wiki — backend-api

API core multi-tenant: ingestão de estoque, diffs, feeds Meta DAA, autenticação JWT, dashboard e billing.

## Stack

- Node.js 22+, TypeScript 5.7+, Fastify 5
- Prisma 6 + PostgreSQL
- Redis + BullMQ
- JWT + httpOnly refresh cookie

## Módulos principais

| Módulo | Caminho | Responsabilidade |
|--------|---------|------------------|
| Auth | `src/modules/auth/` | Login, register, refresh, logout, forgot/reset password, `/auth/me` |
| Feeds | `src/modules/feeds/` | CRUD de feeds, sync manual (BullMQ), histórico |
| Dashboard | `src/modules/dashboard/` | Stats, vehicles, meta-catalogs, issues, activity, audit-logs |
| Meta Feed | `src/modules/meta-feed/` | Geração XML público Meta DAA |
| Meta Connector | `src/modules/meta-connector/` | OAuth Meta Graph API |
| Billing | `src/modules/billing/` | Plano, limites, Stripe portal |
| XML Ingestion | `src/modules/xml-ingestion/` | Parser SAX streaming |
| Stock Diff | `src/modules/stock-diff/` | Motor de diffs de estoque |

## Rotas HTTP (resumo)

### Públicas

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/health` | Health check |
| `GET` | `/api/v1/feeds/:token/meta-vehicles.xml` | Feed XML Meta DAA (cache Redis) |
| `POST` | `/api/v1/auth/login` | Login |
| `POST` | `/api/v1/auth/register` | Cadastro + workspace OWNER |
| `POST` | `/api/v1/auth/forgot-password` | Solicitar reset |
| `POST` | `/api/v1/auth/reset-password` | Redefinir senha |
| `POST` | `/api/v1/webhooks/stripe` | Webhooks Stripe |

### Autenticadas (JWT)

| Método | Rota | RBAC mínimo |
|--------|------|-------------|
| `GET` | `/api/v1/auth/me` | autenticado |
| `POST` | `/api/v1/auth/refresh` | cookie httpOnly |
| `POST` | `/api/v1/auth/logout` | autenticado |
| `GET` | `/api/v1/workspaces/:id/dashboard/stats` | VIEWER+ |
| `GET` | `/api/v1/workspaces/:id/dashboard/issues` | VIEWER+ |
| `GET` | `/api/v1/workspaces/:id/dashboard/activity` | VIEWER+ |
| `GET` | `/api/v1/workspaces/:id/vehicles` | VIEWER+ |
| `GET` | `/api/v1/workspaces/:id/vehicles/:vehicleId` | VIEWER+ |
| `GET` | `/api/v1/workspaces/:id/meta-catalogs` | VIEWER+ |
| `GET` | `/api/v1/workspaces/:id/audit-logs` | MANAGER+ |
| `GET/POST/PUT/DELETE` | `/api/v1/workspaces/:id/feeds` | VIEWER a OWNER conforme ação |
| `POST` | `/api/v1/workspaces/:id/feeds/:feedId/sync` | OWNER+ |
| `GET` | `/api/v1/workspaces/:id/billing` | OWNER+ |
| `POST` | `/api/v1/billing/portal` | autenticado (OWNER) |
| `GET` | `/api/v1/integrations/meta/auth-url` | OWNER+ |
| `POST` | `/api/v1/integrations/meta/callback` | OWNER+ |

## Testes

| Comando | Escopo |
|---------|--------|
| `npm run test:auth` | Register + cookie refresh |
| `npm run test:rbac` | Matriz de permissões |
| `npm run test:feeds` | CRUD e sync de feeds |
| `npm run test:dashboard` | Stats, vehicles, audit-logs, issues, activity |
| `npm run test:subscription` | Stripe lifecycle e billing |
| `npm run test:all` | Suite agregada |

## Variáveis de ambiente

Ver [`.env.example`](https://github.com/saas-auto-catalogo/backend-api/blob/main/.env.example). Principais:

- `DATABASE_URL` — PostgreSQL
- `REDIS_URL` — Redis
- `JWT_SECRET` — assinatura JWT
- `FRONTEND_URL` — CORS + cookies (ex.: `http://localhost:3000`)
- `PORT` — padrão `3333` no código

## Issues backend em aberto

| # | Título |
|---|--------|
| [#31](https://github.com/saas-auto-catalogo/backend-api/issues/31) | APIs de Perfil |
| [#32](https://github.com/saas-auto-catalogo/backend-api/issues/32) | change-password + MFA TOTP |
| [#33](https://github.com/saas-auto-catalogo/backend-api/issues/33) | Workspace Members |
| [#34](https://github.com/saas-auto-catalogo/backend-api/issues/34) | Histórico faturas Stripe |
| [#35](https://github.com/saas-auto-catalogo/backend-api/issues/35) | Estado de Onboarding |
| [#36](https://github.com/saas-auto-catalogo/backend-api/issues/36) | Validar URL de feed (opcional) |
