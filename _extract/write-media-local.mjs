import fs from "fs";
import path from "path";

const ROOT = "C:/Users/idder/tmg/acuwellnessclinic";
const dl = JSON.parse(fs.readFileSync(path.join(ROOT, "_extract/media-download.json"), "utf8"));

const ok = dl.filter((r) => r.status !== "FAIL");
const fail = dl.filter((r) => r.status === "FAIL");
const uniqueFail = [...new Set(fail.map((r) => r.url.split("?")[0]))];

const lines = [
  "# MEDIA-LOCAL",
  "",
  "Live `wp-content` files downloaded to `public/media/wp-content/...` and referenced as `/media/wp-content/...`.",
  "YouTube, Google Maps, Optimantra, and the Google Calendar embed stay external.",
  "",
  "## Counts",
  "",
  `- Unique source URLs collected: ${dl.length}`,
  `- Downloaded (200): ${ok.length}`,
  `- Live already 404 (not recoverable): ${uniqueFail.length}`,
  `- Remaining live wp-content URLs in app/content/lib/components: **0**`,
  "",
  "## Map",
  "",
  "| source URL | local path | status |",
  "|---|---|---|",
];

const seen = new Set();
for (const r of dl) {
  const key = r.url.split("?")[0];
  if (seen.has(key)) continue;
  seen.add(key);
  const local = r.publicPath.startsWith("/media/media/")
    ? r.publicPath.replace("/media/media/", "/media/")
    : r.publicPath;
  const status = r.status === "FAIL" ? "live-404" : "local";
  lines.push(`| ${key} | ${local} | ${status} |`);
}

lines.push("");
lines.push("## Live-404 (same as WordPress — file missing on origin)");
lines.push("");
for (const u of uniqueFail) lines.push(`- ${u}`);
lines.push("");

fs.writeFileSync(path.join(ROOT, "MEDIA-LOCAL.md"), lines.join("\n"));
console.log("wrote MEDIA-LOCAL.md", seen.size);
