import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const LIVE = "https://acuwellnessclinic.com";
const LOCAL = "http://127.0.0.1:3000";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

const UI = [
  "/",
  "/about-us",
  "/our-team",
  "/testimonials",
  "/upcoming-events",
  "/treatment-modalities",
  "/blog",
  "/what-is-acupuncture",
  "/what-is-acupuncture/what-we-treat",
  "/what-is-acupuncture/first-visit",
  "/what-is-acupuncture/q-a",
  "/clinic-forms",
  "/resources",
  "/resources/facial-rejuvenation",
  "/resources/more-research",
  "/resources/one-pagers",
  "/resources/videos",
  "/contact",
  "/contact/map-directions",
  "/cancellations-late-arrivals",
  "/chinese-herbal-medicine",
  "/what-is-guasha",
  "/what-is-cupping-therapy",
  "/what-is-moxabustion",
  "/what-is-tuina",
  "/what-is-nutritional-therapy",
  "/what-is-taichi-and-qigong",
  "/what-is-electro-acupuncture",
  "/health-well-news",
  "/schedule",
  "/packages-and-new-patient-portal",
];

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&#038;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/gi, "'")
    .replace(/&#039;/g, "'")
    .replace(/&#8211;/g, "-")
    .replace(/&#8212;/g, "-")
    .replace(/&hellip;/g, "…")
    .replace(/\[&hellip;\]/g, "…")
    .replace(/\[\u2026\]/g, "…")
    .replace(/\[\.\.\.\]/g, "…")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function applyStef(text) {
  return text
    .replace(/Dr\.?\s*Stefanie Dwyer/gi, "Kate Gannon")
    .replace(/Stefanie Dwyer/g, "Kate Gannon")
    .replace(/Stef Dwyer/g, "Kate Gannon")
    .replace(/Dr\.?\s*Stef's/gi, "Kate's")
    .replace(/Dr\.?\s*Stefanie's/gi, "Kate's")
    .replace(/Dr\.?\s*Stefanie/gi, "Kate")
    .replace(/Dr\.?\s*Stef\b/gi, "Kate")
    .replace(/Stefanie's/g, "Kate's")
    .replace(/Stefanie/g, "Kate")
    .replace(/\bStef's\b/g, "Kate's")
    .replace(/\bStef\b/g, "Kate");
}

function bodyText(html) {
  let chunk = html
    .replace(/<head[\s\S]*?<\/head>/i, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    .replace(/<header[\s\S]*?<\/header>/gi, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
    .replace(/id=["']section-10-2939["'][\s\S]*$/i, " ")
    .replace(/id=["']pum-[\s\S]*$/i, " ");
  let text = decode(applyStef(chunk.replace(/<[^>]+>/g, " ")));
  text = text
    .replace(/Visit our Facebook/gi, " ")
    .replace(/Visit our Instagram/gi, " ")
    .replace(/Schedule An Appointment/gi, " ")
    .replace(/Facebook/g, " ")
    .replace(/Instagram/g, " ")
    .replace(/<section/g, " ")
    .replace(/https?:\/\/(?:www\.)?acuwellnessclinic\.com/gi, "")
    .replace(/https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?/gi, "")
    .replace(/\/media\/wp-content/gi, "/wp-content")
    .replace(/»[^]{0,80}Acupuncture in Austin, TX/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
  return text;
}

function windows(text, n = 48) {
  const words = text.split(" ").filter(Boolean);
  const out = [];
  let acc = "";
  for (const w of words) {
    acc = acc ? acc + " " + w : w;
    if (acc.length >= n) {
      out.push(acc);
      acc = "";
    }
  }
  if (acc.length >= 24) out.push(acc);
  return out;
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { "user-agent": UA } });
  return { status: res.status, html: await res.text() };
}

const rows = [];
for (const route of UI) {
  const liveUrl = route === "/" ? `${LIVE}/` : `${LIVE}${route}/`;
  const localUrl = route === "/" ? `${LOCAL}/` : `${LOCAL}${route}/`;
  const live = await fetchText(liveUrl);
  const local = await fetchText(localUrl);
  const lt = bodyText(live.html);
  const loc = bodyText(local.html);
  const missing = windows(lt).filter((w) => !loc.includes(w.slice(0, Math.min(40, w.length))));
  const extra = windows(loc).filter((w) => !lt.includes(w.slice(0, Math.min(40, w.length))));
  rows.push({
    route,
    liveStatus: live.status,
    localStatus: local.status,
    liveLen: lt.length,
    localLen: loc.length,
    missing,
    extra,
  });
  console.log(
    route.padEnd(42),
    "miss",
    String(missing.length).padStart(2),
    "extra",
    String(extra.length).padStart(2),
    missing[0] ? `| ${missing[0].slice(0, 90)}` : "",
  );
}

fs.writeFileSync(path.join(ROOT, "_extract/refine-ui.json"), JSON.stringify(rows, null, 2));
const ok = rows.filter((r) => r.liveStatus === 200 && r.localStatus === 200 && r.missing.length === 0).length;
const n = rows.filter((r) => r.liveStatus === 200).length;
console.log("PASS3_RATE", Math.round((ok / n) * 1000) / 10 + "%", `${ok}/${n}`);
console.log("wrote refine-ui.json");

