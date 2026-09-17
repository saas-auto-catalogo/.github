# Wiki — Roadmap DriveSync

Plano de evolução das entregas do produto **DriveSync** e ordem sugerida de implementação (set/2026).

## Concluído recentemente

| Área | Issues | Descrição |
|------|--------|-----------|
| Auth | FE #17, BE #21–#22 | Login, register, refresh httpOnly cookie |
| Dashboard core | FE #18, BE #23 | Stats, vehicles, meta-catalogs, audit-logs API |
| Feeds | BE #16 | CRUD + sync BullMQ |
| Pending issues | FE #22, BE #26 | `PendingIssuesTable` com API real |
| Activity | FE #23, BE #27 | `ActivityTimeline` com API real |

## Próximo (sem bloqueio de backend)

| Issue | Título |
|-------|--------|
| [frontend-app#27](https://github.com/saas-auto-catalogo/frontend-app/issues/27) | Audit Logs View |
| [frontend-app#28](https://github.com/saas-auto-catalogo/frontend-app/issues/28) | Settings shell |
| [frontend-app#29](https://github.com/saas-auto-catalogo/frontend-app/issues/29) | Settings > Billing (portal Stripe já funciona) |
| [frontend-app#36](https://github.com/saas-auto-catalogo/frontend-app/issues/36) | Onboarding passo 3 Meta OAuth |

## Épicos abertos

### Settings — [frontend-app#19](https://github.com/saas-auto-catalogo/frontend-app/issues/19)

| Sub-issue | Bloqueio |
|-----------|----------|
| #28 Shell | — |
| #29 Billing | #28; histórico → BE #34 |
| #30 Profile | BE #31 |
| #31 Security | BE #32 |
| #32 Team | BE #33 |

### Onboarding — [frontend-app#20](https://github.com/saas-auto-catalogo/frontend-app/issues/20)

| Sub-issue | Bloqueio |
|-----------|----------|
| #33 Shell | BE #35 |
| #34 Passo 1 | BE #31 |
| #35 Passo 2 | BE #36 (opcional) |
| #36 Passo 3 Meta | — |
| #37 Passo 4 | BE #35 |

## Backend pendente

| Issue | Título |
|-------|--------|
| [BE #31](https://github.com/saas-auto-catalogo/backend-api/issues/31) | APIs de Perfil |
| [BE #32](https://github.com/saas-auto-catalogo/backend-api/issues/32) | change-password + MFA |
| [BE #33](https://github.com/saas-auto-catalogo/backend-api/issues/33) | Workspace Members |
| [BE #34](https://github.com/saas-auto-catalogo/backend-api/issues/34) | Histórico faturas |
| [BE #35](https://github.com/saas-auto-catalogo/backend-api/issues/35) | Estado de Onboarding |
| [BE #36](https://github.com/saas-auto-catalogo/backend-api/issues/36) | Validar URL feed (opcional) |

## Ordem sugerida

1. Audit Logs (#27)
2. Settings shell + billing (#28, #29)
3. Backend perfil (#31) → Settings profile + Onboarding passo 1
4. Backend onboarding (#35) → shell + conclusão
5. Onboarding feeds + Meta (#35, #36 FE)
6. Backend security, members, invoices (#32–#34)
