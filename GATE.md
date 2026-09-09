> **Nachtrag 09.09.2026 — Hosting hat sich geaendert.**
> Dieses Dokument haelt den Freigabe-Stand vom 13.08.2026 fest, als die Seite
> noch bei Netlify lag. Aktuell laeuft sie auf einem eigenen Strato-VPS
> (Caddy als Webserver; Mail und Domain ebenfalls bei Strato), Netlify wird
> nicht mehr genutzt. Die Weiterleitungen der alten Shopify-URLs liegen jetzt
> in `infra/Caddyfile.homepage` (Repo `vision-mail-report`), nicht mehr in
> `netlify.toml` - diese Datei wurde entfernt. Der Deploy-Weg ist
> `infra/scripts/deploy_homepage.sh`.
> Die Angaben unten bleiben als historischer Freigabe-Nachweis stehen.

# Freigabe-Gate — Vision Tennis Academy

> Stage 5 der `astro-delivery-pipeline`. Alles davor lief unbeaufsichtigt durch.
> Hier endet die Automatik: Es braucht genau eine Entscheidung — **freigeben**
> oder **zurück mit Kommentar**.

## Update 04.09.2026 — Re-Verifikation fuer den Produktions-Umzug (Plan A)

Anlass: Domain + VPS sind bereit, der echte Umzug von Netlify auf eigene
Infrastruktur steht an (Ace-Chat-Integration inklusive). Vor dem Umzug
wurden zwei neue Tina-Commits eingespielt
(`c850328` "Schnupperstunde statt Probetraining, WhatsApp entfernt",
`dac56e3` "Headerbild farbig, Jobs-Team-Foto, Jobs in Navigation") und der
komplette Verify-Gauntlet erneut gegen den neuen Stand gefahren, PLUS die
Domain-Referenzen auf `https://vision-tennis.de` umgestellt (`astro.config.mjs`,
`src/data/site.ts`, `public/robots.txt`).

**Zwei Funde dabei, beide behoben:**
- Lighthouse-LCP schlug fehl (2718ms > 2500ms) - Ursache: das neue
  Heroshot-Bild `hero-court-serve.webp` (215 KB, unkomprimiert exportiert).
  Fix: staerker komprimiert (WebP q75, 215→164 KB), gleiches Bild/gleiche
  Aufloesung. Rueckfrage geklaert: Farbe ist bewusst so gewollt (bestaetigt
  04.09.2026) - der veraltete "Graustufen"-Kommentar in `index.astro` wurde
  entsprechend korrigiert.
- pa11y (WCAG2AA) fand 2 Fehler - beide durch das (separat integrierte)
  Ace-Chat-Widget verursacht, nicht durch Tinas Aenderungen: das
  Eingabefeld hatte kein zugaengliches Label. Behoben.

**Ergebnis nach den Fixes (lokal, `npx serve dist -l 4399`):**

| Pruefung | Ergebnis |
|---|---|
| `npm run build` | ✅ 12 Seiten, Exit 0 |
| `npx astro check` | ✅ 0 Fehler, 0 Warnungen |
| `scripts/verify.mjs` | ✅ 0 hard failures, 0 warnings |
| `scripts/check-no-shop.mjs` | ✅ keine E-Commerce-Rueckstaende |
| Lighthouse (`/`, lokal) | ✅ Performance 0.98 · A11y 1.00 · Best Practices 1.00 · SEO 1.00 (LCP 2,33s · CLS 0 · TBT 0ms) |
| pa11y WCAG2AA (`/`) | ✅ 0 Fehler |

**Noch NICHT Teil dieses Updates** (bewusst zurueckgestellt auf Plan B,
siehe `.claude/plans/sorted-yawning-koala.md`): tatsaechliches Deployment,
DNS-Umstellung, Chat-Widget-Funktionsfaehigkeit in Production (haengt an
der Hosting-Entscheidung), Redirect-Anpassung der alten Shopify-URLs
(Stichprobe ergab: aktuell zeigt kein Redirect auf den umbenannten Pfad
`/probestunde/` → `/schnupperstunde/`, daher unveraendert uebernommen).

