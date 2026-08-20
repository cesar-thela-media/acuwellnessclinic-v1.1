import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const LIVE = "https://acuwellnessclinic.com";
const LOCAL = "http://127.0.0.1:3000";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

const SKIP = new Set(["/shop", "/privacy-policy", "/modern-research"]);

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&#038;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/gi, "'")
    .replace(/&#039;/g, "'")
    .replace(/&hellip;/g, "…")
    .replace(/\[&hellip;\]/g, "…")
    .replace(/\[\u2026\]/g, "…")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function applyStef(text) {
  return text
    .replace(/Dr\.?\s*Stefanie Dwyer/gi, "Kate Gannon")
    .replace(/Stefanie Dwyer/g, "Kate Gannon")
    .replace(/Stef Dwyer/g, "Kate Gannon")
    .replace(/Dr\.?\s*Stef's/gi, "Kate's")
    .replace(/Dr\.?\s*Stefanie's/gi, "Kate's")
    .replace(/Dr\.?\s*Stefanie/gi, "Kate")
    .replace(/Dr\.?\s*Stef\b/gi, "Kate")
    .replace(/Stefanie's/g, "Kate's")
    .replace(/Stefanie/g, "Kate")
    .replace(/\bStef's\b/g, "Kate's")
    .replace(/\bStef\b/g, "Kate");
}

function toPath(url) {
  try {
    const u = new URL(url, LIVE);
    let p = decodeURIComponent(u.pathname);
    if (p.length > 1) p = p.replace(/\/+$/, "");
    return p || "/";
  } catch {
    return null;
  }
}

function locs(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)].map((m) => m[1].trim());
}

async function fetchText(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 25000);
  try {
    const res = await fetch(url, {
      headers: { "user-agent": UA, accept: "text/html,application/xml" },
      redirect: "follow",
      signal: ctrl.signal,
    });
    return { status: res.status, html: await res.text(), final: res.url };
  } finally {
    clearTimeout(t);
  }
}

function bodyText(html) {
  let chunk = html
    .replace(/<head[\s\S]*?<\/head>/i, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    .replace(/<header[\s\S]*?<\/header>/i, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
    .replace(/id=["']section-10-2939["'][\s\S]*$/i, " ")
    .replace(/id=["']pum-[\s\S]*$/i, " ");
  return decode(applyStef(chunk.replace(/<[^>]+>/g, " ")))
    .replace(/Visit our Facebook/gi, " ")
    .replace(/Visit our Instagram/gi, " ")
    .replace(/Schedule An Appointment/gi, " ")
    .replace(/https?:\/\/(?:www\.)?acuwellnessclinic\.com/gi, "")
    .replace(/https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?/gi, "")
    .replace(/\/media\/wp-content/gi, "/wp-content")
    .replace(/»[^]{0,90}Acupuncture in Austin, TX/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function windows(text, n = 48) {
  const words = text.split(" ").filter(Boolean);
  const out = [];
  let acc = "";
  for (const w of words) {
    acc = acc ? `${acc} ${w}` : w;
    if (acc.length >= n) {
      out.push(acc);
      acc = "";
    }
  }
  if (acc.length >= 24) out.push(acc);
  return out;
}

async function pool(items, n, fn) {
  const out = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, worker));
  return out;
}

const index = (await fetchText(`${LIVE}/sitemap_index.xml`)).html;
const childSitemaps = locs(index).filter((u) => /sitemap/.test(u));
const livePaths = new Set();
for (const sm of childSitemaps) {
  const xml = (await fetchText(sm)).html;
  for (const loc of locs(xml)) {
    const p = toPath(loc);
    if (p) livePaths.add(p);
  }
}

let localPaths = new Set();
try {
  const xml = (await fetchText(`${LOCAL}/sitemap.xml`)).html;
  for (const loc of locs(xml)) {
    const p = toPath(loc);
    if (p) localPaths.add(p);
  }
} catch (e) {
  console.log("local sitemap fail", e.message);
}

const missingLocal = [...livePaths].filter((p) => !localPaths.has(p) && !SKIP.has(p));
console.log("live sitemap", livePaths.size, "local sitemap", localPaths.size);
console.log("live URLs not in local sitemap", missingLocal);

const paths = [...livePaths].filter((p) => !SKIP.has(p)).sort();
const results = await pool(paths, 6, async (route) => {
  const liveUrl = route === "/" ? `${LIVE}/` : `${LIVE}${encodeURI(route)}/`;
  const localUrl = route === "/" ? `${LOCAL}/` : `${LOCAL}${encodeURI(route)}/`;
  let live, local;
  try {
    live = await fetchText(liveUrl);
  } catch (e) {
    live = { status: 0, html: "", error: e.message };
  }
  try {
    local = await fetchText(localUrl);
    if (local.status === 0 || !local.html) local = await fetchText(localUrl);
  } catch (e) {
    try {
      local = await fetchText(localUrl);
    } catch (e2) {
      local = { status: 0, html: "", error: e2.message };
    }
  }
  const lt = bodyText(live.html || "");
  const loc = bodyText(local.html || "");
  const missing = windows(lt).filter((w) => !loc.includes(w.slice(0, Math.min(40, w.length))));
  return {
    route,
    liveStatus: live.status,
    localStatus: local.status,
    liveLen: lt.length,
    localLen: loc.length,
    missing,
  };
});

const fails = results.filter(
  (r) => r.localStatus !== 200 || (r.liveStatus === 200 && r.missing.length > 0),
);
const report = {
  liveSitemap: livePaths.size,
  localSitemap: localPaths.size,
  missingLocal,
  compared: results.length,
  failCount: fails.length,
  fails: fails.map((r) => ({
    route: r.route,
    liveStatus: r.liveStatus,
    localStatus: r.localStatus,
    liveLen: r.liveLen,
    localLen: r.localLen,
    missing: r.missing.slice(0, 8),
  })),
};
fs.writeFileSync(path.join(ROOT, "_extract/sitemap-copy-check.json"), JSON.stringify(report, null, 2));

const noise = /<section|women'?s health \(5\)|topics acupressure|men'?s health|healthwellnews/;
const real = results.filter((r) => {
  if (r.liveStatus !== 200) return false;
  if (r.localStatus !== 200 && r.localStatus !== 308) return true;
  const miss = r.missing.filter((m) => !noise.test(m));
  return miss.length > 0;
});
const covered = results.filter((r) => r.liveStatus === 200).length;
const ok = covered - real.length;
const rate = covered ? Math.round((ok / covered) * 100) : 0;
console.log("fails raw", fails.length, "real", real.length);
console.log("PASS1_RATE", rate + "%", ok + "/" + covered);
for (const r of real.slice(0, 30)) {
  const miss = r.missing.filter((m) => !noise.test(m));
  console.log(r.route, "local", r.localStatus, "miss", miss.length, miss[0] || "");
}
console.log("wrote sitemap-copy-check.json");

