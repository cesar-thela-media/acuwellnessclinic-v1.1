import fs from "fs";
import path from "path";

const ROOT = "C:/Users/idder/tmg/acuwellnessclinic/_extract";
const HTML_DIR = path.join(ROOT, "html");
const OUT = path.join(ROOT, "scraped");
const BASE = "https://acuwellnessclinic.com";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

function readText(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8").replace(/^\uFEFF/, "");
}
function readJson(file) {
  return JSON.parse(readText(file));
}
function locs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
function norm(url) {
  try {
    const u = new URL(url);
    let p = u.pathname;
    if (p !== "/" && p.endsWith("/")) p = p.slice(0, -1);
    return p || "/";
  } catch {
    return url;
  }
}
function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&raquo;/g, "»")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)));
}

fs.mkdirSync(HTML_DIR, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });

const extraUrls = [
  `${BASE}/clinic-forms/`,
  `${BASE}/blog/`,
  `${BASE}/packages-and-new-patient-portal/`,
  `${BASE}/cancellations-late-arrivals/`,
  `${BASE}/schedule/`,
  `${BASE}/apw_wwt/asthma/`,
  `${BASE}/apw_wwt/concussion/`,
  `${BASE}/apw_wwt/headaches/`,
  `${BASE}/apw_wwt/hypertension/`,
  `${BASE}/apw_wwt/ibs/`,
  `${BASE}/apw_wwt/pain/`,
  `${BASE}/apw_wwt/parkinsons/`,
  `${BASE}/apw_wwt/peripheral-neuropathy/`,
  `${BASE}/apw_wwt/stroke/`,
  `${BASE}/privacy-policy/`,
  `${BASE}/shop/`,
  `${BASE}/modern-research/`,
  `${BASE}/?page_id=17`,
];

const sitemapFiles = [
  "page-sitemap.xml",
  "post-sitemap.xml",
  "apw_wwt-sitemap.xml",
  "apw_qa-sitemap.xml",
  "apw_hwn-sitemap.xml",
  "category-sitemap.xml",
  "post_tag-sitemap.xml",
];

const urlSet = new Set();
for (const f of sitemapFiles) {
  for (const u of locs(readText(f))) urlSet.add(u);
}
for (const u of extraUrls) urlSet.add(u);

const restFiles = {
  page: "wp-json-wp-v2-pages-per-page-100.json",
  post: "wp-json-wp-v2-posts-per-page-100.json",
  apw_wwt: "wp-json-wp-v2-apw-wwt-per-page-100.json",
  apw_qa: "wp-json-wp-v2-apw-qa-per-page-100.json",
  apw_hwn: "wp-json-wp-v2-apw-hwn-per-page-100.json",
  category: "wp-json-wp-v2-categories-per-page-100.json",
  tag: "wp-json-wp-v2-tags-per-page-100.json",
};

const restByPath = new Map();
for (const [type, file] of Object.entries(restFiles)) {
  const raw = readJson(file);
  if (!Array.isArray(raw)) continue;
  for (const item of raw) {
    if (!item.link) continue;
    urlSet.add(item.link);
    restByPath.set(norm(item.link), { type, item });
  }
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { "user-agent": UA } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

// tags page 2 (sitemap 112, REST page1 100)
try {
  const tags2 = await fetchJson(`${BASE}/wp-json/wp/v2/tags?per_page=100&page=2`);
  fs.writeFileSync(path.join(ROOT, "wp-json-wp-v2-tags-page-2.json"), JSON.stringify(tags2));
  for (const item of tags2) {
    urlSet.add(item.link);
    restByPath.set(norm(item.link), { type: "tag", item });
  }
  console.log("tags page 2", tags2.length);
} catch (e) {
  console.log("tags page 2 fail", e.message);
}

try {
  const posts2 = await fetchJson(`${BASE}/wp-json/wp/v2/posts?per_page=100&page=2`);
  fs.writeFileSync(path.join(ROOT, "wp-json-wp-v2-posts-page-2.json"), JSON.stringify(posts2));
  console.log("posts page 2", Array.isArray(posts2) ? posts2.length : posts2);
} catch (e) {
  console.log("posts page 2 fail", e.message);
}

function extractMeta(html) {
  const title = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ""])[1].replace(/\s+/g, " ").trim());
  const meta = (name) => {
    const re = new RegExp(
      `<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']*)["']`,
      "i",
    );
    const re2 = new RegExp(
      `<meta[^>]+content=["']([^"']*)["'][^>]+(?:name|property)=["']${name}["']`,
      "i",
    );
    return decode((html.match(re) || html.match(re2) || [, ""])[1]);
  };
  const canonical = (html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ||
    html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i) || [, ""])[1];
  const jsonLd = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(
    (m) => {
      try {
        return JSON.parse(m[1]);
      } catch {
        return null;
      }
    },
  ).filter(Boolean);
  return {
    title,
    description: meta("description"),
    robots: meta("robots"),
    canonical,
    ogTitle: meta("og:title"),
    ogDescription: meta("og:description"),
    ogImage: meta("og:image"),
    jsonLd,
  };
}

