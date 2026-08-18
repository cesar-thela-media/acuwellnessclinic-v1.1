import fs from "fs";

const all = JSON.parse(
  fs.readFileSync("C:/Users/idder/tmg/acuwellnessclinic/_extract/scraped/all.json", "utf8"),
);

const not200 = all.filter((r) => r.status !== 200);
console.log("NOT 200");
for (const r of not200) console.log(r.status, r.path, r.location, r.error);

console.log("\nEMPTY-ISH 200s (main<80 and rest<80)");
for (const r of all.filter((r) => r.status === 200 && r.liveMain.length < 80 && r.restContent.length < 80)) {
  console.log(r.path, "main", r.liveMain.length, "rest", r.restContent.length, "html", r.htmlBytes, r.liveTitle);
}

console.log("\nCOUNTS by type");
const types = {};
for (const r of all) {
  const t = r.restType || "unknown";
  types[t] = types[t] || { n: 0, ok: 0 };
  types[t].n++;
  if (r.status === 200) types[t].ok++;
}
console.log(types);

console.log("\nHOME nav sample");
const home = all.find((r) => r.path === "/");
console.log(JSON.stringify(home?.navSample, null, 2));
console.log("home title", home?.liveTitle);
console.log("home desc", home?.liveDescription);
console.log("home main len", home?.liveMain.length);
console.log("home rest len", home?.restContent.length);
