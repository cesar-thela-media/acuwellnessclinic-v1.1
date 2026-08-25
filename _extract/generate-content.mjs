import fs from "fs";
import path from "path";

const ROOT = "C:/Users/idder/tmg/acuwellnessclinic";
const EXTRACT = path.join(ROOT, "_extract");
const HTML_DIR = path.join(EXTRACT, "html");
const CONTENT = path.join(ROOT, "content");

const SITE = "https://acuwellnessclinic.com";

function read(p) {
  return fs.readFileSync(p, "utf8").replace(/^\uFEFF/, "");
}
function readJson(p) {
  return JSON.parse(read(p));
}
function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&#038;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&raquo;/g, "»")
    .replace(/&nbsp;/g, "\u00a0")
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)));
}

function htmlFileFor(urlPath) {
  if (urlPath === "/") return path.join(HTML_DIR, "__home.html");
  const name = `__${urlPath.replace(/^\//, "").replace(/\//g, "__")}.html`;
  return path.join(HTML_DIR, name);
}

function extractMeta(html) {
  const title = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ""])[1].replace(/\s+/g, " ").trim());
  const meta = (name) => {
    const re = new RegExp(`<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']*)["']`, "i");
    const re2 = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+(?:name|property)=["']${name}["']`, "i");
    return decode((html.match(re) || html.match(re2) || [, ""])[1]);
  };
  const canonical = (html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ||
    html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i) || [, ""])[1];
  let jsonLd = [];
  for (const m of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      jsonLd.push(JSON.parse(m[1]));
    } catch {
      /* ignore */
    }
  }
  return {
    title,
    description: meta("description"),
    canonical,
    robots: meta("robots"),
    jsonLd,
  };
}

