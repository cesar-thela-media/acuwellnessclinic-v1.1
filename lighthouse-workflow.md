# Lighthouse White-Label Frontend Workflow

Reusable playbook for recreating a live marketing site as a Vercel-first React app. Client-agnostic. Drop this file in a new project folder with `.env` (Shadcn Space credentials) and the target URL.

**Version 3.4** — refined from the old lighthouse + v2.1 rules, plus the first full WP-to-React migration (Acuwellness). Update this file when a new project teaches a new rule. White-label the lesson. Do not paste client secrets.

---

## Role split

- **Conductor (Lighthouse):** writes the next copy-paste prompt. Does not implement the site.
- **Implementer (Grok Build / Cursor):** executes the prompt in the project folder.
- **Human:** messenger. Pastes prompts, pastes replies, confirms localhost, does final visual polish.

Do not skip the human localhost gate.

---

## Two modes (pick one at intake)

**A. Outreach demo**
Core nav + linked UI pages only. Skip blog archives, tags, and deep CPT dumps unless they are in the main nav.

**B. SEO migration (ditch WordPress / keep rankings)**
Same information, same blogs, same sitemap. Inventory every public 200 URL (sitemaps + CMS REST + in-page links). Missing a public URL is a failure. Path slugs must match the original.

Default to **A** unless the boss/client says keep SEO, same blogs, same sitemap, or migrate the host.

---

## Hard rules

1. **Content is sacred.** Exact original copy. Zero summarization, truncation, paraphrasing, or invented marketing claims. Long text is a design problem later, never a copy problem.
2. **One exception channel:** an intake "copy exception" list (example: lead physician Stef → Kate). Log every replacement in `COPY-EXCEPTIONS.md`. Nothing else may change.
3. **Content exists before design.** No Shadcn Space blocks, no visual restyle, no AI hero media until localhost shows the real text on every in-scope page.
4. **Design is modular and reference-driven.** One major section at a time. Visual Spec → implement → self-critique → fix. Homepage gets 70%+ of polish.
5. **Stack is locked.** Do not freelance a different framework.
6. **No dark mode** unless the original site is essentially black and white.
7. **No leftover process in the deliverable.** No mention of Lighthouse, "reference site," or this workflow on the live site.
8. **Shadcn Space Pro** is the UI library. Credentials live in the project `.env` (`SHADCNSPACE_EMAIL`, `SHADCNSPACE_LICENSE_KEY`, `EMAIL`, `LICENSE_KEY`). Never print or commit them. Once design is unlocked, use blocks / components / templates / pages from shadcnspace.com as much as possible.
9. **Claude Cowork** is the second-opinion visual/QA tool. When localhost or the live original needs richer inspection, the Conductor writes a ready-to-paste Cowork prompt instead of guessing.

---

## Locked stack

**Primary (actually used + Vercel)**
- Next.js 15 App Router, React 19, TypeScript
- Tailwind CSS v4 (`@theme`)
- GSAP + `@gsap/react` (`useGSAP`)
- Shadcn Space Pro
- `@sentry/nextjs` scaffolded, env placeholders only
- Deploy: personal Vercel

**Reserve (in the repo, not required for the demo)**
- Railway config
- Multi-stage Docker
- Bun 1.3.4 build
- Node 20 + `node server.js`
- `GET /api/health`
- `POST /api/submit` → `WEBHOOK_URL_CONTACT`, `WEBHOOK_URL_NEWSLETTER`, `WEBHOOK_URL_SCHEDULE` (never hardcode)

Research latest *stable* versions at scaffold time if a pin is clearly stale. Do not hop majors mid-project.

---

## Intake (Phase 0)

Capture before the first implementer prompt:

- Target URL
- Client / company / niche / location
- Mode A or B
- Copy exceptions (name swaps, legal entity)
- Known must-keep brand colors
- 1–3 design references (can wait until design unlock)
- Booking system (Optimantra, Jane, Acuity, Calendly, leftover iframe, none)
- Whether blogs / resources / PDFs are in scope

---

## Phase 1 — Inventory

List every in-scope URL before writing pages.

Mode B sources:
- `sitemap_index.xml` and every child sitemap (WebFetch may 500; use curl or REST)
- CMS REST: pages, posts, custom types, categories, tags
- Header nav, footer, in-page links
- URLs that 200 but are missing from the sitemap (record and include them)