## Status: freigegeben und auf Production (Netlify, Stand 13.08.2026)

**Live: https://vision-tennis-academy.netlify.app**

Freigabe erteilt am 13.08.2026, Production-Deploy durchgeführt. Alle 11 Seiten
liefern 200, die 301-Redirects der alten Shop-URLs greifen, kein `noindex` mehr —
die Seite ist indexierbar.

**vision-tennis.de zeigt unverändert auf Shopify.** An der DNS wurde nichts
geändert; der bestehende Shop läuft weiter. Der Umzug liegt beim Kunden.

Lighthouse gegen Production: **0.98 / 1.00 / 1.00 / 1.00** (LCP 1,6 s · CLS 0 ·
TBT 0 ms). Der Performance-Wert liegt über realem Netz minimal unter dem lokalen
1.00 — normale Netzwerkvarianz, deutlich über der Schwelle von 0.90.

Vorherige Preview (Gate-Stand): `6a7d92afd9b015497ab355c1--vision-tennis-academy.netlify.app`

## Ergebnis des Verify-Gauntlets

| Prüfung | Ergebnis |
|---|---|
| `npm run build` | ✅ 11 Seiten, Exit 0 |
| `npx astro check` | ✅ 0 Fehler, 0 Warnungen, 0 Hinweise |
| `scripts/verify.mjs` | ✅ **0 hard failures, 0 warnings** |
| Pflicht-URLs (10) | ✅ alle vorhanden |
| Strukturdaten | ✅ Organization, WebSite, SportsActivityLocation, FAQPage |
| `scripts/check-no-shop.mjs` | ✅ keine E-Commerce-Rückstände auf 11 Seiten |
| Lighthouse (8 Inhaltsseiten, lokal) | ✅ **1.00 / 1.00 / 1.00 / 1.00** |
| Lighthouse (Live-Preview) | ✅ 1.00 / 1.00 / 1.00 / 0.93¹ |
| pa11y WCAG 2 AA (11 Seiten) | ✅ **0 Fehler** |
| Redirects der alten Shop-URLs | ✅ 9 von 9 geprüft, alle 301 |
| Security-Header | ✅ CSP, X-Frame, Referrer-Policy, Permissions-Policy aktiv |
| Externe Requests | ✅ **keine** — kein JS, keine Webfonts, keine CDN |

¹ Der einzige Abzug ist `is-crawlable` — verursacht durch Netlifys eigenen
`noindex`-Header auf Draft-Deploys. Auf Production entfällt er, dann 1.00.

Kernwerte live: LCP 1,4 s · CLS 0 · TBT 0 ms · 209 KB Transfer gesamt.

**Keine übersprungenen Automatik-Checks** — Lighthouse und pa11y liefen beide
vollständig, es bleibt nichts als manueller Prüfpunkt offen.

## Storytelling-Framework — Abgleich der Startseite

| # | Element | Status | Umsetzung |
|---|---------|--------|-----------|
| 1 | Logo | ✅ | Original-Logo des Kunden, oben links |
| 2 | Navigation | ✅ | 6 Punkte (Framework erlaubt 3–7) |
| 3 | Heroshot | ✅ | Teamfoto der drei Head Coaches |
| 4 | Main Headline | ✅ | „Tennistraining, das zu deinem Kind passt." |
| 5 | Einleitung | ✅ | 2 Sätze, Angebot + Differenzierung |
| 6 | Painpoints | ✅ | 6 Karten (3×2), wörtlich aus der Empathy Map |
| 7 | Vorstellung | ✅ | Guide-Story seit 2022 + 3 Coach-Porträts |
| 8 | Plan | ✅ | 3 Schritte |
| 9 | CTA | ✅ | **7 Platzierungen**, identisches Wording und Ziel |
| 10 | Trust | ✅ | 6 belegbare Fakten — keine erfundenen Siegel |
| 11 | Testimonials | ⚠️ | 3 Stimmen — **Platzhalter, siehe unten** |
| 12 | Weitere + Footer | ✅ | Standorte-Teaser, Kontaktfinale, Footer |

