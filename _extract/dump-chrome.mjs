import fs from "fs";

const home = fs.readFileSync("_extract/html/__home.html", "utf8");
const contact = fs.readFileSync("_extract/html/__contact.html", "utf8");
const map = fs.readFileSync("_extract/html/__contact__map-directions.html", "utf8");
const team = fs.readFileSync("_extract/html/__our-team.html", "utf8");
const tes = fs.readFileSync("_extract/html/__testimonials.html", "utf8");

function between(html, start, end) {
  const i = html.indexOf(start);
  if (i < 0) return "";
  const j = html.indexOf(end, i);
  return j < 0 ? html.slice(i, i + 4000) : html.slice(i, j);
}

console.log("=== NEWSLETTER ===");
console.log(between(home, "Would You Like", "pum-close").slice(0, 2500));

console.log("\n=== NEURO ===");
console.log(between(home, "Neuropathy Special", "pum-close").slice(0, 2000));

console.log("\n=== CONTACT BUTTONS ===");
const btns = [...contact.matchAll(/Schedule Appointment[^<]*/g)].map((m) => m[0]);
console.log(btns);
const imgs = [...contact.matchAll(/src="(https:\/\/acuwellnessclinic.com\/wp-content\/uploads\/[^"]+)"/g)].map((m) => m[1]);
console.log("contact imgs", imgs);

console.log("\n=== MAP IFRAME ===");
console.log((map.match(/<iframe[\s\S]*?<\/iframe>/i) || [""])[0].slice(0, 1500));

console.log("\n=== TEAM HEADS ===");
const heads = [...team.matchAll(/bio_head[^>]*>([^<]+)/g)].map((m) => m[1]);
console.log(heads);
console.log(/Stef/i.test(team) ? "TEAM HAS STEF" : "TEAM NO STEF");

console.log("\n=== TESTIMONIAL STEF CONTEXT ===");
const t = tes.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
const re = /.{80}Stef\w*.{80}/gi;
console.log(t.match(re));
