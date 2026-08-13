// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// site = vorläufige Production-URL (Netlify-Subdomain). Bei Umzug auf die echte
// Kundendomain hier UND in public/robots.txt nachziehen — canonical, OG-URLs und
// Sitemap hängen alle an diesem Wert.
export default defineConfig({
  site: "https://vision-tennis-academy.netlify.app",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404"),
    }),
  ],
});
