#!/usr/bin/env node
// check-no-shop.mjs — projektspezifischer harter Check.
//
// Der Auftrag lautet „ohne Shop". Das ist maschinell prüfbar, also gehört es in
// die Automatik und nicht ins Gate: Wir grepen den fertigen Build auf Begriffe,
// die es auf einer shopfreien Seite nicht geben darf.
//
// Bewusst NICHT verboten: Preise. Trainingspreise sind Kerninhalt der Seite und
// kein Shop-Merkmal — verboten ist der Kaufvorgang, nicht die Zahl.
//
// Exit-Code 1 = hartes Fail.

import fs from "node:fs";
import path from "node:path";

const distDir = path.resolve(process.argv[2] ?? "dist");

/** Muster, die auf E-Commerce-Rückstände hindeuten. */
const FORBIDDEN = [
  { re: /\bwarenkorb\b/i, why: "Warenkorb" },
  { re: /\bin den korb\b/i, why: "Kauf-Button" },
  { re: /\bzur kasse\b/i, why: "Checkout" },
  { re: /\bcheckout\b/i, why: "Checkout" },
  { re: /\bshopify\b/i, why: "Shopify-Rückstand" },
  { re: /\bcdn\.shopify\.com/i, why: "Hotlink auf Shopify-CDN" },
  { re: /\bpaypal\b/i, why: "Zahlungsanbieter" },
  { re: /\bklarna\b/i, why: "Zahlungsanbieter" },
  { re: /\bapple pay\b/i, why: "Zahlungsanbieter" },
  { re: /\bshop pay\b/i, why: "Zahlungsanbieter" },
  { re: /\bversandkosten\b/i, why: "Versand" },
  { re: /\bwiderrufsrecht\b/i, why: "Shop-Rechtstext" },
  { re: /\bzzgl\. mwst\b/i, why: "Shop-Preisauszeichnung" },
  { re: /\/collections\//i, why: "Shop-Collection-Link" },
  { re: /\/products\//i, why: "Shop-Produkt-Link" },
];

/** Diese Dateien dürfen die Begriffe enthalten (404 erklärt den Wegfall). */
const ALLOW = [{ file: "404.html", res: [/\bonlineshop\b/i] }];

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

if (!fs.existsSync(distDir)) {
  console.error(`FAIL  dist-Verzeichnis nicht gefunden: ${distDir}`);
  process.exit(1);
}

const files = walk(distDir);
const hits = [];

for (const file of files) {
  const rel = path.relative(distDir, file);
  const html = fs.readFileSync(file, "utf8");
  const allow = ALLOW.find((a) => a.file === rel);

  for (const { re, why } of FORBIDDEN) {
    const m = html.match(re);
    if (!m) continue;
    if (allow?.res.some((ar) => ar.test(m[0]))) continue;
    const at = html.indexOf(m[0]);
    hits.push({ rel, why, match: m[0], ctx: html.slice(Math.max(0, at - 60), at + 60).replace(/\s+/g, " ") });
  }
}

console.log(`Shop-Freiheit: ${files.length} Seiten geprüft`);
if (hits.length === 0) {
  console.log("PASS  keine E-Commerce-Rückstände gefunden");
  process.exit(0);
}

for (const h of hits) {
  console.error(`FAIL  ${h.rel}: ${h.why} — „${h.match}“`);
  console.error(`      …${h.ctx}…`);
}
console.error(`\n${hits.length} Treffer — hartes Fail.`);
process.exit(1);
