const LIVE = "https://acuwellnessclinic.com/";
const LOCAL = "http://127.0.0.1:3000/";
const UA = "Mozilla/5.0";

function decode(s) {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#038;/g, "&")
    .replace(/&#8217;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function applyStef(t) {
  return t
    .replace(/Stefanie/g, "Kate")
    .replace(/\bStef\b/g, "Kate");
}

function navLabels(html) {
  const nav = html.match(/<nav[\s\S]*?<\/nav>/i);
  if (!nav) return [];
  const out = [];
  for (const m of nav[0].matchAll(/<a[^>]*>([\s\S]*?)<\/a>/gi)) {
    const label = decode(m[1].replace(/<[^>]+>/g, " "));
    if (label) out.push(label);
  }
  return out;
}

function footerText(html) {
  const foot =
    html.match(/<footer[\s\S]*?<\/footer>/i) ||
    html.match(/id=["']section-10-2939["'][\s\S]*?<\/section>/i);
  if (!foot) return "";
  return applyStef(
    decode(foot[0].replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<[^>]+>/g, " ")),
  ).toLowerCase();
}

const live = await (await fetch(LIVE, { headers: { "user-agent": UA } })).text();
const local = await (await fetch(LOCAL, { headers: { "user-agent": UA } })).text();
const liveNav = navLabels(live);
const localNav = navLabels(local);
const missingNav = liveNav.filter((l) => {
  const n = applyStef(l).toLowerCase();
  return !localNav.some((x) => applyStef(x).toLowerCase().includes(n.slice(0, Math.min(20, n.length))));
});
const liveFoot = footerText(live);
const localFoot = footerText(local);
const bits = [
  "(512) 387-4002",
  "schedule appointment with kate",
  "schedule appointment with aaron",
  "10:00am - 5:00pm",
  "2:00pm - 6:00pm",
  "10:00am - 2:00pm",
  "10:00am - 7:00pm",
  "10:00am - 3:00pm",
  "closed",
  "5424 w us hwy 290 service rd ste 106",
  "austin, tx 78735",
];
const missingFoot = bits.filter((b) => !localFoot.includes(b));
const checks = 1 + bits.length;
const ok = (missingNav.length === 0 ? 1 : 0) + (bits.length - missingFoot.length);
console.log("liveNav", liveNav);
console.log("localNav", localNav);
console.log("missingNav", missingNav);
console.log("missingFoot", missingFoot);
console.log("PASS4_RATE", Math.round((ok / checks) * 1000) / 10 + "%", `${ok}/${checks}`);
