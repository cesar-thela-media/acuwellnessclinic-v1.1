import fs from "fs";
import path from "path";

const ROOT = "C:/Users/idder/tmg/acuwellnessclinic";
const skip = new Set(["node_modules", ".next", "_extract", ".git", "public"]);

const re =
  /(?:https?:)?\/\/(?:www\.)?acuwellnessclinic\.com\/wp-content\/[^\s"'<>)\\]+|\/wp-content\/[^\s"'<>)\\]+/gi;

const found = new Map();

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (skip.has(name)) continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (/\.(json|ts|tsx|js|mjs|md|css|html)$/i.test(name)) {
      const text = fs.readFileSync(p, "utf8");
      for (const m of text.matchAll(re)) {
        let u = m[0].replace(/[.,;:]+$/, "");
        if (u.startsWith("//")) u = "https:" + u;
        if (u.startsWith("/wp-content/")) u = "https://acuwellnessclinic.com" + u;
        u = u.replace("http://", "https://").replace("www.", "");
        if (!found.has(u)) found.set(u, []);
        found.get(u).push(path.relative(ROOT, p).replaceAll("\\", "/"));
      }
    }
  }
}

walk(ROOT);
const urls = [...found.keys()].sort();
console.log("unique", urls.length);
const byExt = {};
for (const u of urls) {
  const ext = (u.split("?")[0].split(".").pop() || "none").toLowerCase();
  byExt[ext] = (byExt[ext] || 0) + 1;
}
console.log(byExt);
fs.writeFileSync(
  path.join(ROOT, "_extract/media-urls.json"),
  JSON.stringify(
    urls.map((u) => ({ url: u, refs: found.get(u) })),
    null,
    2,
  ),
);
