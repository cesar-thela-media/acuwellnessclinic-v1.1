import fs from "fs";
import path from "path";
import https from "https";

const ROOT = "C:/Users/idder/tmg/acuwellnessclinic";
const fails = JSON.parse(fs.readFileSync(path.join(ROOT, "_extract/media-download.json"), "utf8")).filter(
  (r) => r.status === "FAIL",
);
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

function candidates(url) {
  const u = new URL(url.split("?")[0]);
  const p = u.pathname;
  const out = new Set([p]);
  out.add(p.replace(/-\d+x\d+(?=\.[a-z]+$)/i, ""));
  out.add(p.replace(/\.jpg$/i, ".jpeg"));
  out.add(p.replace(/\.jpeg$/i, ".jpg"));
  out.add(p.replace(/\.jpg$/i, ".png"));
  return [...out].map((x) => "https://acuwellnessclinic.com" + x);
}

function headOrGet(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { "user-agent": UA }, timeout: 20000 }, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        resolve({ status: res.statusCode, buf: Buffer.concat(chunks), type: res.headers["content-type"] || "" });
      });
    });
    req.on("error", () => resolve({ status: 0, buf: Buffer.alloc(0), type: "" }));
    req.on("timeout", () => {
      req.destroy();
      resolve({ status: 0, buf: Buffer.alloc(0), type: "" });
    });
  });
}

const recovered = [];
for (const item of fails) {
  const dest = path.join(ROOT, item.fsPath);
  let done = false;
  for (const c of candidates(item.url)) {
    const r = await headOrGet(c);
    console.log(r.status, c, r.buf.length);
    if (r.status === 200 && r.buf.length > 200 && /image|pdf|octet/i.test(r.type + "image")) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, r.buf);
      recovered.push({ dest: item.publicPath, from: c, bytes: r.buf.length });
      done = true;
      break;
    }
  }
  if (!done) {
    // WP media search by filename
    const name = path.basename(item.url.split("?")[0]).replace(/-\d+x\d+(?=\.[a-z]+$)/i, "");
    const api = `https://acuwellnessclinic.com/wp-json/wp/v2/media?search=${encodeURIComponent(name.replace(/\.[a-z]+$/i, ""))}&per_page=5`;
    const r = await headOrGet(api);
    if (r.status === 200) {
      try {
        const json = JSON.parse(r.buf.toString("utf8"));
        const src = json[0]?.source_url;
        console.log("media search", name, src || "none");
        if (src) {
          const img = await headOrGet(src);
          if (img.status === 200 && img.buf.length > 200) {
            fs.mkdirSync(path.dirname(dest), { recursive: true });
            fs.writeFileSync(dest, img.buf);
            recovered.push({ dest: item.publicPath, from: src, bytes: img.buf.length });
            done = true;
          }
        }
      } catch {
        console.log("media search parse fail", name);
      }
    }
  }
  if (!done) console.log("UNRECOVERED", item.url);
}

fs.writeFileSync(path.join(ROOT, "_extract/media-recovered.json"), JSON.stringify(recovered, null, 2));
console.log("recovered", recovered.length, "of", fails.length);
