// FAQ-Inhalte, übernommen von vision-tennis.de/pages/faqs (Stand 13.08.2026).
//
// Zwei bewusste Abweichungen vom Original:
//  1. Die Kategorie „Shop & Service" heißt jetzt „Material & Service"; die Frage
//     „Wie und wo kann ich Equipment kaufen?" ist umformuliert, weil es keinen
//     Shop mehr gibt.
//  2. Der Saisonzeitraum ist generisch formuliert — das Original nennt noch
//     28.04.2025–28.09.2025 (siehe SPEC.md §7.2).

export type FaqItem = { q: string; a: string[] };
export type FaqGroup = { title: string; items: FaqItem[] };

export const faqGroups: FaqGroup[] = [
  {
    title: "Training & Planung",
    items: [
      {
        q: "Wie und wo kann ich Tennistraining bei Vision Tennis buchen?",
        a: [
          "Wir trainieren am TC Bayer Dormagen, am TC Ford Köln und beim Uedesheimer TV. Am schnellsten geht es, wenn du uns per WhatsApp oder E-Mail schreibst — dann suchen wir eine passende Gruppe. Die Termine der Vereine findest du außerdem auf der Seite Training.",
        ],
      },
      {
        q: "Wann kann ich mit dem Training anfangen?",
        a: [
          "Du kannst das ganze Jahr über einsteigen. Wir schauen dann, in welche laufende Gruppe du am besten passt, oder stellen eine neue zusammen.",
        ],
      },
      {
        q: "Wann findet kein Training statt?",
        a: [
          "In den Schulferien, an gesetzlichen Feiertagen sowie an Karneval findet kein Training statt.",
        ],
      },
      {
        q: "Wie komme ich zu einer Probestunde?",
        a: [
          "Eine Probestunde von 60 Minuten ist an jedem unserer drei Vereine kostenlos möglich. Schreib uns kurz, wie alt du bzw. dein Kind ist und wann ihr Zeit habt — wir legen die Stunde dann in eine passende Gruppe.",
        ],
      },
      {
        q: "Wie lange dauert eine Trainingseinheit und wann findet sie statt?",
        a: [
          "Eine Einheit dauert in der Regel 60 Minuten und findet wöchentlich zur festen Zeit statt. Deine konkrete Trainingszeit erhältst du nach der Anmeldung.",
        ],
      },
      {
        q: "Welche Altersgruppen trainieren bei euch?",
        a: [
          "Kinder und Jugendliche von etwa 5 bis 18 Jahren sowie Erwachsene von 18 bis 90 Jahren.",
        ],
      },
      {
        q: "Wie groß ist eine Trainingsgruppe?",
        a: [
          "Eine Gruppe besteht aus 1 bis 4 Personen. So bleibt genug Zeit für jede einzelne Person — das ist die Grundlage unseres Trainingskonzepts.",
        ],
      },
      {
        q: "Wie lange läuft die Sommersaison?",
        a: [
          "Die Sommersaison läuft von Ende April bis Ende September. Die genauen Termine der laufenden Saison nennen wir dir bei der Anmeldung.",
        ],
      },
      {
        q: "Wie melde ich mich ab, wenn ich einmal nicht kann?",
        a: [
          "Schreib uns eine E-Mail an info@vision-tennis.de oder eine Nachricht per WhatsApp an +49 1512 9409005.",
        ],
      },
      {
        q: "Wann erhalte ich meine Trainingszeit?",
        a: [
          "Nach Abschluss der Anmeldephase erstellen wir den Trainingsplan. Du bekommst deine Zeit anschließend per E-Mail — wir berücksichtigen dabei die von dir angegebenen Wunschzeiten so weit wie möglich.",
        ],
      },
      {
        q: "Ich habe keine Trainingszeit erhalten — woran liegt das?",
        a: [
          "Dafür gibt es mehrere mögliche Gründe: Es wurde noch keine passende Gruppe gefunden, unsere E-Mail ist im Spam-Ordner gelandet, bei der Adresse hat sich ein Tippfehler eingeschlichen oder der Plan ist noch nicht vollständig.",
          "Melde dich in dem Fall einfach direkt bei uns, dann klären wir es kurzfristig.",
        ],
      },
      {
        q: "Gibt es Feriencamps?",
        a: [
          "Ja, wir bieten regelmäßig Camps an — vor allem in den Ferienzeiten, in denen das reguläre Training pausiert. Frag uns nach den nächsten Terminen.",
        ],
      },
      {
        q: "Was passiert, wenn es regnet?",
        a: [
          "Wenn eine Halle frei ist, gehen wir hinein. Ist das nicht möglich, gibt es Alternativtraining — zum Beispiel Kraft-, Koordinations- und Schnelligkeitsübungen.",
        ],
      },
      {
        q: "Wie kündige ich das Training?",
        a: [
          "Eine Kündigung ist nicht nötig: Das Training endet automatisch mit dem Ende der Saison. Wenn du zusätzlich aus dem Verein austreten möchtest, kündigst du die Mitgliedschaft direkt beim Verein.",
        ],
      },
    ],
  },
  {
    title: "Kosten & Abrechnung",
    items: [
      {
        q: "Wie setzen sich die Kosten zusammen?",
        a: [
          "Die Kosten hängen von der Gruppengröße und der Trainingsart ab und beziehen sich immer auf 60 Minuten. Je größer die Gruppe, desto günstiger wird es für die einzelne Person.",
        ],
      },
      {
        q: "Was kostet eine Probestunde?",
        a: ["Die Probestunde ist kostenlos."],
      },
      {
        q: "Was kostet eine Trainingsstunde?",
        a: [
          "Einzeltraining 50 €, Zweiergruppe 54 €, Dreiergruppe 57 € und Vierergruppe 60 € pro Stunde. Die Beträge gelten jeweils für die gesamte Gruppe.",
        ],
      },
      {
        q: "Was kostet eine ganze Saison?",
        a: [
          "Pro Person: Einzeltraining 750 €, Zweiergruppe 405 €, Dreiergruppe 285 €, Vierergruppe 225 €.",
        ],
      },
      {
        q: "Was kostet Mannschaftstraining für 5 bis 8 Personen?",
        a: [
          "70 € pro Stunde. Über die Saison sind das 1.050 € bei einer Stunde pro Woche, 1.575 € bei 1,5 Stunden und 2.100 € bei 2 Stunden.",
        ],
      },
      {
        q: "Warum ist Mannschaftstraining teurer?",
        a: [
          "Weil dabei zwei Plätze gleichzeitig belegt werden und die Teilnahme von acht Personen garantiert ist. Die Kapazität dafür ist begrenzt.",
        ],
      },
      {
        q: "Wie wird bezahlt?",
        a: [
          "Nach dem Saisonstart erhältst du eine Rechnung. Der Betrag wird per SEPA-Lastschrift eingezogen.",
        ],
      },
    ],
  },
  {
    title: "Material & Service",
    items: [
      {
        q: "Kann ich meinen Schläger bei euch besaiten lassen?",
        a: [
          "Ja. Eine Besaitung kostet 25 €; für Premium-Saiten kommt je nach Material ein Aufpreis dazu. Gib deinen Schläger einfach beim Training ab.",
        ],
      },
      {
        q: "Kann ich einen Schläger ausleihen?",
        a: [
          "Ja, du kannst jederzeit Testschläger ausleihen. Sprich dazu am besten deinen Trainer an — auch schon bei der Probestunde.",
        ],
      },
      {
        q: "Wo bekomme ich passende Ausrüstung?",
        a: [
          "Wir verkaufen keine Ausrüstung mehr über die Website. Stattdessen beraten wir dich direkt auf dem Platz und leihen dir Testschläger, damit du vor einer Anschaffung vergleichen kannst.",
        ],
      },
      {
        q: "Welcher Schläger ist der richtige für mich?",
        a: [
          "Das hängt vor allem vom persönlichen Gefühl ab. Probier bei uns verschiedene Testschläger aus — nach einer Trainingsstunde weißt du deutlich mehr als nach jeder Produktbeschreibung.",
        ],
      },
    ],
  },
  {
    title: "Vereine & Mitgliedschaft",
    items: [
      {
        q: "Muss ich Mitglied im Verein sein?",
        a: [
          "Für die Probestunde nicht. Für regelmäßiges Training ist eine Mitgliedschaft im jeweiligen Verein erforderlich.",
        ],
      },
      {
        q: "Was kostet die Mitgliedschaft in den Vereinen?",
        a: [
          "TC Bayer Dormagen: 375 € für Erwachsene, 120 € für Jugendliche. TC Ford Köln: 290 € bzw. 115 €. Uedesheimer TV: 210 € bzw. 85 €.",
          "Die Beiträge werden von den Vereinen festgelegt, nicht von uns. Details stehen auf den Websites der Vereine.",
        ],
      },
      {
        q: "Wie sind die Anlagen ausgestattet?",
        a: [
          "TC Bayer Dormagen: 17 Außenplätze, ein Kleinfeldplatz und sechs Hallenplätze, Clubhaus mit Duschen und Restaurant, Holzweg 63 in Dormagen.",
          "TC Ford Köln: 10 Außenplätze, ein Kleinfeldplatz im Freien und eine Drei-Platz-Halle, Clubhaus mit Duschen, Scheibenstraße 23 in Köln.",
          "Uedesheimer TV: 7 Außenplätze und ein Kleinfeldplatz im Freien, Clubhaus, Norfer Weg 75 in Neuss.",
        ],
      },
      {
        q: "Wie kündige ich meine Mitgliedschaft?",
        a: [
          "Die Mitgliedschaft kündigst du direkt beim jeweiligen Verein — wir können das nicht für dich übernehmen.",
        ],
      },
    ],
  },
  {
    title: "Unternehmen",
    items: [
      {
        q: "Wie bewerbe ich mich bei euch?",
        a: [
          "Schick uns eine E-Mail an jobs@vision-tennis.de. Mehr dazu steht auf der Seite Jobs.",
        ],
      },
      {
        q: "Wie erreiche ich Vision Tennis?",
        a: [
          "Per E-Mail an info@vision-tennis.de oder per Telefon und WhatsApp unter +49 1512 9409005.",
        ],
      },
    ],
  },
];

export const faqFlat = faqGroups.flatMap((g) =>
  g.items.map((i) => ({ q: i.q, a: i.a.join(" ") })),
);
