import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowRight, MapPin, Sparkles } from "lucide-react";
import { siteConfig, type Game } from "@/config/site";

import fishin from "@/assets/games/fishin-frenzy.jpg";
import rainbow from "@/assets/games/rainbow-riches.jpg";
import horus from "@/assets/games/eye-of-horus.jpg";
import starburst from "@/assets/games/starburst.jpg";
import community from "@/assets/games/community-jackpot.jpg";
import roulette from "@/assets/games/electronic-roulette.jpg";
import deal from "@/assets/games/deal-or-no-deal.jpg";
import monopoly from "@/assets/games/monopoly-big-event.jpg";
import wildwest from "@/assets/games/wild-west-gold.jpg";
import fruity from "@/assets/games/club-fruity.jpg";
import reelking from "@/assets/games/reel-king.jpg";
import banker from "@/assets/games/big-banker.jpg";

const imageMap: Record<string, string> = {
  "fishin-frenzy": fishin,
  "rainbow-riches": rainbow,
  "eye-of-horus": horus,
  starburst: starburst,
  "community-jackpot": community,
  "electronic-roulette": roulette,
  "deal-or-no-deal": deal,
  "monopoly-big-event": monopoly,
  "wild-west-gold": wildwest,
  "club-fruity": fruity,
  "reel-king": reelking,
  "big-banker": banker,
};

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: `Games — ${siteConfig.brand.name}` },
      {
        name: "description",
        content:
          "Scroll the Webbers game library like a slot reel — modern slots, classics, electronic roulette and community jackpots. Maximum slot prize £500. Over 18s only.",
      },
      { property: "og:title", content: `Games — ${siteConfig.brand.name}` },
      {
        property: "og:description",
        content:
          "Spin through the floor — every title, every feature, every max prize.",
      },
      { property: "og:url", content: "/games" },
    ],
    links: [{ rel: "canonical", href: "/games" }],
  }),
  component: GamesPage,
});

const types: Array<Game["type"] | "All"> = [
  "All",
  "Slots",
  "Jackpot",
  "Classic",
  "Roulette",
];

// Symbols used to fake a spinning reel strip per game.
const REEL_SYMBOLS = ["7", "★", "♠", "♥", "♦", "♣", "BAR", "J", "Q", "K", "A", "£"];

