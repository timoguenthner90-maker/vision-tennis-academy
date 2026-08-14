# Client-Delivery-Spec — Vision Tennis Academy (Relaunch ohne Shop)

> Ausgefüllt nach `astro-delivery-pipeline/references/spec-template.md`.
> Acceptance-Set liegt maschinenlesbar in [`acceptance.json`](acceptance.json).
> Inhaltliche Grundlage: [`docs/6P-Business-Analyse.md`](docs/6P-Business-Analyse.md).

## 1. Auftrag (eine Zeile)
- Kunde: **Vision Tennis Academy GbR**, Dormagen — Tennisschule an drei Vereinen im Raum Düsseldorf/Köln
- Deliverable: Relaunch von `vision-tennis.de` als statische **Astro**-Seite **ohne Shop**; Startseite nach dem **Storytelling Skill Framework** (12 Elemente, Hero's Journey); Strategie und Texte hergeleitet über das **6P Business & Marketing Framework**. Deployment auf **Netlify**.
- Repo / Projektpfad: `ecom-tennis-vision/vision-tennis-academy`
- Deadline: keine genannt — Lieferung bis zum Gate

## 2. Scope
- [x] Neue Pages: `/`, `/training/`, `/standorte/`, `/academy/`, `/service/`, `/faq/`, `/jobs/`, `/kontakt/`, `/impressum/`, `/datenschutz/`, `404`
- [x] Bestehende Seite ablösen: Shopify-Store `vision-tennis.de` (Inhalte übernommen, Shop entfernt)
- [x] Explizit **NICHT** im Scope: Shop/Checkout/Produkte/Zahlarten, CMS, Blog, Mehrsprachigkeit, eigenes Buchungssystem (bleibt Sportision), Kontaktformular/Backend, Analytics/Tracking, DNS-Umzug

### Was „Shop entfernen" konkret heißt
Ersatzlos gestrichen: Warenkorb, Checkout, 11 Produkt-Collections, Produktseiten,
Zahlarten-Logos, Login/Konto, Newsletter-Formular, AGB und Widerrufsrecht
(ohne Warenverkauf keine Pflichtangabe). Erhalten, aber ohne Verkaufsfunktion:
Besaitung, Testschläger und Ausrüstungsberatung auf `/service/` — Kontakt statt Kauf.

## 3. Inhalt & Quellen
- **Texte:** neu verfasst in **Du-Form** (entspricht der Bestandsseite: „Wir helfen dir…"). Sachangaben (Preise, Zeiten, Regeln, Anlagen, Trainer, Impressum) 1:1 aus der Bestandsseite recherchiert — siehe Abschnitt 7 für die zu bestätigenden Werte.
- **Strategie/Positionierung:** aus `docs/6P-Business-Analyse.md` (BMC, Strategie-Pyramide, SWOT, Porter, Empathy Map) sowie aus Customer Journey, Konkurrenzanalyse und den beiden Canvas-Vorlagen des Kunden.
- **Bilder:** ausschließlich **eigene Bilder des Kunden**, von der Bestandsseite gezogen und lokal aufbereitet (`scripts/prepare-images.mjs` → WebP, Graustufen, feste Maße). Kein Hotlink auf die Shopify-CDN, keine Stockfotos, keine Fremdlogos.
- **Sprache:** einsprachig Deutsch (`lang="de"`)

### Persona (Voraussetzung des Story-Frameworks)
**Held = Elternteil**, 30–50, berufstätig, Kind 4–15 Jahre, Anfänger bis ambitioniert;
entscheidet über den Anbieter und bezahlt. Pains und Gains stammen unverändert aus
der Empathy Map des Kunden. Erwachsene Freizeitspieler und Vereins-/Turnierspieler
werden als Nebenspuren geführt (eigene Blöcke auf `/training/`), übernehmen aber
nicht die Story-Reihenfolge der Startseite.

### Die 12 Story-Elemente → Sektionen der Startseite (feste Reihenfolge)
| # | Element | Umsetzung |
|---|---------|-----------|
| 1 | Logo | Original-Logo des Kunden (Auge + Tennisball), lokal als PNG |
| 2 | Navigation | 6 Punkte: Training · Academy · Standorte · Service · FAQ · Kontakt |
| 3 | Heroshot | Teamfoto der drei Head Coaches (Kundenbild, S/W) |
| 4 | Main Headline | „Tennistraining, das zu deinem Kind passt." |
| 5 | Einleitung | 2 Sätze: passende Gruppe nach Alter und Level, feste Zeit, fester Trainer, drei Vereine |
| 6 | Painpoints | 6 Karten, wörtlich aus der Empathy Map abgeleitet |
| 7 | Vorstellung | Guide-Story: seit Juni 2022, 21 Trainer:innen, DTB-lizenziert, drei Vereine, Gruppen 1–4 |
| 8 | Plan | 3 Schritte: Probestunde anfragen → passende Gruppe finden → feste Zeit, fester Trainer |
| 9 | CTA | **„Kostenloses Probetraining sichern"** → WhatsApp `+49 1512 9409005` / `mailto:info@vision-tennis.de`; **7 Platzierungen** (Header, Hero, nach Painpoints, nach Vorstellung, nach Plan, nach Testimonials, Kontakt-Finale) |
| 10 | Trust | 6 **belegbare** Fakten statt erfundener Siegel: DTB-lizenzierte Trainer · seit 2022 · 3 Vereine · 21 Trainer:innen · Gruppen max. 4 · Probestunde kostenlos |
| 11 | Testimonials | 3 Stimmen (Eltern / Erwachsene / Turnierspieler) — **Platzhalter**, siehe Abschnitt 7 |
| 12 | Weitere & Footer | Standorte-Teaser, Kontaktfinale, Footer mit Jobs/Impressum/Datenschutz |

## 4. Design & Struktur
- **Designsystem neu**, abgeleitet aus dem echten Kundenlogo: Tinte `#141414`, Marken-Gelb **`#ece43f`** (exakt aus dem Logo gesampelt), Papier `#ffffff` / `#f4f4f2`
- Bildsprache: durchgehend **Schwarz-Weiß** — die Head-Coach-Fotos des Kunden sind bereits S/W; die Trainerporträts werden angeglichen, damit das Raster als ein Bild wirkt. Gelb bleibt allein dem CTA und Akzenten vorbehalten.
- Typografie: **keine Webfonts** — System-Sans (`-apple-system`/Segoe/Roboto) mit weiter Laufweite für Versalien-Labels. Kein JavaScript, keine externen Requests → keine Cookies, kein Consent-Banner nötig.
- Komponenten: `Base.astro` (SEO-Head, JSON-LD-Slot), `Header`, `Footer`, `Cta`, `Logo`
- Breakpoints: Mobil ~375, Tablet ~768, Desktop ~1280

## 5. Deploy-Ziel
- Provider: **Netlify** (statisch, `dist/`, kein Adapter)
- Preview: `netlify deploy` **ohne** `--prod` → Deploy-Preview-URL
- Production nach Freigabe: `https://vision-tennis-academy.netlify.app`
- **DNS bleibt unangetastet.** `vision-tennis.de` zeigt weiter auf Shopify; der Live-Shop wird durch diese Lieferung nicht abgeschaltet. Die Redirects in `netlify.toml` liegen bereit und greifen erst beim späteren DNS-Umzug.
- Branch: `delivery/vision-tennis-academy-relaunch`

## 6. Acceptance-Set (maschinenlesbar)
→ 1:1 in [`acceptance.json`](acceptance.json). Kern: keine toten internen Links ·
Title ≤ 60 · Meta-Description 50–160 · genau ein `<h1>` · `alt` an allen Bildern ·
gültiges JSON-LD · `lang`, Viewport, Canonical, Open Graph ·
Lighthouse ≥ 0.90 / 0.95 / 0.95 / 1.00 · 10 Pflicht-URLs ·
Strukturdaten `Organization`, `WebSite`, `SportsActivityLocation`, `FAQPage`.

**Zusätzlicher Projekt-Check — Shop-Freiheit:** `scripts/check-no-shop.mjs` grept
`dist/` auf Shop-Rückstände (`cart`, `checkout`, `shopify`, `Warenkorb`,
`Zum Warenkorb`, `paypal`, `klarna`, `In den Warenkorb`). Treffer = hartes Fail.
Trainingspreise sind ausdrücklich erlaubt und kein Shop-Merkmal.

## 7. Gate-Kriterien (menschliches Urteil)
- [ ] Inhalt vollständig und korrekt?
- [ ] Tonalität (Du-Form, sachlich-warm) stimmt?
- [ ] Bildauswahl und S/W-Look passend?
- [ ] Rechtliches (Impressum/Datenschutz) freigegeben?
- [ ] **Platzhalter bestätigen oder ersetzen (Pflicht vor Production):**
  1. **Testimonials (3×)** — auf der Bestandsseite existieren keine Kundenstimmen. Die drei Texte sind als Beispiel markiert und müssen durch echte ersetzt oder entfernt werden.
  2. ~~**Saison-Zeitraum**~~ — erledigt: Die Seite zeigt die Wintersaison `28.09.2026 – 25.04.2027` aus den Preislisten der Vereine.
  3. ~~**Preise**~~ — erledigt: Ersetzt durch die Winterpreise 2026/2027 aus den offiziellen Preislisten der drei Vereine (Stand 14.08.2026, identisch in Sportision). Winter wird zweiteilig abgerechnet — Trainingsanteil plus Hallenkosten je Verein —, Zahlen in `src/data/site.ts`. Sommerpreise werden nicht mehr ausgespielt; vor dem nächsten Saisonwechsel sind sie neu zu bestätigen.
  4. **Mitgliedsbeiträge der Vereine** (375/120 · 290/115 · 210/85 €) — aus der FAQ übernommen, werden von den Vereinen festgelegt.
  5. **Besaitungspreis 25 €** — aus der FAQ.
  6. **Trainerfotos** — Kundenbilder von der Bestandsseite; Bildrechte bestätigen. Für 6 Trainer:innen (Yannick, Sabine, Norberts, Kristian, Amelie, Luke) existiert kein Foto → Initialen-Kacheln.
  7. **`shop@vision-tennis.de`** im aktuellen Impressum → ersetzt durch `info@vision-tennis.de`, da der Shop entfällt.
  8. **Datenschutzerklärung** — Entwurf für eine statische Seite ohne Tracking, ohne Cookies, ohne Formular; juristisch prüfen lassen.
  9. **Netlify-Subdomain** `vision-tennis-academy.netlify.app` — Name bestätigen.
  10. **Padel & Pickleball** — laut Vision geplant, aber nicht buchbar. Erscheinen nur im Ausblick auf `/academy/`, nicht als Angebot.

## 8. Offene Fragen
Keine blockierenden Fragen. Die vier Entscheidungen (Umgang mit Shop-Services,
Deploy-Ziel, Held der Story, CTA-Ziel) wurden vor Baubeginn geklärt. Alle nicht
belegbaren Angaben sind als Platzhalter in Abschnitt 7 gelistet und Pflichtpunkte
des Gates. Nichts davon erreicht Production ohne Freigabe.
