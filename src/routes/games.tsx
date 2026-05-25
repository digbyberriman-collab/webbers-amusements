import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { siteConfig, type Game } from "@/config/site";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: `Games — ${siteConfig.brand.name}` },
      {
        name: "description",
        content:
          "Browse the Webbers game library — modern slots, classic reels, electronic roulette and community jackpots. Maximum slot prize £500. Over 18s only.",
      },
      { property: "og:title", content: `Games — ${siteConfig.brand.name}` },
      {
        property: "og:description",
        content:
          "Modern slots, classics, community jackpots and electronic roulette at Webbers Chester.",
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

const allFeatures = Array.from(
  new Set(siteConfig.games.flatMap((g) => g.features)),
);

function GamesPage() {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<Game["type"] | "All">("All");
  const [activeFeatures, setActiveFeatures] = useState<string[]>([]);
  const [showNewFirst, setShowNewFirst] = useState(false);

  const filtered = useMemo(() => {
    let list = siteConfig.games.filter((g) => {
      if (activeType !== "All" && g.type !== activeType) return false;
      if (
        activeFeatures.length &&
        !activeFeatures.every((f) => g.features.includes(f))
      )
        return false;
      if (
        query &&
        !`${g.name} ${g.description} ${g.features.join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
        return false;
      return true;
    });
    if (showNewFirst) {
      list = [...list].sort(
        (a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false),
      );
    }
    return list;
  }, [query, activeType, activeFeatures, showNewFirst]);

  const toggleFeature = (f: string) =>
    setActiveFeatures((curr) =>
      curr.includes(f) ? curr.filter((x) => x !== f) : [...curr, f],
    );

  return (
    <>
      <PageHero
        eyebrow="The library"
        title={
          <>
            Every game,{" "}
            <span className="italic text-gold">on the floor.</span>
          </>
        }
        intro={`Filter, search and sort our current line-up. Maximum slot prize £${siteConfig.compliance.maxSlotPrize}. Strictly over 18s.`}
      />

      <section className="px-6 pb-28 pt-16">
        <div className="mx-auto max-w-7xl">
          {/* Controls */}
          <div className="mb-10 space-y-6 rounded-2xl bg-surface/40 p-6 ring-1 ring-white/5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search games, features…"
                  aria-label="Search games"
                  className="w-full rounded-full border border-white/10 bg-ink py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/40 focus:outline-none"
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={showNewFirst}
                  onChange={(e) => setShowNewFirst(e.target.checked)}
                  className="size-4 accent-[var(--color-gold)]"
                />
                Show newest first
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Type
              </span>
              {types.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveType(t)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                    activeType === t
                      ? "border-gold bg-gold text-ink"
                      : "border-white/10 text-muted-foreground hover:border-gold/40 hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Features
              </span>
              {allFeatures.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => toggleFeature(f)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                    activeFeatures.includes(f)
                      ? "border-gold/60 bg-gold/10 text-gold"
                      : "border-white/10 text-muted-foreground hover:border-gold/40 hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
              {(activeFeatures.length > 0 ||
                activeType !== "All" ||
                query) && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveFeatures([]);
                    setActiveType("All");
                    setQuery("");
                  }}
                  className="ml-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-gold"
                >
                  <X className="size-3" aria-hidden /> Reset
                </button>
              )}
            </div>
          </div>

          <p className="mb-6 text-sm text-muted-foreground">
            Showing <span className="text-foreground">{filtered.length}</span>{" "}
            of {siteConfig.games.length} games
          </p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((g) => (
              <article
                key={g.id}
                className="group rounded-2xl bg-surface p-6 ring-1 ring-white/5 transition-all hover:ring-gold/30"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground">
                    {g.type}
                  </span>
                  {g.isNew && (
                    <span className="rounded-full bg-electric/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-electric">
                      New
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-display text-2xl text-foreground">
                  {g.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {g.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {g.features.map((f) => (
                    <span
                      key={f}
                      className="rounded border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 font-mono text-[10px] uppercase tracking-widest">
                  <span className="text-muted-foreground">Max prize</span>
                  <span className="text-gold">£{g.maxPrize}</span>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center text-muted-foreground">
              No games match those filters. Try resetting.
            </div>
          )}
        </div>
      </section>

      {/* New to gaming */}
      <section className="border-t border-white/5 bg-surface/30 px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              New to gaming?
            </p>
            <h2 className="mt-3 font-display text-4xl text-foreground">
              The plain-English guide.
            </h2>
            <p className="mt-4 text-muted-foreground">
              The reels look complicated, but they're not. Here's the short
              version, and we're always happy to walk you through it in venue.
            </p>
          </div>
          <dl className="space-y-6">
            {[
              {
                q: "How do the machines work?",
                a: "You insert credit, choose a stake within the machine's limit, then spin. Wins are paid back to the credit meter — you can stop and collect at any time.",
              },
              {
                q: "What does 'max prize' mean?",
                a: `On an Adult Gaming Centre slot, the most you can win on a single play is £${siteConfig.compliance.maxSlotPrize}. We display this clearly on every game.`,
              },
              {
                q: "What's a feature, free spin, or megaways?",
                a: "These are bonus rounds and ways to win built into the game. Each title lists its features on its info screen — and our team can show you live.",
              },
              {
                q: "How do I play within my limits?",
                a: "Decide before you play how much time and money you're willing to spend, and stick to it. We have tools on the Safer Gambling page to help.",
              },
            ].map((item) => (
              <div key={item.q} className="border-b border-white/5 pb-6">
                <dt className="font-display text-lg text-foreground">
                  {item.q}
                </dt>
                <dd className="mt-2 text-sm text-muted-foreground">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
