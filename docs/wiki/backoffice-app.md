# Wiki — backoffice-app

Painel Super Admin de gestão do ecossistema **DriveSync**: tenants, feeds, blog IA e métricas globais.

## Stack

- React 18 + TypeScript 5.7
- Vite 6
- Tailwind CSS 3.4 + Lucide Icons

> Nota: o painel do lojista está em `frontend-app`. Este repositório é exclusivo para `SUPER_ADMIN`.

## Módulos planejados

| Módulo | Descrição |
|--------|-----------|
| Gestão de Tenants | Listagem de workspaces, planos, status |
| Impersonation | Acesso assistido com trilha em `AuditLog` |
| Telemetria de Feeds | Erros de parsing, feeds offline, re-sync forçado |
| Moderação do Blog | Fila de aprovação de artigos do `ai-content-worker` |
| Métricas SaaS | MRR, ARR, churn, veículos ativos |

## Execução local

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

## Integração

Consome a mesma `backend-api`, com role `SUPER_ADMIN` e endpoints administrativos (em evolução).

## Documentação relacionada

- [Multi-tenancy e RBAC](../specs/multi-tenancy-rbac-specification.md)
- [backend-api](./backend-api.md)
