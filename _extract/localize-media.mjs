import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const ROOT = "C:/Users/idder/tmg/acuwellnessclinic";
const LIST = JSON.parse(fs.readFileSync(path.join(ROOT, "_extract/media-urls.json"), "utf8"));
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

function toLocalPath(sourceUrl) {
  const u = new URL(sourceUrl);
  let p = decodeURIComponent(u.pathname);
  if (!p.startsWith("/wp-content/")) {
    throw new Error("unexpected path " + sourceUrl);
  }
  return {
    fsPath: path.join(ROOT, "public", "media", p.replace(/^\//, "")),
    publicPath: "/media" + p,
  };
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const tmp = dest + ".part";
    const file = fs.createWriteStream(tmp);
    const lib = url.startsWith("https") ? https : http;
    const req = lib.get(
      url,
      {
        headers: { "user-agent": UA, accept: "*/*" },
        timeout: 60000,
      },
      (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          fs.rmSync(tmp, { force: true });
          const next = new URL(res.headers.location, url).href;
          download(next, dest).then(resolve, reject);
          return;
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.rmSync(tmp, { force: true });
          reject(new Error(res.statusCode + " " + url));
          return;
        }
        res.pipe(file);
        file.on("finish", () => {
          file.close(() => {
            fs.renameSync(tmp, dest);
            resolve({ bytes: fs.statSync(dest).size });
          });
        });
      },
    );
    req.on("error", (err) => {
      file.close();
      fs.rmSync(tmp, { force: true });
      reject(err);
    });
    req.on("timeout", () => {
      req.destroy(new Error("timeout " + url));
    });
  });
}

async function pool(items, limit, fn) {
  let i = 0;
  const out = new Array(items.length);
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (i < items.length) {
        const idx = i++;
        out[idx] = await fn(items[idx], idx);
      }
    }),
  );
  return out;
}

const results = [];
await pool(LIST, 8, async (item, idx) => {
  const { url } = item;
  const { fsPath, publicPath } = toLocalPath(url);
  try {
    if (fs.existsSync(fsPath) && fs.statSync(fsPath).size > 0) {
      results.push({ url, publicPath, fsPath: path.relative(ROOT, fsPath), bytes: fs.statSync(fsPath).size, status: "exists" });
    } else {
      const { bytes } = await download(url, fsPath);
      results.push({ url, publicPath, fsPath: path.relative(ROOT, fsPath), bytes, status: "ok" });
    }
  } catch (e) {
    results.push({ url, publicPath, fsPath: path.relative(ROOT, fsPath), bytes: 0, status: "FAIL", error: String(e.message || e) });
  }
  if ((idx + 1) % 25 === 0 || idx === LIST.length - 1) {
    console.log(`${idx + 1}/${LIST.length}`);
  }
});

const fails = results.filter((r) => r.status === "FAIL");
console.log("ok", results.filter((r) => r.status !== "FAIL").length, "fail", fails.length);
if (fails.length) console.log(fails);

fs.writeFileSync(path.join(ROOT, "_extract/media-download.json"), JSON.stringify(results, null, 2));
