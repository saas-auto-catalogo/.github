# Wiki — marketing-site-blog

Site institucional e blog *Audience First* para aquisição orgânica e conversão de planos.

## Stack

- React 18 + TypeScript 5.7
- Vite 6
- Tailwind CSS 3.4

## Estrutura planejada

| Área | Conteúdo |
|------|----------|
| Site comercial | Hero, ROI calculator, planos (Starter, Pro, Agency), FAQ |
| Blog | Artigos técnicos sobre tráfego automotivo, DMS e Meta Ads |
| Checkout | Integração Stripe / Asaas (Pix e cartão) via `backend-api` |
| SEO | JSON-LD Schema.org (`Article`, `FAQPage`, `SoftwareApplication`) |

## Conteúdo IA

Artigos podem ser gerados pelo [ai-content-worker](./ai-content-worker.md) e publicados após moderação no backoffice.

## Execução local

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

## Documentação relacionada

- [Meta DAA Feed spec](../specs/meta-daa-feed-specification.md)
- [roadmap](./roadmap.md)
