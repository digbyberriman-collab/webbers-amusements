import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { siteConfig, type Game } from "@/config/site";
import { PageHero } from "@/components/PageHero";

import floorWideImg from "@/assets/floor-wide.jpg";
import wildWestImg from "@/assets/games/wild-west-gold.jpg";
import clubFruityImg from "@/assets/games/club-fruity.jpg";
import horusImg from "@/assets/games/eye-of-horus.jpg";
import rouletteImg from "@/assets/games/electronic-roulette.jpg";
import reelKingImg from "@/assets/games/reel-king.jpg";
import fishinImg from "@/assets/games/fishin-frenzy.jpg";

const gameImage: Record<string, string> = {
  "big-cat-king-megaways": wildWestImg,
  "huff-n-more-puff": clubFruityImg,
  "fortune-of-cai-shen": horusImg,
  "double-zero-roulette": rouletteImg,
  "searing-sevens": reelKingImg,
  "big-catch-bass-fishing-christmas": fishinImg,
};

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: `The Gaming Floor — ${siteConfig.brand.name}` },
      {
        name: "description",
        content:
          "A curated floor of premium cabinets — Megaways, Cash Collect, Reel Ways, classic reels and electronic roulette from Light & Wonder, Novomatic, Blueprint and Inspired Gaming. Maximum slot prize £500. Strictly 18+.",
      },
      {
        property: "og:title",
        content: `The Gaming Floor — ${siteConfig.brand.name}`,
      },
      {
        property: "og:description",
        content:
          "A curated floor of premium cabinets from the four most respected names in modern gaming hardware.",
      },
      { property: "og:url", content: "/games" },
    ],
    links: [{ rel: "canonical", href: "/games" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `${siteConfig.brand.name} — Gaming Floor`,
          itemListElement: siteConfig.games.map((g, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: g.name,
            description: g.description,
          })),
        }),
      },
    ],
  }),
  component: GamesPage,
});

type CategoryFilter = Game["category"] | "All";

