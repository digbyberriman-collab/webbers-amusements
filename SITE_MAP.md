# SITE_MAP.md — Webbers Amusements

Phase 1 discovery output. Read-only ground-truth map, built before the audit checklist runs.

## Platform config (Section 0)

```
PLATFORM_NAME:        Webbers Amusements
REPO_PATH:             /home/user/webbers-amusements (digbyberriman-collab/webbers-amusements, branch claude/install-ui-ux-pro-max-L7elj)
TECH_STACK:            React 19 + TypeScript + TanStack Start (SSR) + TanStack Router (file-based) + Vite 7 + Tailwind v4 + shadcn/ui (Radix) + Framer Motion 12, deployed on Cloudflare (@cloudflare/vite-plugin, wrangler.jsonc)
AUTH_MODEL:            None. No user accounts, no login, no sessions, no database. The only gate is a client-side 18+ AgeGate (localStorage flag, no server enforcement).
DESIGN_SYSTEM:         Defined — "evening lounge" dark system in src/styles.css (ink/brass/terracotta OKLCH tokens, Fraunces/Inter/JetBrains Mono, editorial motion rules)
PRIMARY_USER_ROLES:    None (public marketing site, single anonymous visitor role). Content is entirely public; the only binary gate is self-declared age (18+).
KNOWN_PAIN_POINTS:     Contact form has no backend (client-only setSent(true), nothing is actually sent/stored); several source images are very large (900KB-1.2MB); pre-existing lint/prettier debt in src/routes/venues.tsx and src/server.ts (unrelated to recent redesign work)
OUT_OF_SCOPE:          Adding a real backend/CMS/database; adding real user accounts; replacing placeholder content ([CLIENT TO CONFIRM] fields, sample testimonials) with real client data
```

## Route inventory

| Route | File | Notes |
|---|---|---|
| `/` | `routes/index.tsx` | Home — 12 composed sections |
| `/about` | `routes/about.tsx` | Heritage/timeline |
| `/venues` | `routes/venues.tsx` | Venue grid |
| `/venues/:slug` | `routes/venues.$slug.tsx` | Venue detail |
| `/games` | `routes/games.tsx` | Gaming floor |
| `/promotions` | `routes/promotions.tsx` | What's on |
| `/safer-gambling` | `routes/safer-gambling.tsx` | Compliance |
| `/faq` | `routes/faq.tsx` | FAQ |
| `/contact` | `routes/contact.tsx` | Contact form + venue list |
| `/sitemap.xml` | `routes/sitemap[.]xml.ts` | Generated sitemap |
| `__root.tsx` | root shell, head defaults, 404/error boundaries | |

No orphaned routes found — `Header.tsx` nav and `Footer.tsx` links cover all of the above.

## Component tree (non-shadcn)

- `components/layout/`: `SiteShell`, `Header`, `Footer`, `AgeGate`, `SaferGamblingStrip`
- `components/home/`: `Hero`, `TrustStrip`, `HeritageTimeline`, `CinematicBreak`, `AttractionsShowcase`, `PartnersStrip`, `ExperienceSection`, `PartnershipSection`, `WhatsOn`, `Gallery`, `Testimonials`, `FinalCta`
- `components/motion/`: `Reveal`, `Parallax`, `Counter`
- `components/`: `Logo`, `PageHero`
- `components/ui/`: full shadcn/ui set (many components — e.g. `calendar`, `carousel`, `chart`, `command`, `sidebar` — appear unused by current pages; candidate for dead-code-cleanup pass)

## Data layer

No database. Single source of truth: `src/config/site.ts` (brand, compliance, contact, partners, trustMarks, facilities, venues[5], games[6], promotions[3], timeline[7], partnerships, testimonials[3]). `src/lib/hours.ts` computes live open/closed status from `Venue.hours`.

## API / server surface

- `src/server.ts` (80 lines) — TanStack Start server entry, Cloudflare adapter glue. No custom API routes.
- `src/start.ts` (22 lines) — start config.
- `routes/sitemap[.]xml.ts` — the only "API-like" route, generates XML from `siteConfig`.
- Contact form (`routes/contact.tsx`) — client-only `onSubmit` calls `e.preventDefault()` and `setSent(true)`; **no network call, nothing is persisted or emailed**. This is the most significant functional gap on the site.

## Environment variables

No `.env` / `.env.example` present. No environment variables referenced in source. Cloudflare config lives in `wrangler.jsonc`.

## Dependencies

Full list in `package.json`. Notably: `framer-motion`, `embla-carousel-react`, `recharts`, `react-hook-form` + `@hookform/resolvers` + `zod` (form stack present but **not used** by the actual contact form, which is a plain uncontrolled `<form>`), `vaul`, `cmdk`, `react-resizable-panels` — several of these back shadcn components that may not be rendered anywhere (see dead-code-cleanup).

## Role matrix

Not applicable — no roles. The only "permission boundary" is the self-declared age gate, which is UX/compliance messaging, not a security control (there is nothing behind it to protect).

---
*This phase is read-only, per protocol. No fixes applied yet.*
