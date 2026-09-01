# Organização SaaS Auto Catálogo

Bem-vindo à organização oficial do **SaaS Auto Catálogo** no GitHub.

O **SaaS Auto Catálogo** é uma plataforma B2B para o setor automotivo que sincroniza estoque entre gestores de pátio/DMS (AutoCerto, Altimus, Sisvag, BomControle, Webmotors e outros) e o **Meta Ads (Automotive Inventory Ads — DAA)** para campanhas dinâmicas no Facebook e Instagram.

---

## Mapa de repositórios

| Repositório | Escopo | Stack principal |
|-------------|--------|-----------------|
| [**backend-api**](https://github.com/saas-auto-catalogo/backend-api) | API core, ingestão XML/JSON, diff engine, feeds Meta DAA, auth, dashboard, billing | Node.js 22, TypeScript, Fastify 5, Prisma, PostgreSQL, Redis, BullMQ |
| [**frontend-app**](https://github.com/saas-auto-catalogo/frontend-app) | Painel web do lojista e simulador Meta Ads | React 18, TypeScript, Vite 6, Tailwind CSS, React Router |
| [**backoffice-app**](https://github.com/saas-auto-catalogo/backoffice-app) | Painel Super Admin (tenants, feeds, IA e métricas) | React 18, TypeScript, Vite 6, Tailwind CSS |
| [**marketing-site-blog**](https://github.com/saas-auto-catalogo/marketing-site-blog) | Site institucional, planos e blog Audience First | React 18, TypeScript, Vite 6, Tailwind CSS |
| [**ai-content-worker**](https://github.com/saas-auto-catalogo/ai-content-worker) | Worker IA (LangGraph + Gemini) para o blog | Node.js, TypeScript, LangGraph, Google Gemini |
| [**.github**](https://github.com/saas-auto-catalogo/.github) | Governança, templates SDLC, specs e wiki | GitHub Actions, issue templates, documentação |

---

## Wiki (documentação operacional)

A wiki centraliza setup local, rotas, módulos e roadmap:

- [**Índice da Wiki**](./docs/wiki/README.md)
- [backend-api](./docs/wiki/backend-api.md)
- [frontend-app](./docs/wiki/frontend-app.md)
- [backoffice-app](./docs/wiki/backoffice-app.md)
- [marketing-site-blog](./docs/wiki/marketing-site-blog.md)
- [ai-content-worker](./docs/wiki/ai-content-worker.md)
- [Roadmap](./docs/wiki/roadmap.md)

---

## Documentação técnica (specs)

- [Documento de Arquitetura](./ARCHITECTURE.md)
- [RNFs, SLA e Segurança](./docs/specs/non-functional-requirements-sla.md)
- [Mapeamento de feeds XML e JSON](./docs/specs/vehicle-feed-mapping.md)
- [Especificação Meta DAA](./docs/specs/meta-daa-feed-specification.md)
- [Multi-tenancy e RBAC](./docs/specs/multi-tenancy-rbac-specification.md)
- [Schema Prisma de referência](./docs/specs/prisma-schema-multitenancy.prisma)
- [Modelo canônico `CanonicalVehicle`](./docs/specs/canonical-vehicle.ts)
- [Fixtures de feeds reais](./docs/fixtures/)
- [Diretrizes de contribuição](./CONTRIBUTING.md)

---

## Metodologia SDLC

- Tarefas rastreadas via **épicos, issues e sub-issues** com dependências `blocked-by` entre frontend e backend.
- PRs devem referenciar a issue (`Closes #N`) e passar na esteira de CI (lint, typecheck, testes).

---

## Ambiente local rápido

```bash
# Backend (porta 3333)
cd backend-api && npm install && npx prisma migrate dev && npm run prisma:seed && npm start

# Frontend lojista (porta 3000)
cd frontend-app && npm install && npm run dev
```

Credenciais seed: `carlos.silva@autoelitemotors.com.br` / `Teste123!`