## Was inhaltlich zu entscheiden ist (menschliches Urteil)

- [ ] Tonalität (Du-Form, sachlich-warm) trifft die Marke?
- [ ] Bildsprache (durchgehend Schwarz-Weiß, Gelb nur für den CTA) passt?
- [ ] Positionierung „moderne Racketsport-Academy" statt Creator-Marke bestätigt?
- [ ] Struktur der Seiten vollständig — fehlt ein Thema?

## Platzhalter — vor Production klären

| # | Punkt | Was gebraucht wird |
|---|---|---|
| 1 | **Testimonials** | Es gibt auf der Bestandsseite keine Kundenstimmen. Die drei Texte sind sichtbar als „Beispieltext" markiert. → Durch echte ersetzen **oder** Sektion entfernen. |
| 2 | ~~**Saison-Zeitraum**~~ | **Erledigt.** Die Seite zeigt die Wintersaison `28.09.2026 – 25.04.2027`. |
| 3 | ~~**Preise**~~ | **Erledigt.** Winterpreise 2026/2027 aus den offiziellen Preislisten der drei Vereine (Stand 14.08.2026, identisch in Sportision): Trainingsanteil plus Hallenkosten je Verein, Zahlen in `src/data/site.ts`. Sommerpreise werden nicht mehr ausgespielt und sind vor dem nächsten Saisonwechsel neu zu bestätigen. |
| 4 | **Mitgliedsbeiträge** | 375/120 · 290/115 · 210/85 € — werden von den Vereinen festgelegt, bitte gegenprüfen. |
| 5 | **Besaitung 25 €** | aus der FAQ übernommen. |
| 6 | **Trainerfotos** | Eigene Bilder von der Bestandsseite, lokal aufbereitet. Bildrechte bestätigen. Für 6 Personen (Yannick, Sabine, Norberts, Kristian, Amelie, Luke) existiert kein Foto → Initialen-Kacheln. |
| 7 | **E-Mail im Impressum** | Dort stand `shop@vision-tennis.de`. Ersetzt durch `info@vision-tennis.de`, da der Shop entfällt. |
| 8 | **Datenschutzerklärung** | Entwurf, passend zum tatsächlichen Stand (statisch, keine Cookies, kein Tracking, kein Formular). **Juristisch prüfen lassen.** |
| 9 | **Subdomain** | `vision-tennis-academy.netlify.app` — Name bestätigen. |
| 10 | **Padel & Pickleball** | Erscheinen nur im Ausblick auf `/academy/`, nicht als buchbares Angebot. |

## Bewusst nicht enthalten

Shop, Warenkorb, Checkout, Produkte, Zahlarten, Login/Konto, Newsletter-Formular,
AGB und Widerrufsrecht (ohne Warenverkauf keine Pflichtangabe), Kontaktformular,
Analytics/Tracking, Cookie-Banner (nicht nötig — es werden keine Cookies gesetzt),
CMS, Blog, Mehrsprachigkeit, eigenes Buchungssystem (bleibt Sportision).

## Erledigt nach der Freigabe

- [x] `netlify deploy --prod`
- [x] Branch `delivery/vision-tennis-academy-relaunch` nach `main` gemergt

**Offen — der DNS-Umzug bleibt bei dir.** Erst wenn `vision-tennis.de` auf Netlify zeigt,
greifen die Redirects in `netlify.toml` — und erst dann geht der Shopify-Shop
offline. Vor dem Umzug außerdem `site` in `astro.config.mjs` und die Sitemap-URL
in `public/robots.txt` auf die echte Domain umstellen.

## Screenshots

Liegen in `screenshots/` — 8 Seiten × 3 Breakpoints (1280 / 768 / 375), erzeugt mit:

```bash
npx serve dist -l 4399
npm run shots -- ",training/,academy/,standorte/,service/,faq/,kontakt/,jobs/" 1280 desktop screenshots
```
