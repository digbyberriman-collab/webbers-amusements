# Emergent.sh Build Prompt — Webbers Amusements

> Copy everything inside the horizontal rules below into Emergent.sh as your build prompt.
> It contains the full brief, the design system, and **all** the real site data.

---

## BUILD: "Webbers Amusements" — an immersive, scroll-led heritage website for a UK adult gaming business

Build a polished, multi-page, **server-rendered marketing website** for **Webbers Amusements**, a family-run, fully-licensed UK **Adult Gaming Centre (AGC)** operator. The site must feel cinematic and scroll-led — large imagery, parallax, a scroll-driven heritage timeline, animated counters, tasteful motion — while staying credible and compliant.

### ⚠️ Critical context — read first (this drives all copy)
- This is a **regulated 18+ gambling business** (slot machines / electronic roulette). It is **NOT** a children's fairground or family day-out attraction.
- "Family" means the **Webber family who have run the business for three generations since 1954** — never "bring the kids".
- **Legally required, must be included:** an 18+ age gate on first visit; a persistent "safer gambling" strip; BeGambleAware / GamCare helpline `0808 8020 133`; "Strictly 18+", "Think 25" ID policy, and "Maximum slot prize £500" messaging.
- Tone: human, warm, confident, family-run, British, commercially sharp. **Avoid** "Welcome to", "In today's world", "We pride ourselves", "your one-stop shop", "creating unforgettable memories".

### Tech & architecture
- **React + TypeScript + Vite + Tailwind CSS + Framer Motion.** (A small Node/FastAPI backend + DB is optional, only for the contact form; otherwise the site is content-driven and static.)
- Put **all content below into a single typed `siteConfig` data module** (one source of truth) and render every page from it.
- File-based routing with these routes: `/` (home), `/about`, `/venues`, `/venues/:slug`, `/games`, `/promotions`, `/safer-gambling`, `/faq`, `/contact`, plus `robots.txt` and a generated `sitemap.xml`.
- SEO: per-page `<title>`/meta/OpenGraph, and JSON-LD `LocalBusiness` / `Organization` with all venue addresses.
- Mobile-first and fully responsive; strong Lighthouse performance; semantic HTML; WCAG AA; lazy-loaded images with width/height; **respect `prefers-reduced-motion`** (disable transforms/parallax, keep gentle opacity).

### Design system ("evening lounge" — premium, not neon)
- **Background:** deep almost-black navy ("ink"). **Foreground:** warm cream (never pure white).
- **Accent metals:** champagne brass (primary, used like jewellery, sparingly) + antique brass (deep). **Heritage accent:** terracotta. **Status:** muted sage for "open now".
- Approx tokens (OKLCH): ink `oklch(0.17 0.018 235)`, cream `oklch(0.94 0.012 85)`, surface `oklch(0.22 0.022 235)`, brass `oklch(0.78 0.085 78)`, brass-deep `oklch(0.62 0.09 70)`, terracotta `oklch(0.6 0.13 36)`, sage `oklch(0.65 0.045 165)`.
- **Type:** display serif **Fraunces**; sans **Inter**; mono **JetBrains Mono** (used for small-caps "eyebrow" labels with wide letter-spacing).
- **Rules:** no neon, no flashing bulbs, no rainbow borders. Motion is slow and editorial (rise/fade, ~0.6–0.9s, ease `cubic-bezier(0.22,1,0.36,1)`). Subtle film-grain overlay. Rounded-2xl cards with hairline borders; cards lift gently on hover.

### Global layout
- **Age gate** (modal on first visit, stored in localStorage): "Are you 18 or over?" with Yes / "No, I'm under 18". The decline state shows BeGambleAware + GamCare `0808 8020 133`.
- **Header:** fixed, transparent→glass on scroll. Logo "Webbers / Est. 1954". Nav: Home, Our Story, Venues, Gaming Floor, What's On, Safer Gambling, FAQ, Contact. Primary "Find a venue" button. Full-screen editorial overlay menu on mobile.
- **Footer:** logo + short description, Instagram/Facebook, quick links, venue links, safer-gambling links (BeGambleAware, GamCare, Bacta self-exclusion), a 4-up trust-marks band, full compliance block (licence, helpline, 18+, Think 25, max prize £500, © Webber Leisure).
- **Safer-gambling strip** above the footer on every page.

