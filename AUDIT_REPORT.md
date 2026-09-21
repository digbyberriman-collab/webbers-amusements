# AUDIT_REPORT.md — Webbers Amusements

Phase 3 output: findings from all 9 sub-agents, deduplicated and cross-verified by the orchestrator. Where multiple agents converged on the same issue, they're merged into one entry and the "Found by" line lists every agent that independently flagged it. The orchestrator independently re-verified every Critical finding against the live source before including it here.

Severity definitions: **Critical** (broken functionality/security hole/blocks a core workflow) · **High** (significant failure, workaround exists but painful) · **Medium** (noticeable, doesn't block core function) · **Low** (minor/edge case) · **Cosmetic** (visual polish only).

---

## CRITICAL

### DATA/VENUES — Three of five venue detail pages crash on render
Severity: Critical
Location: `src/config/site.ts` (chester-frodsham, chester-northgate, walkden entries); `src/routes/venues.$slug.tsx:199,297,344`
Found by: data-api, workflow-logic, ui-ux-audit, docs-consistency — **orchestrator-verified**

Description:
The `Venue` interface requires `photos`, `team`, and `facilities` (non-optional). Only `caernarfon` and `rhyl` define them; `chester-frodsham` (the flagship, `primary: true`), `chester-northgate`, and `walkden` omit all three. The array is force-cast with `as Venue[]` (line 311), which suppresses TypeScript's missing-field check. `venues.$slug.tsx` reads `venue.photos.hero` (line 199), `venue.photos.gallery.map(...)` (line 297), and `venue.team.map(...)` (line 344) with no guard — unlike `venue.facilities?.includes(...)` (lines 102, 164), which correctly uses optional chaining.

Impact:
Visiting `/venues/chester-frodsham`, `/venues/chester-northgate`, or `/venues/walkden` throws `Cannot read properties of undefined (reading 'hero')` and drops the visitor onto the generic error page — reachable from the homepage hero CTA, the venues grid, and internal cross-links. This is 60% of venues, including the flagship.

Suggested fix:
Add `photos: placeholderPhotos`, `team: placeholderTeam`, and a real `facilities` array to the three affected venues (mirroring caernarfon/rhyl). Replace `as Venue[]` with `satisfies Venue[]` so this class of bug fails the build going forward. Add defensive optional chaining in `venues.$slug.tsx` as defence-in-depth.

### FORMS/WORKFLOW — Contact form and FAQ falsely claim messages are delivered
Severity: Critical
Location: `src/routes/contact.tsx:161-178`; `src/routes/faq.tsx:142`
Found by: forms-validation, workflow-logic, ui-ux-audit, docs-consistency, data-api, auth-security

Description:
The form's `onSubmit` only calls `e.preventDefault()` and `setSent(true)` — no network call, no email, nothing persisted anywhere. Yet the success screen says "Message received... someone from the Webbers team will come back to you within a couple of working days," and the FAQ page states outright that the message form "goes to a real person." `react-hook-form`, `@hookform/resolvers`, and `zod` are installed but unused here.

Impact:
Every enquiry — including B2B partnership enquiries routed here from `PartnershipSection` — is silently discarded while the visitor is told it was received. This is the site's only enquiry channel besides phone, and it doesn't work. The FAQ compounds this with an explicit false statement of fact.

Suggested fix:
Wire the form to a real submission path (Cloudflare Worker route/server function emailing `siteConfig.contact.email`, or a form-backend service) with server-side validation using the already-installed `zod` schema. Until that exists, change the success copy and FAQ answer to not promise delivery/reply SLA.

### ACCESSIBILITY — Neither the AgeGate modal nor the mobile nav overlay trap keyboard focus
Severity: Critical
Location: `src/components/layout/AgeGate.tsx`; `src/components/layout/Header.tsx` (`#main-menu-overlay`); `src/components/layout/SiteShell.tsx`
Found by: accessibility, forms-validation, ui-ux-audit

Description:
Both overlays declare `role="dialog" aria-modal="true"` but neither implements an actual focus trap, and neither `Header`/`main` (behind AgeGate) nor the header/main (behind the mobile menu) are made `inert`/`aria-hidden` while the overlay is open. Neither moves focus into the dialog on open or restores it on close.

Impact:
A keyboard-only user can Tab straight from the AgeGate's buttons into the Header nav and site content, bypassing the 18+ confirmation while it's still visually covering the screen. The same applies to the mobile menu — a keyboard/screen-reader user can reach page content that's supposed to be hidden behind the open overlay. This breaks the WAI-ARIA modal dialog contract (WCAG 2.4.3).

Suggested fix:
Implement a real focus trap on both dialogs (manual Tab/Shift+Tab cycling or a small trap utility), apply `inert` to sibling content while each is open, move focus onto the dialog on open, and restore it on close.

---

## HIGH

### DATA — `as Venue[]` cast defeats required-field type checking
Severity: High
Location: `src/config/site.ts:311`
Found by: data-api, ui-ux-audit, docs-consistency

Description: A type assertion, not an annotation — TypeScript doesn't flag missing required fields on individual array elements, which is exactly how the venue-crash bug above shipped undetected.

Suggested fix: Replace with `satisfies Venue[]` (preserves literal `slug`/`signage` narrowing while enforcing every field).

### DATA — "Open now" status is timezone-unsafe and inconsistently hydration-guarded
Severity: High
Location: `src/lib/hours.ts`; `src/components/home/WhatsOn.tsx`, `FinalCta.tsx`; `src/routes/venues.$slug.tsx`; (contrast: `src/routes/venues.tsx` does guard it)
Found by: data-api, ui-ux-audit

Description: `todaysHours()` uses the rendering server's local clock (Cloudflare Workers run UTC) with no `Europe/London` conversion. During BST (most of the year) this is an hour off. Only `venues.tsx` wraps the resulting badge in a hydration guard (`useHydrated()`); `WhatsOn`, `FinalCta`, and `venues.$slug.tsx` don't, risking a hydration mismatch near hour boundaries.

Suggested fix: Compute against explicit `Europe/London` time via `Intl.DateTimeFormat`. Apply the same hydration guard used in `venues.tsx` everywhere `hours.isOpen` renders.

### DATA — Flagship venue phone is a literal unfilled placeholder that breaks its `tel:` link
Severity: High
Location: `src/config/site.ts:211`
Found by: data-api

Description: `chester-frodsham.phone = "01244 [CLIENT TO CONFIRM]"` is rendered as real UI text and built into `tel:01244[CLIENT...` links and the homepage's JSON-LD `telephone` field — a non-dialable link on the flagship's most prominent CTA.

Suggested fix: Flag to the client as a pre-launch blocker distinct from cosmetic placeholders (it breaks functionality); exclude the phone CTA/JSON-LD field from rendering until confirmed, or fill with a real interim number.

### PERFORMANCE — Two source images are 4–10x larger than needed, no build-time optimization
Severity: High
Location: `src/assets/webbers-dodgems-rhyl.jpg` (1.20MB), `src/assets/arthur-webber-senior.jpg` (0.86MB)
Found by: performance

Description: No image-optimization plugin exists in the Vite pipeline; both ship byte-for-byte at far larger than their rendered dimensions (900–2000px).

Suggested fix: Re-encode both at rendered size (JPEG q75-80 or WebP/AVIF) before commit; longer-term add `vite-imagetools` or similar to the pipeline.

### PERFORMANCE — `PageHero.tsx` missing `width`/`height` on its background image (7 of 9 routes)
Severity: High
Location: `src/components/PageHero.tsx`
Found by: performance

Description: The shared banner used on about/contact/faq/games/promotions/safer-gambling/venues sets `loading="eager"` correctly but no intrinsic dimensions and no `fetchPriority="high"`, despite being the LCP element on every page that uses it — a real CLS risk across most of the site.

Suggested fix: Add explicit `width`/`height` and `fetchPriority="high"`, matching `Hero.tsx`'s treatment.

### DEAD-CODE — 46 of 47 shadcn/ui components are unused, dragging 8 dependent packages
Severity: High
Location: `src/components/ui/*` (all except `accordion.tsx`); `package.json` (recharts, react-day-picker, embla-carousel-react, vaul, cmdk, input-otp, react-resizable-panels, react-hook-form)
Found by: dead-code-cleanup, performance (confirmed correctly tree-shaken from the shipped bundle today, but a maintenance/audit trap and one careless import away from real bundle bloat)

Suggested fix: Delete the 46 unused component files and their 8 backing packages once confirmed genuinely unneeded; keep `accordion.tsx` (used by `faq.tsx`).

### DEAD-CODE — `date-fns`, `zod`, `@hookform/resolvers` fully unused
Severity: High
Location: `package.json`
Found by: dead-code-cleanup

Suggested fix: Remove, or wire `zod`+`@hookform/resolvers` into the contact form fix above (preferred, kills two findings at once) and only remove `date-fns`.

---

## MEDIUM

### CROSS-CUTTING — Chester street-suffix formatting reimplemented 5–7 times with 3 inconsistent output formats
Severity: Medium
Location: `WhatsOn.tsx` (`chesterSuffix`), `contact.tsx` (`chesterStreet`), `venues.tsx` (×2), `venues.$slug.tsx` (×2), `Footer.tsx` (fragile split-on-space)
Found by: dead-code-cleanup, ui-ux-audit, data-api

Description: Same venue is called "Frodsham Street" in some places, "Frodsham St" in others, and bare "Frodsham" in the Footer (whose logic would silently break on any address format change).

Suggested fix: One shared `chesterStreetLabel(venue, { abbreviated? })` helper in `src/lib/`, used everywhere.

### UI/UX — Same games shown with different, sometimes mismatched photography on Home vs Games page
Severity: Medium
Location: `src/components/home/AttractionsShowcase.tsx` (index-based image map); `src/routes/games.tsx` (id-based image map)
Found by: ui-ux-audit

Description: 3 of 6 games use different photos between the two pages; one (a Cash Collect slot) shows a roulette-wheel photo on Home.

Suggested fix: Share one `id`-keyed image map between both components.

### FORMS/WORKFLOW — No way to send a second message without navigating away and back
Severity: Medium
Location: `src/routes/contact.tsx:168-178`
Found by: forms-validation, workflow-logic

Suggested fix: Add a "Send another message" action that resets `sent` and clears the form.

### WORKFLOW — B2B partnership CTA carries no context into the generic contact form
Severity: Medium
Location: `src/components/home/PartnershipSection.tsx:30-36`; `src/routes/contact.tsx`
Found by: workflow-logic

Suggested fix: Pass intent via router search params and pre-fill/label the Subject field on arrival.

### ACCESSIBILITY — Games-page category filter uses `role="tablist"`/`"tab"` without the required tab keyboard/panel pattern
Severity: Medium
Location: `src/routes/games.tsx` (~lines 144-168)
Found by: accessibility

Suggested fix: Either implement the full ARIA tabs pattern, or (simpler, appropriate here) drop the tab roles for a plain `role="group"` of toggle buttons with `aria-pressed`.

### DATA/SEO — `sitemap.xml` emits relative, non-absolute `<loc>` URLs
Severity: Medium
Location: `src/routes/sitemap[.]xml.ts:5`
Found by: data-api, ui-ux-audit

Suggested fix: Set `BASE_URL` to the real production origin.

### DOCS — No README at repo root
Severity: Medium
Location: repo root
Found by: docs-consistency

Suggested fix: Add setup/run/build/lint/deploy instructions and point to `src/config/site.ts` as the content source of truth; document the two known gaps (contact form, age-gate) as "known limitations," not bugs.

### DOCS — `site.ts` header/field comments overstate data coverage given the venue bug above
Severity: Medium
Location: `src/config/site.ts:1-2, 40-43, 103-104`
Found by: docs-consistency

Suggested fix: Fix alongside the venue-data fix; update comments to reflect the true state once all 5 venues carry the same fields.

### DOCS — `EMERGENT_PROMPT.md` has drifted from current `src/config/site.ts`
Severity: Medium
Location: `EMERGENT_PROMPT.md:75`
Found by: docs-consistency

Suggested fix: Update once venue data is fixed, or add a note marking it a historical build prompt rather than a live spec.

### PERFORMANCE — Build produces a misleadingly-named shared chunk (`webbers-dodgems-rhyl-*.js`, ~132-296KB) that is Framer Motion + shared components, not an inlined image
Severity: Medium
Location: build output (Rollup automatic chunk naming)
Found by: performance

Description: Confirmed via direct inspection — zero base64 image data in the chunk; it's legitimate shared code, arbitrarily named after one of the modules it bundles. Not a real regression, but wastes investigation time.

Suggested fix: Add explicit `manualChunks` in `vite.config.ts` to name shared vendor/motion chunks predictably.

### PERFORMANCE — 719KB SSR server bundle, worth monitoring
Severity: Medium
Location: `dist/server/assets/server-*.js`
Found by: performance

Suggested fix: Not urgent; re-check after significant dependency growth.

---

## LOW

- **Footer social icons are 40×40px**, under the site's own 44px convention used elsewhere (accessibility)
- **Footer social links (`href="#"`) are dead clicks**, not just labelled placeholders like other `[CLIENT TO CONFIRM]` fields (ui-ux-audit)
- **Desktop nav hides FAQ and Contact** behind the "Menu" overlay (`nav.slice(0, 6)`) despite Contact being the primary conversion path (ui-ux-audit)
- **Flagship venue selected positionally** (`venues[0]`) in `FinalCta.tsx`, `contact.tsx`, and homepage JSON-LD instead of via the `primary` flag — works today only by coincidence of array order (ui-ux-audit)
- **No submit-button disabled/loading state** on the contact form — harmless today, will cause duplicate submissions once real submission is wired up (forms-validation)
- **No draft/unsaved-input protection** on the contact form's message field (forms-validation)
- **`.monogram-seal` CSS class** (unused) would fail 4.5:1 text contrast if ever activated (accessibility)
- **AgeGate decline screen resets on refresh** — inconsistent tone (presents as a hard wall, isn't one) but not a functional dead end (workflow-logic)
- **`venues.$slug.tsx` hero image** missing explicit `fetchPriority="high"` for consistency (performance, cosmetic-leaning)

## COSMETIC

- `package.json` `"name": "tanstack_start_ts"` — leftover scaffold value (dead-code-cleanup)
- Partnerships section email shown as plain text, not a `mailto:` link, inconsistent with the Contact page (ui-ux-audit)
- Various `[CLIENT TO CONFIRM]` placeholders (licence number, team names, testimonial names) — already deliberately flagged in-code, tracked as known pre-launch content gaps, not bugs

## CONFIRMED CLEAN (no finding — listed for completeness)

- No secrets/credentials/API keys anywhere in the repo (auth-security)
- No hidden/broken auth, session, or route-guard code (auth-security) — architecture has none, correctly
- No injection/XSS risk in the contact form's current (non-functional) handler (auth-security)
- No orphaned routes — every route is reachable from Header or Footer (dead-code-cleanup)
- No commented-out dead code blocks, no `console.log`/`debugger` statements (dead-code-cleanup)
- Colour contrast across the dark theme is strong throughout, including small `text-muted-foreground` labels (accessibility)
- `:focus-visible` is global and never removed without replacement (accessibility)
- Reduced motion is genuinely and correctly implemented (`MotionConfig` + explicit `useReducedMotion()` fallbacks where needed) (accessibility)
- Heading hierarchy, landmarks, and image alt text are all correct site-wide (accessibility)
- `AttractionsShowcase` carousel avoids React state for scroll position — cheap, correct pattern (performance)
- No N+1 or repeated-computation pattern in `todaysHours()` call sites (performance)
- No `.env`/env vars anywhere, correctly requiring no `.env.example` (docs-consistency)
- `styles.css` design-system header comment accurately reflects the actual token values (docs-consistency)
- Promotions copy correctly avoids implying unbuilt online actions (workflow-logic)
