import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/promotions")({
  head: () => ({
    meta: [
      { title: `Promotions — ${siteConfig.brand.name}` },
      {
        name: "description",
        content:
          "Current promotions and member events at Webbers Amusements. 18+ only, T&Cs apply.",
      },
      { property: "og:title", content: `Promotions — ${siteConfig.brand.name}` },
      {
        property: "og:description",
        content: "Current promotions and member events at Webbers Amusements.",
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
            Current <span className="italic text-gold">promotions</span>.
          </>
        }
        intro="A handful of small things that make a Webbers visit better. All offers are 18+ and T&Cs apply."
      />

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {siteConfig.promotions.map((p) => (
            <article
              key={p.id}
              className="group rounded-2xl bg-surface p-8 ring-1 ring-white/5 glow-hover"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="rounded-full bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold">
                  {p.badge}
                </span>
                <span className="text-xs text-muted-foreground">
                  {p.startsOn}
                  {p.endsOn ? ` — ${p.endsOn}` : ""}
                </span>
              </div>
              <h2 className="font-display text-3xl text-foreground">
                {p.title}
              </h2>
              <p className="mt-4 text-muted-foreground">{p.description}</p>
              <p className="mt-8 text-[10px] uppercase tracking-widest text-muted-foreground">
                18+ · T&Cs apply · Speak to a member of the team in venue
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
