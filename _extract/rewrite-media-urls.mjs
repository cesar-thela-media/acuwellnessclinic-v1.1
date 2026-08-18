import fs from "fs";
import path from "path";

const ROOT = "C:/Users/idder/tmg/acuwellnessclinic";
const LIST = JSON.parse(fs.readFileSync(path.join(ROOT, "_extract/media-urls.json"), "utf8"));

function localOf(sourceUrl) {
  const u = new URL(sourceUrl);
  const p = decodeURIComponent(u.pathname);
  return "/media" + p;
}

const skipDirs = new Set(["node_modules", ".next", "_extract", ".git", "public"]);
const textExt = /\.(json|ts|tsx|js|mjs|md|css)$/i;

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (skipDirs.has(name)) continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, files);
    else if (textExt.test(name)) files.push(p);
  }
  return files;
}

const files = walk(ROOT);
let changedFiles = 0;
const remaining = [];

for (const file of files) {
  let text = fs.readFileSync(file, "utf8");
  const orig = text;
  text = text.replace(
    /(?:https?:)?\/\/(?:www\.)?acuwellnessclinic\.com\/wp-content\/[^\s"'<>)\\]+/gi,
    (m) => {
      const clean = m
        .replace(/[.,;:]+$/, "")
        .replace(/^\/\//, "https://")
        .replace("http://", "https://")
        .replace("www.", "");
      try {
        return localOf(clean);
      } catch {
        return m;
      }
    },
  );
  text = text.replace(/\/wp-content\/[^\s"'<>)\\]+/g, (m) => {
    if (m.startsWith("/media/")) return m;
    return "/media" + m;
  });
  if (text !== orig) {
    fs.writeFileSync(file, text);
    changedFiles++;
  }
}

for (const file of walk(ROOT)) {
  const text = fs.readFileSync(file, "utf8");
  const hits = text.match(/(?:https?:)?\/\/(?:www\.)?acuwellnessclinic\.com\/wp-content\/[^\s"'<>)\\]+|[^/]\/wp-content\/[^\s"'<>)\\]+/gi) || [];
  const live = [...text.matchAll(/https?:\/\/(?:www\.)?acuwellnessclinic\.com\/wp-content\/[^\s"'<>)\\]+/gi)].map((m) => m[0]);
  if (live.length) remaining.push({ file: path.relative(ROOT, file), live });
}

console.log("changed files", changedFiles);
console.log("files still with live wp-content", remaining.length);
if (remaining.length) console.log(JSON.stringify(remaining, null, 2));

const map = LIST.map((item) => ({
  source: item.url,
  local: localOf(item.url),
}));
fs.writeFileSync(path.join(ROOT, "_extract/media-map.json"), JSON.stringify(map, null, 2));
console.log("mapped", map.length);
