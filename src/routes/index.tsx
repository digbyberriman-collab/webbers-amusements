import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Heart,
  Cpu,
} from "lucide-react";
import heroImg from "@/assets/hero-lounge.jpg";
import floorWideImg from "@/assets/floor-wide.jpg";
import heritageImg from "@/assets/heritage.jpg";
import leverImg from "@/assets/lever-pull.jpg";
import slotsImg from "@/assets/game-slots.jpg";
import rouletteImg from "@/assets/game-roulette.jpg";
import jackpotImg from "@/assets/game-jackpot.jpg";
import { siteConfig } from "@/config/site";
import { todaysHours } from "@/lib/hours";
import { Reveal } from "@/components/Reveal";
import { JustOpenedChip } from "@/components/JustOpenedChip";
import { useParallax } from "@/lib/useParallax";

const flagshipVenue =
  siteConfig.venues.find((v) => v.primary) ?? siteConfig.venues[0];
const justOpenedVenue = siteConfig.venues.find((v) => v.isJustOpened);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: `${siteConfig.brand.name} — Premium adult gaming, family-run since 1954`,
      },
      {
        name: "description",
        content:
          "Three generations of British entertainment heritage — premium adult gaming centres in Chester, North Wales and Greater Manchester. Family-run since 1954. Licensed by the UK Gambling Commission. Strictly 18+.",
      },
      {
        property: "og:title",
        content: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
      },
      { property: "og:description", content: siteConfig.brand.description },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: siteConfig.brand.name,
          description: siteConfig.brand.description,
          foundingDate: String(siteConfig.brand.foundedYear),
          telephone: flagshipVenue.phone,
          address: siteConfig.venues.map((v) => ({
            "@type": "PostalAddress",
            streetAddress: v.address.join(", "),
            addressLocality: v.city,
            addressRegion: v.region,
            postalCode: v.postcode,
            addressCountry: "GB",
          })),
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const flagship = flagshipVenue;
  const walkden = justOpenedVenue;
  const hours = todaysHours(flagship);
  const featuredGames = siteConfig.games
    .filter((g) => g.isFeatured)
    .slice(0, 3);
  const featuredImgs = [slotsImg, jackpotImg, rouletteImg];

  const heritageParallaxRef = useParallax<HTMLDivElement>(0.08);
  const floorParallaxRef = useParallax<HTMLImageElement>(0.18);

  return (
    <>
      {/* ============================================================
          HERO — cinematic, single image, premium typography
          ============================================================ */}
      <section className="relative flex min-h-[100dvh] items-center overflow-hidden">
        <img
          src={heroImg}
          alt=""
          aria-hidden
          className="img-cinematic animate-ken-burns absolute inset-0 size-full object-cover opacity-55"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-40 lg:px-10">
          <div className="max-w-3xl animate-rise">
            <p className="eyebrow">A family business · Since 1954</p>
            <h1 className="mt-6 font-display text-5xl leading-[1.02] text-balance text-foreground sm:text-7xl lg:text-[5.5rem]">
              British entertainment heritage.{" "}
              <span className="italic text-brass">Modern Adult Gaming Centres.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-foreground/85">
              From the seaside arcades of 1950s North Wales to five premium
              Adult Gaming Centres today — a family business, three generations
              on, running calm and welcoming venues across Chester, North Wales
              and Greater Manchester.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/venues"
                className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-deep"
              >
                <MapPin className="size-4" aria-hidden />
                Find your nearest venue
              </Link>
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-brass hover:text-brass"
              >
                Our story
                <ArrowRight
                  className="size-3.5 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </div>

            {/* Quick credibility line */}
            <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
              Five venues · {siteConfig.compliance.regulator} licensed · Bacta
              member · 18+
            </p>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          aria-hidden
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
        >
          <span className="block h-12 w-px animate-scroll-cue bg-gradient-to-b from-transparent via-brass to-transparent" />
        </div>
      </section>

      {/* ============================================================
          TRUST STRIP — restrained, editorial
          ============================================================ */}
      <section className="border-y border-white/5 bg-surface/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/5 px-6 py-10 sm:grid-cols-4 lg:px-10">
          {siteConfig.trustMarks.map((mark, i) => (
            <Reveal
              key={mark.key}
              direction="up"
              delay={i * 100}
              className="px-4 sm:px-8"
            >
              <p className="font-display text-sm leading-snug text-foreground">
                {mark.label}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {mark.detail}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================================================
          HERITAGE — the founder story
          ============================================================ */}
      <section className="px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <Reveal direction="left" className="relative">
            <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
              <div ref={heritageParallaxRef}>
                <img
                  src={heritageImg}
                  alt="A 1950s British seaside amusement arcade — fruit machines and penny falls."
                  loading="lazy"
                  className="img-cinematic aspect-[5/6] w-full object-cover sepia-[0.35]"
                  width={1280}
                  height={1536}
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-brass p-7 text-ink shadow-2xl sm:block">
              <p className="font-display text-5xl font-bold leading-none">
                {new Date().getFullYear() - siteConfig.brand.foundedYear}
              </p>
              <p className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em]">
                Years
                <br />
                in the family
              </p>
            </div>
          </Reveal>
          <Reveal direction="right" delay={120} className="space-y-8">
            <p className="eyebrow">Our story</p>
            <h2 className="font-display text-4xl leading-tight text-balance text-foreground sm:text-5xl">
              It started with a confectionery counter in Rhyl.
            </h2>
            <div className="space-y-5 text-muted-foreground">
              <p>
                In 1954, Arthur Webber Senior set up a confectionery
                manufacturing business in Rhyl, supplying Woolworths and the
                seaside trade. A decade later the family moved onto the
                fairgrounds and into seaside arcades along the North Wales
                coast.
              </p>
              <p>
                Three generations on, the venues have changed — modern
                cabinets, premium hardware, fully licensed Adult Gaming
                Centres — but the way they run hasn't. Calm spaces, looked-after
                rooms, a family name above the door.
              </p>
            </div>
            <Link
              to="/about"
              className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-brass"
            >
              Read the full timeline
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          WALKDEN — the newest venue, prominent strip
          ============================================================ */}
      {walkden && (
        <section className="relative overflow-hidden border-y border-white/5 bg-ink">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(196,158,90,0.18),_transparent_55%)]"
          />
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 lg:grid-cols-[3fr_2fr] lg:gap-16 lg:px-10 lg:py-28">
            <Reveal direction="left" className="space-y-6">
              <div className="flex items-center gap-3">
                <JustOpenedChip size="md" />
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  {walkden.region}
                </span>
              </div>
              <h2 className="font-display text-4xl leading-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
                {walkden.tagline ?? walkden.character}
              </h2>
              <p className="max-w-xl text-lg leading-relaxed text-foreground/85">
                {walkden.character} A complimentary tea or coffee on
                your first visit — drop in any day, the team will show
                you around.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/venues/$slug"
                  params={{ slug: walkden.slug }}
                  className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-deep"
                >
                  <MapPin className="size-4" aria-hidden />
                  Visit Webbers Walkden
                </Link>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${walkden.lat},${walkden.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-brass hover:text-brass"
                >
                  Get directions
                  <ArrowRight className="size-3.5" aria-hidden />
                </a>
              </div>
              <p className="pt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                {walkden.address.join(", ")} · {walkden.postcode} ·{" "}
                <a
                  href={`tel:${walkden.phone.replace(/\s/g, "")}`}
                  className="text-brass"
                >
                  {walkden.phone}
                </a>
              </p>
            </Reveal>
            <Reveal direction="right" delay={140} className="relative">
              <div className="hairline-brass overflow-hidden rounded-2xl ring-1 ring-white/10">
                <img
                  src={walkden.photos.hero}
                  alt={`Webbers Walkden — ${walkden.address.join(", ")}`}
                  loading="lazy"
                  className="img-cinematic aspect-[4/3] w-full object-cover"
                  width={1280}
                  height={960}
                />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ============================================================
          CINEMATIC FLOOR BANNER
          ============================================================ */}
      <section className="relative h-[75svh] min-h-[480px] overflow-hidden border-y border-white/5">
        <img
          ref={floorParallaxRef}
          src={floorWideImg}
          alt="Inside a Webbers Adult Gaming Centre — low lighting, premium cabinets, calm atmosphere."
          loading="lazy"
          className="img-cinematic absolute inset-0 size-[115%] object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-6 pb-20 lg:px-10">
          <Reveal direction="up" className="max-w-xl space-y-5">
            <p className="eyebrow">Step inside</p>
            <h2 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Adult Gaming Centres designed for the spin.
            </h2>
            <p className="text-muted-foreground">
              Warm low light, plush carpet, and rows of the latest premium
              cabinets from the four most respected names in the industry.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          PARTNERS — hardware trust marks
          ============================================================ */}
      <section className="border-b border-white/5 bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <Reveal direction="up">
            <p className="eyebrow text-center">Premium gaming partners</p>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted-foreground">
              We curate our floors with cabinets from the four most respected
              names in modern gaming hardware.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/5 sm:grid-cols-4">
            {siteConfig.partners.map((partner, i) => (
              <Reveal
                key={partner}
                direction="up"
                delay={i * 90}
                className="bg-ink px-6 py-10 text-center"
              >
                <span className="font-display text-lg tracking-wide text-foreground/85">
                  {partner}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FEATURED GAMES
          ============================================================ */}
      <section className="px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal direction="up" className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">On the floor</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl">
                A taste of what's spinning.
              </h2>
              <p className="mt-4 text-muted-foreground">
                A small selection from the full library — from Megaways and
                Cash Collect to classic reels and electronic roulette.
              </p>
            </div>
            <Link
              to="/games"
              className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-brass"
            >
              View the full gaming floor
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredGames.map((game, i) => (
              <Reveal
                as="article"
                key={game.id}
                direction="up"
                delay={i * 140}
                className="lift group relative overflow-hidden rounded-2xl bg-surface ring-1 ring-white/5"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={featuredImgs[i]}
                    alt={`${game.name} on the Webbers floor`}
                    loading="lazy"
                    className="img-cinematic size-full object-cover opacity-70 transition-all duration-[1200ms] group-hover:scale-[1.04] group-hover:opacity-90"
                    width={1024}
                    height={1280}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
                  <div className="absolute left-5 top-5 flex gap-2">
                    {game.isNew && (
                      <span className="rounded-full bg-brass/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-brass backdrop-blur-sm">
                        New
                      </span>
                    )}
                    <span className="rounded-full bg-ink/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/85 backdrop-blur-sm">
                      {game.category}
                    </span>
                  </div>
                </div>
                <div className="space-y-3 p-7">
                  <h3 className="font-display text-2xl leading-tight text-foreground">
                    {game.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {game.description}
                  </p>
                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                      Max prize £{game.maxPrize}
                    </span>
                    {game.ways && (
                      <span className="text-xs text-muted-foreground">
                        {game.ways}
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            Maximum slot prize £{siteConfig.compliance.maxSlotPrize} · Strictly
            18+ · Play within your limits
          </p>
        </div>
      </section>

      {/* ============================================================
          WHY WEBBERS — operational pillars
          ============================================================ */}
      <section className="border-y border-white/5 bg-surface/30 px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal direction="up" className="mb-14 max-w-2xl">
            <p className="eyebrow">Why Webbers</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Modern gaming, the way it should feel.
            </h2>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Cpu,
                title: "The latest hardware",
                body: "Cabinets from Light & Wonder, Novomatic, Blueprint and Inspired Gaming — refreshed across the estate.",
              },
              {
                icon: MapPin,
                title: "High-street locations",
                body: "Five well-placed Adult Gaming Centres across Chester, North Wales and Greater Manchester. Easy to find, easy to leave.",
              },
              {
                icon: Heart,
                title: "Looked-after venues",
                body: "Trained staff who'll show you the ropes, fix a tea and keep the room calm. Hospitality first.",
              },
              {
                icon: ShieldCheck,
                title: "Safe & regulated",
                body: "UK Gambling Commission licensed, Bacta member, Think 25 ID policy. Built around safer gambling tools.",
              },
            ].map(({ icon: Icon, title, body }, i) => (
              <Reveal
                key={title}
                direction="up"
                delay={i * 90}
                className="bg-ink p-8 transition-colors hover:bg-surface"
              >
                <Icon className="mb-6 size-5 text-brass" aria-hidden />
                <h3 className="font-display text-xl text-foreground">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          VENUES — editorial card grid for all 5
          ============================================================ */}
      <section className="px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal direction="up" className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">Visit us</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl">
                Five Adult Gaming Centres across the North-West.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Two in Chester, one each in Caernarfon, Rhyl and Walkden.
                Every venue runs to the same family standards.
              </p>
            </div>
            <Link
              to="/venues"
              className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-brass"
            >
              All venue details
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>

          <div className="grid gap-px overflow-hidden rounded-2xl bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.venues.map((venue, i) => {
              const venueHours = todaysHours(venue);
              return (
                <Reveal
                  key={venue.slug}
                  direction="up"
                  delay={i * 80}
                  className="relative"
                >
                  <Link
                    to="/venues/$slug"
                    params={{ slug: venue.slug }}
                    className="group relative block h-full bg-ink p-8 transition-colors hover:bg-surface"
                  >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                      {venue.region}
                    </p>
                    {venue.isJustOpened && <JustOpenedChip size="sm" />}
                  </div>
                  <h3 className="mt-3 font-display text-2xl text-foreground transition-colors group-hover:text-brass">
                    {venue.city}
                    {venue.city === "Chester" && (
                      <span className="ml-2 text-base text-muted-foreground">
                        {venue.address[0].split(" ")[1] === "Frodsham"
                          ? "Frodsham St"
                          : "Northgate St"}
                      </span>
                    )}
                  </h3>
                  <address className="mt-3 not-italic text-sm leading-relaxed text-muted-foreground">
                    {venue.address.join(", ")}, {venue.postcode}
                  </address>
                  <div className="mt-6 flex items-center gap-2 text-xs">
                    <span
                      aria-hidden
                      className={`size-1.5 rounded-full ${
                        venueHours.isOpen
                          ? "bg-sage"
                          : "bg-muted-foreground/40"
                      }`}
                    />
                    <span className="font-mono uppercase tracking-[0.2em] text-foreground/80">
                      {venueHours.isOpen ? "Open now" : "Closed"} ·{" "}
                      {venueHours.text}
                    </span>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brass">
                    Venue details
                    <ArrowRight
                      className="size-3.5 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </div>
                  </Link>
                </Reveal>
              );
            })}

            {/* Fill card — visit CTA */}
            <Reveal
              direction="up"
              delay={siteConfig.venues.length * 80}
              className="flex flex-col justify-between bg-surface p-8"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-brass">
                  Plan a visit
                </p>
                <p className="mt-4 font-display text-2xl leading-tight text-foreground">
                  Not sure which to pick? Start at the flagship.
                </p>
              </div>
              <div className="mt-6">
                <p className="text-sm text-muted-foreground">
                  Our Frodsham Street Adult Gaming Centre in Chester carries
                  the full modern floor and our longest-standing team.
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${flagship.lat},${flagship.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-brass px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-deep"
                >
                  <MapPin className="size-3.5" aria-hidden />
                  Get directions
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================
          LEVER DETAIL — atmospheric break
          ============================================================ */}
      <section className="relative grid items-stretch overflow-hidden border-y border-white/5 md:grid-cols-2">
        <Reveal direction="left" className="relative min-h-[420px]">
          <img
            src={leverImg}
            alt="A hand on a vintage slot machine lever — a detail from one of our heritage cabinets."
            loading="lazy"
            className="img-cinematic absolute inset-0 size-full object-cover"
            width={1280}
            height={1600}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink md:bg-gradient-to-l" />
        </Reveal>
        <div className="flex items-center bg-surface/40 px-6 py-24 md:px-16">
          <Reveal direction="right" delay={140} className="max-w-md space-y-6">
            <p className="eyebrow">The pull</p>
            <h2 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
              The reels are digital. The feeling is the same.
            </h2>
            <p className="text-muted-foreground">
              Modern gaming is a quieter ritual than it was in 1954, but the
              small moment before the spin is still the same. We've built
              Adult Gaming Centres that honour that.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          PROMOTIONS TEASER
          ============================================================ */}
      <section className="px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">What's on</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl">
                Small things that make a Webbers visit better.
              </h2>
            </div>
            <Link
              to="/promotions"
              className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-brass"
            >
              All promotions
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {siteConfig.promotions.map((promo, i) => (
              <Reveal
                as="article"
                key={promo.id}
                direction="up"
                delay={i * 110}
                className="lift rounded-2xl bg-surface p-8 ring-1 ring-white/5"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="rounded-full bg-brass/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brass">
                    {promo.badge}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {promo.startsOn}
                    {promo.endsOn ? ` — ${promo.endsOn}` : ""}
                  </span>
                </div>
                <h3 className="font-display text-2xl leading-tight text-foreground">
                  {promo.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {promo.description}
                </p>
                <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  18+ · T&Cs apply · Speak to a member of the team in venue
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL VISIT CTA
          ============================================================ */}
      <section className="relative border-t border-white/5 bg-ink px-6 py-[var(--section-y)] lg:px-10">
        <Reveal direction="up" className="mx-auto max-w-4xl text-center">
          <Sparkles className="mx-auto size-6 text-brass" aria-hidden />
          <h2 className="mt-6 font-display text-4xl leading-tight text-balance text-foreground sm:text-6xl">
            Step inside. We've kept a seat for you.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Visit any of our five Adult Gaming Centres — no booking, no
            pressure. Our team will show you around and fix you a tea.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/venues"
              className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-deep"
            >
              <MapPin className="size-4" aria-hidden />
              Find your nearest venue
            </Link>
          </div>

          {/* Five-venue phone grid — tap to call any venue directly */}
          <div className="mt-12">
            <p className="eyebrow">Or call us direct</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {siteConfig.venues.map((v) => (
                <li key={v.slug}>
                  <a
                    href={`tel:${v.phone.replace(/\s/g, "")}`}
                    className="lift group flex h-full flex-col items-start gap-1 rounded-2xl border border-white/10 bg-surface/40 px-5 py-4 text-left transition-colors hover:border-brass"
                  >
                    <div className="flex items-center gap-2">
                      <Phone className="size-3 text-brass" aria-hidden />
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        {v.city === "Chester"
                          ? `Chester · ${v.address[0].split(" ")[1] === "Frodsham" ? "Frodsham" : "Northgate"}`
                          : v.city}
                      </span>
                      {v.isJustOpened && <JustOpenedChip size="sm" />}
                    </div>
                    <span className="font-display text-sm text-foreground transition-colors group-hover:text-brass">
                      {v.phone}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            {hours.isOpen
              ? `Open now in Chester · ${hours.text}`
              : `Open today · ${hours.text}`}
          </p>
        </Reveal>
      </section>
    </>
  );
}
