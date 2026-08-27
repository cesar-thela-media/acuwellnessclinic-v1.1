/**
 * Reserve runtime for Docker / Railway (Node 20).
 * Primary deploy is Vercel (next start). This file stays in the repo.
 */
if (!process.env.NODE_ENV) process.env.NODE_ENV = "production";

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const LEGACY_REDIRECTS = new Map([
  ["/modern-research", "/resources/more-research/"],
  ["/privacy-policy", "/media/wp-content/uploads/2011/10/SSAW-Privacy-Policy-Jan-2017.pdf"],
  ["/packages-and-new-patient-portal", "/clinic-forms/"],
  [
    "/schedule",
    "https://www.optimantra.com/optimus/patient/patientaccess/servicesall?pid=WWUvSUxvR2NwdzlOYTBOUjdpdFR1dz09&lid=WkxqU1Z6MlROZDIxbTlndjBRVUNYUT09",
  ],
]);

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port, dir: __dirname });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url || "/", true);
        const pathname = (parsedUrl.pathname || "").replace(/\/$/, "") || "/";
        const legacyDestination =
          pathname === "/" && parsedUrl.query.page_id === "17"
            ? "/resources/more-research/"
            : LEGACY_REDIRECTS.get(pathname);
        if (legacyDestination) {
          res.writeHead(301, {
            location: legacyDestination,
            "cache-control": "public, max-age=31536000, immutable",
          });
          res.end();
          return;
        }
        if (pathname === "/api/health") {
          res.writeHead(200, {
            "content-type": "application/json; charset=utf-8",
            "cache-control": "no-store",
          });
          res.end(JSON.stringify({ ok: true }));
          return;
        }
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error("Error handling", req.url, err);
        res.statusCode = 500;
        res.end("internal server error");
      }
    }).listen(port, hostname, () => {
      console.log(`Si Shou Acupuncture ready on http://${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server", err);
    process.exit(1);
  });