---

## CONTENT / DATA (use exactly)

### Brand
- Name: **Webbers Amusements** (short: "Webbers"); parent company: **Webber Leisure**
- Founded **1954** by **Arthur Webber Senior** in **Rhyl, North Wales**
- Tagline: *"Premium adult gaming. British heritage. Since 1954."*
- Description: *"A multi-generational family entertainment business — from 1950s seaside arcades to premium adult gaming centres across North Wales, Chester and Greater Manchester. Licensed by the UK Gambling Commission, longstanding Bacta member."*
- Short description: *"Three generations of British entertainment heritage — modern, premium adult gaming, in well-run arcades."*

### Compliance
- Regulator: **UK Gambling Commission**; trade body: **Bacta**; ID policy: **Think 25**; min age **18**; max slot prize **£500**
- Helpline: **0808 8020 133** (free, confidential, 24/7); licence number: `[CLIENT TO CONFIRM]`

### Contact
- Email: `hello@webbersamusements.co.uk` `[CLIENT TO CONFIRM]`; Instagram + Facebook (placeholders)

### Hardware partners (trust marks)
Light & Wonder · Novomatic · Blueprint Gaming · Inspired Gaming

### Trust marks (4)
1. **UK Gambling Commission Licensed** — Fully regulated AGC operator
2. **Bacta Member** — Longstanding trade body member
3. **Think 25 ID Policy** — Strict 18+ entry across every venue
4. **Family Run Since 1954** — Three generations of the Webber family

### Facilities (venues tick the ones they offer)
Free Wi-Fi · Complimentary tea, coffee & soft drinks · Staffed cashier desk · ATM on site · Step-free entrance · Hearing loop available · Webbers Club sign-up in venue · Safer-gambling tools available · Parking nearby · Public transport links

### Venues (5) — opening hours for all: Mon–Sat 09:00–22:00, Sun 10:00–20:00
1. **Webbers Chester · Frodsham Street** (flagship) — signage "Webbers Amusements" — 28A Frodsham Street, Chester, Cheshire, **CH1 3JL** — phone `01244 [CONFIRM]` — *"Our flagship arcade, two minutes from the Eastgate Clock — calm, well-lit, with the full modern floor."*
2. **Webbers Chester · Northgate Street** — signage "Webbers Casino Slots" — 14 Northgate Street, Chester, Cheshire, **CH1 2HA** — **01244 911062** — *"A boutique slots arcade a short walk from the Cathedral Quarter — curated cabinets, quieter pace."*
3. **Webbers Caernarfon** — signage "Webbers Casino Slots" — 2 Pool Street, Caernarfon, Gwynedd, **LL55 2AB** — **01286 672758** — tagline *"In the shadow of the castle walls."* — *"A long-running family fixture in the heart of the old town."*
4. **Webbers Rhyl** — signage "Webbers Casino Slots" — 76 High Street, Rhyl, Denbighshire, **LL18 1UB** — **01745 353251** — tagline *"Where the Webber story started, in 1954."* — *"Still on the High Street, now in its modern form."*
5. **Webbers Walkden** — signage "Webbers Amusements" — 35 Bolton Road, Walkden, Greater Manchester, **M28 3AX** — **0161 222 0282** — *"Our newest arcade — a generous floor on the high street, a few minutes from the M60."*

Each venue page: hero with tagline, address + phone (click-to-call), today's open/closed status + weekly hours table, facilities list with icons, a "get directions" Google Maps link, parking/transport notes, and a placeholder team (Venue Manager, Floor Host, Cashier Lead).

