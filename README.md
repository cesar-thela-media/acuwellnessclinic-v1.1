# Si Shou Acupuncture and Wellness, PLLC

Content-complete Next.js migration and branded redesign of [acuwellnessclinic.com](https://acuwellnessclinic.com/). Live sitemap copy parity is verified locally.

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 App Router + React 19 + TypeScript |
| Styling | Tailwind CSS v4 (`@theme`) with AcuWellness brand tokens |
| Motion | GSAP + `@gsap/react` with reduced-motion handling |
| Blocks | Shadcn Space-compatible components and local shadcn primitives |
| Observability | `@sentry/nextjs`, credential-ready and disabled without DSN |
| Build | Bun 1.3.4 in Docker and Bun local builds |
| Runtime | Node 20 container runtime; `node server.js` |
| Deploy | Vercel (Next.js) or Railway via multi-stage `Dockerfile` + `railway.json` |

## Local run

```bash
cp .env.example .env
# fill EMAIL / LICENSE_KEY if you later install Shadcn Space blocks
# fill WEBHOOK_URL_* to deliver forms

bun install
bun run dev
# http://localhost:3000
```

```bash
bun run build
bun run start
# node server.js on PORT (default 3000)
```

## Scripts

- `bun run dev` — Next dev server
- `bun run build` — production build
- `bun run start` — `node server.js`
- `bun run typecheck` — `tsc --noEmit`

## Environment

See `.env.example`. Never commit `.env`.

- `EMAIL` / `LICENSE_KEY` and `SHADCNSPACE_EMAIL` / `SHADCNSPACE_LICENSE_KEY` — Shadcn Space registry only
- `WEBHOOK_URL_CONTACT` — contact form
- `WEBHOOK_URL_NEWSLETTER` — newsletter popup
- `WEBHOOK_URL_SCHEDULE` — reserved
- `NEXT_PUBLIC_SENTRY_DSN` / `SENTRY_*` — optional; app runs without them
- `NEXT_PUBLIC_SITE_URL` — canonical / sitemap origin

## APIs

- `GET /api/health` → `{ "ok": true }`
- `POST /api/submit` → JSON `{ type, payload }` forwarded to the matching `WEBHOOK_URL_*`

## Deploy

### Vercel (recommended for this Next app)

1. Import the repo in Vercel (Framework Preset: **Next.js** — see `vercel.json`).
2. Set env vars from `.env.example` (`NEXT_PUBLIC_SITE_URL`, optional webhooks / Sentry / Maps).
3. Build command: `bun run build` (or default `next build`). Output is standard Next (no `standalone` on Vercel).
4. Install command: `bun install` (project `packageManager` is Bun 1.3.4).

Verified locally with `bun run build` (455 static routes).

### Railway

- `Dockerfile` builds with Bun 1.3.4 and runs `node server.js` on Node 20. `railway.json` configures the `/api/health` health check.
- Custom `server.js` owns legacy 301s because Next's `permanent` redirects return 308.

## Cutover notes (not implemented here)

- `http` → `https`
- `www.acuwellnessclinic.com` → apex
- `acuwellnessclinic.net` → `acuwellnessclinic.com`

## Inventory

- `CONTENT-PARITY.md` — every public URL
- `STEF-TO-KATE.md` — ownership handoff replacements
