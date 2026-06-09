import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/PageHero";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: `News — ${siteConfig.brand.name}` },
      {
        name: "description",
        content:
          "News and announcements from Webbers Amusements — venue openings, new cabinets, community partnerships and family-business updates.",
      },
      {
        property: "og:title",
        content: `News — ${siteConfig.brand.name}`,
      },
      {
        property: "og:description",
        content:
          "Venue openings, new cabinets and community partnerships from Webbers Amusements.",
      },
      { property: "og:url", content: "/news" },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: NewsPage,
});

type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  publishedOn: string;
  badge?: string;
  draft?: boolean;
};

const featured: NewsItem = {
  id: "walkden-opening",
  title: "Webbers Walkden opens on Bolton Road",
  excerpt:
    "Our newest Adult Gaming Centre is open seven days a week on the high street in Walkden, Greater Manchester. A few minutes from the M60, with a generous floor and the full modern cabinet line-up.",
  publishedOn: "Recently",
  badge: "Venue opening",
  draft: true,
};

const items: NewsItem[] = [
  {
    id: "new-cabinets",
    title: "New on the floor — autumn cabinet refresh",
    excerpt:
      "Fresh titles from Light & Wonder and Blueprint are landing across the estate over the next few weeks. Ask the cashier what's just been installed at your local Webbers.",
    publishedOn: "Recently",
    badge: "Floor update",
    draft: true,
  },
  {
    id: "weekend-welcome",
    title: "The Weekend Welcome returns",
    excerpt:
      "Complimentary tea, coffee and pastries for every player, every Saturday and Sunday morning — a small Webber-family thank-you for choosing us.",
    publishedOn: "Ongoing",
    badge: "In venue",
    draft: true,
  },
];

function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News & announcements"
        title={
          <>
            What's happening{" "}
            <span className="italic text-brass">at Webbers.</span>
          </>
        }
        intro="Venue openings, new cabinets, community partnerships, and the occasional family-business update."
      />

      {/* ============================================================
          FEATURED — the most recent / important
          ============================================================ */}
      <section className="px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto max-w-6xl">
          <article className="lift rounded-2xl bg-surface ring-1 ring-white/10">
            <div className="grid gap-10 p-8 lg:grid-cols-[2fr_3fr] lg:p-12">
              <div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-terracotta/15 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-terracotta">
                    {featured.badge}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {featured.draft ? (
                      <Placeholder>{featured.publishedOn}</Placeholder>
                    ) : (
                      featured.publishedOn
                    )}
                  </span>
                </div>
                <h2 className="mt-6 font-display text-3xl leading-tight text-foreground sm:text-4xl">
                  {featured.draft ? (
                    <Placeholder>{featured.title}</Placeholder>
                  ) : (
                    featured.title
                  )}
                </h2>
              </div>
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  {featured.draft ? (
                    <Placeholder>{featured.excerpt}</Placeholder>
                  ) : (
                    featured.excerpt
                  )}
                </p>
                <Link
                  to="/venues/$slug"
                  params={{ slug: "walkden" }}
                  className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-brass"
                >
                  Visit Webbers Walkden
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ============================================================
          NEWS LIST — more from the floor
          ============================================================ */}
      <section className="border-t border-white/5 bg-surface/30 px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-xl">
            <p className="eyebrow">More from the floor</p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-foreground sm:text-4xl">
              A quieter sort of news.
            </h2>
            <p className="mt-4 text-muted-foreground">
              <Placeholder>
                These are placeholder articles. Replace them with real
                announcements as they're published — the layout is ready
                for them.
              </Placeholder>
            </p>
          </div>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="lift flex flex-col rounded-2xl bg-ink p-7 ring-1 ring-white/5"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-brass/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brass">
                    {item.badge}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {item.publishedOn}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl leading-tight text-foreground">
                  {item.draft ? (
                    <Placeholder>{item.title}</Placeholder>
                  ) : (
                    item.title
                  )}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.draft ? (
                    <Placeholder>{item.excerpt}</Placeholder>
                  ) : (
                    item.excerpt
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA
          ============================================================ */}
      <section className="border-t border-white/5 bg-ink px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Sparkles className="mx-auto size-6 text-brass" aria-hidden />
          <h2 className="mt-6 font-display text-3xl leading-tight text-balance text-foreground sm:text-4xl">
            The best news comes from the cashier desk.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Drop into a venue and ask what's just landed — that's where
            we hear about the next cabinet, the next promotion and the
            next thing worth knowing.
          </p>
          <Link
            to="/venues"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-brass px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-deep"
          >
            <MapPin className="size-4" aria-hidden />
            Find your nearest venue
          </Link>
        </div>
      </section>
    </>
  );
}
