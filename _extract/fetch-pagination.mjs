import fs from "fs";
import path from "path";

const HTML_DIR = "C:/Users/idder/tmg/acuwellnessclinic/_extract/html";
const pag = JSON.parse(
  fs.readFileSync("C:/Users/idder/tmg/acuwellnessclinic/_extract/scraped/pagination.json", "utf8"),
);
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

function fileFor(p) {
  return path.join(HTML_DIR, `__${p.replace(/^\//, "").replace(/\//g, "__")}.html`);
}

async function fetchOne(p) {
  const dest = fileFor(p);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
    console.log("skip", p);
    return;
  }
  const res = await fetch("https://acuwellnessclinic.com" + p + "/", {
    headers: { "user-agent": UA },
  });
  const html = await res.text();
  fs.writeFileSync(dest, html);
  console.log(res.status, p, html.length);
}

for (const extra of pag.extra) {
  await fetchOne(extra.path);
}
console.log("done");
