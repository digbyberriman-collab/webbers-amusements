import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowRight, MapPin, Sparkles, Zap } from "lucide-react";
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
          "Spin through the Webbers floor — modern slots, classics, electronic roulette and community jackpots. Maximum slot prize £500. Over 18s only.",
      },
      { property: "og:title", content: `Games — ${siteConfig.brand.name}` },
      {
        property: "og:description",
        content:
          "A neon-lit tour of every cabinet on the floor.",
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

// Colourful slot reel symbols. Mixed glyphs + colours for visual richness.
const REEL = [
  { s: "7", c: "reel-sym-pink" },
  { s: "★", c: "reel-sym-yellow" },
  { s: "♦", c: "reel-sym-cyan" },
  { s: "BAR", c: "reel-sym-purple" },
  { s: "♥", c: "reel-sym-pink" },
  { s: "🍒", c: "reel-sym-yellow" },
  { s: "£", c: "reel-sym-green" },
  { s: "♣", c: "reel-sym-cyan" },
  { s: "👑", c: "reel-sym-yellow" },
  { s: "💎", c: "reel-sym-cyan" },
  { s: "🔔", c: "reel-sym-yellow" },
  { s: "🍋", c: "reel-sym-green" },
];

function ReelStrip({ speed }: { speed: "slow" | "med" | "fast" }) {
  const doubled = [...REEL, ...REEL];
  return (
    <div className="reel-mask relative h-full overflow-hidden rounded-lg bg-gradient-to-b from-ink to-black ring-1 ring-white/15">
      <div
        className={`reel-strip flex flex-col ${
          speed === "slow" ? "slow" : speed === "med" ? "med" : ""
        }`}
      >
        {doubled.map((sym, i) => (
          <div
            key={i}
            className={`flex h-20 shrink-0 items-center justify-center font-display text-4xl ${sym.c}`}
          >
            {sym.s}
          </div>
        ))}
      </div>
      {/* Pay-line */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-[color:var(--neon-yellow)] shadow-[0_0_12px_var(--neon-yellow)]" />
    </div>
  );
}

// Row of chasing marquee bulbs.
function BulbRow({ count = 16, colorClass = "text-[color:var(--neon-yellow)]" }: { count?: number; colorClass?: string }) {
  return (
    <div className={`flex items-center justify-between ${colorClass}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="bulb"
          style={{ animationDelay: `${(i * 0.08).toFixed(2)}s` }}
        />
      ))}
    </div>
  );
}

// Decorative coin shower.
function CoinShower() {
  const coins = Array.from({ length: 14 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {coins.map((_, i) => (
        <span
          key={i}
          className="coin"
          style={{
            left: `${(i * 7 + 3) % 100}%`,
            animationDuration: `${4 + ((i * 1.3) % 5)}s`,
            animationDelay: `${(i * 0.4) % 6}s`,
          }}
        />
      ))}
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
      {/* Sticky filter rail — turned into a neon marquee */}
      <div className="sticky top-16 z-30 border-y border-[color:var(--neon-pink)]/40 bg-ink/95 backdrop-blur-md">
        <div className="px-2 pt-2">
          <BulbRow count={28} colorClass="text-[color:var(--neon-pink)]" />
        </div>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6 py-3">
          <span className="neon-text-pink font-display text-lg font-bold tracking-widest">
            ★ THE FLOOR ★
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
                className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest transition-all ${
                  activeType === t
                    ? "border-[color:var(--neon-yellow)] bg-[color:var(--neon-yellow)] text-ink shadow-[0_0_18px_var(--neon-yellow)]"
                    : "border-white/15 text-muted-foreground hover:border-[color:var(--neon-cyan)] hover:text-[color:var(--neon-cyan)]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <span className="ml-auto font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="jackpot inline-block min-w-8 text-right">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="mx-1 text-[color:var(--neon-pink)]">/</span>
            {String(filtered.length).padStart(2, "0")}
          </span>
        </div>
        <div className="px-2 pb-2">
          <BulbRow count={28} colorClass="text-[color:var(--neon-cyan)]" />
        </div>
      </div>

      {/* Side dot navigation (desktop) */}
      <nav
        aria-label="Game navigation"
        className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
      >
        {filtered.map((g, i) => (
          <button
            key={g.id}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Jump to ${g.name}`}
            className={`group relative h-3 w-3 rounded-full transition-all ${
              i === activeIndex
                ? "bg-[color:var(--neon-yellow)] scale-150 shadow-[0_0_14px_var(--neon-yellow)]"
                : "bg-white/25 hover:bg-[color:var(--neon-cyan)]"
            }`}
          >
            <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-ink/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-foreground opacity-0 ring-1 ring-[color:var(--neon-pink)]/40 transition-opacity group-hover:opacity-100">
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
              className="relative flex min-h-[100svh] snap-start items-center overflow-hidden border-b border-[color:var(--neon-pink)]/30"
            >
              {/* Background */}
              <img
                src={img}
                alt=""
                aria-hidden
                loading={i < 2 ? "eager" : "lazy"}
                className="absolute inset-0 size-full object-cover opacity-40"
                width={1024}
                height={1280}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />

              {/* Radial neon haze */}
              <div
                aria-hidden
                className="absolute -right-32 top-1/3 h-[60vh] w-[60vh] rounded-full opacity-50 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, var(--neon-pink), transparent 70%)",
                }}
              />
              <div
                aria-hidden
                className="absolute -left-32 bottom-0 h-[50vh] w-[50vh] rounded-full opacity-40 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, var(--neon-cyan), transparent 70%)",
                }}
              />

              {i === activeIndex && <CoinShower />}

              <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-6 py-24 lg:grid-cols-12 lg:items-center">
                {/* Text column */}
                <div className="lg:col-span-7 space-y-7">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em]">
                    <span className="neon-text-pink font-bold">
                      {String(i + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
                    </span>
                    <span className="h-px w-12 bg-[color:var(--neon-pink)]/60" />
                    <span className="rounded-full border border-[color:var(--neon-cyan)]/50 px-2 py-0.5 text-[color:var(--neon-cyan)]">
                      {g.type}
                    </span>
                    {g.isNew && (
                      <span className="rounded-full bg-[color:var(--neon-green)]/20 px-2 py-0.5 text-[color:var(--neon-green)] shadow-[0_0_12px_var(--neon-green)]">
                        ★ New ★
                      </span>
                    )}
                    {g.isFeatured && (
                      <span className="rounded-full bg-[color:var(--neon-yellow)]/20 px-2 py-0.5 text-[color:var(--neon-yellow)] shadow-[0_0_12px_var(--neon-yellow)]">
                        Featured
                      </span>
                    )}
                  </div>

                  <h2 className="neon-text font-display text-5xl leading-[0.95] sm:text-7xl lg:text-[5.5rem]">
                    {g.name}
                  </h2>

                  <p className="max-w-xl text-lg text-foreground/90">
                    {g.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {g.features.map((f, fi) => {
                      const colors = [
                        "border-[color:var(--neon-pink)]/60 text-[color:var(--neon-pink)] shadow-[0_0_8px_var(--neon-pink)]",
                        "border-[color:var(--neon-cyan)]/60 text-[color:var(--neon-cyan)] shadow-[0_0_8px_var(--neon-cyan)]",
                        "border-[color:var(--neon-yellow)]/60 text-[color:var(--neon-yellow)] shadow-[0_0_8px_var(--neon-yellow)]",
                        "border-[color:var(--neon-green)]/60 text-[color:var(--neon-green)] shadow-[0_0_8px_var(--neon-green)]",
                      ];
                      return (
                        <span
                          key={f}
                          className={`rounded-full border bg-ink/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${colors[fi % colors.length]}`}
                        >
                          {f}
                        </span>
                      );
                    })}
                  </div>

                  {/* Jackpot ticker */}
                  <div className="inline-flex items-end gap-6 rounded-2xl border border-[color:var(--neon-yellow)]/40 bg-black/60 px-6 py-4 shadow-[0_0_30px_var(--neon-yellow)]/40">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        Max prize
                      </p>
                      <p className="jackpot mt-1 font-display text-5xl font-bold">
                        £{g.maxPrize}
                      </p>
                    </div>
                    <div className="hidden h-12 w-px bg-[color:var(--neon-yellow)]/30 sm:block" />
                    <div className="hidden sm:block">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        On every win
                      </p>
                      <p className="mt-1 font-mono text-xs text-[color:var(--neon-cyan)]">
                        <Zap className="mr-1 inline size-3" aria-hidden />
                        Instant credit
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Link
                      to="/venues"
                      className="play-button group inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-black uppercase tracking-widest transition-transform hover:scale-110"
                    >
                      <MapPin className="size-4" aria-hidden />
                      Play it in venue
                    </Link>
                    <Link
                      to="/safer-gambling"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-[color:var(--neon-cyan)]"
                    >
                      Play in control
                      <ArrowRight className="size-3" aria-hidden />
                    </Link>
                  </div>
                </div>

                {/* Cabinet + reel column */}
                <div className="lg:col-span-5">
                  <div className="relative mx-auto max-w-sm">
                    {/* Chasing-bulb frame */}
                    <div className="cabinet-frame relative overflow-hidden p-2">
                      {/* Top bulb row */}
                      <div className="px-1 py-1.5 text-[color:var(--neon-yellow)]">
                        <BulbRow count={14} />
                      </div>

                      <div className="spotlight relative overflow-hidden rounded-xl">
                        <img
                          src={img}
                          alt={`${g.name} cabinet`}
                          loading={i < 2 ? "eager" : "lazy"}
                          className="aspect-[4/5] w-full object-cover"
                          width={1024}
                          height={1280}
                        />
                        {/* Marquee header overlay */}
                        <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-ink/90 to-transparent p-3 text-center">
                          <p className="neon-text-pink font-display text-base font-bold uppercase tracking-[0.3em]">
                            Webbers
                          </p>
                        </div>
                      </div>

                      {/* Bottom bulb row */}
                      <div className="px-1 py-1.5 text-[color:var(--neon-cyan)]">
                        <BulbRow count={14} />
                      </div>
                    </div>

                    {/* Reels overlay */}
                    <div className="absolute -bottom-8 left-1/2 grid w-[90%] -translate-x-1/2 grid-cols-3 gap-2 rounded-2xl bg-black/95 p-3 ring-2 ring-[color:var(--neon-yellow)]/60 shadow-[0_0_40px_var(--neon-yellow)]/50">
                      <div className="h-36">
                        <ReelStrip speed="slow" />
                      </div>
                      <div className="h-36">
                        <ReelStrip speed="med" />
                      </div>
                      <div className="h-36">
                        <ReelStrip speed="fast" />
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
                  className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 text-[color:var(--neon-cyan)] hover:text-[color:var(--neon-yellow)]"
                >
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em]">
                    Spin next
                  </span>
                  <ArrowDown className="size-4 animate-scroll-cue" aria-hidden />
                </button>
              )}
            </section>
          );
        })}

        {/* Closing CTA panel */}
        <section className="relative flex min-h-[80svh] snap-start items-center justify-center overflow-hidden px-6 py-24 text-center">
          <div
            aria-hidden
            className="absolute inset-0 opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(circle at 30% 50%, var(--neon-pink), transparent 50%), radial-gradient(circle at 70% 50%, var(--neon-cyan), transparent 50%)",
            }}
          />
          <CoinShower />
          <div className="relative mx-auto max-w-2xl space-y-6">
            <Sparkles className="mx-auto size-10 text-[color:var(--neon-yellow)] drop-shadow-[0_0_18px_var(--neon-yellow)]" aria-hidden />
            <h2 className="neon-text font-display text-5xl sm:text-7xl">
              That's the line-up.
            </h2>
            <p className="text-lg text-foreground/90">
              New cabinets land every few weeks. The best way to see what's
              spinning today is to step inside.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link
                to="/venues"
                className="play-button inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-black uppercase tracking-widest"
              >
                <MapPin className="size-4" aria-hidden />
                Find your nearest Webbers
              </Link>
              <Link
                to="/safer-gambling"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-4 text-sm font-bold uppercase tracking-widest text-foreground hover:bg-white/5"
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
