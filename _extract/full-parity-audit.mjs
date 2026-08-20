import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const LIVE = "https://acuwellnessclinic.com";
const LOCAL = process.env.LOCAL_BASE || "http://127.0.0.1:3000";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

const UI_PATHS = [
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
  "/cancellations-late-arrivals",
  "/chinese-herbal-medicine",
  "/what-is-guasha",
  "/what-is-cupping-therapy",
  "/what-is-moxabustion",
  "/what-is-tuina",
  "/what-is-nutritional-therapy",
  "/what-is-taichi-and-qigong",
  "/what-is-electro-acupuncture",
  "/health-well-news",
];

const DESIGNED = new Set([
  "/",
  "/about-us",
  "/our-team",
  "/testimonials",
  "/treatment-modalities",
  "/contact",
  "/contact/map-directions",
  "/clinic-forms",
  "/what-is-acupuncture",
  "/what-is-acupuncture/what-we-treat",
  "/what-is-acupuncture/first-visit",
  "/what-is-acupuncture/q-a",
]);

const stefPatterns = [
  [/Dr\.?\s*Stefanie Dwyer/gi, "Kate Gannon"],
  [/Stefanie Dwyer/g, "Kate Gannon"],
  [/Stef Dwyer/g, "Kate Gannon"],
  [/Dr\.?\s*Stef's/gi, "Kate's"],
  [/Dr\.?\s*Stefanie's/gi, "Kate's"],
  [/Dr\.?\s*Stefanie/gi, "Kate"],
  [/Dr\.?\s*Stef\b/gi, "Kate"],
  [/Stefanie's/g, "Kate's"],
  [/Stefanie/g, "Kate"],
  [/\bStef's\b/g, "Kate's"],
  [/\bStef\b/g, "Kate"],
];

const IGNORE_PHRASE = [
  /leave this field empty if you.?re human/i,
  /powered by/i,
  /cookie/i,
  /this website uses cookies/i,
  /skip to (content|main)/i,
  /oxygen/i,
  /wordpress/i,
  /popup maker/i,
  /close \(esc\)/i,
  /loading\.\.\./i,
  /jquery/i,
  /googletagmanager/i,
  /recaptcha/i,
  /cloudflare/i,
];

function applyStef(text) {
  const held = [];
  let out = text.replace(/https?:\/\/[^\s"'<>]+|\/(?:media\/)?wp-content\/[^\s"'<>]+/g, (m) => {
    held.push(m);
    return `__H${held.length - 1}__`;
  });
  for (const [re, to] of stefPatterns) out = out.replace(re, to);
  return out.replace(/__H(\d+)__/g, (_, i) => held[Number(i)]);
}

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&#038;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "-")
    .replace(/&#8212;/g, "-")
    .replace(/&raquo;/g, "»")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)));
}

function toPath(url) {
  try {
    const u = new URL(url, LIVE);
    if (!/acuwellnessclinic\.com|localhost|127\.0\.0\.1/i.test(u.hostname)) return null;
    let p = decodeURIComponent(u.pathname);
    if (p.length > 1) p = p.replace(/\/+$/, "");
    if (!p) p = "/";
    return p;
  } catch {
    return null;
  }
}

function locsFromXml(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)].map((m) => m[1].trim());
}

async function fetchText(url, { follow = true } = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 25000);
  try {
    const res = await fetch(url, {
      headers: { "user-agent": UA, accept: "text/html,application/xml,text/xml,*/*" },
      redirect: follow ? "follow" : "manual",
      signal: ctrl.signal,
    });
    const loc = res.headers.get("location") || "";
    const html = await res.text();
    return { status: res.status, html, location: loc, finalUrl: res.url };
  } finally {
    clearTimeout(t);
  }
}

function extractInternalHrefs(html) {
  const out = new Set();
  for (const m of html.matchAll(/href=["']([^"']+)["']/gi)) {
    const p = toPath(m[1]);
    if (p && !p.startsWith("/wp-") && !p.startsWith("/media/") && p !== "/xmlrpc.php") out.add(p);
  }
  return [...out];
}

