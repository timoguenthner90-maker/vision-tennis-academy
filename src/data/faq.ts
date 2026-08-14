// FAQ-Inhalte, ursprünglich übernommen von vision-tennis.de/pages/faqs
// (Stand 13.08.2026).
//
// Bewusste Abweichungen vom Original:
//  1. Die Kategorie „Shop & Service" heißt jetzt „Material & Service". Es gibt
//     keinen Onlineshop mehr, wohl aber weiterhin Equipment: Die Academy ist
//     HEAD-Partner und bestellt auf Anfrage, Übergabe im Training.
//  2. Der Kostenblock bildet die Wintersaison 2026/2027 ab (Preislisten der drei
//     Vereine, Stand 14.08.2026) statt der Sommerpreise des Originals. Winter
//     wird zweiteilig abgerechnet — Trainingsanteil plus Hallenkosten —, deshalb
//     stehen dort „ab"-Beträge. Zahlen siehe src/data/site.ts, damit Seite und
//     FAQ nicht auseinanderlaufen.

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
        q: "Wo trainieren wir im Winter?",
        a: [
          "In Dormagen und Köln jeweils in der eigenen Halle des Vereins. Die Anlage des Uedesheimer TV hat keine Halle — diese Gruppe trainiert über den Winter in Dormagen weiter.",
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
        q: "Wie setzen sich die Kosten im Winter zusammen?",
        a: [
          "Aus zwei Teilen: dem Trainingsanteil der Academy und den Hallenkosten des Vereins. Der Trainingsanteil ist an allen drei Standorten gleich, die Hallenkosten legt jeder Verein selbst fest.",
          "Die Halle wird für die gesamte Saison gebucht und der Betrag durch die Teilnehmerzahl geteilt. Deshalb hängt der Endpreis auch an der Uhrzeit: Eine Stunde am Abend ist teurer als eine am Vormittag.",
        ],
      },
      {
        q: "Was kostet eine Probestunde?",
        a: ["Die Probestunde ist kostenlos."],
      },
      {
        q: "Wie lang ist die Wintersaison?",
        a: [
          "Vom 28.09.2026 bis zum 25.04.2027 — für Jugend- und Erwachsenentraining gleichermaßen.",
        ],
      },
      {
        q: "Was kostet der Trainingsanteil für die Wintersaison?",
        a: [
          "Pro Person für die gesamte Saison: Einzeltraining 1.200 €, Zweiergruppe 648 €, Dreiergruppe 456 €. In der Vierergruppe zahlen Jugendliche 324 €, Erwachsene 360 €.",
          "Dazu kommen die Hallenkosten des jeweiligen Vereins.",
        ],
      },
      {
        q: "Was kommt an Hallenkosten dazu?",
        a: [
          "Das hängt von Verein, Uhrzeit und Gruppengröße ab. Ein Beispiel: Eine Vierergruppe am Abend in Dormagen zahlt 125 € pro Person (500 € für die Saison, geteilt durch vier); dieselbe Gruppe am frühen Morgen 80 €.",
          "Alle Zeitfenster stehen offen auf der Seite Training & Preise — dieselben Listen findest du auch im Buchungssystem deines Vereins.",
        ],
      },
      {
        q: "Was zahle ich insgesamt mindestens?",
        a: [
          "In der Vierergruppe: ab 404 € (Jugendliche) beziehungsweise ab 440 € (Erwachsene) in Dormagen, ab 414 € / 450 € in Uedesheim und ab 451,50 € / 487,50 € in Köln — jeweils für die gesamte Saison.",
          "Die Beträge gelten für den günstigsten Zeitpunkt in der Woche. Liegt deine Stunde abends, kommt entsprechend mehr dazu.",
        ],
      },
      {
        q: "Warum ist es in Köln teurer als in Dormagen?",
        a: [
          "Weil die Vereine ihre Hallenkosten selbst festlegen und wir sie unverändert weitergeben. Der Trainingsanteil ist überall derselbe.",
        ],
      },
      {
        q: "Gibt es Mannschaftstraining im Winter?",
        a: [
          "Nein, Mannschaftstraining für 5 bis 8 Personen bieten wir nur in der Sommersaison an — dabei werden zwei Plätze gleichzeitig belegt, und dafür reicht die Hallenkapazität im Winter nicht.",
        ],
      },
      {
        q: "Wie wird bezahlt?",
        a: [
          "Nach dem Saisonstart erhältst du eine Rechnung über den Trainingsanteil, der Betrag wird per SEPA-Lastschrift eingezogen.",
          "Die Hallenkosten zieht der Verein separat und anteilig ein. Eine Kündigung ist nicht nötig: Das Training endet automatisch mit der Saison.",
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
          "Direkt bei uns. Die Vision Tennis Academy ist Partner der Sportmarke HEAD und bezieht ihr Equipment über die Marke.",
          "Einen Onlineshop gibt es dafür nicht: Du fragst uns oder deinen Trainer nach dem Preis für den gewünschten Schläger, wir bestellen ihn und bringen ihn zur nächsten Trainingsstunde mit.",
        ],
      },
      {
        q: "Was kostet ein Schläger bei euch?",
        a: [
          "Das hängt vom Modell ab — sag uns einfach, welcher Schläger dich interessiert, dann nennen wir dir den Preis. Am schnellsten geht das direkt beim Training oder per E-Mail an info@vision-tennis.de.",
        ],
      },
      {
        q: "Welcher Schläger ist der richtige für mich?",
        a: [
          "Das hängt vor allem vom persönlichen Gefühl ab. Probier bei uns verschiedene Testschläger aus — nach einer Trainingsstunde weißt du deutlich mehr als nach jeder Produktbeschreibung. Erst danach bestellst du.",
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
