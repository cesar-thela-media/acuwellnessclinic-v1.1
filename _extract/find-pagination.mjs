import fs from "fs";
import path from "path";

const HTML = "C:/Users/idder/tmg/acuwellnessclinic/_extract/html";
const BASE = "https://acuwellnessclinic.com";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

const all = JSON.parse(
  fs.readFileSync("C:/Users/idder/tmg/acuwellnessclinic/_extract/scraped/all.json", "utf8"),
);

const archives = all.filter(
  (r) =>
    r.status === 200 &&
    (r.path === "/blog" ||
      r.path === "/health-well-news" ||
      r.path.startsWith("/category/") ||
      r.path.startsWith("/tag/")),
);

const found = new Set();
for (const r of archives) {
  const file =
    r.path === "/"
      ? "__home.html"
      : `__${r.path.replace(/^\//, "").replace(/\//g, "__")}.html`;
  const fp = path.join(HTML, file);
  if (!fs.existsSync(fp)) continue;
  const html = fs.readFileSync(fp, "utf8");
  for (const m of html.matchAll(/href=["'](https?:\/\/acuwellnessclinic.com)?(\/[^"']*\/page\/\d+\/?)/g)) {
    found.add(m[2].replace(/\/$/, ""));
  }
}

console.log("pagination hrefs in existing html", [...found].sort());

async function exists(p) {
  const res = await fetch(BASE + p + "/", {
    headers: { "user-agent": UA },
    redirect: "manual",
  });
  return res.status;
}

const extra = [];
const seeds = new Set();
for (const p of found) {
  const seed = p.replace(/\/page\/\d+$/, "");
  if (seed) seeds.add(seed);
}
if (!seeds.size) {
  seeds.add("/blog");
  seeds.add("/health-well-news");
}

for (const seed of seeds) {
  for (let n = 2; n <= 30; n++) {
    const p = `${seed}/page/${n}`;
    const status = await exists(p);
    console.log(status, p);
    if (status !== 200) break;
    extra.push({ path: p, status });
  }
}

fs.writeFileSync(
  "C:/Users/idder/tmg/acuwellnessclinic/_extract/scraped/pagination.json",
  JSON.stringify({ fromHtml: [...found], extra }, null, 2),
);
console.log("extra 200 pages", extra.length);
