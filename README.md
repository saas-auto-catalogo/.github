# 🏢 Organização SaaS Auto Catálogo

Bem-vindo à organização oficial do **SaaS Auto Catálogo** no GitHub!

O **SaaS Auto Catálogo** é uma plataforma B2B especializada para o setor automotivo que resolve o gargalo de sincronização de estoque entre gestores de pátio/DMSs (AutoCerto, Altimus, Sisvag, BomControle, Webmotors, Base44, Spice Digital) e o **Meta Ads (Automotive Inventory Ads - DAA)** para campanhas dinâmicas no Facebook e Instagram.

---

## 🏛️ Mapa de Repositórios

| Repositório | Escopo | Stack Principal |
|---|---|---|
| [**backend-api**](https://github.com/saas-auto-catalogo/backend-api) | API Core, Ingestão XML/JSON, Diff Engine, Feed Meta DAA & Auth | Node.js / TypeScript, Fastify/NestJS, Prisma, PostgreSQL, Redis, BullMQ |
| [**frontend-app**](https://github.com/saas-auto-catalogo/frontend-app) | Painel Web da Revenda / Lojista & Simulador Meta Ads | Next.js 15, React 19, TypeScript, Tailwind CSS, Shadcn/UI |
| [**backoffice-app**](https://github.com/saas-auto-catalogo/backoffice-app) | Painel Super Admin (Tenants, Feeds, IA & Métricas) | Next.js 15 / React, TypeScript, Tailwind CSS, Shadcn/UI |
| [**marketing-site-blog**](https://github.com/saas-auto-catalogo/marketing-site-blog) | Site Institucional (Planos, Preços) & Blog Audience First | Next.js 15 / Astro, Tailwind CSS, MDX, Stripe & Asaas SDKs |
| [**ai-content-worker**](https://github.com/saas-auto-catalogo/ai-content-worker) | Worker IA (Open Deep Research + Gemini) para o Blog | Python / Node.js, Google GenAI SDK (Gemini 3.1 Pro / Flash) |
| [**.github**](https://github.com/saas-auto-catalogo/.github) | Governança, Templates de SDLC e Documentação Técnica | GitHub Actions, Issue Templates, Architecture Docs, Schemas |

---

## 📚 Documentação Técnica e Especificações
- [Documento de Arquitetura](./ARCHITECTURE.md)
- [Levantamento de Schemas e Dicionário de Dados de Feeds (XML & JSON)](./docs/specs/vehicle-feed-mapping.md)
- [Definição TypeScript Canônica (`CanonicalVehicle`)](./docs/specs/canonical-vehicle.ts)
- [JSON Schema Canônico](./docs/specs/canonical-vehicle.schema.json)
- [Amostras e Fixtures de Feeds Reais](./docs/fixtures/)
- [Diretrizes de Contribuição](./CONTRIBUTING.md)

---

## 🔄 Metodologia SDLC e Governança
- Todas as tarefas são rastreadas via **Épicos, Issues e Sub-tasks** padronizadas.
- Todos os PRs devem referenciar a issue correspondente e passar pelas validações de CI/CD.