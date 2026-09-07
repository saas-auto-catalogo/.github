# Wiki — ai-content-worker

Pipeline editorial de IA do blog oficial **DriveSync**: pesquisa profunda (LangGraph) + redação SEO (Gemini).

## Pipeline

1. **Open Deep Research** — grafo LangGraph decomõe o tema em sub-perguntas e gera um *Research Dossier* validado com Zod.
2. **Gemini Writer** — redige artigo long-form (1.500–2.500+ palavras) com tabelas, FAQ e CTAs.
3. **SEO Optimizer** — metadados + JSON-LD (`Article`, `FAQPage`).

## Comandos

```bash
npm install
cp .env.example .env   # GEMINI_API_KEY obrigatória

npm run research -- --topic "Tema do artigo"
npm run write-article -- --topic "Tema do artigo"
npm test
npm run build
```

## Saídas

- `dossiers/` — dossiês de pesquisa
- `articles/` — `.md` e `.json` prontos para moderação

## Documentação relacionada

- README do repositório: [ai-content-worker](https://github.com/saas-auto-catalogo/ai-content-worker)
- [Mapeamento DMS / Meta DAA](../specs/vehicle-feed-mapping.md)
