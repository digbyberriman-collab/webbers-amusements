import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, MapPin, Clock, Sparkles, ShieldCheck, Heart, Compass } from "lucide-react";
import heroImg from "@/assets/hero-lounge.jpg";
import slotsImg from "@/assets/game-slots.jpg";
import rouletteImg from "@/assets/game-roulette.jpg";
import jackpotImg from "@/assets/game-jackpot.jpg";
import heritageImg from "@/assets/heritage.jpg";
import floorWideImg from "@/assets/floor-wide.jpg";
import leverImg from "@/assets/lever-pull.jpg";
import { siteConfig } from "@/config/site";
import { todaysHours } from "@/lib/hours";
import { SlotMachine, type SlotItem } from "@/components/SlotMachine";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${siteConfig.brand.name} — Chester's premium adult gaming centre` },
      {
        name: "description",
        content:
          "Webbers Amusements is Chester's modern adult gaming centre on Frodsham Street. Premium slots, electronic roulette and friendly service from a family business since 1954. 18+ only.",
      },
      { property: "og:title", content: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}` },
      { property: "og:description", content: siteConfig.brand.description },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "/og-home.jpg" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: siteConfig.brand.name,
          image: "/og-home.jpg",
          telephone: siteConfig.venues[0].phone,
          address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.venues[0].address.join(", "),
            addressLocality: siteConfig.venues[0].city,
            postalCode: siteConfig.venues[0].postcode,
            addressCountry: "GB",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: siteConfig.venues[0].lat,
            longitude: siteConfig.venues[0].lng,
          },
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const chester = siteConfig.venues[0];
  const hours = todaysHours(chester);
  const featured = siteConfig.games.filter((g) => g.isFeatured);
  const featuredImgs = [jackpotImg, slotsImg, rouletteImg];

  const heroSlots: SlotItem[] = siteConfig.games.slice(0, 8).map((g) => ({
    key: g.id,
    symbol:
      g.type === "Jackpot" ? "💰" : g.type === "Roulette" ? "🎯" : g.type === "Classic" ? "🍒" : "🎰",
    label: g.name.split(" ")[0],
    description: `${g.name} — ${g.type} cabinet. ${g.tagline ?? "Spin the lever again for another pick."}`,
  }));
  const [pickedGame, setPickedGame] = useState(heroSlots[0]?.key ?? "");
  const pickedGameData =
    siteConfig.games.find((g) => g.id === pickedGame) ?? siteConfig.games[0];

  return (
    <>
      {/* HERO — neon slot lounge */}
      <section className="relative flex min-h-[100dvh] items-center overflow-hidden pb-20 pt-32">
        <img
          src={heroImg}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover opacity-35"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
        {/* Neon haze */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-1/4 h-[60vh] w-[60vh] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--neon-pink), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 bottom-0 h-[60vh] w-[60vh] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--neon-cyan), transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center">
          <div className="space-y-7 animate-rise">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--neon-pink)]/40 bg-[color:var(--neon-pink)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[color:var(--neon-pink)] shadow-[0_0_18px_var(--neon-pink)]/40">
              <span className="size-1.5 rounded-full bg-[color:var(--neon-pink)]" />
              Over 18s only · Licensed venue
            </div>
            <h1 className="neon-text font-display text-5xl leading-[0.95] text-balance sm:text-7xl lg:text-[5.5rem]">
              Chester's home of <span className="italic">modern</span> gaming.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-foreground/85">
              A welcoming adult gaming lounge on Frodsham Street. The latest
              digital titles, classic favourites and the warm hospitality of a
              family business since {siteConfig.brand.foundedYear}.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/venues"
                className="play-button inline-flex items-center gap-2 rounded-full px-7 py-4 text-xs font-black uppercase tracking-widest"
              >
                <MapPin className="size-4" aria-hidden />
                Find your Webbers
              </Link>
              <Link
                to="/games"
                className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--neon-cyan)]/50 bg-white/5 px-7 py-4 text-xs font-bold uppercase tracking-widest text-[color:var(--neon-cyan)] backdrop-blur-sm transition-colors hover:bg-[color:var(--neon-cyan)]/10"
              >
                See the games
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </div>

          {/* Functional slot machine */}
          <div className="space-y-4">
            <SlotMachine
              items={heroSlots}
              selectedKey={pickedGame}
              onLand={setPickedGame}
              cycleOnPull={false}
              headerTitle="Tonight's pick"
              idleHint="Pull to spin the floor"
            />
            <div
              key={pickedGameData.id}
              className="mx-auto max-w-md rounded-xl border border-[color:var(--neon-cyan)]/30 bg-ink/80 p-4 text-center backdrop-blur-sm animate-rise"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--neon-yellow)]">
                You landed on
              </p>
              <p className="neon-text-cyan mt-1 font-display text-2xl">
                {pickedGameData.name}
              </p>
              <p className="mt-1 text-xs text-foreground/70">
                {pickedGameData.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO STRIP */}
      <section className="border-y border-white/5 bg-surface/30 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-display text-2xl leading-snug text-balance text-foreground sm:text-3xl">
            We believe in <span className="italic text-gold">hospitality over hype</span>.
            Since the 1950s, the Webber family has built warm, well-run rooms
            where adults can play in confidence — and feel looked after.
          </p>
        </div>
      </section>

      {/* CINEMATIC FLOOR BANNER */}
      <section className="relative h-[70svh] min-h-[460px] overflow-hidden">
        <img
          src={floorWideImg}
          alt="The Webbers gaming floor at dusk"
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-6 pb-16">
          <div className="max-w-xl space-y-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              Step inside
            </p>
            <h2 className="font-display text-4xl text-foreground sm:text-5xl">
              A room designed for the spin.
            </h2>
            <p className="text-muted-foreground">
              Plush carpet, warm low light and rows of the latest cabinets —
              all under one roof on Frodsham Street.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED GAMES */}
      <section className="px-6 py-28">

        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                The Floor
              </p>
              <h2 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
                Featured experiences
              </h2>
              <p className="mt-3 max-w-md text-muted-foreground">
                A taste of what's on the floor right now — from progressive
                jackpots to classic three-reelers.
              </p>
            </div>
            <Link
              to="/games"
              className="group inline-flex items-center gap-2 border-b border-gold/30 pb-1 text-sm font-semibold text-gold transition-colors hover:border-gold"
            >
              View full game library
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featured.slice(0, 3).map((game, i) => (
              <article
                key={game.id}
                className="group relative overflow-hidden rounded-2xl bg-surface ring-1 ring-white/5 glow-hover"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={featuredImgs[i]}
                    alt={game.name}
                    loading="lazy"
                    className="size-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                    width={1024}
                    height={1280}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
                  <div className="absolute left-5 top-5 flex gap-2">
                    {game.isNew && (
                      <span className="rounded-full bg-electric/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-electric">
                        New
                      </span>
                    )}
                    <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground backdrop-blur-sm">
                      {game.type}
                    </span>
                  </div>
                </div>
                <div className="space-y-3 p-7">
                  <h3 className="font-display text-2xl text-foreground">
                    {game.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {game.description}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-gold">
                      Max prize £{game.maxPrize}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {game.features.join(" · ")}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-10 text-center text-xs uppercase tracking-widest text-muted-foreground">
            Maximum slot prize £{siteConfig.compliance.maxSlotPrize} · Strictly
            18+ · Play within your limits
          </p>
        </div>
      </section>

      {/* WHY WEBBERS */}
      <section className="border-t border-white/5 bg-surface/30 px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              Why Webbers
            </p>
            <h2 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
              Modern gaming, the way it should feel.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Sparkles,
                title: "The latest titles",
                body: "Megaways, community jackpots and the newest digital reels — fresh on the floor.",
              },
              {
                icon: Compass,
                title: "City-centre location",
                body: "A few minutes' walk from Chester's Eastgate Clock. Easy to find, easy to leave.",
              },
              {
                icon: Heart,
                title: "Friendly team",
                body: "Trained staff who'll show you the ropes, fix a tea and keep the room calm.",
              },
              {
                icon: ShieldCheck,
                title: "Safe & responsible",
                body: "Licensed, age-checked and built around tools to help you stay in control.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="bg-ink p-8 transition-colors hover:bg-surface"
              >
                <Icon className="mb-6 size-6 text-gold" aria-hidden />
                <h3 className="font-display text-xl text-foreground">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEVER PULL DETAIL */}
      <section className="relative grid items-stretch overflow-hidden md:grid-cols-2">
        <div className="relative min-h-[400px]">
          <img
            src={leverImg}
            alt="A hand pulling a vintage slot machine lever"
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
            width={1280}
            height={1600}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink md:bg-gradient-to-l" />
        </div>
        <div className="flex items-center bg-surface/40 px-6 py-24 md:px-16">
          <div className="max-w-md space-y-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              The pull
            </p>
            <h2 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
              That one second before the reels stop.
            </h2>
            <p className="text-muted-foreground">
              Modern gaming is digital, but the feeling is the same: a small
              ritual, the anticipation of the spin, the rush of a win line.
              We've built a room that honours it.
            </p>
          </div>
        </div>
      </section>

      {/* HERITAGE */}
      <section className="px-6 py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
              <img
                src={heritageImg}
                alt="A 1950s British amusement arcade — fruit machines and pinball."
                loading="lazy"
                className="aspect-[5/6] w-full object-cover sepia"
                width={1280}
                height={1280}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-gold p-6 text-ink shadow-2xl sm:block">
              <p className="font-display text-5xl font-bold leading-none">
                {new Date().getFullYear() - siteConfig.brand.foundedYear}
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest">
                Years on
                <br />
                the high street
              </p>
            </div>
          </div>
          <div className="space-y-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              Heritage
            </p>
            <h2 className="font-display text-4xl leading-tight text-foreground text-balance sm:text-5xl">
              A family name on the British seafront since the 1950s.
            </h2>
            <div className="space-y-5 text-muted-foreground">
              <p>
                Webber Leisure started in the fairgrounds and seaside arcades of
                post-war Britain — a family business with grease on its hands
                and a knack for building machines people actually wanted to
                play.
              </p>
              <p>
                Three generations on, Webbers Amusements is the modern face of
                that story: a sophisticated, well-run room in the heart of
                Chester, with sister venues in Rhyl and Caernarfon.
              </p>
            </div>
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 border-b border-gold/40 pb-1 text-sm font-semibold text-gold hover:border-gold"
            >
              Read our full story
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* VENUE SNAPSHOT */}
      <section className="border-y border-white/5 bg-surface/30 px-6 py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                Visit us
              </p>
              <h2 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
                On Frodsham Street.
              </h2>
            </div>
            <div className="space-y-5 text-foreground">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 size-5 shrink-0 text-gold" aria-hidden />
                <div>
                  {chester.address.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                  <p>
                    {chester.city}, {chester.postcode}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="mt-1 size-5 shrink-0 text-gold" aria-hidden />
                <div>
                  <p className="font-semibold">
                    {hours.isOpen ? (
                      <>
                        <span className="text-gold">Open now</span> ·{" "}
                        {hours.text}
                      </>
                    ) : (
                      <>
                        <span className="text-muted-foreground">Closed</span> ·
                        Today {hours.text}
                      </>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {hours.label} hours · seven days a week
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${chester.lat},${chester.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-ink hover:bg-gold-deep"
              >
                Get directions
              </a>
              <a
                href={`tel:${chester.phone.replace(/\s/g, "")}`}
                className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-foreground hover:bg-white/5"
              >
                Call the venue
              </a>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/10">
              <iframe
                title="Map of Webbers Amusements, Chester"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${chester.lng - 0.01}%2C${chester.lat - 0.005}%2C${chester.lng + 0.01}%2C${chester.lat + 0.005}&layer=mapnik&marker=${chester.lat}%2C${chester.lng}`}
                className="size-full grayscale-[60%] invert-[0.92] hue-rotate-180 contrast-[0.9]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PROMOTIONS TEASER */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                What's on
              </p>
              <h2 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
                Happening this season
              </h2>
            </div>
            <Link
              to="/promotions"
              className="group inline-flex items-center gap-2 border-b border-gold/30 pb-1 text-sm font-semibold text-gold"
            >
              All promotions
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {siteConfig.promotions.slice(0, 2).map((promo) => (
              <article
                key={promo.id}
                className="group rounded-2xl bg-surface p-8 ring-1 ring-white/5 glow-hover"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="rounded-full bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold">
                    {promo.badge}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {promo.startsOn}
                    {promo.endsOn ? ` — ${promo.endsOn}` : ""}
                  </span>
                </div>
                <h3 className="font-display text-3xl text-foreground">
                  {promo.title}
                </h3>
                <p className="mt-4 text-muted-foreground">{promo.description}</p>
                <p className="mt-6 text-[10px] uppercase tracking-widest text-muted-foreground">
                  18+ · T&Cs apply
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
