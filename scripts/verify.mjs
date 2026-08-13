#!/usr/bin/env node
// verify.mjs — Static-output verification gauntlet for an Astro page build.
// Zero dependencies. Runs against the built ./dist folder.
//
// Usage:
//   node scripts/verify.mjs [distDir] [--config path/to/acceptance.json] [--json report.json]
//
// Exit code 0 = all hard gates passed (deliverable may proceed to the human gate).
// Exit code 1 = at least one hard gate failed (NOTHING goes to the client).
//
// Project copy: extends the skill original with two site-level hard checks that
// acceptance.json declares — requiredUrls (must exist as built pages) and
// requiredStructuredData (JSON-LD @type values that must appear somewhere).

import fs from "node:fs";
import path from "node:path";

// ---------- configuration (overridable via --config acceptance.json) ----------
const DEFAULTS = {
  titleMaxLen: 60,
  descMinLen: 50,
  descMaxLen: 160,
  hard: {
    brokenInternalLinks: true,
    missingTitle: true,
    missingH1: true,
    missingMetaDescription: true,
    imageMissingAlt: true,
    invalidJsonLd: true,
    missingHtmlLang: true,
    missingViewport: true,
  },
  warn: {
    multipleH1: true,
    titleTooLong: true,
    descLength: true,
    missingCanonical: true,
    missingOpenGraph: true,
  },
  exemptFromSeo: ["404.html"],
  requiredUrls: [],
  requiredStructuredData: [],
};

// ---------- arg parsing ----------
const args = process.argv.slice(2);
let distDir = "dist";
let configPath = null;
let jsonOut = "verify-report.json";
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--config") configPath = args[++i];
  else if (args[i] === "--json") jsonOut = args[++i];
  else if (!args[i].startsWith("--")) distDir = args[i];
}
distDir = path.resolve(distDir);

let cfg = structuredClone(DEFAULTS);
if (configPath && fs.existsSync(configPath)) {
  const user = JSON.parse(fs.readFileSync(configPath, "utf8"));
  cfg = deepMerge(cfg, user);
}

// ---------- helpers ----------
function deepMerge(a, b) {
  const out = { ...a };
  for (const k of Object.keys(b)) {
    out[k] = b[k] && typeof b[k] === "object" && !Array.isArray(b[k])
      ? deepMerge(a[k] ?? {}, b[k])
      : b[k];
  }
  return out;
}

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

function getAttr(tag, name) {
  const re = new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i");
  const m = tag.match(re);
  if (!m) return null;
  return (m[2] ?? m[3] ?? m[4] ?? "").trim();
}

function decode(s) {
  return (s || "")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
}

const isExternal = (href) =>
  /^(https?:)?\/\//i.test(href) || /^(mailto:|tel:|data:|javascript:)/i.test(href);

// collect every "@type" value in a parsed JSON-LD tree (handles @graph, arrays)
function collectTypes(node, acc) {
  if (Array.isArray(node)) { for (const n of node) collectTypes(n, acc); return; }
  if (node && typeof node === "object") {
    const t = node["@type"];
    if (typeof t === "string") acc.add(t);
    else if (Array.isArray(t)) for (const x of t) if (typeof x === "string") acc.add(x);
    for (const v of Object.values(node)) collectTypes(v, acc);
  }
}

// ---------- collect pages ----------
if (!fs.existsSync(distDir) || !fs.statSync(distDir).isDirectory()) {
  console.error(`\n✗ dist directory not found: ${distDir}`);
  console.error("  Run the build first (e.g. `npm run build`) before verifying.\n");
  process.exit(1);
}

const allFiles = walk(distDir);
const htmlFiles = allFiles.filter((f) => f.endsWith(".html"));
const existing = new Set(allFiles.map((f) => path.relative(distDir, f).split(path.sep).join("/")));

if (htmlFiles.length === 0) {
  console.error(`\n✗ No .html files found in ${distDir}. Did the build produce output?\n`);
  process.exit(1);
}

