# Vision Tennis Academy — Website

Statische Astro-Seite für die Vision Tennis Academy GbR (Dormagen). Ersetzt den
bisherigen Shopify-Store auf `vision-tennis.de` — **ohne Shop**.

- **Spec:** [`SPEC.md`](SPEC.md) · **Acceptance-Set:** [`acceptance.json`](acceptance.json)
- **Strategische Grundlage:** [`docs/6P-Business-Analyse.md`](docs/6P-Business-Analyse.md)
- **Freigabe-Paket:** [`GATE.md`](GATE.md)

## Stack

Astro 5, statisch. **Kein JavaScript im Output, keine Webfonts, keine externen
Requests** — deshalb sind weder Cookie-Banner noch Consent-Management nötig.
Einzige Integration: `@astrojs/sitemap`.

## Befehle

```bash
npm ci
npm run dev            # Entwicklung
npm run build          # -> dist/
npm run check          # astro check (TypeScript)
npm run verify         # Verify-Gauntlet gegen dist/
npm run og             # public/og.png neu erzeugen
```

Vollständiger Gauntlet (alles muss grün sein, bevor etwas ans Gate geht):

```bash
npm run build && npx astro check
node scripts/verify.mjs dist --config acceptance.json --json verify-report.json
node scripts/check-no-shop.mjs dist
npx serve dist -l 4399
npx @lhci/cli@0.13.x autorun --collect.url=http://localhost:4399/ --config=scripts/lighthouserc.json
npx pa11y --standard WCAG2AA http://localhost:4399/
```

## Struktur

| Datei | Zweck |
|---|---|
| `src/data/site.ts` | Stammdaten: Kontakt, Vereine, Trainer, Preise. **Einzige Quelle** — Inhalte hier ändern, nicht in den Seiten. |
| `src/data/faq.ts` | Alle FAQ-Inhalte |
| `src/data/jsonld.ts` | Strukturierte Daten (Organization, WebSite, SportsActivityLocation, FAQPage) |
| `src/components/Cta.astro` | Der **eine** CTA des Storytelling-Frameworks. Wording und Ziel nie variieren. |
| `src/layouts/Base.astro` | SEO-Head, Open Graph, JSON-LD-Slot |
| `scripts/verify.mjs` | Statischer Verify-Gauntlet |
| `scripts/check-no-shop.mjs` | Prüft den Build auf E-Commerce-Rückstände |
| `scripts/prepare-images.mjs` | Bildaufbereitung (WebP, Graustufen) — einmalig gelaufen |
| `scripts/screenshots.mjs` | Gate-Screenshots in drei Breakpoints |
| `netlify.toml` | Redirects der alten Shopify-URLs + Security-Header |

## Deploy

```bash
netlify deploy            # Preview (Draft-URL)
netlify deploy --prod     # erst nach Freigabe am Gate
```

## Beim Umzug auf die echte Domain

Drei Stellen müssen zusammenpassen, sonst brechen Canonical, OG-URLs und Sitemap:

1. `SITE_URL` in `src/data/site.ts` (speist das JSON-LD)
2. `site` in `astro.config.mjs` (kann die TS-Konstante nicht importieren)
3. `Sitemap:`-Zeile in `public/robots.txt`

Erst danach die DNS umstellen. Ab diesem Moment greifen die Redirects in
`netlify.toml` — und der Shopify-Shop ist offline.
