import fs from "fs";
import path from "path";

const dir = "C:/Users/idder/tmg/acuwellnessclinic/_extract";

function readText(file) {
  return fs.readFileSync(path.join(dir, file), "utf8").replace(/^\uFEFF/, "");
}

function readJson(file) {
  return JSON.parse(readText(file));
}

function locs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const sitemaps = [
  "sitemap_index.xml",
  "page-sitemap.xml",
  "post-sitemap.xml",
  "apw_wwt-sitemap.xml",
  "apw_qa-sitemap.xml",
  "apw_hwn-sitemap.xml",
  "category-sitemap.xml",
  "post_tag-sitemap.xml",
];

const inventory = {};
for (const s of sitemaps) {
  inventory[s] = locs(readText(s));
  console.log(s, inventory[s].length);
}

function slimItem(p) {
  return {
    id: p.id,
    slug: p.slug,
    type: p.type,
    status: p.status,
    link: p.link,
    title: p.title?.rendered ?? p.name ?? "",
    date: p.date,
    modified: p.modified,
    excerpt: p.excerpt?.rendered ?? "",
    parent: p.parent,
    count: p.count,
    taxonomy: p.taxonomy,
    yoastTitle: p.yoast_head_json?.title ?? "",
    yoastDescription: p.yoast_head_json?.description ?? "",
    canonical: p.yoast_head_json?.canonical ?? p.link,
    schemaTypes: (p.yoast_head_json?.schema?.["@graph"] || []).map((n) => n["@type"]),
    hasContent: Boolean(p.content?.rendered),
    contentLen: p.content?.rendered?.length ?? 0,
    featured: p.featured_media,
    categories: p.categories,
    tags: p.tags,
    author: p.author,
  };
}

const restFiles = {
  pages: "wp-json-wp-v2-pages-per-page-100.json",
  posts: "wp-json-wp-v2-posts-per-page-100.json",
  wwt: "wp-json-wp-v2-apw-wwt-per-page-100.json",
  qa: "wp-json-wp-v2-apw-qa-per-page-100.json",
  hwn: "wp-json-wp-v2-apw-hwn-per-page-100.json",
  cats: "wp-json-wp-v2-categories-per-page-100.json",
  tags: "wp-json-wp-v2-tags-per-page-100.json",
};

const rest = {};
for (const [k, f] of Object.entries(restFiles)) {
  const raw = readJson(f);
  rest[k] = Array.isArray(raw) ? raw.map(slimItem) : [];
  console.log("REST", k, rest[k].length);
}

const emptyPages = rest.pages.filter((p) => p.contentLen < 40);
console.log("\nEMPTY/SHORT PAGES");
for (const p of emptyPages) console.log(p.contentLen, p.status, p.link);

console.log("\nPAGES");
for (const p of rest.pages) console.log(p.status, p.contentLen, p.link);

console.log("\nWWT");
for (const p of rest.wwt) console.log(p.status, p.contentLen, p.link);

console.log("\nQA");
for (const p of rest.qa) console.log(p.status, p.contentLen, p.link);

console.log("\nHWN");
for (const p of rest.hwn) console.log(p.status, p.contentLen, p.link);

console.log("\nPOSTS", rest.posts.length, "empty", rest.posts.filter((p) => p.contentLen < 40).length);
console.log("CATS with count>0", rest.cats.filter((c) => c.count > 0).length, "/", rest.cats.length);
console.log("TAGS with count>0", rest.tags.filter((c) => c.count > 0).length, "/", rest.tags.length);

const extra = [
  "https://acuwellnessclinic.com/clinic-forms/",
  "https://acuwellnessclinic.com/blog/",
  "https://acuwellnessclinic.com/packages-and-new-patient-portal/",
  "https://acuwellnessclinic.com/cancellations-late-arrivals/",
  "https://acuwellnessclinic.com/schedule/",
  "https://acuwellnessclinic.com/apw_wwt/asthma/",
  "https://acuwellnessclinic.com/apw_wwt/concussion/",
  "https://acuwellnessclinic.com/apw_wwt/headaches/",
  "https://acuwellnessclinic.com/apw_wwt/hypertension/",
  "https://acuwellnessclinic.com/apw_wwt/ibs/",
  "https://acuwellnessclinic.com/apw_wwt/pain/",
  "https://acuwellnessclinic.com/apw_wwt/parkinsons/",
  "https://acuwellnessclinic.com/apw_wwt/peripheral-neuropathy/",
  "https://acuwellnessclinic.com/apw_wwt/stroke/",
  "https://acuwellnessclinic.com/privacy-policy/",
  "https://acuwellnessclinic.com/shop/",
  "https://acuwellnessclinic.com/modern-research/",
];

const sitemapUrls = new Set(
  Object.entries(inventory)
    .filter(([k]) => k !== "sitemap_index.xml")
    .flatMap(([, v]) => v.map((u) => u.replace(/\/$/, "") + "/")),
);

console.log("\nSITEMAP TOTAL", sitemapUrls.size);
console.log("\nEXTRA vs sitemap");
for (const u of extra) {
  const n = u.replace(/\/$/, "") + "/";
  console.log(sitemapUrls.has(n) ? "IN " : "OUT", u);
}

fs.writeFileSync(path.join(dir, "inventory-slim.json"), JSON.stringify({ inventory, rest }, null, 2));
console.log("\nwrote inventory-slim.json");
