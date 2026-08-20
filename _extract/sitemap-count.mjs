const LIVE = "https://acuwellnessclinic.com";
const LOCAL = "http://127.0.0.1:3000";
const UA = "Mozilla/5.0";

function locs(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)].map((m) => m[1].trim());
}

function toPath(url) {
  try {
    const u = new URL(url);
    let p = decodeURIComponent(u.pathname);
    if (p.length > 1) p = p.replace(/\/+$/, "");
    return p || "/";
  } catch {
    return null;
  }
}

const index = await (await fetch(`${LIVE}/sitemap_index.xml`, { headers: { "user-agent": UA } })).text();
const live = new Set();
for (const sm of locs(index).filter((u) => /sitemap/.test(u))) {
  const xml = await (await fetch(sm, { headers: { "user-agent": UA } })).text();
  for (const loc of locs(xml)) {
    const p = toPath(loc);
    if (p) live.add(p);
  }
}
const localXml = await (await fetch(`${LOCAL}/sitemap.xml`, { headers: { "user-agent": UA } })).text();
const local = new Set(locs(localXml).map(toPath).filter(Boolean));
const missing = [...live].filter((p) => !local.has(p));
console.log(JSON.stringify({ live: live.size, local: local.size, missing }, null, 2));
