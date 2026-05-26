import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/promotions")({
  head: () => ({
    meta: [
      { title: `What's On — ${siteConfig.brand.name}` },
      {
        name: "description",
        content:
          "Small, in-venue offerings at Webbers Amusements — weekend hospitality, the Webbers Club and new cabinet announcements. Strictly 18+, T&Cs apply.",
      },
      {
        property: "og:title",
        content: `What's On — ${siteConfig.brand.name}`,
      },
      {
        property: "og:description",
        content:
          "Small things that make a Webbers visit better — weekend hospitality, the Webbers Club and new cabinets on the floor.",
      },
      { property: "og:url", content: "/promotions" },
    ],
    links: [{ rel: "canonical", href: "/promotions" }],
  }),
  component: PromotionsPage,
});

function PromotionsPage() {
  return (
    <>
      <PageHero
        eyebrow="What's on"
        title={
          <>
            Small things that{" "}
            <span className="italic text-brass">make a visit better.</span>
          </>
        }
        intro="No flashing offers, no headline jackpots — just a handful of in-venue thank-yous, member benefits and quiet announcements from the floor. All offers are strictly 18+ and T&Cs apply."
      />

      {/* ============================================================
          PROMOTION CARDS
          ============================================================ */}
      <section className="px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {siteConfig.promotions.map((promo) => (
              <article
                key={promo.id}
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
                <h2 className="font-display text-2xl leading-tight text-foreground">
                  {promo.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {promo.description}
                </p>
                <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  18+ · T&amp;Cs apply · Speak to a member of the team in
                  venue
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          CLOSING BAND — speak to staff in venue
          ============================================================ */}
      <section className="border-y border-white/5 bg-surface/30 px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-7">
            <p className="eyebrow">In venue</p>
            <h2 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
              The best offers aren't on a poster.
            </h2>
            <p className="text-muted-foreground">
              The team in each venue know what's just landed, who's a member,
              and when the next cabinet is on its way. Drop in, say hello,
              and ask at the cashier — that's where the good stuff lives.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 lg:col-span-5 lg:justify-end">
            <Link
              to="/venues"
              className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-deep"
            >
              <MapPin className="size-4" aria-hidden />
              Find your nearest venue
            </Link>
            <Link
              to="/contact"
              className="link-underline inline-flex items-center gap-2 self-center text-sm font-semibold text-brass"
            >
              Or get in touch
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          COMPLIANCE FOOTNOTE
          ============================================================ */}
      <section className="border-b border-white/5 bg-ink">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            Strictly 18+ · T&amp;Cs apply · Maximum slot prize £
            {siteConfig.compliance.maxSlotPrize} · Play within your limits
          </p>
        </div>
      </section>
    </>
  );
}
