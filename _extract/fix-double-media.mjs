import fs from "fs";
import path from "path";

const ROOT = "C:/Users/idder/tmg/acuwellnessclinic";
const skip = new Set(["node_modules", ".next", "_extract", ".git"]);
const textExt = /\.(json|ts|tsx|js|mjs|md|css)$/i;
let n = 0;

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (skip.has(name)) continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (textExt.test(name)) {
      const orig = fs.readFileSync(p, "utf8");
      const next = orig.replaceAll("/media/media/", "/media/");
      if (next !== orig) {
        fs.writeFileSync(p, next);
        n++;
      }
    }
  }
}
walk(ROOT);
console.log("fixed files", n);