Output: `CONTENT-PARITY.md` as `source URL | local route | type | ported / 301 / 404-keep / gap`.

Also capture: brand tokens, fonts, logo, NAP, hours, forms, booking hrefs, socials, PDFs, embeds, redirects (www / apex / http / sister domains).

Known traps:
- WordPress sitemaps omit live pages. REST + in-page links are the source of truth.
- Abandoned schedulers (old iframes) still 200. 301 them to the current booking URL. Do not rebuild them.
- Stale promo/package pages often 200. 301 to the current portal or contact page.

---

## Phase 2 — Scaffold

Install the locked stack. Configure the Shadcn registry from `.env`. Stub Sentry. Add health + submit routes, Docker, railway, `robots.ts`, `sitemap.ts`, README.

No decorative blocks yet.

---

## Phase 3 — Content drop-in

Port every in-scope URL into typed content modules (`content/pages`, `content/posts`, CPTs). Pages only read from those modules.

It is normal (and preferred) if pages first render as a plain HTML dump of the original body. That is the hard-gate artifact. Design later carves **one section at a time** out of that dump into real components. Do not restyle the whole dump in one pass.

Keep original slugs. Keep original images, PDFs, and video embeds. Keep leftover awkward copy unless a copy exception applies.

Typical 301s (decide per project, do not silently drop):
- Dead nav items → nearest live equivalent
- Abandoned scheduler → current booking URL
- Stale promo page → current portal / contact
- `/privacy-policy` → existing privacy PDF if there is no real page

