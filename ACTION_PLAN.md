# ACTION_PLAN.md — Webbers Amusements

Sequenced by dependency first, severity second. Mirrored live in the task list (TaskCreate/TaskUpdate).

## P0 — Blocking / Critical

- [ ] Fix venue data: add `photos`/`team`/`facilities` to chester-frodsham, chester-northgate, walkden; replace `as Venue[]` with `satisfies Venue[]`; add defensive optional chaining in `venues.$slug.tsx` — [AUDIT_REPORT.md § DATA/VENUES]
- [ ] Fix AgeGate + mobile nav overlay: real focus trap, `inert` on background, focus-on-open — [AUDIT_REPORT.md § ACCESSIBILITY]
- [ ] Contact form / FAQ honesty: stop over-promising delivery given no backend exists; add a `mailto:` fallback so the message isn't purely discarded — [AUDIT_REPORT.md § FORMS/WORKFLOW]
  - **Needs a decision, flagged to user before executing**: a full server-side delivery pipeline (Cloudflare Worker route + email API) requires choosing and configuring a third-party email service (e.g. Resend/SendGrid) and API credentials the user hasn't provided. That's out of scope to build blind. The safe P0 fix within this pass is: honest copy (no false delivery/reply-SLA claim) + a `mailto:` fallback link so a message isn't purely lost. Full backend wiring is logged as a deferred item requiring the user's input.

## P1 — High priority

- [ ] Add real `Europe/London`-aware time computation to `todaysHours()`; apply the existing `useHydrated()` guard consistently in `WhatsOn`, `FinalCta`, `venues.$slug.tsx`
- [ ] Guard the flagship venue's placeholder phone number so it can't render a broken `tel:` link or ship into JSON-LD as-is
- [ ] Compress the two oversized images (`webbers-dodgems-rhyl.jpg`, `arthur-webber-senior.jpg`) via `sharp-cli` to their rendered dimensions
- [ ] Add explicit `width`/`height` + `fetchPriority="high"` to `PageHero.tsx`'s background image
- [ ] Remove the 46 unused shadcn/ui components and their 8 backing packages (keep `accordion.tsx`)
- [ ] Remove `date-fns`; wire `zod` + `react-hook-form` into the contact form for real field validation (kills two findings: unused deps + native-only validation)

## P2 — Medium priority

- [ ] Extract one shared `chesterStreetLabel()` helper into `src/lib/`; replace all 5-7 duplicated implementations
- [ ] Share one `id`-keyed game image map between `AttractionsShowcase` and `games.tsx`
- [ ] Add "Send another message" reset action to the contact form's success state
- [ ] Pass B2B intent from `PartnershipSection` into `/contact` via search params; pre-fill/label Subject
- [ ] Fix `games.tsx` category filter: drop `role="tablist"/"tab"` for a plain `role="group"` of `aria-pressed` toggle buttons
- [ ] Set a real absolute `BASE_URL` in `sitemap[.]xml.ts`
- [ ] Add a README.md (setup/run/build/lint/deploy, content source of truth, known limitations)
- [ ] Update `site.ts` header/field comments once venue data is fixed; note EMERGENT_PROMPT.md drift

## P3 — Low / polish

- [ ] Footer social icons: `size-10` → `size-11`; render as inert (non-dead-click) until real URLs exist
- [ ] Promote "Contact" into the always-visible desktop nav bar
- [ ] Use `venues.find(v => v.primary)` instead of positional `venues[0]` in `FinalCta`, `contact.tsx`, homepage JSON-LD
- [ ] Add submit-button disabled/pending state to the contact form
- [ ] Fix `.monogram-seal`'s text/background contrast pairing (currently unused, but cheap to fix now)
- [ ] Rename `package.json` `"name"` from `"tanstack_start_ts"` to `"webbers-amusements"`
- [ ] Add `mailto:` link to the Partnerships section email
- [ ] Add `fetchPriority="high"` to `venues.$slug.tsx`'s hero image

## Deferred / out of scope this pass

- [ ] Full server-side contact-form delivery pipeline (email API integration) — needs the user to choose a provider and supply credentials
- [ ] Real client data for `[CLIENT TO CONFIRM]` fields (licence number, flagship phone, testimonials, social URLs) — needs the client, not an engineering fix
- [ ] `manualChunks` naming for the Rollup shared-chunk build-output confusion — cosmetic to the build, no functional impact; not worth the risk of touching working build config in this pass
- [ ] SSR bundle-size monitoring (719KB) — no action needed now, noted for future watch
- [ ] AgeGate decline-screen persistence/consistency tweak — low value, deferred behind the P0 focus-trap fix on the same file
- [ ] Draft/unsaved-input protection on the contact form — nice-to-have, not required for a short form
