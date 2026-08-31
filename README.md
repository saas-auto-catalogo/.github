# ðŸ¢ OrganizaÃ§Ã£o SaaS Auto CatÃ¡logo

Bem-vindo Ã  organizaÃ§Ã£o oficial do **SaaS Auto CatÃ¡logo** no GitHub!

O **SaaS Auto CatÃ¡logo** Ã© uma plataforma B2B especializada para o setor automotivo que resolve o gargalo de sincronizaÃ§Ã£o de estoque entre gestores de pÃ¡tio/DMSs (AutoCerto, Altimus, Sisvag, BomControle, Webmotors) e o **Meta Ads (Automotive Inventory Ads - DAA)** para campanhas dinÃ¢micas no Facebook e Instagram.

---

## ðŸ›ï¸ Mapa de RepositÃ³rios

| RepositÃ³rio | Escopo | Stack Principal |
|---|---|---|
| [**ackend-api**](https://github.com/saas-auto-catalogo/backend-api) | API Core, IngestÃ£o XML, Diff Engine, Feed Meta DAA & Auth | Node.js / TypeScript, Fastify/NestJS, Prisma, PostgreSQL, Redis, BullMQ |
| [**rontend-app**](https://github.com/saas-auto-catalogo/frontend-app) | Painel Web da Revenda / Lojista & Simulador Meta Ads | Next.js 15, React 19, TypeScript, Tailwind CSS, Shadcn/UI |
| [**ackoffice-app**](https://github.com/saas-auto-catalogo/backoffice-app) | Painel Super Admin (Tenants, Feeds, IA & MÃ©tricas) | Next.js 15 / React, TypeScript, Tailwind CSS, Shadcn/UI |
| [**marketing-site-blog**](https://github.com/saas-auto-catalogo/marketing-site-blog) | Site Institucional (Planos, PreÃ§os) & Blog Audience First | Next.js 15 / Astro, Tailwind CSS, MDX, Stripe & Asaas SDKs |
| [**i-content-worker**](https://github.com/saas-auto-catalogo/ai-content-worker) | Worker IA (Open Deep Research + Gemini) para o Blog | Python / Node.js, Google GenAI SDK (Gemini 3.1 Pro / Flash) |
| [**.github**](https://github.com/saas-auto-catalogo/.github) | GovernanÃ§a, Templates de SDLC e DocumentaÃ§Ã£o TÃ©cnica | GitHub Actions, Issue Templates, Architecture Docs |

---

## ðŸ”„ Metodologia SDLC e GovernanÃ§a

- Todas as tarefas sÃ£o rastreadas via **Ã‰picos, Issues e Sub-tasks** padronizadas.
- Consulte o [Guia de Arquitetura](./ARCHITECTURE.md) e as [Diretrizes de ContribuiÃ§Ã£o](./CONTRIBUTING.md).