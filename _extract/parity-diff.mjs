import fs from "fs";
import path from "path";

const ROOT = "C:/Users/idder/tmg/acuwellnessclinic";
const LIVE = "https://acuwellnessclinic.com";
const LOCAL = process.env.LOCAL_BASE || "http://127.0.0.1:3000";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

const ROUTES = [
  "/",
  "/about-us",
  "/our-team",
  "/testimonials",
  "/clinic-forms",
  "/contact",
  "/contact/map-directions",
  "/what-is-acupuncture",
  "/what-is-acupuncture/first-visit",
  "/treatment-modalities",
  "/cancellations-late-arrivals",
  "/does-acupuncture-hurt",
  "/apw_wwt/pain",
  "/apw_qa/does-it-hurt",
];

const stefPatterns = [
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

function applyStef(text) {
  const held = [];
  let out = text.replace(/https?:\/\/[^\s"'<>]+|\/(?:media\/)?wp-content\/[^\s"'<>]+/g, (m) => {
    held.push(m);
    return `__H${held.length - 1}__`;
  });
  for (const [re, to] of stefPatterns) out = out.replace(re, to);
  return out.replace(/__H(\d+)__/g, (_, i) => held[Number(i)]);
}

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&#038;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "-")
    .replace(/&#8212;/g, "-")
    .replace(/&raquo;/g, "»")
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
  chunk = chunk
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ");
  const start = chunk.search(
    /<(section|div|article|h1)[^>]*(ct-inner-content|ct-section|ct-headline|entry-content|oxy-easy-posts|bio_head)|<h1\b/i,
  );
  if (start > 0) chunk = chunk.slice(start);
  return chunk;
}

function sentences(html) {
  const text = decode(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
  return text
    .split(/(?<=[.!?])\s+(?=[A-Z“"'])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 40);
}

function images(html) {
  const out = new Set();
  for (const m of html.matchAll(/(?:src|srcset|href)=["']([^"']+)["']/gi)) {
    const raw = m[1].split(" ")[0];
    if (/wp-content|\/media\/wp-content|\.pdf(\?|$)/i.test(raw)) {
      const base = decodeURIComponent(raw.split("?")[0].split("/").pop() || "");
      if (base) out.add(base);
    }
  }
  for (const m of html.matchAll(/url\((?:https?:\/\/[^)]+)?\/(?:media\/)?wp-content\/uploads\/[^)]+\)/gi)) {
    const base = (m[0].split("/").pop() || "").replace(/[)'"]/g, "").split("?")[0];
    if (base) out.add(decodeURIComponent(base));
  }
  return [...out];
}

function ctas(html) {
  const labels = [];
  for (const m of html.matchAll(/<a[^>]*>([\s\S]*?)<\/a>/gi)) {
    const t = decode(m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
    if (/schedule|book|portal|consultation|submit|click here/i.test(t) && t.length < 80) {
      labels.push(t);
    }
  }
  return [...new Set(labels)];
}

function formBits(html) {
  const fields = [];
  for (const m of html.matchAll(/<(?:label)[^>]*>([\s\S]*?)<\/label>/gi)) {
    const t = decode(m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
    if (t) fields.push(t);
  }
  const disclaimer = /HIPAA|identifiable health information/i.test(html);
  const submit = /Submit Form/i.test(html);
  return { fields: [...new Set(fields)], disclaimer, submit };
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { "user-agent": UA, accept: "text/html" }, redirect: "follow" });
  return { status: res.status, html: await res.text() };
}

const docs = JSON.parse(fs.readFileSync(path.join(ROOT, "content/all.json"), "utf8"));
const byPath = new Map(docs.map((d) => [d.path, d]));

const report = [];
for (const route of ROUTES) {
  const liveUrl = route === "/" ? LIVE + "/" : LIVE + route + "/";
  const localUrl = route === "/" ? LOCAL + "/" : LOCAL + route + "/";
  let live;
  try {
    live = await fetchText(liveUrl);
  } catch (e) {
    report.push({ route, error: "live fetch " + e.message });
    continue;
  }
  const liveBody = applyStef(extractBody(live.html));
  const doc = byPath.get(route);
  const localHtml = doc ? doc.html : "";
  let served = { status: 0, html: localHtml };
  try {
    served = await fetchText(localUrl);
  } catch {
    served = { status: 0, html: localHtml };
  }
  const localBody = served.html ? extractBody(served.html) : localHtml;

  const liveSent = sentences(liveBody);
  const localSent = sentences(localBody);
  const localBlob = localSent.join(" ");
  const missingSentences = liveSent.filter((s) => {
    const key = s.slice(0, 70);
    return !localBlob.includes(key) && !localBody.includes(key);
  });

  const liveImgs = images(liveBody);
  const localImgs = new Set(images(localBody).concat(images(localHtml)));
  const missingImages = liveImgs.filter((b) => !localImgs.has(b));

  const liveCtas = ctas(liveBody);
  const localCtas = new Set(ctas(localBody).concat(ctas(localHtml)));
  const missingCtas = liveCtas.filter((c) => {
    const n = applyStef(c);
    return ![...localCtas].some((x) => x.includes(n.slice(0, 20)) || n.includes(x.slice(0, 20)));
  });

  const liveForm = formBits(live.html);
  const localForm = formBits(served.html + localHtml);
  const missingFields = liveForm.fields.filter((f) => !localForm.fields.some((x) => x.includes(f) || f.includes(x)));
  const missingDisclaimer = liveForm.disclaimer && !localForm.disclaimer;
  const missingSubmit = liveForm.submit && !localForm.submit;

  report.push({
    route,
    liveStatus: live.status,
    localStatus: served.status,
    missingSentences,
    missingImages,
    missingCtas,
    missingFields,
    missingDisclaimer,
    missingSubmit,
    liveSentenceCount: liveSent.length,
    localSentenceCount: localSent.length,
  });
  console.log(
    route,
    "miss-sent",
    missingSentences.length,
    "miss-img",
    missingImages.length,
    "miss-cta",
    missingCtas.length,
  );
}

fs.writeFileSync(path.join(ROOT, "_extract/parity-diff.json"), JSON.stringify(report, null, 2));
console.log("wrote parity-diff.json");
