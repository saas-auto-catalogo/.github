# Wiki — SaaS Auto Catálogo

Documentação operacional e de desenvolvimento do ecossistema. Os READMEs de cada repositório trazem o essencial; esta wiki aprofunda arquitetura, APIs, módulos e roadmap.

## Índice

| Página | Conteúdo |
|--------|----------|
| [backend-api](./backend-api.md) | Rotas HTTP, módulos, testes e variáveis de ambiente |
| [frontend-app](./frontend-app.md) | Painel do lojista, rotas, serviços e integrações |
| [backoffice-app](./backoffice-app.md) | Painel Super Admin |
| [marketing-site-blog](./marketing-site-blog.md) | Site institucional e blog |
| [ai-content-worker](./ai-content-worker.md) | Pipeline de conteúdo com IA |
| [roadmap](./roadmap.md) | Épicos abertos, dependências e ordem sugerida |

## Documentação técnica (specs)

- [Arquitetura](../../ARCHITECTURE.md)
- [Multi-tenancy e RBAC](../specs/multi-tenancy-rbac-specification.md)
- [Meta DAA Feed](../specs/meta-daa-feed-specification.md)
- [Mapeamento de feeds XML/JSON](../specs/vehicle-feed-mapping.md)
- [RNFs e SLA](../specs/non-functional-requirements-sla.md)
- [Jurídico Akoma Ntoso](../specs/legal-akn-specification.md)
- [Microcopy jurídico (cookies e checkboxes)](../specs/legal-microcopy.md)
- [Contribuição](../../CONTRIBUTING.md)

## Ambiente local (visão rápida)

| Serviço | Porta padrão | Repositório |
|---------|--------------|-------------|
| Backend API | `3333` | `backend-api` |
| Frontend (lojista) | `3000` | `frontend-app` |
| PostgreSQL | `5432` ou `5433` | conforme `DATABASE_URL` |
| Redis | `6379` | filas BullMQ e cache |

## Credenciais de desenvolvimento

Após `npm run prisma:seed` no backend:

- **Email:** `carlos.silva@autoelitemotors.com.br`
- **Senha:** `Teste123!`
- **Papel:** OWNER no workspace seed `workspace-auto-elite`
