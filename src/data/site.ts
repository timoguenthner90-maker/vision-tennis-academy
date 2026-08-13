// Zentrale Stammdaten. Alle Angaben stammen aus der Bestandsseite vision-tennis.de
// (Impressum, FAQ, Seite „Training buchen", Seite „Über uns"), Stand 13.08.2026.
// Werte, die vor Production bestätigt werden müssen, sind in SPEC.md Abschnitt 7
// gelistet.

export const site = {
  name: "Vision Tennis Academy",
  legalName: "Vision Tennis Academy GbR",
  founded: "2022-06",
  street: "Elvekumer Weg 19",
  zip: "41542",
  city: "Dormagen",
  country: "DE",
  phone: "+49 1512 9409005",
  phoneHref: "+4915129409005",
  whatsapp: "https://wa.me/4915129409005",
  email: "info@vision-tennis.de",
  jobsEmail: "jobs@vision-tennis.de",
  vatId: "DE355802486",
  partners: ["Jan Gerring", "Maximilian Gumz", "Dr. Timo Günthner"],
  instagram: "https://www.instagram.com/visiontennisacademy/",
  facebook: "https://www.facebook.com/visiontennisacdmy",
} as const;

/** Der EINE Call-to-Action (Story-Element #9) — Wording und Ziel nie variieren. */
export const cta = {
  label: "Kostenloses Probetraining sichern",
  href: site.whatsapp,
  note: "Per WhatsApp oder E-Mail – wir melden uns kurzfristig zurück.",
} as const;

export const nav = [
  { href: "/training/", label: "Training" },
  { href: "/academy/", label: "Academy" },
  { href: "/standorte/", label: "Standorte" },
  { href: "/service/", label: "Service" },
  { href: "/faq/", label: "FAQ" },
  { href: "/kontakt/", label: "Kontakt" },
] as const;

export type Club = {
  slug: string;
  name: string;
  street: string;
  zip: string;
  city: string;
  courts: string;
  season: string;
  memberAdult: number;
  memberYouth: number;
  clubSite: string;
  booking: string;
};

export const clubs: Club[] = [
  {
    slug: "tc-bayer-dormagen",
    name: "TC Bayer Dormagen",
    street: "Holzweg 63",
    zip: "41542",
    city: "Dormagen",
    courts:
      "17 Außenplätze, ein Kleinfeldplatz für die Kleinen und sechs Hallenplätze",
    season: "Ganzjährig – im Winter in der eigenen Halle",
    memberAdult: 375,
    memberYouth: 120,
    clubSite: "https://www.tc-bayer-dormagen.de",
    booking: "https://www.sportision.de/club/tc-bayer-dormagen",
  },
  {
    slug: "tc-ford-koeln",
    name: "TC Ford Köln",
    street: "Scheibenstraße 23",
    zip: "50737",
    city: "Köln",
    courts:
      "10 Außenplätze, ein Kleinfeldplatz im Freien und eine Drei-Platz-Tennishalle",
    season: "Ganzjährig – im Winter in der eigenen Halle",
    memberAdult: 290,
    memberYouth: 115,
    clubSite: "https://www.tcfk.de",
    booking: "https://www.sportision.de/club/tc-ford-koln-1",
  },
  {
    slug: "uedesheimer-tv",
    name: "Uedesheimer TV",
    street: "Norfer Weg 75",
    zip: "41468",
    city: "Neuss",
    courts: "7 Außenplätze und ein Kleinfeldplatz im Freien",
    season: "Sommersaison – im Winter trainieren wir in Dormagen weiter",
    memberAdult: 210,
    memberYouth: 85,
    clubSite: "https://www.uetv.de",
    booking: "https://www.sportision.de/club/uedesheimer-tv-1",
  },
];

export const headCoaches = [
  { name: "Jan Gerring", role: "Head Coach", license: "DTB B-Trainer", img: "coach-jan" },
  { name: "Max Gumz", role: "Head Coach", license: "DTB B-Trainer", img: "coach-max" },
  {
    name: "Timo Günthner",
    role: "Head Coach",
    license: "DTB B-Trainer",
    img: "coach-timo",
  },
];

/** img: null = kein Foto auf der Bestandsseite vorhanden → Initialen-Kachel. */
export const coaches = [
  { name: "Roberts", license: "DTB A-Trainer", img: "t-roberts" },
  { name: "Sabine", license: "DTB A-Trainerin", img: null },
  { name: "Martins", license: "USTA A-Trainer", img: "t-martins" },
  { name: "Daniel", license: "VTD Trainer · DTB B-Trainer", img: "t-daniel" },
  { name: "Magdalena", license: "DTB C-Trainerin", img: "t-magdalena" },
  { name: "Aljoscha", license: "DTB C-Trainer", img: "t-aljoscha" },
  { name: "Jule", license: "DTB C-Trainerin", img: "t-jule" },
  { name: "Sophia", license: "DTB C-Trainerin", img: "t-sophia" },
  { name: "Jonas", license: "DTB C-Trainer", img: "t-jonas" },
  { name: "Yannick", license: "DTB C-Trainer", img: null },
  { name: "Amelie", license: "DTB C-Trainerin", img: null },
  { name: "Maik", license: "Coach", img: "t-maik" },
  { name: "Kristian", license: "Coach", img: null },
  { name: "Zuzanna", license: "in Ausbildung", img: "t-zuzanna" },
  { name: "Valentin", license: "in Ausbildung", img: "t-valentin" },
  { name: "Victoria", license: "in Ausbildung", img: "t-victoria" },
  { name: "Norberts", license: "in Ausbildung", img: null },
  { name: "Luke", license: "in Ausbildung", img: null },
];

export const coachCount = headCoaches.length + coaches.length;

/** Stundensätze und Saisonpreise laut FAQ der Bestandsseite. */
export const prices = [
  { group: "Einzeltraining", perHour: 50, season: 750 },
  { group: "Zweiergruppe", perHour: 54, season: 405 },
  { group: "Dreiergruppe", perHour: 57, season: 285 },
  { group: "Vierergruppe", perHour: 60, season: 225 },
];

export const teamPrices = [
  { unit: "1 Stunde pro Woche", season: 1050 },
  { unit: "1,5 Stunden pro Woche", season: 1575 },
  { unit: "2 Stunden pro Woche", season: 2100 },
];
