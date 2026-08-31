# 🏛️ Documento de Arquitetura de Software (SaaS Auto Catálogo)

## 1. Visão Geral do Sistema
O sistema conecta concessionárias e revendas de veículos aos canais de tráfego pago da Meta através da ingestão contínua de feeds XML e JSON REST, normalização canônica de dados e geração de catálogos automotivos compatíveis com o Meta Automotive Inventory Ads (DAA).

```mermaid
flowchart TD
    DMS[DMSs / Gestores de Estoque<br/>AutoCerto, Altimus, Sisvag, BomControle, Webmotors, Base44, Spice] -->|Feed XML / JSON Stream| Ingest[Stream Parser & Diff Engine]
    Ingest --> Backend[backend-api<br/>Node.js / Prisma / PostgreSQL]
    Backend --> Redis[(Redis Queue & Cache)]
    Redis --> PublicFeed[/api/v1/feeds/:token/meta-vehicles.xml]
    PublicFeed --> MetaAds[Meta Ads Commerce Manager / DAA]
    
    Tenant[Lojista / Concessionária] --> FrontendApp[frontend-app<br/>Next.js 15 Dashboard]
    FrontendApp --> Backend
    
    SuperAdmin[Equipe SaaS] --> BackofficeApp[backoffice-app<br/>Super Admin Operations]
    BackofficeApp --> Backend
    
    Lead[Público / Leads] --> MarketingSite[marketing-site-blog<br/>Site Institucional & Blog]
    AIWorker[ai-content-worker<br/>Deep Research + Gemini] -->|Publicação de Artigos| Backend
```

## 2. Padrões Arquiteturais e RNFs
- **Multi-tenancy**: Isolamento lógico por `workspace_id` com índices compostos no PostgreSQL.
- **Streaming Parser**: Leitura por stream (SAX e HTTP streaming) garantindo suporte a feeds de 50MB+ com `heap < 256MB`.
- **Feed Meta Caching**: Cache Redis de 15 minutos com compressão GZIP garantindo latência `< 800ms`.
- **Disponibilidade**: SLA alvo de 99.9% para os endpoints públicos de feed.
- **Segurança & LGPD**: Criptografia TLS 1.3, hashing de tokens e trilha de auditoria (`AuditLog`).

## 3. Especificações Técnicas de Engenharia
- [Dicionário de Schemas e Mapeamento de Feeds (XML & JSON)](./docs/specs/vehicle-feed-mapping.md)
- [Especificação Técnica do Catálogo Meta Automotive Inventory Ads (DAA)](./docs/specs/meta-daa-feed-specification.md)
- [Modelo Canônico em TypeScript (`CanonicalVehicle`)](./docs/specs/canonical-vehicle.ts)
- [JSON Schema do Veículo Canônico](./docs/specs/canonical-vehicle.schema.json)
- [JSON Schema de Saída do Meta DAA Feed](./docs/specs/meta-daa-feed.schema.json)
- [Amostras e Fixtures de Feeds Reais e XML Meta DAA](./docs/fixtures/)