function extractNavFooterLinks(html) {
  const nav = [];
  const footer = [];
  const navMatch = html.match(/<nav[\s\S]*?<\/nav>/i);
  if (navMatch) {
    for (const m of navMatch[0].matchAll(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
      const href = toPath(m[1]) || m[1];
      const label = decode(m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
      if (label) nav.push({ href, label });
    }
  }
  const footMatch = html.match(/<footer[\s\S]*?<\/footer>/i) || html.match(/id=["']section-10-2939["'][\s\S]*?<\/section>/i);
  if (footMatch) {
    for (const m of footMatch[0].matchAll(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
      const href = toPath(m[1]) || m[1];
      const label = decode(m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
      if (label) footer.push({ href, label });
    }
    const hours = decode(
      footMatch[0]
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " "),
    );
    footer.push({ href: "#hours-text", label: hours.slice(0, 500) });
  }
  return { nav, footer };
}

function extractBody(html) {
  let chunk = html;
  chunk = chunk.replace(/<head[\s\S]*?<\/head>/i, " ");
  chunk = chunk.replace(/<script[\s\S]*?<\/script>/gi, " ");
  chunk = chunk.replace(/<style[\s\S]*?<\/style>/gi, " ");
  chunk = chunk.replace(/<noscript[\s\S]*?<\/noscript>/gi, " ");
  chunk = chunk.replace(/<nav[\s\S]*?<\/nav>/gi, " ");
  chunk = chunk.replace(/<header[\s\S]*?<\/header>/gi, " ");
  chunk = chunk.replace(/<footer[\s\S]*?<\/footer>/gi, " ");
  chunk = chunk.replace(/id=["']section-10-2939["'][\s\S]*$/i, " ");
  chunk = chunk.replace(/id=["']pum-[\s\S]*$/i, " ");
  chunk = chunk.replace(/<form[^>]*newsletter[\s\S]*?<\/form>/gi, " ");
  return chunk;
}

function visibleText(html) {
  const body = extractBody(html);
  let text = decode(applyStef(body.replace(/<[^>]+>/g, " ")));
  text = text
    .replace(/https?:\/\/(?:www\.)?acuwellnessclinic\.com/gi, "")
    .replace(/https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?/gi, "")
    .replace(/\/media\/wp-content/gi, "/wp-content")
    .replace(/\s+/g, " ")
    .trim();
  return text;
}

function sentences(text) {
  return text
    .split(/(?<=[.!?])\s+(?=[A-Z“"'])|(?<=:)\s+(?=[A-Z])/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 32)
    .filter((s) => !IGNORE_PHRASE.some((re) => re.test(s)));
}

function headings(html) {
  const body = extractBody(html);
  const out = [];
  for (const m of body.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi)) {
    const t = decode(applyStef(m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()));
    if (t) out.push(t);
  }
  return out;
}

function ctas(html) {
  const body = extractBody(html);
  const labels = [];
  for (const m of body.matchAll(/<(?:a|button)[^>]*>([\s\S]*?)<\/(?:a|button)>/gi)) {
    const t = decode(applyStef(m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()));
    if (/schedule|book|portal|consultation|submit|click here|download|learn more|read more|contact/i.test(t) && t.length < 90) {
      labels.push(t);
    }
  }
  return [...new Set(labels)];
}

function fuzzyHas(haystack, needle) {
  if (!needle) return true;
  if (haystack.includes(needle)) return true;
  const key = needle.slice(0, Math.min(80, needle.length));
  if (haystack.includes(key)) return true;
  const compact = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");
  return compact(haystack).includes(compact(needle).slice(0, 60));
}

async function pool(items, n, fn) {
  const out = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, worker));
  return out;
}

function classifyPath(p) {
  if (DESIGNED.has(p) || UI_PATHS.includes(p)) return "ui";
  if (p.startsWith("/apw_")) return "cpt";
  if (p.startsWith("/category/")) return "category";
  if (p.startsWith("/tag/")) return "tag";
  if (p.startsWith("/blog")) return "blog";
  return "post-or-page";
}

const docs = JSON.parse(fs.readFileSync(path.join(ROOT, "content/all.json"), "utf8"));
const localKnown = new Set(docs.map((d) => d.path));

console.log("fetching live sitemaps…");
const indexXml = (await fetchText(`${LIVE}/sitemap_index.xml`)).html;
const childSitemaps = locsFromXml(indexXml).filter((u) => /sitemap/.test(u));
const liveSitemapPaths = new Set();
for (const sm of childSitemaps) {
  const xml = (await fetchText(sm)).html;
  for (const loc of locsFromXml(xml)) {
    const p = toPath(loc);
    if (p) liveSitemapPaths.add(p);
  }
}

console.log("fetching local sitemap…");
let localSitemapPaths = new Set();
try {
  const localSm = (await fetchText(`${LOCAL}/sitemap.xml`)).html;
  for (const loc of locsFromXml(localSm)) {
    const p = toPath(loc);
    if (p) localSitemapPaths.add(p);
  }
} catch (e) {
  console.log("local sitemap fail", e.message);
}

console.log("fetching live + local homepages for nav…");
const liveHome = await fetchText(`${LIVE}/`);
const localHome = await fetchText(`${LOCAL}/`);
const liveChrome = extractNavFooterLinks(liveHome.html);
const localChrome = extractNavFooterLinks(localHome.html);
const liveUiLinks = extractInternalHrefs(liveHome.html);
const localUiLinks = extractInternalHrefs(localHome.html);

const allPaths = new Set([
  ...liveSitemapPaths,
  ...localSitemapPaths,
  ...localKnown,
  ...UI_PATHS,
  ...liveUiLinks.filter((p) => !p.includes(".")),
]);

// Skip binary / known off-site artifacts
const skipExact = new Set(["/shop"]);
const paths = [...allPaths]
  .filter((p) => !skipExact.has(p))
  .filter((p) => !/\.(pdf|jpg|jpeg|png|gif|webp|xml)$/i.test(p))
  .sort();

console.log({
  liveSitemap: liveSitemapPaths.size,
  localSitemap: localSitemapPaths.size,
  localKnown: localKnown.size,
  toFetch: paths.length,
});

const missingOnLocalSitemap = [...liveSitemapPaths].filter((p) => !localSitemapPaths.has(p) && !localKnown.has(p));
const extraOnLocalSitemap = [...localSitemapPaths].filter((p) => !liveSitemapPaths.has(p));
const missingOnLocalContent = [...liveSitemapPaths].filter((p) => !localKnown.has(p));

const results = await pool(paths, 5, async (route) => {
  const liveUrl = route === "/" ? `${LIVE}/` : `${LIVE}${route}/`;
  const localUrl = route === "/" ? `${LOCAL}/` : `${LOCAL}${route}/`;
  let live, local;
  try {
    live = await fetchText(liveUrl);
  } catch (e) {
    live = { status: 0, html: "", location: "", error: e.message };
  }
  try {
    local = await fetchText(localUrl);
  } catch (e) {
    local = { status: 0, html: "", location: "", error: e.message };
  }

  const liveText = visibleText(live.html || "");
  const localText = visibleText(local.html || "");
  const liveSent = sentences(liveText);
  const missingSentences = liveSent.filter((s) => !fuzzyHas(localText, s)).slice(0, 12);
  const extraSentences = sentences(localText)
    .filter((s) => !fuzzyHas(liveText, s) && !/kate gannon|tx acu license/i.test(s))
    .slice(0, 8);

  const liveHeads = headings(live.html || "");
  const localHeads = headings(local.html || "");
  const missingHeadings = liveHeads.filter((h) => !localHeads.some((x) => fuzzyHas(x, h) || fuzzyHas(h, x)) && !fuzzyHas(localText, h));

  const liveCtas = ctas(live.html || "");
  const localCtas = ctas(local.html || "");
  const missingCtas = liveCtas.filter((c) => !localCtas.some((x) => fuzzyHas(x, c) || fuzzyHas(c, x)) && !fuzzyHas(localText, c));

  const kind = classifyPath(route);
  const ok =
    (live.status === 200 && local.status === 200 && missingSentences.length === 0 && missingHeadings.length === 0 && missingCtas.length === 0) ||
    (live.status >= 300 && live.status < 400);

  if (paths.indexOf(route) % 25 === 0) console.log("progress", paths.indexOf(route), "/", paths.length, route);
  return {
    route,
    kind,
    liveStatus: live.status,
    localStatus: local.status,
    liveLen: liveText.length,
    localLen: localText.length,
    missingSentences,
    extraSentences: kind === "ui" ? extraSentences : extraSentences.slice(0, 3),
    missingHeadings,
    missingCtas,
    ok,
    liveError: live.error || undefined,
    localError: local.error || undefined,
  };
});

const ui = results.filter((r) => r.kind === "ui");
const fails = results.filter((r) => !r.ok && r.liveStatus === 200);
const local404 = results.filter((r) => r.liveStatus === 200 && (r.localStatus === 404 || r.localStatus === 0));
const copyFails = fails.filter((r) => r.missingSentences.length || r.missingHeadings.length || r.missingCtas.length);

const summary = {
  generatedAt: new Date().toISOString(),
  liveSitemapCount: liveSitemapPaths.size,
  localSitemapCount: localSitemapPaths.size,
  compared: results.length,
  uiCompared: ui.length,
  copyFails: copyFails.length,
  local404: local404.map((r) => r.route),
  missingOnLocalContent,
  missingOnLocalSitemap,
  extraOnLocalSitemap: extraOnLocalSitemap.filter((p) => !liveSitemapPaths.has(p)).slice(0, 80),
  liveNav: liveChrome.nav,
  localNav: localChrome.nav,
  liveFooterSample: liveChrome.footer.slice(0, 20),
  localFooterSample: localChrome.footer.slice(0, 20),
  uiFails: ui.filter((r) => !r.ok),
  worst: copyFails
    .slice()
    .sort((a, b) => b.missingSentences.length - a.missingSentences.length)
    .slice(0, 40)
    .map((r) => ({
      route: r.route,
      kind: r.kind,
      liveStatus: r.liveStatus,
      localStatus: r.localStatus,
      missingSentences: r.missingSentences,
      missingHeadings: r.missingHeadings,
      missingCtas: r.missingCtas,
      extraSentences: r.extraSentences,
    })),
};

fs.writeFileSync(path.join(ROOT, "_extract/full-parity-audit.json"), JSON.stringify({ summary, results }, null, 2));
fs.writeFileSync(
  path.join(ROOT, "_extract/full-parity-ui.json"),
  JSON.stringify(
    ui.map((r) => ({
      route: r.route,
      liveStatus: r.liveStatus,
      localStatus: r.localStatus,
      liveLen: r.liveLen,
      localLen: r.localLen,
      missingSentences: r.missingSentences,
      extraSentences: r.extraSentences,
      missingHeadings: r.missingHeadings,
      missingCtas: r.missingCtas,
      ok: r.ok,
    })),
    null,
    2,
  ),
);

console.log("\n=== SUMMARY ===");
console.log("live sitemap", liveSitemapPaths.size, "local sitemap", localSitemapPaths.size);
console.log("missing content docs", missingOnLocalContent);
console.log("local 404 while live 200", local404.map((r) => r.route));
console.log("copy fails", copyFails.length);
console.log("UI fails", ui.filter((r) => !r.ok).map((r) => r.route + " miss:" + r.missingSentences.length));
console.log("wrote _extract/full-parity-audit.json");
