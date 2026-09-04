// Zentrale Stammdaten. Alle Angaben stammen aus der Bestandsseite vision-tennis.de
// (Impressum, FAQ, Seite „Training buchen", Seite „Über uns"), Stand 13.08.2026.
// Werte, die vor Production bestätigt werden müssen, sind in SPEC.md Abschnitt 7
// gelistet.

/**
 * Production-URL. Muss mit `site` in astro.config.mjs und der Sitemap-Zeile in
 * public/robots.txt übereinstimmen — Canonical, OG-URLs, Sitemap und JSON-LD
 * hängen daran. Beim Umzug auf die Kundendomain alle drei zusammen umstellen.
 */
export const SITE_URL = "https://vision-tennis-academy.netlify.app";

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
  email: "info@vision-tennis.de",
  jobsEmail: "jobs@vision-tennis.de",
  vatId: "DE355802486",
  partners: ["Jan Gerring", "Maximilian Gumz", "Dr. Timo Günthner"],
  instagram: "https://www.instagram.com/visiontennisacademy/",
  facebook: "https://www.facebook.com/visiontennisacdmy",
} as const;

/**
 * Der EINE Call-to-Action (Story-Element #9) — Wording und Ziel nie variieren.
 *
 * Ziel ist die Schnupperstundenseite: Dort wählt man Verein, Spielstärke und
 * Wunschzeiten aus, und der letzte Klick öffnet das Mailprogramm mit fertigem
 * Text. Kommunikation läuft bewusst über E-Mail statt WhatsApp — der noch
 * kommende Chatbot übernimmt künftig erste Fragen.
 */
