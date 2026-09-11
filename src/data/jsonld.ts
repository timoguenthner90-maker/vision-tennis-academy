// Strukturierte Daten. Die Typen entsprechen dem Acceptance-Set in acceptance.json:
// Organization + WebSite global, SportsActivityLocation je Standort, FAQPage auf /faq/.

import { site, clubs, winterSeason, winterTraining, SITE_URL as BASE } from "./site";

/** "28.09.2026" -> "2026-09-28". Schema.org will ISO 8601. */
function iso(de: string): string {
  const [d, m, y] = de.split(".");
  return `${y}-${m}-${d}`;
}

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

/**
 * Trainingsangebot als Service + OfferCatalog.
 *
 * Ausgezeichnet wird `perHour` — der Trainingsanteil je Trainerstunde, NICHT der
 * Endpreis. Der Hallenanteil haengt an Verein und Uhrzeit und steht erst bei der
 * Anmeldung fest; deshalb traegt jedes Offer eine `description`, die das sagt.
 * Ein nackter Preis hier wuerde eine Zahl behaupten, die so niemand zahlt.
 *
 * `validThrough` bindet die Angaben an die Saison: Nach dem Saisonwechsel laeuft
 * die Auszeichnung ab, statt still falsch zu werden.
 */
export const trainingServiceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${BASE}/training/#service`,
  name: "Tennistraining",
  serviceType: "Tennistraining",
  provider: { "@id": `${BASE}/#organization` },
  areaServed: clubs.map((c) => ({ "@type": "City", name: c.city })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: `Trainingsangebot ${winterSeason.label}`,
    itemListElement: winterTraining.map((t) => ({
      "@type": "Offer",
      name: t.group,
      description:
        "Trainingsanteil je Trainerstunde (60 Minuten). Der Hallenanteil kommt hinzu und richtet sich nach Verein und Uhrzeit.",
      category: "Trainingsanteil",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: t.perHour,
        priceCurrency: "EUR",
        unitCode: "HUR",
        unitText: "Trainerstunde",
      },
      eligibleQuantity: {
        "@type": "QuantitativeValue",
        value: t.size,
        unitText: "Teilnehmer",
      },
      validFrom: iso(winterSeason.from),
      validThrough: iso(winterSeason.to),
      seller: { "@id": `${BASE}/#organization` },
    })),
  },
};