function GamesPage() {
  const categories = useMemo<CategoryFilter[]>(() => {
    const unique = Array.from(new Set(siteConfig.games.map((g) => g.category)));
    return ["All", ...unique];
  }, []);

  const [active, setActive] = useState<CategoryFilter>("All");

  const filtered = useMemo(
    () =>
      active === "All"
        ? siteConfig.games
        : siteConfig.games.filter((g) => g.category === active),
    [active],
  );

  return (
    <>
      <PageHero
        eyebrow="The Gaming Floor"
        title={
          <>
            Cabinets we{" "}
            <span className="italic text-brass">believe in.</span>
          </>
        }
        intro="A curated floor, not a crowded one. Every cabinet is chosen from the four most respected names in modern gaming hardware — and looked after by a team who knows how each one runs."
        image={floorWideImg}
        imageAlt="A wide view of a Webbers gaming arcade — premium cabinets in warm low light."
      />

      {/* ============================================================
          PARTNERS — premium hardware trust marks
          ============================================================ */}
      <section className="border-b border-white/5 bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <p className="eyebrow text-center">Premium gaming partners</p>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted-foreground">
            Every machine on the floor comes from one of these four houses —
            the people who build the cabinets you'll find in the best arcades
            in the country.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/5 sm:grid-cols-4">
            {siteConfig.partners.map((partner) => (
              <div key={partner} className="bg-ink px-6 py-10 text-center">
                <span className="font-display text-lg tracking-wide text-foreground/85">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          CATEGORY FILTER + GAME GRID
          ============================================================ */}
      <section className="px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">The library</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl">
                Sorted, never stacked.
              </h2>
              <p className="mt-4 text-muted-foreground">
                From Megaways and Cash Collect to classic reels and electronic
                roulette — filter by what you're in the mood for, or wander
                the whole floor.
              </p>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              {String(filtered.length).padStart(2, "0")} ·{" "}
              {active === "All" ? "All categories" : active}
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter games by category"
            className="mb-12 flex flex-wrap gap-2"
          >
            {categories.map((cat) => {
              const isActive = active === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(cat)}
                  className={`rounded-full border px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors ${
                    isActive
                      ? "border-transparent bg-brass text-ink"
                      : "border-white/15 text-muted-foreground hover:border-brass/60 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((game) => {
              const img = gameImage[game.id];
              return (
                <article
                  key={game.id}
                  className="lift group relative flex flex-col overflow-hidden rounded-2xl bg-surface ring-1 ring-white/5"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    {img && (
                      <img
                        src={img}
                        alt={`${game.name} on the Webbers floor`}
                        loading="lazy"
                        className="img-cinematic size-full object-cover opacity-70 transition-all duration-[1200ms] group-hover:scale-[1.04] group-hover:opacity-90"
                        width={1024}
                        height={1280}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
                    <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                      <span className="rounded-full bg-ink/60 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/85 backdrop-blur-sm">
                        {game.category}
                      </span>
                      {game.isNew && (
                        <span className="rounded-full bg-brass/15 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brass backdrop-blur-sm">
                          New
                        </span>
                      )}
                    </div>
                    <span className="pointer-events-none absolute bottom-5 right-5 inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-brass opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      Play in venue
                      <ArrowRight className="size-3" aria-hidden />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col space-y-3 p-7">
                    <h3 className="font-display text-2xl leading-tight text-foreground">
                      {game.name}
                    </h3>
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                      {game.description}
                    </p>
                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                        Max prize £{game.maxPrize}
                      </span>
                      {game.ways && (
                        <span className="text-right text-xs text-muted-foreground">
                          {game.ways}
                        </span>
                      )}
                    </div>
                  </div>
                  <Link
                    to="/venues"
                    aria-label={`Find a venue to play ${game.name}`}
                    className="absolute inset-0"
                  >
                    <span className="sr-only">Find a venue to play</span>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          EDITORIAL PULL — curated not crowded
          ============================================================ */}
      <section className="border-y border-white/5 bg-surface/30 px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">A note on the floor</p>
          </div>
          <div className="space-y-6 lg:col-span-8">
            <p className="font-display text-3xl leading-snug text-balance text-foreground sm:text-4xl">
              A good gaming arcade is curated, not crowded. We'd rather run a
              tight, beautifully-maintained floor than a wall of machines
              nobody plays.
            </p>
            <p className="text-muted-foreground">
              The cabinets here are picked the way you'd pick a wine list —
              with a point of view. The Light &amp; Wonder Megaways titles for
              the players who want pace; the Blueprint Cash Collect cabinets
              for the ones who want a feature build; classic reels from
              Inspired for the people who remember the lever; the Novomatic
              roulette terminals for an evening with a slower rhythm.
            </p>
            <p className="text-muted-foreground">
              Three generations of Webbers have run arcades long enough to know
              the difference between a floor that's busy and one that's good.
              This one's the second.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          COMPLIANCE FOOTER BAND
          ============================================================ */}
      <section className="border-b border-white/5 bg-ink">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            Maximum slot prize £{siteConfig.compliance.maxSlotPrize} ·
            Strictly 18+ · Play within your limits
          </p>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA — visit a venue
          ============================================================ */}
      <section className="px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <Sparkles className="mx-auto size-6 text-brass" aria-hidden />
          <h2 className="mt-6 font-display text-4xl leading-tight text-balance text-foreground sm:text-6xl">
            See them spinning in the arcade.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            New titles land across the estate every few weeks. The only way
            to know what's on the floor today is to step inside.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/venues"
              className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-deep"
            >
              <MapPin className="size-4" aria-hidden />
              Find your nearest venue
            </Link>
            <Link
              to="/safer-gambling"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-brass hover:text-brass"
            >
              <ShieldCheck className="size-4" aria-hidden />
              Safer gambling
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
