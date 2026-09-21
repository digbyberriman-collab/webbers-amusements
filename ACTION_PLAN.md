# ACTION_PLAN.md — Webbers Amusements

Sequenced by dependency first, severity second. Status reflects the actual Phase 5 execution — see `AUDIT_REPORT.md` for finding detail and git log for the commit implementing each item.

## P0 — Blocking / Critical — ALL DONE

- [x] Fix venue data: added `photos`/`team`/`facilities` to chester-frodsham, chester-northgate, walkden; replaced `as Venue[]` with `satisfies Venue[]`. Verified all 5 venue pages return 200 with real content. (`7c244fe`)
- [x] Fix AgeGate + mobile nav overlay: real focus trap, `inert` on background, focus-on-open, mobile overlay itself `inert` while closed. (`48865a8`)
- [x] Contact form / FAQ honesty: replaced the fake "message received" confirmation with an honest `mailto:` handoff + real `zod`/`react-hook-form` validation. A full server-side delivery pipeline is **deferred** — it needs the client/user to choose an email provider and supply credentials this pass doesn't have. (`7b09856`)

## P1 — High priority — ALL DONE

- [x] `Europe/London`-aware `todaysHours()`; hydration guard applied consistently in `WhatsOn`, `FinalCta`, `venues.$slug.tsx`. (`927241b`)
- [x] Guarded the flagship's placeholder phone number everywhere it's used (5 files) — real fallback UI, no broken `tel:` links, no placeholder strings in JSON-LD. (`4114d7e`)
- [x] Compressed the two oversized images — they were mislabeled PNGs, not JPEGs; re-encoded, ~92% smaller, no quality loss. (`86444ec`)
- [x] `PageHero` width/height/fetchPriority (confirmed dormant — no route currently passes it an image) + venue-detail hero `fetchPriority`. (`0f74a09`)
- [x] Removed 45 unused shadcn/ui components (kept `accordion.tsx`) and 34 backing npm packages, plus `date-fns`. `react-hook-form`/`@hookform/resolvers`/`zod` kept — now genuinely used by the contact form. Renamed `package.json`'s leftover scaffold name. (`95253d2`)

## P2 — Medium priority

- [x] Extracted shared `chesterStreetLabel()` into `src/lib/venue.ts`; replaced all 6 duplicated implementations across 5 files. (`58bcac8`)
- [x] Absolute `BASE_URL` in `sitemap[.]xml.ts`, sourced from a new `siteConfig.brand.url` (flagged `[CLIENT TO CONFIRM]` — no production domain is wired up in `wrangler.jsonc` yet). (`d304f9d`)
- [x] Added `README.md` (setup/run/build/lint, deploy notes, content source of truth, known limitations). Discovered and logged a new finding in the process: `bun run preview` is broken for this Cloudflare Worker setup. (`5a2ee6f`)
- [x] `site.ts` header/field comments corrected once venue data was fixed (folded into `7c244fe`).
- [ ] **Deferred**: share one `id`-keyed game image map between `AttractionsShowcase` and `games.tsx` (3 of 6 games currently show different, sometimes mismatched photos between Home and the Games page).
- [ ] **Deferred**: pass B2B intent from `PartnershipSection` into `/contact` via search params so the Subject field is pre-labelled.
- [ ] **Deferred**: `games.tsx` category filter uses `role="tablist"/"tab"` without the full ARIA tabs keyboard/panel pattern — needs either the full pattern or dropping the roles for a plain button group.
- [ ] **Deferred**: `EMERGENT_PROMPT.md` still describes the pre-fix venue data spec — should be refreshed or marked as a historical build prompt now that `site.ts` has changed.
- [ ] **Deferred**: fix `bun run preview` (new finding, logged in `AUDIT_REPORT.md`) — either point it at the correct Wrangler-based preview path or remove the script.

## P3 — Low / polish

- [x] Footer social icons `size-10` → `size-11` for touch-target consistency. (`921028b`)
- [x] Partnerships section email → working `mailto:` link. (`921028b`)
- [x] `.monogram-seal` contrast fixed (cream-on-terracotta → ink-on-terracotta). (`921028b`)
- [x] `venues.find(v => v.primary)` used instead of positional `venues[0]` in `FinalCta`, `contact.tsx`, `index.tsx`'s JSON-LD (folded into `7b09856`/`927241b`).
- [x] Contact form submit-button disabled/pending state (folded into `7b09856`).
- [x] "Send another message" reset action (folded into `7b09856`).
- [x] `package.json` `name` field renamed (folded into `95253d2`).
- [ ] **Deferred**: promote "Contact" into the always-visible desktop nav bar (currently behind the "Menu" overlay alongside FAQ).
- [ ] **Deferred**: Footer's Instagram/Facebook icons are still dead `href="#"` links (distinct from the deliberately-labelled `[CLIENT TO CONFIRM]` text placeholders) — needs real URLs or should be hidden until they exist.

## Deferred / out of scope this pass (unchanged from Phase 4)

- Full server-side contact-form delivery pipeline — needs the user to choose a provider and supply credentials.
- Real client data for all `[CLIENT TO CONFIRM]` fields (licence number, testimonials, social URLs, production domain).
- `manualChunks` naming for the Rollup shared-chunk build-output confusion — cosmetic to the build only.
- SSR bundle-size monitoring (719KB) — no action needed now.
- AgeGate decline-screen persistence/consistency tweak — low value.
- Draft/unsaved-input protection on the contact form — nice-to-have.
