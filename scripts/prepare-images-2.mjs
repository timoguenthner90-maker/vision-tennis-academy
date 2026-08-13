#!/usr/bin/env node
// prepare-images-2.mjs — zweiter Schwung Kundenbilder von der Bestandsseite.
//
// Quelle: /tmp/vt-new (einmalig von vision-tennis.de gezogen, Kundenmaterial)
//
// Zwei Sonderfälle:
//  · Die Vereinslogos bleiben FARBIG. Sonst gilt auf der Seite Graustufe, aber
//    ein Vereinswappen ist eine Identitätsmarke — die graut man nicht ein.
//  · Zwei Markenbilder tragen eingebrannten Text („Tennisschule", „Shop").
//    Der Shop existiert nicht mehr, also wird die untere Bildzone abgeschnitten.

import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = process.argv[2] ?? "/tmp/vt-new";
const OUT = "public/img";
fs.mkdirSync(OUT, { recursive: true });

const done = [];

/** Fotos: Graustufe wie der Rest der Seite. */
const PHOTOS = [
  // [Quelle, Ziel, Breite, Höhe, unten abschneiden in Prozent]
  ["jamati", "team-band", 1400, 600, 0],
  ["kopie2", "training-schwung", 1000, 750, 22],
  ["kopie4", "service-equipment", 1000, 700, 22],
  ["racquet-gravity", "service-schlaeger", 1000, 700, 0],
  ["racquet-prestige", "service-tasche", 1000, 700, 0],
];

for (const [src, out, w, h, cutPct] of PHOTOS) {
  const file = path.join(SRC, `${src}.img`);
  if (!fs.existsSync(file)) {
    console.warn(`übersprungen (fehlt): ${src}`);
    continue;
  }
  let img = sharp(file);
  if (cutPct > 0) {
    const m = await sharp(file).metadata();
    img = sharp(file).extract({
      left: 0,
      top: 0,
      width: m.width,
      height: Math.round(m.height * (1 - cutPct / 100)),
    });
  }
  await img
    .resize(w, h, { fit: "cover", position: sharp.strategy.attention })
    .grayscale()
    .webp({ quality: 80 })
    .toFile(path.join(OUT, `${out}.webp`));
  done.push([out, `${w}×${h}`, cutPct ? `unten −${cutPct}%` : ""]);
}

/** Vereinslogos: Farbe behalten, auf weißem Grund, quadratisch gefasst. */
const LOGOS = [
  ["d44", "club-dormagen"],
  ["d42", "club-koeln"],
  ["d43", "club-neuss"],
];

for (const [src, out] of LOGOS) {
  const file = path.join(SRC, `${src}.img`);
  if (!fs.existsSync(file)) {
    console.warn(`übersprungen (fehlt): ${src}`);
    continue;
  }
  await sharp(file)
    .resize(320, 320, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .webp({ quality: 88 })
    .toFile(path.join(OUT, `${out}.webp`));
  done.push([out, "320×320", "Farbe erhalten"]);
}

console.log(`${done.length} Bilder aufbereitet → ${OUT}`);
for (const [n, s, note] of done) console.log(`  ${n} (${s}) ${note}`);