SEO on every ported URL:
- Same path
- Same title + meta description (then apply copy exceptions)
- Canonical, WebPage + BreadcrumbList + WebSite JSON-LD
- Add `LocalBusiness` / industry type if the original is missing it
- Add basic OG tags if the original has none
- `sitemap.ts` lists every ported URL (do not copy the original sitemap's omissions)

If copy exceptions exist, also write `COPY-EXCEPTIONS.md` (old string, new string, URL). Historical asides that are not "lead physician / author" go under **needs review**. Default: apply the exception. Human can revert a needs-review line later.

---

## Phase 4 — Hard gate

Human (or Conductor checking the user's localhost) confirms real text on in-scope pages.

Implementer counts ("448 ported, 0 gaps") are claims until the Conductor fetches localhost. Minimum check:
- Home H1 + first body paragraph
- One about/story page
- Team / people page
- One blog or article
- One service / condition / CPT page
- Contact form fields + disclaimer
- `GET /api/health`
- `sitemap.xml` / `sitemap.ts` lists the ported routes

**Design is illegal until this gate is green AND the human explicitly unlocks it.** A Conductor localhost spot-check is not a design unlock.

### Phase 4b — Scaffold + content hardening (before any design)

Do this after the gate and before Phase 5. Especially in Mode B (ditch WordPress):

- Localize every referenced image, PDF, and download into `/public` (or `content/media`). Do not leave `wp-content` hotlinks as the only copy. When the old host dies, the new site must still have the files.
- Point privacy / downloads at those local files, not the old CMS URL.
- Shadcn Space: registry in `components.json` is not enough. Install the CLI, confirm `.env` auth works, do **not** pull decorative blocks yet.
- Re-diff core pages against live HTML (after copy exceptions). Fix missing chunks.
- Prove `GET /api/health` and `POST /api/submit` (contact + newsletter) with a real payload.
- Prove the redirect list. Next.js `permanent: true` often emits **308**, not 301. Treat 308 as success.
- Prove localized files actually 200 on localhost (`/media/...` logo, hero, privacy PDF).
- Assets that 404 on the live CMS stay documented as `live-404`. Do not invent replacements.
- No visual work. No `@theme` restyle. No Shadcn marketing blocks.

---

## Phase 5 — Brand lock

Stay in the original color spectrum (matte variations allowed). Lock type from references + industry. Prefer free / obtainable fonts. No neon, no heavy glass, no excess gradient. Gradients use the locked primaries, 2–3 per page max.

Put tokens into Tailwind `@theme` (and keep `content/brand-tokens.ts` as the source). Applying tokens globally is allowed. Rebuilding header, footer, or other pages is not allowed in this phase.

The first implementer prompt after the human unlocks design is **Phase 5 + homepage Hero only**. Not the whole homepage.

---

## Phase 6 — Section-by-section design (homepage first)

Never redesign the whole site in one shot. Carve the named section out of the HTML dump into a real component. Leave the rest of the dump in place.

For each major section (Hero first):
1. Identify the section
2. Attach a reference screenshot if one exists. If none, write the Visual Spec from brand tokens + industry + the closest Shadcn Space block (not from memory of a random pretty site)
3. Force a Visual Spec (layout, spacing, type scale, media, CTAs, density, motion)
4. Install / adapt the closest Shadcn Space block. Do not invent a hero from scratch if a block exists
5. Keep 100% of the copy (restructure visually if long: accordion, cards, split)
6. Self-critique vs spec + screenshot, then fix
7. Accept, then next section

Hero media may be AI-generated atmosphere. Listing / product / real-client photos stay real.

GSAP on elements (fade, entrance, smooth scroll). Do not AFK "continue until done" without restating the current section's success criteria.

---

## Phase 7 — Polish, hygiene, deploy

Focus: homepage hero + first two scrolls, primary CTAs, mobile, then supporting pages.

Self-audit: parity, exceptions log, brand, long-text handling, code cleanliness, mobile.

Hygiene: no debug leftovers, correct `"use client"`, `useGSAP` cleanup, env documented, forms + health work, no embarrassment-level mess.

Git (every commit, including the first):
- Subject: one meaningful line of what actually changed (not "wip" / "update" / "changes").
- Body: bullet points of the **direct changes made** (files/behavior), relative to the previous push. First commit: bullets of what the repo now contains.
- Conductor writes the subject + body. Implementer (Grok Build) applies it when the human hands over remotes/auth.
- Prefer trunk for demos unless a branch is required.
- Never commit `.env` or Shadcn Space keys.

Deploy personal Vercel. Test the production URL. Only then is it outreach / handoff material.

---

## Conductor habits

- One comprehensive implementer prompt at a time, in a fenced block, ready to paste.
- Decide instead of asking, except true intake unknowns.
- When the implementer replies, review against this file, then write the next prompt (fix / next section / audit).
- When visual QA needs eyes on localhost or the live original, write a Claude Cowork prompt.
- After a project teaches a new rule, update this file.
- After the gate is green, the next prompt is Phase 4b hardening (localize assets, prove APIs, prove registry). Brand lock + Hero only after the human says design may start.

---

## Prompt pack (fill brackets)

### Kickoff (Phases 1–3)

```
You are the implementer. I am the messenger. Follow this brief exactly.
Do not start design until I confirm localhost copy.

Target: [URL]
Mode: [A outreach demo | B SEO migration]
Copy exceptions: [none | list]
Locked stack: Next 15, React 19, TS, Tailwind v4, GSAP, Shadcn Space Pro from local .env (do not print keys), Sentry stubs, Bun 1.3.4, Node 20, Docker, railway.json, /api/health, /api/submit webhooks, no dark mode, Vercel primary.

Step A: scaffold the locked stack.
Step B: inventory every in-scope URL, write CONTENT-PARITY.md, drop exact copy + assets into typed modules, implement 301s, metadata, sitemap.ts.
Stop. Reply with local URL, route tree, parity table, exception log, and gaps.
```

### Unlock design (after gate)

```
Localhost copy is confirmed. Design is unlocked for brand tokens + ONE section only.
Phase 5: put recorded brand tokens into Tailwind @theme. Do not rebuild header/footer/other pages.
Phase 6 section: [Hero]
Reference: [attach screenshot or "none — use tokens + closest Shadcn Space block"]
Carve this section out of the HTML dump into a real component. Leave every other homepage section as the dump.
Shadcn Space: install the closest block from the local registry. Do not invent from scratch.
Keep every word. Visual Spec first, then implement, then self-critique and fix.
Stop. Do not continue to the next section.
```

### Self-audit

```
Audit against lighthouse-workflow.md: parity, copy exceptions, brand, long-text handling, hygiene, mobile. Report and fix violations only.
```

### Visual fix

```
Fix only this issue: [padding / gap / hierarchy]. Keep all copy. Do not touch other sections.
```
