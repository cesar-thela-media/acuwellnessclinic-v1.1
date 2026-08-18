# Si Shou Acupuncture and Wellness, PLLC

Content-complete Next.js migration of [acuwellnessclinic.com](https://acuwellnessclinic.com/). Visual redesign is deferred until localhost copy is confirmed.

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 App Router + React 19 + TypeScript |
| Styling | Tailwind CSS v4 (`@theme`). No dark mode. Brand tokens recorded, not themed yet. |
| Motion | GSAP + `@gsap/react` (wired only) |
| Blocks | Shadcn Space Pro registry configured. Decorative blocks not pulled yet. |
| Observability | `@sentry/nextjs` (placeholder env only) |
| Build | Bun 1.3.4 (Docker image). Local Bun 1.3.x is fine. |
| Runtime | Node 20. Reserve entry: `node server.js` |
| Primary deploy | Vercel |
| Reserve | Multi-stage `Dockerfile` + `railway.json` (not deployed) |

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

## Vercel vs reserve

- **Vercel:** default Next output. This is the intended host.
- **Docker / Railway:** `Dockerfile` builds with Bun 1.3.4 and runs `node server.js` on Node 20. `railway.json` is reserved, not deployed.

## Cutover notes (not implemented here)

- `http` → `https`
- `www.acuwellnessclinic.com` → apex
- `acuwellnessclinic.net` → `acuwellnessclinic.com`

## Inventory

- `CONTENT-PARITY.md` — every public URL
- `STEF-TO-KATE.md` — ownership handoff replacements