### Games (6) — all "Max prize £500"
1. **Big Cat King Megaways** (Megaways, up to 15,625 ways to win, *featured*) — "Fast-paced Megaways action — rule the reels with the Big Cat King."
2. **Huff n' More Puff** (Reel Ways, *featured*) — "High-energy gameplay with Reel Ways mechanics."
3. **Fortune of Cai Shen** (Cash Collect, 4,096 ways, *featured*) — "Cash Collect feature with a massive 4,096 ways to win."
4. **Double Zero Roulette with Golden Odds** (Roulette, *featured*) — "Classic Double Zero Roulette with Golden Odds. Win up to £500."
5. **Searing Sevens Super Spins** (Classic Reels) — "Timeless fruit-machine action with a fiery modern twist."
6. **Big Catch Bass Fishing Christmas** (Festive Slots, *new*) — "Festive fishing fun with Free Games bonus rounds."

### Promotions (3)
- **The Weekend Welcome** (badge "Ongoing", Sat–Sun) — complimentary tea, coffee and pastries every weekend morning.
- **The Webbers Club** (badge "Members", year-round) — member invites, birthday cards, early access to new cabinets; register at the cashier.
- **New on the Floor** (badge "Just landed", updated monthly) — fresh titles from Light & Wonder, Blueprint and Inspired Gaming.

### Heritage timeline (7 milestones — used in the scroll-driven timeline)
- **1954 — Arthur Webber Senior begins:** founds the family business in Rhyl, manufacturing confectionery supplied to the Woolworths counter and the seaside trade.
- **1960s — Onto the seafront:** the family moves into fairgrounds and seaside arcades along the North Wales coast — penny falls, classic AWP cabinets.
- **1970s — Rides and family entertainment:** expansion into fairground rides and family entertainment centres.
- **1990s — Permanent arcades:** permanent arcades open across North Wales, including the long-standing Rhyl and Caernarfon venues.
- **2000s — Across the border into Chester:** the first Chester venue opens.
- **2010s — Modern Adult Gaming Centres:** the estate modernises into premium, fully-licensed AGCs with the latest cabinets.
- **Today — Three generations on:** five arcades across Chester, North Wales and Greater Manchester. Same family, same standards.

### B2B partnerships section — "Bring a Webbers arcade to your high street"
Intro: *"We're a long-established, fully-licensed operator actively looking for the right units and the right towns. If you manage a high-street property, run a regeneration scheme, or want a dependable name in a leisure space, we'd like to talk."* CTA "Discuss a site or partnership" → /contact. Four pillars:
1. **Landlords & agents** — reliable long-lease tenants; covenant strength; tidy fit-outs.
2. **Councils & regeneration** — a regulated, responsible operator that brings footfall, local jobs and a well-run frontage.
3. **Commercial partners** — long, straight relationships with suppliers, hospitality and local businesses.
4. **New locations** — actively acquiring across the North-West and North Wales.

### Testimonials (illustrative placeholders — label them clearly as samples; include a Google-reviews integration slot)
- "Spotless, calm and the staff actually know you. It's the only place I go — and they always put the kettle on." — Regular, Chester Frodsham St
- "Properly run, friendly and never pushy. You can tell it's a family business that takes pride in the place." — Visitor, Rhyl
- "A dependable, well-managed operator on the high street — exactly the kind of tenant a town centre wants." — Commercial partner

---

