import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/motion";

import slotsImg from "@/assets/game-slots.jpg";
import jackpotImg from "@/assets/game-jackpot.jpg";
import rouletteImg from "@/assets/game-roulette.jpg";
import reelKingImg from "@/assets/games/reel-king.jpg";
import electronicRouletteImg from "@/assets/games/electronic-roulette.jpg";
import fishinImg from "@/assets/games/fishin-frenzy.jpg";

// Map the configured games to floor photography (index-aligned to siteConfig.games).
const GAME_IMAGES = [
  slotsImg,
  jackpotImg,
  rouletteImg,
  electronicRouletteImg,
  reelKingImg,
  fishinImg,
];

export function AttractionsShowcase() {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 24 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: amount * dir, behavior: "smooth" });
  };

  return (
    <section className="overflow-hidden py-[var(--section-y)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">On the floor</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              A taste of what's spinning.
            </h2>
            <p className="mt-4 text-muted-foreground">
              A small selection from the full library — Megaways, Cash Collect, classic reels and
              electronic roulette, refreshed across the estate month to month.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous games"
              className="grid size-11 place-items-center rounded-full border border-white/10 text-foreground transition-colors hover:border-brass hover:text-brass"
            >
              <ArrowLeft className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="More games"
              className="grid size-11 place-items-center rounded-full border border-white/10 text-foreground transition-colors hover:border-brass hover:text-brass"
            >
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </div>
        </Reveal>
      </div>

      {/* Scroll-snap rail — swipeable on mobile, arrow-driven on desktop. */}
      <div
        ref={railRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-pl-6 px-6 pb-2 lg:scroll-pl-10 lg:px-10"
      >
        {siteConfig.games.map((game, i) => (
          <article
            key={game.id}
            data-card
            className="lift group relative w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl bg-surface ring-1 ring-white/5 sm:w-[20rem]"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={GAME_IMAGES[i % GAME_IMAGES.length]}
                alt={`${game.name} on the Webbers floor`}
                loading="lazy"
                className="img-cinematic size-full object-cover opacity-70 transition-all duration-[1200ms] group-hover:scale-[1.05] group-hover:opacity-95"
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
              <h3 className="font-display text-2xl leading-tight text-foreground">{game.name}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{game.description}</p>
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                  Max prize £{game.maxPrize}
                </span>
                {game.ways && <span className="text-xs text-muted-foreground">{game.ways}</span>}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mt-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <Link
            to="/games"
            className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-brass"
          >
            View the full gaming floor
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            Maximum slot prize £{siteConfig.compliance.maxSlotPrize} · Strictly 18+ · Play within
            your limits
          </p>
        </div>
      </div>
    </section>
  );
}
