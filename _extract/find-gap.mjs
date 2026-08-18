import fs from "fs";

const all = JSON.parse(fs.readFileSync("_extract/scraped/all.json", "utf8"));
const pag = JSON.parse(fs.readFileSync("_extract/scraped/pagination.json", "utf8"));
const docs = JSON.parse(fs.readFileSync("content/all.json", "utf8"));
const ported = new Set(docs.map((d) => d.path));

const live200 = new Set();
for (const r of all) {
  if (r.status === 200) live200.add(r.path);
}
live200.add("/"); // home was overwritten by ?page_id=17
for (const e of pag.extra) {
  if (e.status === 200) live200.add(e.path);
}

const redirect200 = ["/schedule", "/packages-and-new-patient-portal"];
const missing = [...live200].filter((p) => !ported.has(p) && !redirect200.includes(p));
const extra = [...ported].filter((p) => !live200.has(p));
console.log("live200", live200.size);
console.log("ported", ported.size);
console.log("missing", missing);
console.log("extra vs live200", extra);
