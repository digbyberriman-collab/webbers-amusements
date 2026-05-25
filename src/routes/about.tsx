import { createFileRoute, Link } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/PageHero";
import heritageImg from "@/assets/heritage.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `Our Story — ${siteConfig.brand.name}` },
      {
        name: "description",
        content:
          "The Webber family has run amusement venues across Britain since the 1950s — from fairgrounds to the modern Adult Gaming Centres of today.",
      },
      { property: "og:title", content: `Our Story — ${siteConfig.brand.name}` },
      {
        property: "og:description",
        content:
          "A family business since 1954 — from post-war fairgrounds to modern adult gaming.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const timeline = [
  {
    decade: "1950s",
    title: "Fairgrounds & seaside arcades",
    body: "The first Webber-run sites open along the British coast — penny falls, classic AWP cabinets and a knack for keeping the rooms warm and well-run.",
  },
  {
    decade: "1970s",
    title: "Manufacturing & coin-op",
    body: "The family moves into building machines, supplying operators across the country with reliable, well-designed cabinets.",
  },
  {
    decade: "1990s",
    title: "Family entertainment centres",
    body: "Webber Leisure expands into multi-format FECs — bringing the same hospitality standards to a new generation.",
  },
  {
    decade: "Today",
    title: "Modern adult gaming",
    body: "Webbers Amusements operates licensed AGCs in Chester, Rhyl and Caernarfon — sophisticated rooms with the latest digital and classic titles.",
  },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`Since ${siteConfig.brand.foundedYear}`}
        title={
          <>
            A family <span className="italic text-gold">leisure</span> story.
          </>
        }
        intro="Three generations of the Webber family have built and run amusement venues across Britain. We're proud of where we came from, and how we run our rooms today."
      />

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
            <img
              src={heritageImg}
              alt="Vintage British amusement arcade from the 1950s"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover sepia"
              width={1280}
              height={1280}
            />
          </div>
          <div className="space-y-6 text-muted-foreground">
            <h2 className="font-display text-4xl text-foreground">
              Three things have never changed.
            </h2>
            <p>
              <span className="text-foreground font-semibold">Hospitality first.</span> A
              Webbers room should feel calm, welcoming and well-staffed — never
              pushy. People come back because they feel looked after.
            </p>
            <p>
              <span className="text-foreground font-semibold">Built for the community.</span>{" "}
              Our venues are part of the local high street. We employ locally,
              support local causes, and stay involved year-round.
            </p>
            <p>
              <span className="text-foreground font-semibold">Responsible by default.</span>{" "}
              We're a licensed operator with trained staff, robust age-checking
              and a strong commitment to safer gambling.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-surface/30 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 max-w-xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              The timeline
            </p>
            <h2 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
              From the seafront to Frodsham Street.
            </h2>
          </div>
          <ol className="relative space-y-12 border-l border-white/10 pl-8">
            {timeline.map((t) => (
              <li key={t.decade} className="relative">
                <span className="absolute -left-[2.4rem] top-1 grid size-6 place-items-center rounded-full bg-ink ring-1 ring-gold">
                  <span className="size-2 rounded-full bg-gold" />
                </span>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                  {t.decade}
                </p>
                <h3 className="mt-2 font-display text-2xl text-foreground">
                  {t.title}
                </h3>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                  {t.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 py-24 text-center">
        <Link
          to="/venues"
          className="inline-flex rounded-full bg-gold px-7 py-4 text-sm font-bold text-ink hover:bg-gold-deep"
        >
          Visit a Webbers venue
        </Link>
      </section>
    </>
  );
}
