import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const HTML_DIR = path.join(ROOT, "_extract", "html");

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&#038;/g, "&")
    .replace(/&raquo;/g, "»")
    .replace(/&nbsp;/g, "\u00a0")
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function extractBody(html) {
  let chunk = html;
  const navEnd = chunk.lastIndexOf("</nav>");
  if (navEnd !== -1) chunk = chunk.slice(navEnd + 6);
  const footerAt = chunk.search(/id=["']section-10-2939["']/i);
  if (footerAt !== -1) chunk = chunk.slice(0, footerAt);
  const pumAt = chunk.search(/id=["']pum-/i);
  if (pumAt !== -1) chunk = chunk.slice(0, pumAt);
  const wpFooter = chunk.search(/<!-- WP_FOOTER -->|id=["']wpadminbar["']/i);
  if (wpFooter !== -1) chunk = chunk.slice(0, wpFooter);
  chunk = chunk
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "");
  const start = chunk.search(
    /<(section|div|article|h1)[^>]*(ct-inner-content|ct-section|ct-headline|entry-content|oxy-easy-posts|bio_head)|<h1\b/i,
  );
  if (start > 0) chunk = chunk.slice(start);
  return chunk.trim();
}

function localize(html) {
  return html
    .replace(/https?:\/\/(?:www\.)?acuwellnessclinic\.com\/wp-content/gi, "/media/wp-content")
    .replace(/(src|href)="\/wp-content\//gi, '$1="/media/wp-content/')
    .replace(/url\(\/wp-content\//gi, "url(/media/wp-content/");
}

function applyStef(text) {
  const held = [];
  let out = text.replace(/https?:\/\/[^\s"'<>]+|\/(?:media\/)?wp-content\/[^\s"'<>]+/g, (m) => {
    held.push(m);
    return `__H${held.length - 1}__`;
  });
  const pairs = [
    [/Dr\.?\s*Stefanie Dwyer/gi, "Kate Gannon"],
    [/Stefanie Dwyer/g, "Kate Gannon"],
    [/Stef Dwyer/g, "Kate Gannon"],
    [/Dr\.?\s*Stef's/gi, "Kate's"],
    [/Dr\.?\s*Stefanie's/gi, "Kate's"],
    [/Dr\.?\s*Stefanie/gi, "Kate"],
    [/Dr\.?\s*Stef\b/gi, "Kate"],
    [/Stefanie's/g, "Kate's"],
    [/Stefanie/g, "Kate"],
    [/\bStef's\b/g, "Kate's"],
    [/\bStef\b/g, "Kate"],
  ];
  for (const [re, to] of pairs) out = out.replace(re, to);
  return out.replace(/__H(\d+)__/g, (_, i) => held[Number(i)]);
}

function h1From(html, fallback) {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!m) return fallback;
  return decode(m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()) || fallback;
}

function extractMeta(html) {
  const title = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ""])[1].replace(/\s+/g, " ").trim());
  const desc = (html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) ||
    html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i) || [, ""])[1];
  return { title, description: decode(desc) };
}

const pages = [
  {
    file: "__schedule.html",
    path: "/schedule",
    type: "page",
    out: "content/pages/schedule.json",
    date: "2016-11-29T19:29:20",
  },
  {
    file: "__packages-and-new-patient-portal.html",
    path: "/packages-and-new-patient-portal",
    type: "post",
    out: "content/posts/packages-and-new-patient-portal.json",
    date: "2020-05-31T00:00:00",
  },
];

const allPath = path.join(ROOT, "content/all.json");
const all = JSON.parse(fs.readFileSync(allPath, "utf8"));
const byPath = new Map(all.map((d) => [d.path, d]));

for (const page of pages) {
  const html = fs.readFileSync(path.join(HTML_DIR, page.file), "utf8");
  const meta = extractMeta(html);
  let body = localize(applyStef(extractBody(html)));
  const title = h1From(body, page.path);
  const doc = {
    path: page.path,
    type: page.type,
    title,
    metaTitle: applyStef(meta.title),
    metaDescription: applyStef(meta.description),
    canonicalPath: page.path,
    date: page.date,
    modified: page.date,
    excerpt: "",
    image: "/media/wp-content/uploads/2019/02/Artboard-1@sishou.png",
    html: body,
    categories: [],
    tags: [],
    author: 33,
    count: null,
    schemaTypes: ["WebPage", "BreadcrumbList", "WebSite"],
  };
  fs.writeFileSync(path.join(ROOT, page.out), JSON.stringify(doc, null, 2) + "\n");
  byPath.set(page.path, doc);
  const textLen = body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().length;
  console.log("wrote", page.out, "textLen", textLen, "title", title);
}

const docs = [...byPath.values()].sort((a, b) => a.path.localeCompare(b.path));
fs.writeFileSync(allPath, JSON.stringify(docs, null, 2) + "\n");
console.log("all.json now", docs.length);
