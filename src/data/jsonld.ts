// Strukturierte Daten. Die Typen entsprechen dem Acceptance-Set in acceptance.json:
// Organization + WebSite global, SportsActivityLocation je Standort, FAQPage auf /faq/.

import { site, clubs } from "./site";

const BASE = "https://vision-tennis-academy.netlify.app";

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: `${BASE}/`,
  logo: `${BASE}/img/logo.png`,
  foundingDate: site.founded,
  email: site.email,
  telephone: site.phone,
  vatID: site.vatId,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.street,
    postalCode: site.zip,
    addressLocality: site.city,
    addressCountry: site.country,
  },
  sameAs: [site.instagram, site.facebook],
  areaServed: ["Dormagen", "Neuss", "Köln", "Düsseldorf"],
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE}/#website`,
  url: `${BASE}/`,
  name: site.name,
  inLanguage: "de-DE",
  publisher: { "@id": `${BASE}/#organization` },
};

export const clubsLd = clubs.map((c) => ({
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  "@id": `${BASE}/standorte/#${c.slug}`,
  name: `${site.name} — ${c.name}`,
  url: `${BASE}/standorte/#${c.slug}`,
  parentOrganization: { "@id": `${BASE}/#organization` },
  telephone: site.phone,
  email: site.email,
  sport: "Tennis",
  address: {
    "@type": "PostalAddress",
    streetAddress: c.street,
    postalCode: c.zip,
    addressLocality: c.city,
    addressCountry: "DE",
  },
}));

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${BASE}/faq/#faq`,
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}
