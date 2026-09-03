# Microcopy jurídico — banner de cookies e checkboxes

> **Issue:** [.github#20](https://github.com/saas-auto-catalogo/.github/issues/20) (W6)  
> **Épico:** [.github#19](https://github.com/saas-auto-catalogo/.github/issues/19)  
> **Idioma:** `pt-BR`  
> **Tom:** B2B, claro, sem juridiquês  
> **Status:** Baseline aprovado (merge em `main`)

Textos curtos de UI. **Não** fazem parte do AKN XML — documentos oficiais estão em [legal-docs](https://github.com/saas-auto-catalogo/legal-docs). Integração técnica: [legal-akn-specification.md §5](./legal-akn-specification.md).

## Consumo

| Superfície | Issue | Chaves |
|------------|-------|--------|
| Banner de cookies | [marketing-site-blog#15](https://github.com/saas-auto-catalogo/marketing-site-blog/issues/15) | `cookieBanner.*` |
| Register | [frontend-app#64](https://github.com/saas-auto-catalogo/frontend-app/issues/64) | `register.*` |
| Subscribe / checkout | [frontend-app#65](https://github.com/saas-auto-catalogo/frontend-app/issues/65) | `subscribe.*` |

Rotas `/legal/*` são do **marketing-site-blog**. No `frontend-app`, prefixar com a URL do marketing (`VITE_MARKETING_URL` ou equivalente).

Links usam slugs oficiais da spec:

| Slug | Rota |
|------|------|
| `termos-de-uso` | `/legal/termos-de-uso` |
| `politica-de-privacidade` | `/legal/politica-de-privacidade` |
| `politica-de-cookies` | `/legal/politica-de-cookies` |
| `contrato-saas` | `/legal/contrato-saas` |

Na data desta baseline, a Política de Cookies v1 declara apenas cookies **essenciais** (+ terceiros Stripe/Meta). Categorias analíticos/marketing existem no banner para o contrato da UI; se não houver ferramenta ativa, usar `cookieBanner.categoryOptionalEmpty`.

---

## Banner de cookies

| Chave | Texto | Href |
|-------|--------|------|
| `cookieBanner.title` | Sua privacidade | — |
| `cookieBanner.body` | Usamos cookies essenciais para o site e a sessão funcionarem. Cookies analíticos ou de marketing só serão ativados com o seu consentimento, quando disponíveis. Saiba mais na Política de Cookies. | `/legal/politica-de-cookies` (âncora “Política de Cookies”) |
| `cookieBanner.acceptAll` | Aceitar todos | — |
| `cookieBanner.rejectNonEssential` | Recusar não essenciais | — |
| `cookieBanner.customize` | Personalizar | — |
| `cookieBanner.savePreferences` | Salvar preferências | — |
| `cookieBanner.categoryEssential` | Essenciais (sempre ativos) | — |
| `cookieBanner.categoryAnalytics` | Analíticos | — |
| `cookieBanner.categoryMarketing` | Marketing | — |
| `cookieBanner.categoryEssentialHelp` | Necessários para autenticação, segurança e pagamento. | — |
| `cookieBanner.categoryOptionalEmpty` | Nenhuma ferramenta nesta categoria está ativa no momento. | — |

**Corpo com markdown (para renderização):**

```
Usamos cookies essenciais para o site e a sessão funcionarem. Cookies analíticos ou de marketing só serão ativados com o seu consentimento, quando disponíveis. Saiba mais na [Política de Cookies](/legal/politica-de-cookies).
```

---

## Register

Checkboxes **obrigatórios** e independentes (não combinar termos + privacidade num único controle).

| Chave | Texto | Href |
|-------|--------|------|
| `register.acceptTerms` | Li e aceito os Termos de Uso. | `/legal/termos-de-uso` (âncora “Termos de Uso”) |
| `register.acceptPrivacy` | Li e aceito a Política de Privacidade. | `/legal/politica-de-privacidade` (âncora “Política de Privacidade”) |
| `register.requiredError` | Para criar a conta, aceite os Termos de Uso e a Política de Privacidade. | — |

**Labels com markdown:**

```
Li e aceito os [Termos de Uso](/legal/termos-de-uso).
Li e aceito a [Política de Privacidade](/legal/politica-de-privacidade).
```

---

## Subscribe

Checkbox **obrigatório** antes de iniciar o Checkout Stripe.

| Chave | Texto | Href |
|-------|--------|------|
| `subscribe.acceptContract` | Li e aceito o Contrato SaaS. | `/legal/contrato-saas` (âncora “Contrato SaaS”) |
| `subscribe.requiredError` | Para continuar com a contratação, aceite o Contrato SaaS. | — |

**Label com markdown:**

```
Li e aceito o [Contrato SaaS](/legal/contrato-saas).
```

---

## Referências

- [legal-akn-specification.md](./legal-akn-specification.md) — slugs, aceite (`legalAcceptances`), fluxo
- [legal-docs](https://github.com/saas-auto-catalogo/legal-docs) — XML vigente e `manifest.json`