function ReelStrip({ speed, accent }: { speed: "slow" | "med" | "fast"; accent?: boolean }) {
  // Double the list so the loop is seamless when translated -50%.
  const doubled = [...REEL_SYMBOLS, ...REEL_SYMBOLS];
  return (
    <div className="reel-mask relative h-full overflow-hidden rounded-md bg-ink/70 ring-1 ring-white/10">
      <div
        className={`reel-strip flex flex-col ${
          speed === "slow" ? "slow" : speed === "med" ? "med" : ""
        }`}
      >
        {doubled.map((s, i) => (
          <div
            key={i}
            className={`flex h-16 shrink-0 items-center justify-center font-display text-3xl ${
              accent ? "text-gold" : "text-foreground/80"
            }`}
          >
            {s}
          </div>
        ))}
      </div>
      {/* Pay-line */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gold/40" />
    </div>
  );
}

function GamesPage() {
  const [activeType, setActiveType] = useState<Game["type"] | "All">("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);

  const filtered = useMemo(
    () =>
      siteConfig.games.filter(
        (g) => activeType === "All" || g.type === activeType,
      ),
    [activeType],
  );

  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, filtered.length);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.55) {
            const idx = Number(
              (entry.target as HTMLElement).dataset.index ?? "0",
            );
            setActiveIndex(idx);
          }
        }
      },
      { threshold: [0, 0.55, 0.8] },
    );
    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [filtered.length]);

  const scrollTo = (idx: number) => {
    sectionRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Sticky filter rail */}
      <div className="sticky top-16 z-30 border-b border-white/5 bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6 py-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            The reel
          </span>
          <div className="flex flex-wrap gap-1.5">
            {types.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setActiveType(t);
                  setActiveIndex(0);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                  activeType === t
                    ? "border-gold bg-gold text-ink"
                    : "border-white/10 text-muted-foreground hover:border-gold/40 hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span className="text-foreground">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="mx-1 text-gold">/</span>
            {String(filtered.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Side dot navigation (desktop) */}
      <nav
        aria-label="Game navigation"
        className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 lg:flex"
      >
        {filtered.map((g, i) => (
          <button
            key={g.id}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Jump to ${g.name}`}
            className={`group relative h-2 w-2 rounded-full transition-all ${
              i === activeIndex
                ? "bg-gold scale-150"
                : "bg-white/20 hover:bg-white/40"
            }`}
          >
            <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-ink/90 px-2 py-0.5 text-[10px] uppercase tracking-widest text-foreground opacity-0 ring-1 ring-white/10 transition-opacity group-hover:opacity-100">
              {g.name}
            </span>
          </button>
        ))}
      </nav>

      {/* Snap container */}
      <div className="snap-y snap-mandatory">
        {filtered.map((g, i) => {
          const img = imageMap[g.id];
          return (
            <section
              key={g.id}
              ref={(el) => {
                sectionRefs.current[i] = el;
              }}
              data-index={i}
              className="relative flex min-h-[100svh] snap-start items-center overflow-hidden border-b border-white/5"
            >
              {/* Background */}
              <img
                src={img}
                alt=""
                aria-hidden
                loading={i < 2 ? "eager" : "lazy"}
                className="absolute inset-0 size-full object-cover opacity-30"
                width={1024}
                height={1280}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />

              <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-6 py-24 lg:grid-cols-12 lg:items-center">
                {/* Text column */}
                <div className="lg:col-span-7 space-y-7">
                  <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em]">
                    <span className="text-gold">
                      {String(i + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
                    </span>
                    <span className="h-px w-12 bg-gold/50" />
                    <span className="text-muted-foreground">{g.type}</span>
                    {g.isNew && (
                      <span className="rounded-full bg-electric/15 px-2 py-0.5 text-electric">
                        New
                      </span>
                    )}
                    {g.isFeatured && (
                      <span className="rounded-full bg-gold/15 px-2 py-0.5 text-gold">
                        Featured
                      </span>
                    )}
                  </div>

                  <h2 className="font-display text-5xl leading-[0.95] text-foreground sm:text-7xl lg:text-[5.5rem]">
                    {g.name}
                  </h2>

                  <p className="max-w-xl text-lg text-muted-foreground">
                    {g.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {g.features.map((f) => (
                      <span
                        key={f}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-6 pt-2">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        Max prize
                      </p>
                      <p className="mt-1 font-display text-4xl text-gold">
                        £{g.maxPrize}
                      </p>
                    </div>
                    <Link
                      to="/venues"
                      className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-ink transition-all hover:scale-[1.02] hover:bg-gold-deep hover:shadow-[0_0_40px_-8px_rgba(232,197,71,0.5)]"
                    >
                      <MapPin className="size-4" aria-hidden />
                      Find it on the floor
                    </Link>
                  </div>
                </div>

                {/* Cabinet + reel column */}
                <div className="lg:col-span-5">
                  <div className="relative mx-auto max-w-sm">
                    <div className="overflow-hidden rounded-3xl ring-1 ring-gold/20 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)]">
                      <img
                        src={img}
                        alt={`${g.name} cabinet`}
                        loading={i < 2 ? "eager" : "lazy"}
                        className="aspect-[4/5] w-full object-cover"
                        width={1024}
                        height={1280}
                      />
                    </div>

                    {/* Reels overlay */}
                    <div className="absolute -bottom-6 left-1/2 grid w-[85%] -translate-x-1/2 grid-cols-3 gap-2 rounded-2xl bg-ink/95 p-3 ring-1 ring-gold/30 backdrop-blur-sm">
                      <div className="h-32">
                        <ReelStrip speed="slow" accent />
                      </div>
                      <div className="h-32">
                        <ReelStrip speed="med" />
                      </div>
                      <div className="h-32">
                        <ReelStrip speed="fast" accent />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scroll cue */}
              {i < filtered.length - 1 && (
                <button
                  type="button"
                  onClick={() => scrollTo(i + 1)}
                  aria-label="Next game"
                  className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 text-muted-foreground hover:text-gold"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
                    Next reel
                  </span>
                  <ArrowDown className="size-4 animate-scroll-cue" aria-hidden />
                </button>
              )}
            </section>
          );
        })}

        {/* Closing CTA panel */}
        <section className="relative flex min-h-[80svh] snap-start items-center justify-center px-6 py-24 text-center">
          <div className="mx-auto max-w-2xl space-y-6">
            <Sparkles className="mx-auto size-8 text-gold" aria-hidden />
            <h2 className="font-display text-5xl text-foreground sm:text-6xl">
              That's the line-up.
            </h2>
            <p className="text-lg text-muted-foreground">
              New cabinets land on the floor every few weeks. The best way to
              see what's spinning today is to step inside.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link
                to="/venues"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-bold text-ink hover:bg-gold-deep"
              >
                <MapPin className="size-4" aria-hidden />
                Find your nearest Webbers
              </Link>
              <Link
                to="/safer-gambling"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-7 py-4 text-sm font-bold text-foreground hover:bg-white/5"
              >
                Play in control
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            <p className="pt-6 text-xs uppercase tracking-widest text-muted-foreground">
              Maximum slot prize £{siteConfig.compliance.maxSlotPrize} ·
              Strictly 18+
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