// ---------- link resolution ----------
function linkExists(fromFile, raw) {
  let href = raw.split("#")[0].split("?")[0];
  if (!href) return true; // pure anchor / same page
  let target;
  if (href.startsWith("/")) target = href.slice(1);
  else {
    const fromDir = path.dirname(path.relative(distDir, fromFile));
    target = path.normalize(path.join(fromDir, href)).split(path.sep).join("/");
  }
  if (target.startsWith("..")) return false;
  const candidates = [
    target,
    target.replace(/\/$/, "") + "/index.html",
    target + (target.endsWith("/") ? "index.html" : "/index.html"),
    target + ".html",
  ];
  return candidates.some((c) => existing.has(c.replace(/^\//, "").replace(/\/{2,}/g, "/")));
}

// ---------- per-page checks ----------
const results = [];
const foundLdTypes = new Set();
for (const file of htmlFiles) {
  const rel = path.relative(distDir, file).split(path.sep).join("/");
  const html = fs.readFileSync(file, "utf8");
  const seoExempt = cfg.exemptFromSeo.some((s) => rel.includes(s));
  const hard = [];
  const warn = [];

  // links
  const linkTags = html.match(/<(?:a|link)\b[^>]*>/gi) || [];
  const srcTags = html.match(/<(?:img|script|source)\b[^>]*>/gi) || [];
  for (const tag of [...linkTags, ...srcTags]) {
    const url = getAttr(tag, "href") ?? getAttr(tag, "src");
    if (!url || isExternal(url) || url.startsWith("#")) continue;
    if (!linkExists(file, url)) hard.push(`broken internal link → ${url}`);
  }

  // title
  const titleM = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleM ? decode(titleM[1]) : "";
  if (!title) { if (!seoExempt) hard.push("missing <title>"); }
  else if (title.length > cfg.titleMaxLen)
    warn.push(`title ${title.length} chars (>${cfg.titleMaxLen})`);

  // meta description
  const descTag = (html.match(/<meta\b[^>]*>/gi) || [])
    .find((t) => (getAttr(t, "name") || "").toLowerCase() === "description");
  const desc = descTag ? decode(getAttr(descTag, "content") || "") : "";
  if (!desc) { if (!seoExempt) hard.push("missing meta description"); }
  else if (desc.length < cfg.descMinLen || desc.length > cfg.descMaxLen)
    warn.push(`meta description ${desc.length} chars (want ${cfg.descMinLen}–${cfg.descMaxLen})`);

  // headings
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  if (h1Count === 0) hard.push("no <h1> on page");
  else if (h1Count > 1) warn.push(`${h1Count} <h1> elements (expect 1)`);

  // images
  for (const tag of html.match(/<img\b[^>]*>/gi) || []) {
    const alt = getAttr(tag, "alt");
    if (alt === null || alt === "") {
      const src = getAttr(tag, "src") || "?";
      hard.push(`<img> without alt text → ${src}`);
    }
  }

  // html lang
  const htmlTag = html.match(/<html\b[^>]*>/i);
  if (!htmlTag || !getAttr(htmlTag[0], "lang")) hard.push("<html> missing lang attribute");

  // viewport
  const hasViewport = (html.match(/<meta\b[^>]*>/gi) || [])
    .some((t) => (getAttr(t, "name") || "").toLowerCase() === "viewport");
  if (!hasViewport) hard.push("missing viewport meta");

  // canonical
  const hasCanonical = (html.match(/<link\b[^>]*>/gi) || [])
    .some((t) => (getAttr(t, "rel") || "").toLowerCase() === "canonical");
  if (!hasCanonical && !seoExempt) warn.push("missing canonical link");

  // open graph
  const metaTags = html.match(/<meta\b[^>]*>/gi) || [];
  const ogProps = new Set(
    metaTags.map((t) => (getAttr(t, "property") || "").toLowerCase()).filter(Boolean)
  );
  const ogMissing = ["og:title", "og:description", "og:image"].filter((p) => !ogProps.has(p));
  if (ogMissing.length && !seoExempt) warn.push(`Open Graph missing: ${ogMissing.join(", ")}`);

  // json-ld (validity + collect @type values for the site-level check)
  const ldBlocks = html.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
  for (const block of ldBlocks) {
    const body = block.replace(/<script\b[^>]*>/i, "").replace(/<\/script>/i, "").trim();
    try { collectTypes(JSON.parse(body), foundLdTypes); }
    catch { hard.push("invalid JSON-LD (does not parse)"); }
  }

  // split hard/warn according to config flags
  const filteredHard = [];
  const filteredWarn = [...warn];
  for (const issue of hard) {
    const key = classify(issue);
    if (key && cfg.hard[key] === false) filteredWarn.push(issue);
    else filteredHard.push(issue);
  }

  results.push({ page: rel, title, hard: filteredHard, warn: filteredWarn });
}

function classify(issue) {
  if (issue.startsWith("broken internal link")) return "brokenInternalLinks";
  if (issue.startsWith("missing <title>")) return "missingTitle";
  if (issue.startsWith("no <h1>")) return "missingH1";
  if (issue.startsWith("missing meta description")) return "missingMetaDescription";
  if (issue.startsWith("<img> without alt")) return "imageMissingAlt";
  if (issue.startsWith("invalid JSON-LD")) return "invalidJsonLd";
  if (issue.includes("missing lang")) return "missingHtmlLang";
  if (issue.startsWith("missing viewport")) return "missingViewport";
  return null;
}

// ---------- site-level checks (extension over the skill original) ----------
const siteHard = [];

for (const u of cfg.requiredUrls) {
  const target = u.replace(/^\//, "").replace(/\/$/, "");
  const candidates = target === ""
    ? ["index.html"]
    : [`${target}/index.html`, `${target}.html`];
  if (!candidates.some((c) => existing.has(c)))
    siteHard.push(`required URL missing from build → ${u}`);
}

for (const t of cfg.requiredStructuredData) {
  if (!foundLdTypes.has(t))
    siteHard.push(`required structured-data @type missing → ${t}`);
}

// ---------- report ----------
const totalHard = results.reduce((n, r) => n + r.hard.length, 0) + siteHard.length;
const totalWarn = results.reduce((n, r) => n + r.warn.length, 0);

console.log(`\n  Astro delivery verification — ${htmlFiles.length} page(s) in ${path.relative(process.cwd(), distDir) || "."}\n`);
for (const r of results) {
  const ok = r.hard.length === 0;
  console.log(`  ${ok ? "✓" : "✗"} ${r.page}`);
  for (const h of r.hard) console.log(`      ✗ HARD  ${h}`);
  for (const w of r.warn) console.log(`      ! warn  ${w}`);
}
if (cfg.requiredUrls.length || cfg.requiredStructuredData.length) {
  console.log(`  ${siteHard.length === 0 ? "✓" : "✗"} site-level (requiredUrls, requiredStructuredData)`);
  for (const h of siteHard) console.log(`      ✗ HARD  ${h}`);
  if (siteHard.length === 0 && cfg.requiredStructuredData.length)
    console.log(`      · structured data found: ${[...foundLdTypes].join(", ")}`);
}
console.log(`\n  ${totalHard} hard failure(s), ${totalWarn} warning(s).`);

const passed = totalHard === 0;
console.log(passed
  ? "\n  ✓ Hard gates passed → ready for the human delivery gate.\n"
  : "\n  ✗ Hard gates failed → fix and re-run. Nothing reaches the client.\n");

fs.writeFileSync(jsonOut, JSON.stringify({
  distDir, pages: htmlFiles.length, totalHard, totalWarn, passed,
  site: { hard: siteHard, structuredDataFound: [...foundLdTypes] },
  results,
}, null, 2));

process.exit(passed ? 0 : 1);
