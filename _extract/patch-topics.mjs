import fs from "fs";

const all = JSON.parse(fs.readFileSync("content/all.json", "utf8"));
const src = all.find((x) => x.path === "/does-acupuncture-hurt");
const m = src.html.match(/<div id="widget-59-2940"[\s\S]*?<\/ul>[\s\S]*?<\/div><\/div>/);
if (!m) {
  console.error("no widget");
  process.exit(1);
}
const widget = m[0];
const bom = all.find((d) => d.path.includes("lifestyle-tweaks"));
if (!bom) {
  console.error("no bom post");
  process.exit(1);
}
if (!/widget_categories/.test(bom.html)) {
  bom.html = bom.html.replace(/\s*<section\s*$/, "") + widget;
}
fs.writeFileSync("content/all.json", JSON.stringify(all, null, 2) + "\n");
const file = "content/posts/4-lifestyle-tweaks-to-thrive-this-spring%ef%bb%bf.json";
fs.writeFileSync(file, JSON.stringify(bom, null, 2) + "\n");
console.log("patched", bom.path, "hasTopics", /widget_categories/.test(bom.html));

