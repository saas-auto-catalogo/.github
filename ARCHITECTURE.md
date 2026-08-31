# ðŸ›ï¸ Documento de Arquitetura de Software (SaaS Auto CatÃ¡logo)

## 1. VisÃ£o Geral do Sistema
O sistema conecta concessionÃ¡rias e revendas de veÃ­culos aos canais de trÃ¡fego pago da Meta atravÃ©s da ingestÃ£o contÃ­nua de feeds XML, normalizaÃ§Ã£o canÃ´nica de dados e geraÃ§Ã£o de catÃ¡logos automotivos compatÃ­veis com o Meta Automotive Inventory Ads (DAA).

`mermaid
flowchart TD
    DMS[DMSs / Gestores de Estoque<br/>AutoCerto, Altimus, Sisvag, Webmotors] -->|Feed XML / HTTP| Ingest[Stream Parser & Diff Engine]
    Ingest --> Backend[backend-api<br/>Node.js / Prisma / PostgreSQL]
    Backend --> Redis[(Redis Queue & Cache)]
    Redis --> PublicFeed[/api/v1/feeds/:token/meta-vehicles.xml]
    PublicFeed --> MetaAds[Meta Ads Commerce Manager / DAA]
    
    Tenant[Lojista / ConcessionÃ¡ria] --> FrontendApp[frontend-app<br/>Next.js 15 Dashboard]
    FrontendApp --> Backend
    
    SuperAdmin[Equipe SaaS] --> BackofficeApp[backoffice-app<br/>Super Admin Operations]
    BackofficeApp --> Backend
    
    Lead[PÃºblico / Leads] --> MarketingSite[marketing-site-blog<br/>Site Institucional & Blog]
    AIWorker[ai-content-worker<br/>Deep Research + Gemini] -->|PublicaÃ§Ã£o de Artigos| Backend
`

## 2. PadrÃµes Arquiteturais e RNFs
- **Multi-tenancy**: Isolamento lÃ³gico por \workspace_id\ com Ã­ndices compostos no PostgreSQL.
- **Streaming Parser XML**: Leitura por stream (SAX) garantindo suporte a feeds de 50MB+ com \heap < 256MB\.
- **Feed Meta Caching**: Cache Redis de 15 minutos com compressÃ£o GZIP garantindo latÃªncia \< 800ms\.
- **Disponibilidade**: SLA alvo de 99.9% para os endpoints pÃºblicos de feed.
- **SeguranÃ§a & LGPD**: Criptografia TLS 1.3, hashing de tokens e trilha de auditoria (\AuditLog\).