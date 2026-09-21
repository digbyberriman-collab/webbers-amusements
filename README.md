# Webbers Amusements

Marketing website for Webbers Amusements — a family-run, UK Gambling Commission–licensed
Adult Gaming Centre (AGC) operator with five venues across Chester, North Wales and
Greater Manchester. **Strictly 18+.**

## Stack

- **[TanStack Start](https://tanstack.com/start)** (React 19, SSR) + **[TanStack Router](https://tanstack.com/router)** (file-based routes in `src/routes/`)
- **Vite 7** for dev/build, **Tailwind CSS v4** for styling, **[shadcn/ui](https://ui.shadcn.com/)** (Radix primitives) for the one interactive component currently in use (the FAQ accordion)
- **[Framer Motion](https://motion.dev/)** for scroll reveals, parallax and the animated heritage timeline
- **[Bun](https://bun.sh/)** as the package manager and script runner
- Deployed as a **Cloudflare Worker** via `@cloudflare/vite-plugin` (`wrangler.jsonc`)

There is **no database and no user accounts** — the entire site is content-driven from a
single static config module (see below). The only client-side gate is the 18+ age
confirmation modal.

## Getting started

```bash
bun install
bun run dev        # http://localhost:3000, hot-reloading
```

Other scripts:

```bash
bun run build        # production build (vite build)
bun run build:dev    # a development-mode build
bun run lint         # eslint .
bun run format       # prettier --write .
```

Type-check separately with `npx tsc --noEmit` — `bun run build` does not run the
TypeScript compiler, so a type error can otherwise ship silently.

**`bun run preview` does not work for this project.** It's wired to the generic
`vite preview`, which expects a Node server entry at `dist/server/server.js`; this
project's Cloudflare Worker build actually outputs `dist/server/index.js`, so `preview`
fails with `ERR_MODULE_NOT_FOUND`. Since `@cloudflare/vite-plugin` already runs `bun run
dev` through the real Workers runtime, `bun run dev` is the accurate way to exercise SSR
behaviour locally — there isn't currently a working separate "preview the production
build" step for this repo.

### Prerequisites

- [Bun](https://bun.sh/) (the project is developed and tested against it; there is a
  `bun.lock`, no `package-lock.json`)
- Node.js is not required to run the app, but some tooling (`npx`) is used ad hoc during
  development

## Deploying

The app builds to a Cloudflare Worker (`main: src/server.ts` in `wrangler.jsonc`), but
**there is no `deploy` script in `package.json` and no CI wired up in this repo** —
deployment currently means running `wrangler deploy` directly once the build is done.
`wrangler.jsonc`'s `name` field ("tanstack-start-app") is a leftover from the project
scaffold; it determines the deployed Worker's identity and `*.workers.dev` subdomain, so
change it deliberately (and only once) rather than as a routine cleanup — renaming it
after a real deployment exists will create a new Worker rather than update the existing
one.

## Content — the single source of truth

**Everything editorial lives in [`src/config/site.ts`](src/config/site.ts):** brand copy,
compliance details, all five venues (addresses, phone numbers, hours, facilities,
placeholder team/photos), the games library, promotions, the heritage timeline, B2B
partnerships copy, and sample testimonials. To update venue details, add a promotion, or
change any copy that appears in more than one place, edit that file — don't hardcode
content directly into a route or component.

Fields marked `[CLIENT TO CONFIRM ...]` are known placeholders awaiting real data from
the client (the licence number, the flagship venue's phone number, social media URLs,
the production domain, and the sample testimonials). Search for that string before a
real launch.

Shared per-venue display logic (phone-number rendering, the Chester street-name label,
opening-hours status) lives in `src/lib/venue.ts` and `src/lib/hours.ts` — use those
rather than reimplementing venue-formatting logic in a route or component.

## Known limitations

These are deliberate, documented trade-offs, not bugs:

- **The contact form doesn't submit to a server.** There is no backend to receive it, so
  on submit it builds a pre-filled `mailto:` link and hands off to the visitor's own
  email client — the UI is explicit about this. A real submission pipeline (a Worker
  route + a transactional email provider) needs a chosen provider and credentials this
  repo doesn't have.
- **The 18+ age gate is client-side only** (a `localStorage` flag), which is standard
  practice for this type of consumer marketing site — it's a compliance/UX affordance,
  not an access-control mechanism, since there's no sensitive functionality behind it to
  protect.
- Opening-hours "Open now" status is computed in `Europe/London` time regardless of
  where the page is rendered or viewed from, since every venue is physically in the UK.

## Auditing this repo

`SITE_MAP.md`, `AUDIT_REPORT.md`, and `ACTION_PLAN.md` at the repo root are the output
of a full platform audit (routes, data layer, accessibility, performance, dead code,
docs). They're a useful map of the codebase's known issues and a record of what's been
fixed — read `ACTION_PLAN.md` for the current state of outstanding items.