## HOME PAGE — 12 immersive sections (in order)
1. **Hero** — full-screen, slow **parallax** background image of a warm low-lit arcade floor; staggered text reveal. Headline: *"Family entertainment, built over generations."* Sub: from 1950s North Wales seaside arcades to five premium adult gaming centres today. CTAs: "Explore the gaming floor" (→/games), "Find your nearest venue" (→/venues), "Our story" (→/about). Animated scroll cue. Credibility line: "Five venues · UK Gambling Commission licensed · Bacta member · 18+".
2. **Trust strip** — the 4 trust marks, revealing in sequence.
3. **Heritage timeline** — scroll-driven vertical timeline; a **brass spine that fills as you scroll**, milestone nodes light up in turn, each card rises in. Renders the 7 milestones above.
4. **Cinematic break** — full-bleed parallax arcade image with an editorial caption ("Arcades designed for the spin.").
5. **Gaming floor showcase** — the 6 games in a **horizontal scroll-snap carousel** (swipe on mobile, arrow buttons on desktop); cards scale/brighten on hover; category + "New" badges; "Max prize £500"; link to /games. Footnote: "Maximum slot prize £500 · Strictly 18+ · Play within your limits".
6. **Partners strip** — the 4 hardware partners.
7. **Experience** — split layout: emotional copy left + **animated count-up counters** (years a family business = current year − 1954; 3 generations; 5 arcades; 4 partners); right = a layered, **parallaxing image collage**.
8. **Partnerships (B2B)** — the section above, CTA → /contact.
9. **Locations + What's On** — venue cards with **live "Open now / Closed" status** (computed from today's hours) + the 3 promotions.
10. **Gallery** — masonry image wall, hover caption overlays, scroll-reveal, clean mobile stacking. Captions e.g. "A family name above the door", "Evening on the floor", "Webbers Super Dodgems, Rhyl" (sepia heritage shots).
11. **Testimonials** — review cards (clearly marked as placeholders) + a Google-reviews integration slot.
12. **Final CTA** — bold conversion block with a **slow drifting warm glow** background (no flashing). Headline "Pull up a stool. We've kept a seat for you." CTAs: "Find your nearest venue", "Make an enquiry" (→/contact), "Call the team". Status line + "Strictly 18+".

## OTHER PAGES
- **Our Story (/about):** founder narrative (Arthur Webber Senior, Rhyl confectionery → fairgrounds → arcades → modern AGCs), a heritage archive photo (Webbers Super Dodgems, Rhyl), three values (Hospitality first, Built for the community, Responsible by default), the **same animated heritage timeline**, three-generations cards, and a licensing commitment band.
- **Venues (/venues):** intro + grid of the 5 venues with live status, linking to detail pages described above.
- **Gaming Floor (/games):** full library grid grouped by category (Megaways, Cash Collect, Classic Reels, Festive Slots, Reel Ways, Roulette), each with max prize / ways; prominent "Max prize £500 · Strictly 18+" messaging.
- **What's On (/promotions):** the 3 promotions in detail; each notes "18+ · T&Cs apply".
- **Safer Gambling (/safer-gambling):** Think 25 policy, in-venue tools, deposit/time limits, self-exclusion, and links to BeGambleAware, GamCare (0808 8020 133) and Bacta self-exclusion. Reassuring, non-judgmental tone.
- **FAQ (/faq):** accordion — age policy, ID, prizes, membership, accessibility, parking, opening hours, responsible gambling.
- **Contact (/contact):** message form (name, email, subject, message; "by submitting you confirm you're 18+"; routes the B2B enquiries here), per-venue phone/address list, general email, and the helpline reminder.

## MOTION REQUIREMENTS
Scroll-reveal (fade + rise) on section entry · parallax backgrounds and image collages · the scroll-driven timeline spine · animated count-up stats · hover lift/scale on cards · smooth scrolling · swipeable carousel · slow CTA glow. Keep it tasteful and slow. **Everything must honour `prefers-reduced-motion`** (drop transforms/parallax, keep gentle opacity) and be smooth on iPhone and desktop. Build reusable motion primitives (`Reveal`, `Parallax`, `Counter`) and reusable section components.

## ACCEPTANCE CRITERIA
- All five venues, six games, three promotions, seven timeline milestones, four partners/trust marks, and the B2B partnerships render from one config module.
- Age gate, safer-gambling strip, helpline, 18+ / Think 25 / £500 max-prize messaging present throughout.
- Every CTA links to a real route. Live open/closed status reflects the hours above.
- Premium dark brass/ink aesthetic, Fraunces/Inter/JetBrains Mono, immersive scroll motion, fully responsive, accessible, fast.

---
