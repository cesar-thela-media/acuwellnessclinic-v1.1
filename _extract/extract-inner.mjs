import fs from "fs";
import path from "path";

const ROOT = "C:/Users/idder/tmg/acuwellnessclinic/_extract";
const HTML = path.join(ROOT, "html");

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#038;/g, "&")
    .replace(/&#8217;/g, "’")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&raquo;/g, "»")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)));
}

function strip(html) {
  return decode(html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function innerFrom(html) {
  const m = html.match(/<div[^>]+class=['"]ct-inner-content['"][^>]*>([\s\S]*?)<footer/i)
    || html.match(/<div[^>]+class=['"]ct-inner-content['"][^>]*>([\s\S]*)/i);
  if (m) return m[1];
  const art = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (art) return art[1];
  return "";
}

function footerFrom(html) {
  const m = html.match(/<footer[\s\S]*?<\/footer>/i);
  return m ? m[0] : "";
}

function popupsFrom(html) {
  return [...html.matchAll(/<div[^>]+id=["']pum-\d+["'][\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g)].map((m) => m[0]);
}

const files = {
  home: "__home.html",
  about: "__about-us.html",
  team: "__our-team.html",
  testimonials: "__testimonials.html",
  blog: "__blog.html",
  hwn: "__health-well-news.html",
  contact: "__contact.html",
  forms: "__clinic-forms.html",
  map: "__contact__map-directions.html",
  first: "__what-is-acupuncture__first-visit.html",
  wwt: "__what-is-acupuncture__what-we-treat.html",
};

for (const [name, file] of Object.entries(files)) {
  const html = fs.readFileSync(path.join(HTML, file), "utf8");
  const inner = innerFrom(html);
  const footer = footerFrom(html);
  const text = strip(inner).slice(0, 2500);
  console.log("\n====", name, "inner", inner.length, "footer", footer.length, "html", html.length);
  console.log(text);
  const stef = strip(html).match(/Stef\w*|Dr Stef[^ ]*/gi);
  if (stef) console.log("STEF HITS", [...new Set(stef)]);
}

const about = fs.readFileSync(path.join(HTML, "__about-us.html"), "utf8");
const footer = footerFrom(about);
fs.writeFileSync(path.join(ROOT, "footer.html"), footer);
console.log("\n==== FOOTER TEXT");
console.log(strip(footer));
