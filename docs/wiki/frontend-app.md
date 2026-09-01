# Wiki — frontend-app

Painel web do lojista (SPA): dashboard com dados reais, inventário, catálogo Meta, XML Mapper e autenticação.

## Stack

- React 18 + TypeScript 5.7
- Vite 6 + React Router 7
- Tailwind CSS 3.4 + Lucide Icons
- Design System **Auto Clean Pro** (light mode)

## Rotas

| Rota | Componente | Auth |
|------|------------|------|
| `/login` | `LoginPage` | pública |
| `/register` | `RegisterPage` | pública |
| `/forgot-password` | `ForgotPasswordPage` | pública |
| `/reset-password` | `ResetPasswordPage` | pública |
| `/` | `DashboardApp` | privada |

Tabs internas do dashboard (via `Sidebar`): `dashboard`, `inventory`, `meta-feed`, `issues`, `xml-mapper`, `settings` (placeholder), `sync-dms` (placeholder), `reports` (placeholder).

## Módulos implementados

| Módulo | Status | API |
|--------|--------|-----|
| Auth (login, register, reset) | ✅ | `/auth/*` |
| MetricCards + stats | ✅ | `GET .../dashboard/stats` |
| InventoryManager | ✅ | `GET .../vehicles` |
| MetaConnectionCard | ✅ | `GET .../meta-catalogs` |
| PendingIssuesTable | ✅ | `GET .../dashboard/issues` |
| ActivityTimeline | ✅ | `GET .../dashboard/activity` |
| XmlMapperStudio | ✅ parcial | mock + wizard local |
| Settings | 🔲 placeholder | épico [#19](https://github.com/saas-auto-catalogo/frontend-app/issues/19) |
| Onboarding | 🔲 não integrado | épico [#20](https://github.com/saas-auto-catalogo/frontend-app/issues/20) |
| Audit Logs View | 🔲 pendente | [#27](https://github.com/saas-auto-catalogo/frontend-app/issues/27) |

## Serviços API (`src/services/api/`)

- `authService.ts` — login, register, refresh, logout, me
- `dashboardService.ts` — stats, meta-catalogs, issues, activity
- `vehicleService.ts` — listagem paginada de veículos
- `feedService.ts` — listagem de feeds
- `httpClient.ts` — fetch com JWT + credentials (cookie refresh)

## Variáveis de ambiente

Criar `.env` a partir de `.env.example` (se existir) ou definir:

```ini
VITE_API_URL=http://localhost:3333/api/v1
VITE_API_TIMEOUT=15000
VITE_ENABLE_MOCK_FALLBACK=false
```

## Execução local

```bash
npm install
npm run dev    # http://localhost:3000
npm run typecheck
npm run build
```

Requer `backend-api` rodando e usuário seed para testes.

## Épicos e sub-issues

- **Settings:** [épico #19](https://github.com/saas-auto-catalogo/frontend-app/issues/19) → sub-issues #28–#32
- **Onboarding:** [épico #20](https://github.com/saas-auto-catalogo/frontend-app/issues/20) → sub-issues #33–#37

Ver [roadmap](./roadmap.md) para ordem sugerida.
