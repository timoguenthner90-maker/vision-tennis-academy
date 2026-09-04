// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// site = echte Kundendomain (Produktions-Umzug 04.09.2026, siehe Plan A in
// .claude/plans/sorted-yawning-koala.md). Haengt an src/data/site.ts (SITE_URL)
// und public/robots.txt (Sitemap-Zeile) — alle drei muessen synchron bleiben,
// canonical, OG-URLs und Sitemap haengen alle an diesem Wert.
export default defineConfig({
  site: "https://vision-tennis.de",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404"),
    }),
  ],
  build: {
    // Kleine Skripte würde Astro sonst inline ins HTML schreiben. Die Content
    // Security Policy erlaubt aber nur `script-src 'self'` und kein
    // 'unsafe-inline' — Inline-Skripte wären damit blockiert. Als eigene Dateien
    // unter /_astro/ laufen sie sauber durch.
    inlineStylesheets: "auto",
    assets: "_astro",
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
