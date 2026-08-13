#!/usr/bin/env node
// prepare-images.mjs — bereitet die Originalbilder des Kunden für den Build auf.
//
// Quelle: /tmp/vt-src (einmalig von der Bestandsseite gezogen, Kundenmaterial)
// Ziel:   public/img  — WebP, feste Maße, Graustufen.
//
// Graustufen ist eine bewusste Design-Entscheidung: Die Bilder der drei Head
// Coaches sind bereits S/W; die Trainerporträts sind es teilweise nicht. Ohne
// Vereinheitlichung wirkt das Trainerraster wie eine Sammlung fremder Bilder.

import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = process.argv[2] ?? "/tmp/vt-src";
const OUT = "public/img";
fs.mkdirSync(OUT, { recursive: true });

/** Porträts: quadratisch, Gesicht sitzt im oberen Drittel → attention: entropy vermeiden. */
const PORTRAITS = [
  "coach-jan", "coach-max", "coach-timo",
  "t-roberts", "t-martins", "t-daniel", "t-magdalena", "t-aljoscha",
  "t-jule", "t-maik", "t-sophia", "t-jonas", "t-zuzanna", "t-valentin", "t-victoria",
];

const results = [];

for (const name of PORTRAITS) {
  const src = path.join(SRC, `${name}.jpg`);
  if (!fs.existsSync(src)) {
    console.warn(`übersprungen (fehlt): ${name}`);
    continue;
  }
  const size = name.startsWith("coach-") ? 640 : 480;
  const out = path.join(OUT, `${name}.webp`);
  await sharp(src)
    .resize(size, size, { fit: "cover", position: sharp.strategy.attention })
    .grayscale()
    .webp({ quality: 82 })
    .toFile(out);
  results.push([name, size]);
}

// Heroshot: breites Format, bereits S/W.
if (fs.existsSync("public/img/hero-drei.jpg")) {
  await sharp("public/img/hero-drei.jpg")
    .resize(1600, 900, { fit: "cover" })
    .grayscale()
    .webp({ quality: 80 })
    .toFile(path.join(OUT, "hero-team.webp"));
  results.push(["hero-team", "1600x900"]);
}

// Logo: transparentes PNG bleibt PNG (Alpha), nur verkleinert.
if (fs.existsSync("public/img/logo-rgb.png")) {
  await sharp("public/img/logo-rgb.png")
    .resize(480, null, { fit: "inside" })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, "logo.png"));
  results.push(["logo", 480]);
}

// Zwischendateien entfernen — nur die aufbereiteten Assets gehören ins Repo.
for (const tmp of ["hero-drei.jpg", "logo-rgb.png", "logo-original.jpg"]) {
  const p = path.join(OUT, tmp);
  if (fs.existsSync(p)) fs.unlinkSync(p);
}

console.log(`${results.length} Bilder aufbereitet → ${OUT}`);
for (const [n, s] of results) console.log(`  ${n} (${s})`);
