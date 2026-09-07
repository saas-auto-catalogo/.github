# 🏛️ Documento de Arquitetura de Software — DriveSync (SaaS Auto Catálogo)

## 1. Visão Geral do Sistema
O **DriveSync** conecta concessionárias e revendas de veículos aos canais de tráfego pago da Meta através da ingestão contínua de feeds XML e JSON REST, normalização canônica de dados e geração de catálogos automotivos compatíveis com o Meta Automotive Inventory Ads (DAA).

```mermaid
flowchart TD
    DMS[DMSs / Gestores de Estoque<br/>AutoCerto, Altimus, Sisvag, BomControle, Webmotors, Base44, Spice] -->|Feed XML / JSON Stream| Ingest[Stream Parser & Diff Engine]
    Ingest --> Backend[backend-api<br/>Node.js / Prisma / PostgreSQL]
    Backend --> Redis[(Redis Queue & Cache)]
    Redis --> PublicFeed[/api/v1/feeds/:token/meta-vehicles.xml]
    PublicFeed --> MetaAds[Meta Ads Commerce Manager / DAA]
    
    Tenant[Lojista / Concessionária] --> FrontendApp[frontend-app<br/>React 18 + Vite Dashboard]
    FrontendApp --> Backend
    
    SuperAdmin[Equipe DriveSync] --> BackofficeApp[backoffice-app<br/>React 18 + Vite Super Admin]
    BackofficeApp --> Backend
    
    Lead[Público / Leads] --> MarketingSite[marketing-site-blog<br/>React 18 + Vite Site & Blog]
    AIWorker[ai-content-worker<br/>Deep Research + Gemini] -->|Publicação de Artigos| Backend
```

## 2. Padrões Arquiteturais e RNFs
- **Multi-tenancy**: Isolamento lógico por `workspace_id` em todas as tabelas de negócio com índices compostos de alta performance e extensões do Prisma Client.
- **Streaming Parser**: Leitura por stream (SAX e HTTP streaming) garantindo suporte a feeds de 50MB+ (5.000 veículos) em `< 30s` com `heap < 256MB`.
- **Feed Meta Caching**: Cache Redis de 15 minutos com compressão GZIP garantindo latência `< 800ms` (p50 `< 250ms`).
- **Disponibilidade & Resiliência**: SLA de 99.9% de uptime para feeds públicos, Circuit Breaker com fallback gracioso e retries exponenciais com jitter para DMSs parceiros.
- **Escalabilidade Assíncrona**: Filas BullMQ distribuídas por prioridade (`high`, `normal`, `low`) e rate limiting por host de DMS.
- **Segurança & LGPD**: Criptografia TLS 1.3 em trânsito e AES-256 em repouso, hashing HMAC-SHA256 para tokens, trilha imutável no `AuditLog`, expurgo automático de logs em 30 dias e suporte a purge de tenant.
- **Core Web Vitals**: Google Lighthouse 95+, LCP `< 1.8s`, CLS `< 0.05` e INP `< 150ms` nas SPAs Vite (frontend, backoffice, marketing).

## 3. Wiki e documentação operacional

- [Índice da Wiki](./docs/wiki/README.md)
- [backend-api](./docs/wiki/backend-api.md) — rotas, módulos e testes
- [frontend-app](./docs/wiki/frontend-app.md) — painel do lojista
- [Roadmap](./docs/wiki/roadmap.md) — épicos e dependências atuais

## 4. Especificações Técnicas de Engenharia
- [Engenharia de Requisitos Não-Funcionais (RNFs), SLA e Segurança](./docs/specs/non-functional-requirements-sla.md)
- [Dicionário de Schemas e Mapeamento de Feeds (XML & JSON)](./docs/specs/vehicle-feed-mapping.md)
- [Especificação Técnica do Catálogo Meta Automotive Inventory Ads (DAA)](./docs/specs/meta-daa-feed-specification.md)
- [Modelagem de Multi-Tenancy, Isolamento de Workspaces e RBAC](./docs/specs/multi-tenancy-rbac-specification.md)
- [Schema de Referência Prisma Multi-Tenant](./docs/specs/prisma-schema-multitenancy.prisma)
- [Modelo Canônico em TypeScript (`CanonicalVehicle`)](./docs/specs/canonical-vehicle.ts)
- [JSON Schema do Veículo Canônico](./docs/specs/canonical-vehicle.schema.json)
- [JSON Schema de Saída do Meta DAA Feed](./docs/specs/meta-daa-feed.schema.json)
- [Amostras e Fixtures de Feeds Reais e XML Meta DAA](./docs/fixtures/)