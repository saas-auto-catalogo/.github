# Wiki — backend-api

API core multi-tenant do **DriveSync**: ingestão de estoque, diffs, feeds Meta DAA, autenticação JWT, dashboard e billing.

## Stack

- Node.js 22+, TypeScript 5.7+, Fastify 5
- Prisma 6 + PostgreSQL
- Redis + BullMQ
- JWT + httpOnly refresh cookie

## Módulos principais

| Módulo | Caminho | Responsabilidade |
|--------|---------|------------------|
| Auth | `src/modules/auth/` | Login, register, refresh, logout, forgot/reset password, `/auth/me` |
| Feeds | `src/modules/feeds/` | CRUD de feeds, validate-url, sync manual (BullMQ), histórico |
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

### Checkout comercial (register-first)

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/v1/workspaces/:id/checkout/stripe/session` | Checkout Stripe autenticado (OWNER+) — metadata inclui `workspaceId` |
| `POST` | `/api/v1/checkout/stripe/session` | **Deprecated** — pay-first; header `Deprecation: true` |
| `GET` | `/api/v1/checkout/stripe/session/:id/status` | **410 Gone** — use `GET /workspaces/:id/billing` autenticado |

**Funil comercial:** landing → `POST /auth/register` (workspace + billing `NONE`) → `/subscribe` no app → checkout autenticado → webhook `checkout.session.completed` com `metadata.workspaceId` → billing `ACTIVE` → onboarding. O webhook **não** cria workspace/user. Ver épico [.github#16](https://github.com/saas-auto-catalogo/.github/issues/16).

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
| `POST` | `/api/v1/workspaces/:id/feeds/validate-url` | MANAGER+ |
| `POST` | `/api/v1/workspaces/:id/feeds/:feedId/sync` | OWNER+ |
| `GET` | `/api/v1/workspaces/:id/billing` | OWNER+ |
| `POST` | `/api/v1/billing/portal` | autenticado (OWNER) |
| `GET` | `/api/v1/integrations/meta/auth-url` | OWNER+ |
| `POST` | `/api/v1/integrations/meta/callback` | OWNER+ |

## Validar URL de feed (`validate-url`)

Valida server-side uma URL de feed XML **sem persistir** `FeedConfig`. Usado pelo botão **Testar Link** do wizard XML De/Para e do onboarding (evita CORS no browser).

| Campo | Valor |
|-------|-------|
| Método / rota | `POST /api/v1/workspaces/:workspaceId/feeds/validate-url` |
| RBAC | MANAGER+ (`FEEDS_CREATE`) |
| Rate limit | 20 req / 60s por workspace |

### Request

```json
{ "url": "https://integracao.autocerto.com/feeds/estoque.xml" }
```

### Response (sempre HTTP 200 em falhas de validação de negócio)

```json
{
  "valid": true,
  "vehicleCount": 42,
  "contentType": "application/xml",
  "detectedFormat": "xml",
  "suggestedPresetId": "AUTOCERTO"
}
```

```json
{
  "valid": false,
  "detectedFormat": "json",
  "contentType": "application/json",
  "error": "Formato não suportado — esperado XML"
}
```

### Comportamento

- Fetch com timeout de 10s, sem retry e sem afetar o circuit breaker de DMS
- Detecta `content-type` e formato (XML vs JSON vs desconhecido)
- Para XML válido: retorna contagem estimada de veículos e `suggestedPresetId` (`FeedSourceType`)
- Para JSON: `valid: false` com erro explícito
- Para HTTP 4xx/5xx, timeout ou DNS: `valid: false` com mensagem amigável em PT-BR
- **Não persiste** `FeedConfig`

## Testes

| Comando | Escopo |
|---------|--------|
| `npm run test:auth` | Register + cookie refresh |
| `npm run test:rbac` | Matriz de permissões |
| `npm run test:feeds` | CRUD, validate-url e sync de feeds |
| `npm run test:validate-url` | Validação de URL de feed (XML, JSON, timeout, RBAC) |
| `npm run test:dashboard` | Stats, vehicles, audit-logs, issues, activity |
| `npm run test:subscription` | Stripe lifecycle e billing |
| `npm run test:commercial` | Smoke E2E register-first (épico #16) |
| `npm run test:legal` | Documentos jurídicos e aceites (#70) |
| `npm run test:legal:smoke` | Smoke E2E — aceite jurídico no funil comercial (#21 / #19) |
| `npm run test:all` | Suite agregada |

### Smoke E2E Jurídico no Funil (#21)

Valida a integridade da camada jurídica no funil comercial completo (Fase 12 / épico #19):
- **Register Guardrails:** Bloqueio (`422`) sem `legalAcceptances`, com array vazio, faltando termos/privacidade ou com hash/versão adulterados.
- **Register Sucesso:** Cadastro (`201`) persistindo aceites com auditoria completa de `ipAddress` e `userAgent`.
- **Subscribe / Checkout:** Bloqueio (`422`) sem `contrato-saas` vigente; sucesso (`201`) gerando sessão Stripe e persistindo aceite vinculado ao `workspaceId`.
- **Documentos Públicos `/legal/*`:** Confirmação da lista pública com os 5 slugs vigentes (`termos-de-uso`, `politica-de-privacidade`, `politica-de-cookies`, `contrato-saas`, `aviso-lgpd`) e rotas individuais.
- **Cookie Consent LGPD:** Bloqueio de analíticos sem consentimento e liberação sob aceite explícito.

Executar localmente:
```bash
npm run test:legal:smoke
```

## CI (GitHub Actions)

Workflow `.github/workflows/ci.yml` em PRs e pushes em `main`:

| Job | Escopo |
|-----|--------|
| `unit` | prisma validate, typecheck, test:qa, parser, normalization, diff, meta-feed, meta-connector, vehicles |
| `integration` | Postgres 17 + Redis 7, migrate deploy, seed, `npm run test:ci` |

Reproduzir localmente:

```bash
docker compose up -d
export DATABASE_URL=postgresql://postgres:postgres@localhost:5432/auto_catalogo_db?schema=public
export REDIS_URL=redis://localhost:6379
npx prisma migrate deploy && npm run prisma:seed
npm run test:ci
```

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