function extractBody(html) {
  let chunk = html;
  const navEnd = chunk.lastIndexOf("</nav>");
  if (navEnd !== -1) chunk = chunk.slice(navEnd + 6);
  const footerAt = chunk.search(/id=["']section-10-2939["']/i);
  if (footerAt !== -1) chunk = chunk.slice(0, footerAt);
  const pumAt = chunk.search(/id=["']pum-/i);
  if (pumAt !== -1) chunk = chunk.slice(0, pumAt);
  const wpFooter = chunk.search(/<!-- WP_FOOTER -->|id=["']wpadminbar["']/i);
  if (wpFooter !== -1) chunk = chunk.slice(0, wpFooter);
  chunk = chunk
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "");
  const start = chunk.search(
    /<(section|div|article|h1)[^>]*(ct-inner-content|ct-section|ct-headline|entry-content|oxy-easy-posts|bio_head)|<h1\b/i,
  );
  if (start > 0) chunk = chunk.slice(start);
  chunk = chunk.replace(/<\/div>\s*$/g, "").replace(/<section\s*$/i, "");
  chunk = chunk.replace(/^(<\/[a-zA-Z0-9]+>)+/, "");
  return chunk.trim();
}

function rewriteHtml(html) {
  return html
    .replace(/https?:\/\/(www\.)?acuwellnessclinic\.com\/?\?page_id=17/g, "/resources/more-research")
    .replace(/https?:\/\/(www\.)?acuwellnessclinic\.com\/wp-content/g, "https://acuwellnessclinic.com/wp-content")
    .replace(/https?:\/\/(www\.)?acuwellnessclinic\.com(?!\/wp-content)/g, "")
    .replace(/src="\/wp-content\//g, 'src="https://acuwellnessclinic.com/wp-content/')
    .replace(/srcset="\/wp-content\//g, 'srcset="https://acuwellnessclinic.com/wp-content/')
    .replace(/url\(\/wp-content\//g, "url(https://acuwellnessclinic.com/wp-content/")
    .replace(/href="\/wp-content\//g, 'href="https://acuwellnessclinic.com/wp-content/')
    .replace(/href="\/packages-and-new-patient-portal\/?"/g, 'href="/clinic-forms"');
}

const stefPatterns = [
  { re: /Dr\.?\s*Stefanie Dwyer/gi, to: "Kate Gannon", review: false },
  { re: /Stefanie Dwyer/g, to: "Kate Gannon", review: false },
  { re: /Stef Dwyer/g, to: "Kate Gannon", review: false },
  { re: /Dr\.?\s*Stef's/gi, to: "Kate's", review: false },
  { re: /Dr\.?\s*Stefanie's/gi, to: "Kate's", review: false },
  { re: /Dr\.?\s*Stefanie/gi, to: "Kate", review: false },
  { re: /Dr\.?\s*Stef\b/gi, to: "Kate", review: false },
  { re: /Stefanie's/g, to: "Kate's", review: false },
  { re: /Stefanie/g, to: "Kate", review: false },
  { re: /\bStef's\b/g, to: "Kate's", review: false },
  { re: /\bStef\b/g, to: "Kate", review: true },
];

function applyStef(text, url, log) {
  const held = [];
  let out = text.replace(/https?:\/\/[^\s"'<>]+|\/wp-content\/[^\s"'<>]+/g, (m) => {
    held.push(m);
    return `__HELD_${held.length - 1}__`;
  });
  for (const { re, to, review } of stefPatterns) {
    out = out.replace(re, (match) => {
      if (match === to) return match;
      log.push({
        url,
        old: match,
        new: to,
        review,
      });
      return to;
    });
  }
  return out.replace(/__HELD_(\d+)__/g, (_, i) => held[Number(i)]);
}

function typeFor(rec) {
  if (rec.restType) return rec.restType;
  if (rec.path.startsWith("/apw_wwt/")) return "apw_wwt";
  if (rec.path.startsWith("/apw_qa/")) return "apw_qa";
  if (rec.path.startsWith("/apw_hwn/")) return "apw_hwn";
  if (rec.path.startsWith("/category/")) return "category";
  if (rec.path.startsWith("/tag/")) return "tag";
  if (rec.path === "/blog" || rec.path.startsWith("/blog/")) return "page";
  return "page";
}

function folderFor(type) {
  if (type === "apw_wwt") return "apw_wwt";
  if (type === "apw_qa") return "apw_qa";
  if (type === "apw_hwn") return "apw_hwn";
  if (type === "post") return "posts";
  if (type === "category") return "categories";
  if (type === "tag") return "tags";
  return "pages";
}

const REDIRECTS = {
  "/modern-research": {
    dest: "/resources/more-research",
    note: "nav Modern Research & Acupuncture is 404",
  },
  "/privacy-policy": {
    dest: "https://acuwellnessclinic.com/wp-content/uploads/2011/10/SSAW-Privacy-Policy-Jan-2017.pdf",
    note: "live 404; 301 to privacy PDF",
  },
};

const KEEP_404 = new Set(["/shop"]);

const scraped = readJson(path.join(EXTRACT, "scraped/all.json"));
const byPath = new Map();
for (const r of scraped) {
  if (r.path === "/" && r.status !== 200) continue;
  byPath.set(r.path, r);
}

// restore home from dedicated file
if (fs.existsSync(htmlFileFor("/"))) {
  const homeHtml = read(htmlFileFor("/"));
  const meta = extractMeta(homeHtml);
  const existing = byPath.get("/") || {};
  byPath.set("/", {
    ...existing,
    url: `${SITE}/`,
    path: "/",
    status: 200,
    restType: "page",
    restTitle: existing.restTitle || "Home",
    restContent: existing.restContent || "",
    liveTitle: meta.title,
    liveDescription: meta.description,
    liveCanonical: meta.canonical,
    liveJsonLd: meta.jsonLd,
    htmlBytes: homeHtml.length,
  });
}

let pagination = { fromHtml: [], extra: [] };
const pagFile = path.join(EXTRACT, "scraped/pagination.json");
if (fs.existsSync(pagFile)) pagination = readJson(pagFile);

const stefLog = [];
const docs = [];
const parity = [];

function firstImage(html) {
  const m = html.match(/https:\/\/acuwellnessclinic\.com\/wp-content\/uploads\/[^"' )\s]+/i);
  return m ? m[0] : "";
}

function h1From(html, fallback) {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!m) return fallback;
  return decode(m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()) || fallback;
}

function buildDoc(rec, html) {
  const type = typeFor(rec);
  const meta = html ? extractMeta(html) : {};
  let body = "";
  if (html) body = extractBody(html);
  if ((!body || body.replace(/<[^>]+>/g, "").trim().length < 20) && rec.restContent) {
    body = rec.restContent;
  }
  if (rec.path === "/contact") {
    body = body.replace(/<div class='fluentform[\s\S]*?<\/form>[\s\S]*?<\/div>/i, "<!--SITE_CONTACT_FORM-->");
    if (!body.includes("<!--SITE_CONTACT_FORM-->")) {
      body += "\n<!--SITE_CONTACT_FORM-->";
    }
  }
  body = rewriteHtml(body);
  if (rec.path === "/" && !/RUNNING\.jpg/.test(body)) {
    body = body.replace(
      /ACUPUNCTURE IN SOUTH AUSTIN \(OAK HILL\), TX<\/h1>/,
      `ACUPUNCTURE IN SOUTH AUSTIN (OAK HILL), TX</h1><p><img src="https://acuwellnessclinic.com/wp-content/uploads/2016/12/RUNNING.jpg" alt="" /></p>`,
    );
  }
  const metaTitle = meta.title || rec.liveTitle || rec.restTitle || "";
  const metaDescription = meta.description || rec.liveDescription || rec.restDescription || "";
  const heading = h1From(body, decode(rec.restTitle || "") || rec.path);
  const image =
    firstImage(html || "") ||
    rec.liveOgImage ||
    "https://acuwellnessclinic.com/wp-content/uploads/2019/02/Artboard-1@sishou.png";

  return {
    path: rec.path,
    type,
    title: heading,
    metaTitle,
    metaDescription,
    canonicalPath: rec.path === "/" ? "/" : rec.path,
    date: rec.restDate || "",
    modified: rec.restModified || "",
    excerpt: rewriteHtml(rec.restExcerpt || ""),
    image,
    html: body,
    categories: rec.restCategories || [],
    tags: rec.restTags || [],
    author: rec.restAuthor || null,
    count: rec.restCount,
    schemaTypes: (meta.jsonLd || []).flatMap((j) =>
      Array.isArray(j["@graph"]) ? j["@graph"].map((n) => n["@type"]) : [j["@type"]],
    ),
  };
}

const skipPort = new Set([...Object.keys(REDIRECTS), ...KEEP_404, "/schedule", "/packages-and-new-patient-portal"]);

for (const rec of byPath.values()) {
  const p = rec.path;
  if (p === "/?page_id=17") continue;
  if (KEEP_404.has(p)) {
    parity.push({ source: rec.url || SITE + p, local: p, type: rec.restType || "unknown", status: "404-keep" });
    continue;
  }
  if (REDIRECTS[p]) {
    parity.push({
      source: rec.url || SITE + p,
      local: p,
      type: rec.restType || "unknown",
      status: `301 → ${REDIRECTS[p].dest}`,
    });
    continue;
  }
  if (rec.status !== 200) {
    parity.push({
      source: rec.url || SITE + p,
      local: p,
      type: rec.restType || "unknown",
      status: `gap live-${rec.status}`,
    });
    continue;
  }
  const hf = htmlFileFor(p);
  const html = fs.existsSync(hf) ? read(hf) : "";
  const doc = buildDoc(rec, html);
  docs.push(doc);
  parity.push({
    source: rec.url || SITE + (p === "/" ? "/" : p + "/"),
    local: p,
    type: doc.type,
    status: "ported",
  });
}

// pagination extras already fetched?
for (const extra of pagination.extra || []) {
  if (!extra.path || byPath.has(extra.path) || extra.status !== 200) continue;
  const rec = {
    url: SITE + extra.path + "/",
    path: extra.path,
    status: 200,
    restType: extra.path.startsWith("/blog") ? "page" : extra.path.startsWith("/category") ? "category" : extra.path.startsWith("/tag") ? "tag" : extra.path.startsWith("/health-well-news") ? "page" : "page",
    restTitle: extra.path,
    restContent: "",
    restExcerpt: "",
    liveTitle: "",
    liveDescription: "",
  };
  const hf = htmlFileFor(extra.path);
  const html = fs.existsSync(hf) ? read(hf) : "";
  const doc = buildDoc(rec, html);
  docs.push(doc);
  parity.push({ source: rec.url, local: extra.path, type: doc.type, status: "ported" });
}

// always include known required routes even if scrape missed
const required = [
  "/",
  "/about-us",
  "/our-team",
  "/testimonials",
  "/upcoming-events",
  "/treatment-modalities",
  "/blog",
  "/what-is-acupuncture",
  "/what-is-acupuncture/what-we-treat",
  "/what-is-acupuncture/first-visit",
  "/what-is-acupuncture/q-a",
  "/clinic-forms",
  "/resources",
  "/resources/facial-rejuvenation",
  "/resources/more-research",
  "/resources/one-pagers",
  "/resources/videos",
  "/contact",
  "/contact/map-directions",
  "/what-is-cupping-therapy",
  "/what-is-electro-acupuncture",
  "/what-is-guasha",
  "/chinese-herbal-medicine",
  "/what-is-moxabustion",
  "/what-is-nutritional-therapy",
  "/what-is-taichi-and-qigong",
  "/what-is-tuina",
  "/apw_wwt/asthma",
  "/apw_wwt/concussion",
  "/apw_wwt/headaches",
  "/apw_wwt/hypertension",
  "/apw_wwt/ibs",
  "/apw_wwt/pain",
  "/apw_wwt/parkinsons",
  "/apw_wwt/peripheral-neuropathy",
  "/apw_wwt/stroke",
  "/cancellations-late-arrivals",
  "/health-well-news",
];
for (const p of required) {
  if (!docs.some((d) => d.path === p)) {
    parity.push({ source: SITE + p + "/", local: p, type: "required", status: "gap" });
  }
}

docs.sort((a, b) => a.path.localeCompare(b.path));
parity.sort((a, b) => a.local.localeCompare(b.local));

for (const dir of ["pages", "posts", "apw_wwt", "apw_qa", "apw_hwn", "categories", "tags"]) {
  fs.mkdirSync(path.join(CONTENT, dir), { recursive: true });
}

for (const doc of docs) {
  const folder = folderFor(doc.type);
  const slug = doc.path === "/" ? "home" : doc.path.replace(/^\//, "").replace(/\//g, "__");
  fs.writeFileSync(path.join(CONTENT, folder, `${slug}.json`), JSON.stringify(doc, null, 2));
}

fs.writeFileSync(path.join(CONTENT, "all.json"), JSON.stringify(docs, null, 2));

parity.push({
  source: "https://acuwellnessclinic.com/?page_id=17",
  local: "/?page_id=17",
  type: "legacy-query",
  status: "301 → /resources/more-research",
});

const cutover = `## Cutover DNS / host maps (not implemented in this repo)

- http → https
- www.acuwellnessclinic.com → apex (acuwellnessclinic.com)
- acuwellnessclinic.net → acuwellnessclinic.com

These belong at the host / DNS layer. This repo does not own those domains.
`;

const parityMd = [
  "# CONTENT-PARITY",
  "",
  "Source of truth: live WordPress at https://acuwellnessclinic.com/ (sitemaps, WP REST, header/footer/in-page links, and known extra URLs).",
  "",
  `| source URL | local route | type | status |`,
  `|---|---|---|---|`,
  ...parity.map((r) => `| ${r.source} | ${r.local} | ${r.type} | ${r.status} |`),
  "",
  `## Counts`,
  "",
  `- Ported: ${parity.filter((r) => r.status === "ported").length}`,
  `- 301: ${parity.filter((r) => r.status.startsWith("301")).length}`,
  `- 404-keep: ${parity.filter((r) => r.status === "404-keep").length}`,
  `- Gaps: ${parity.filter((r) => r.status.startsWith("gap")).length}`,
  "",
  cutover,
].join("\n");

fs.writeFileSync(path.join(ROOT, "CONTENT-PARITY.md"), parityMd);

const review = stefLog.filter((x) => x.review);
const stefMd = [
  "# STEF-TO-KATE",
  "",
  "Ownership handoff: Stef Dwyer / Stefanie / Stef / Dr Stef → Kate Gannon (TX Acu License# AC02276).",
  "Patient names in testimonials were not changed.",
  "",
  "## Replacements",
  "",
  `| URL | old | new | needs review |`,
  `|---|---|---|---|`,
  ...stefLog.map((r) => `| ${r.url} | ${JSON.stringify(r.old)} | ${JSON.stringify(r.new)} | ${r.review ? "yes" : "no"} |`),
  "",
  "## needs review",
  "",
  review.length
    ? review.map((r) => `- ${r.url}: ${JSON.stringify(r.old)} → ${JSON.stringify(r.new)}`).join("\n")
    : "- (none)",
  "",
  `Total replacements logged: ${stefLog.length}`,
].join("\n");

fs.writeFileSync(path.join(ROOT, "STEF-TO-KATE.md"), stefMd);

console.log("docs", docs.length);
console.log("parity", parity.length);
console.log("stef", stefLog.length);
console.log("ported", parity.filter((r) => r.status === "ported").length);
console.log("gaps", parity.filter((r) => r.status.startsWith("gap")).map((r) => r.local));