export const cta = {
  label: "Schnupperstunde sichern",
  href: "/schnupperstunde/",
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
  /** Vereinswappen — bleibt farbig, im Gegensatz zu allen Fotos der Seite. */
  logo: string;
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
    season: "Ganzjährig, im Winter in der eigenen Halle",
    memberAdult: 375,
    memberYouth: 120,
    clubSite: "https://www.tc-bayer-dormagen.de",
    booking: "https://www.sportision.de/club/tc-bayer-dormagen",
    logo: "club-dormagen",
  },
  {
    slug: "tc-ford-koeln",
    name: "TC Ford Köln",
    street: "Scheibenstraße 23",
    zip: "50737",
    city: "Köln",
    courts:
      "10 Außenplätze, ein Kleinfeldplatz für die Kleinen und drei Hallenplätze",
    season: "Ganzjährig, im Winter in der eigenen Halle",
    memberAdult: 290,
    memberYouth: 115,
    clubSite: "https://www.tcfk.de",
    booking: "https://www.sportision.de/club/tc-ford-koln-1",
    logo: "club-koeln",
  },
  {
    slug: "uedesheimer-tv",
    name: "Uedesheimer TV",
    street: "Norfer Weg 75",
    zip: "41468",
    city: "Neuss",
    courts: "7 Außenplätze und ein Kleinfeldplatz für die Kleinen",
    season: "Sommersaison, im Winter trainieren wir in Dormagen weiter",
    memberAdult: 210,
    memberYouth: 85,
    clubSite: "https://www.uetv.de",
    booking: "https://www.sportision.de/club/uedesheimer-tv-1",
    logo: "club-neuss",
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

/**
 * Wintersaison 2026/2027 — Preise laut den Preislisten der drei Vereine
 * (Stand 14.08.2026), die identisch auch in Sportision hinterlegt sind.
 *
 * Ein Winterpreis besteht immer aus zwei Teilen: dem Trainingsanteil der
 * Academy (an allen Standorten gleich) und den Hallenkosten des Vereins. Die
 * Halle wird für die ganze Saison gebucht; der Betrag wird durch die
 * Teilnehmerzahl geteilt. Deshalb hängt der Endpreis nicht nur an der
 * Gruppengröße, sondern auch an der Uhrzeit — und lässt sich nur als
 * „ab"-Preis angeben, solange der Termin nicht feststeht.
 *
 * Aktiv ausgespielt: Die Anmeldung für die Wintersaison läuft noch bis
 * Freitag, deshalb zeigt /training/ diese Preise schon jetzt, obwohl die
 * Saison selbst erst am 28.09.2026 startet.
 *
 * Die Sommerpreise sind bis zum nächsten Saisonwechsel bewusst nicht
 * ausgespielt; sie stehen in der Git-Historie (vor Commit „Winterpreise").
 */
export const winterSeason = {
  label: "Winter 2026/2027",
  from: "28.09.2026",
  to: "25.04.2027",
} as const;

/**
 * Trainingsanteil pro Person für die gesamte Saison, zzgl. Hallenkosten.
 * `perHour` ist der saisonunabhängige Stundensatz (unverändert gegenüber der
 * Sommersaison) und dient nur der Anzeige auf /training/ — die Saisonpreise
 * unten (`youth`/`adult`) berechnen sich unabhängig davon über `winterFrom`.
 */
export const winterTraining = [
  { group: "Einzeltraining", size: 1, perHour: 50, youth: 1200, adult: 1200 },
  { group: "Zweiergruppe", size: 2, perHour: 54, youth: 648, adult: 648 },
  { group: "Dreiergruppe", size: 3, perHour: 57, youth: 456, adult: 456 },
  { group: "Vierergruppe", size: 4, perHour: 60, youth: 324, adult: 360 },
];

export type HallSlot = {
  days: string;
  time: string;
  /** null = in diesem Fenster kein Jugendtraining. */
  youth: number | null;
  adult: number | null;
};

export type HallTariff = {
  /** Wo im Winter tatsächlich gespielt wird. */
  venue: string;
  /** Ferienregelung — unterscheidet sich je Verein. */
  holidays: string;
  /** true = ein gemeinsamer Tarif für Jugendliche und Erwachsene. */
  oneTariff: boolean;
  slots: HallSlot[];
};

/** Hallenkosten je Platzstunde für die gesamte Saison, vor der Teilung. */
export const winterHall: Record<string, HallTariff> = {
  "tc-bayer-dormagen": {
    venue: "Eigene Sechs-Platz-Halle am Holzweg 63",
    holidays:
      "Jugendstunden ohne Ferien, Erwachsenenstunden mit Ferien, ausgenommen die Weihnachtsferien.",
    oneTariff: false,
    slots: [
      { days: "Mo–Fr", time: "07:00–10:00", youth: 320, adult: 320 },
      { days: "Mo–Fr", time: "10:00–13:00", youth: 340, adult: 360 },
      { days: "Mo–Fr", time: "13:00–15:00", youth: 320, adult: 320 },
      { days: "Mo–Fr", time: "15:00–17:00", youth: 340, adult: 380 },
      { days: "Mo–Fr", time: "17:00–21:00", youth: 380, adult: 500 },
      { days: "Mo–Fr", time: "ab 21:00", youth: null, adult: 380 },
      { days: "Sa/So", time: "07:00–10:00", youth: 320, adult: 320 },
      { days: "Sa/So", time: "10:00–22:00", youth: 380, adult: 460 },
    ],
  },
  "tc-ford-koeln": {
    venue: "Eigene Drei-Platz-Halle an der Scheibenstraße 23",
    holidays: "Jugend- und Erwachsenenstunden laufen jeweils mit Ferien.",
    oneTariff: false,
    slots: [
      { days: "Mo–Fr", time: "08:00–15:00", youth: 510, adult: 510 },
      { days: "Mo–Fr", time: "15:00–17:00", youth: 510, adult: 610 },
      { days: "Mo–Fr", time: "17:00–21:00", youth: 510, adult: 630 },
      { days: "Mo–Fr", time: "21:00–22:00", youth: 510, adult: 510 },
      { days: "Sa", time: "08:00–18:00", youth: 510, adult: 600 },
    ],
  },
  "uedesheimer-tv": {
    venue:
      "Halle des TC Bayer Dormagen, die Uedesheimer Anlage ist reine Sommersaison",
    holidays: "Mit Ferien, ausgenommen die Weihnachtsferien.",
    oneTariff: true,
    slots: [
      { days: "Mo–Fr", time: "07:00–10:00", youth: 360, adult: 360 },
      { days: "Mo–Fr", time: "10:00–13:00", youth: 400, adult: 400 },
      { days: "Mo–Fr", time: "13:00–15:00", youth: 360, adult: 360 },
      { days: "Mo–Fr", time: "15:00–17:00", youth: 480, adult: 480 },
      { days: "Mo–Fr", time: "17:00–21:00", youth: 620, adult: 620 },
      { days: "Mo–Fr", time: "ab 21:00", youth: 480, adult: 480 },
      { days: "Sa/So", time: "07:00–10:00", youth: 360, adult: 360 },
      { days: "Sa/So", time: "10:00–22:00", youth: 540, adult: 540 },
    ],
  },
};

/**
 * Günstigster Gesamtpreis pro Person und Saison — Trainingsanteil plus den
 * niedrigsten Hallenanteil, den es für diese Gruppengröße überhaupt gibt.
 * Basis für alle „ab"-Angaben auf der Seite.
 */
export function winterFrom(clubSlug: string, size: number, youth: boolean): number {
  const tariff = winterHall[clubSlug];
  const row = winterTraining.find((t) => t.size === size);
  if (!tariff || !row) throw new Error(`Kein Winterpreis für ${clubSlug}/${size}`);

  const halls = tariff.slots
    .map((s) => (youth ? s.youth : s.adult))
    .filter((p): p is number => p !== null);

  return (youth ? row.youth : row.adult) + Math.min(...halls) / size;
}