function extractMain(html) {
  const candidates = [
    /<div[^>]+class=["'][^"']*fusion-text[^"']*["'][^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]+class=["'][^"']*entry-content[^"']*["'][^>]*>([\s\S]*?)<\/div>/i,
    /<article[^>]*>([\s\S]*?)<\/article>/i,
    /<main[^>]*>([\s\S]*?)<\/main>/i,
    /<div[^>]+id=["']content["'][^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]+class=["'][^"']*site-main[^"']*["'][^>]*>([\s\S]*?)<\/div>/i,
  ];
  for (const re of candidates) {
    const m = html.match(re);
    if (m && m[1] && m[1].replace(/<[^>]+>/g, "").trim().length > 40) return m[1].trim();
  }
  return "";
}

function extractNav(html) {
  const navBlock =
    html.match(/<nav[\s\S]*?<\/nav>/i)?.[0] ||
    html.match(/<ul[^>]+id=["'][^"']*menu[^"']*["'][\s\S]*?<\/ul>/i)?.[0] ||
    "";
  const links = [...navBlock.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)].map((m) => ({
    href: m[1],
    label: decode(m[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()),
  }));
  return links.filter((l) => l.label);
}

async function fetchOne(url) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 45000);
  try {
    const res = await fetch(url, {
      headers: { "user-agent": UA, accept: "text/html,application/xhtml+xml" },
      redirect: "manual",
      signal: controller.signal,
    });
    const status = res.status;
    const location = res.headers.get("location") || "";
    const ct = res.headers.get("content-type") || "";
    let html = "";
    if (status >= 200 && status < 300 && ct.includes("text")) {
      html = await res.text();
    } else if (status >= 300 && status < 400) {
      html = "";
    } else {
      try {
        html = await res.text();
      } catch {
        html = "";
      }
    }
    return { url, status, location, contentType: ct, html };
  } catch (e) {
    return { url, status: 0, location: "", contentType: "", html: "", error: String(e.message || e) };
  } finally {
    clearTimeout(t);
  }
}

function pool(items, limit, fn) {
  let i = 0;
  const out = new Array(items.length);
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx], idx);
    }
  });
  return Promise.all(workers).then(() => out);
}

const urls = [...urlSet];
console.log("fetching", urls.length, "urls");

const results = await pool(urls, 6, async (url, idx) => {
  const r = await fetchOne(url);
  const slugSafe = norm(url).replace(/[^\w/-]+/g, "_").replace(/\//g, "__") || "home";
  if (r.html) fs.writeFileSync(path.join(HTML_DIR, `${slugSafe}.html`), r.html);
  const rest = restByPath.get(norm(url));
  const meta = r.html ? extractMeta(r.html) : {};
  const main = r.html ? extractMain(r.html) : "";
  const record = {
    url,
    path: norm(url),
    status: r.status,
    location: r.location,
    error: r.error || "",
    restType: rest?.type || "",
    restId: rest?.item?.id || null,
    restSlug: rest?.item?.slug || "",
    restTitle: rest?.item?.title?.rendered || rest?.item?.name || "",
    restDescription: rest?.item?.yoast_head_json?.description || "",
    restCanonical: rest?.item?.yoast_head_json?.canonical || "",
    restContent: rest?.item?.content?.rendered || "",
    restExcerpt: rest?.item?.excerpt?.rendered || "",
    restDate: rest?.item?.date || "",
    restModified: rest?.item?.modified || "",
    restCategories: rest?.item?.categories || [],
    restTags: rest?.item?.tags || [],
    restAuthor: rest?.item?.author || null,
    restCount: rest?.item?.count ?? null,
    liveTitle: meta.title || "",
    liveDescription: meta.description || "",
    liveCanonical: meta.canonical || "",
    liveRobots: meta.robots || "",
    liveOgTitle: meta.ogTitle || "",
    liveOgDescription: meta.ogDescription || "",
    liveOgImage: meta.ogImage || "",
    liveJsonLd: meta.jsonLd || [],
    liveMain: main,
    htmlBytes: r.html.length,
    navSample: r.html && norm(url) === "/" ? extractNav(r.html) : undefined,
  };
  if ((idx + 1) % 20 === 0 || idx === urls.length - 1) {
    console.log(`  ${idx + 1}/${urls.length} ${r.status} ${url}`);
  }
  return record;
});

fs.writeFileSync(path.join(OUT, "all.json"), JSON.stringify(results, null, 2));

const summary = results.map((r) => ({
  path: r.path,
  status: r.status,
  location: r.location,
  type: r.restType,
  title: r.liveTitle || r.restTitle,
  htmlBytes: r.htmlBytes,
  liveMainLen: r.liveMain.length,
  restContentLen: r.restContent.length,
}));
fs.writeFileSync(path.join(OUT, "summary.json"), JSON.stringify(summary, null, 2));

const byStatus = {};
for (const r of results) {
  const k = String(r.status);
  byStatus[k] = (byStatus[k] || 0) + 1;
}
console.log("status counts", byStatus);
const emptyBodies = results.filter(
  (r) => r.status === 200 && r.liveMain.length < 40 && r.restContent.length < 40 && !r.path.startsWith("/category/") && !r.path.startsWith("/tag/"),
);
console.log("empty bodies", emptyBodies.map((r) => r.path).join("\n"));
console.log("done");
