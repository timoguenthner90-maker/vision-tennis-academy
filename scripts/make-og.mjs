#!/usr/bin/env node
// make-og.mjs — erzeugt public/og.png (1200×630) für Open Graph / Twitter Cards.
// Bewusst aus SVG gerendert statt aus einem Foto: So bleibt der Text scharf und
// die Datei klein, und es entsteht keine weitere Bildrechte-Frage.

import sharp from "sharp";

const W = 1200;
const H = 630;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#141414"/>
  <rect x="0" y="0" width="${W}" height="10" fill="#ece43f"/>

  <g transform="translate(72,110)">
    <path d="M0 46c22-34 50-50 74-50s52 16 74 50c-22 34-50 50-74 50S22 80 0 46Z"
          fill="none" stroke="#ffffff" stroke-width="7"/>
    <circle cx="74" cy="46" r="26" fill="#ece43f"/>
    <path d="M56 28c13 8 15 28 0 36M92 28c-13 8-15 28 0 36"
          fill="none" stroke="#141414" stroke-width="5"/>
  </g>

  <text x="72" y="330" fill="#ffffff" font-family="Helvetica,Arial,sans-serif"
        font-size="76" font-weight="bold" letter-spacing="-2">Vision Tennis Academy</text>

  <text x="72" y="410" fill="#d5d5d0" font-family="Helvetica,Arial,sans-serif"
        font-size="38">Tennistraining, das zu deinem Kind passt.</text>

  <text x="72" y="500" fill="#ece43f" font-family="Helvetica,Arial,sans-serif"
        font-size="27" font-weight="bold" letter-spacing="4">DORMAGEN · KÖLN · NEUSS</text>

  <text x="72" y="556" fill="#86867f" font-family="Helvetica,Arial,sans-serif"
        font-size="26">Gruppen von 1 bis 4 · lizenzierte Trainer · Probestunde kostenlos</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile("public/og.png");
console.log(`og.png erzeugt (${W}×${H})`);
