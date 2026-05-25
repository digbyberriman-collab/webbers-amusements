import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, ShieldCheck, Users } from "lucide-react";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/PageHero";
import founderImg from "@/assets/arthur-webber-senior.jpg";
import dodgemsImg from "@/assets/webbers-dodgems-rhyl.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `Our Story — ${siteConfig.brand.name}` },
      {
        name: "description",
        content:
          "Three generations of the Webber family — from a 1954 confectionery counter in Rhyl to five premium adult gaming centres across Chester, North Wales and Greater Manchester. Licensed by the UK Gambling Commission.",
      },
      {
        property: "og:title",
        content: `Our Story — ${siteConfig.brand.name}`,
      },
      {
        property: "og:description",
        content:
          "A family business since 1954 — the Webber story, from post-war seaside arcades to modern adult gaming.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.brand.name,
          alternateName: siteConfig.brand.short,
          description: siteConfig.brand.description,
          foundingDate: String(siteConfig.brand.foundedYear),
          founder: {
            "@type": "Person",
            name: siteConfig.brand.founder,
          },
          foundingLocation: siteConfig.brand.origin,
          parentOrganization: {
            "@type": "Organization",
            name: siteConfig.brand.parent,
          },
          areaServed: ["Chester", "North Wales", "Greater Manchester"],
        }),
      },
    ],
  }),
  component: AboutPage,
});

const generations = [
  {
    ordinal: "First generation",
    name: siteConfig.brand.founder,
    period: "1954 — 1970s",
    body: "Founded the business in Rhyl with a confectionery counter supplying Woolworths and the seaside trade. Moved the family onto the fairgrounds and into the first arcades along the North Wales coast.",
  },
  {
    ordinal: "Second generation",
    name: "The next generation",
    period: "1970s — 2000s",
    body: "Took the family into rides, family entertainment centres and permanent high-street arcades — anchoring the long-standing Rhyl and Caernarfon rooms and opening the first venue in Chester.",
  },
  {
    ordinal: "Third generation",
    name: "The third generation today",
    period: "2010s — now",
    body: "Modernised the estate into premium, fully-licensed Adult Gaming Centres. Five rooms across Chester, North Wales and Greater Manchester, running to the same family standards.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Hospitality first",
    body: "A Webbers room should feel calm, welcoming and well-staffed — never pushy. People come back because they feel looked after.",
  },
  {
    icon: Users,
    title: "Built for the community",
    body: "Our venues are part of the local high street. We employ locally, support local causes, and stay involved year-round.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible by default",
    body: "A licensed operator with trained staff, robust age-checking and a strong commitment to safer gambling tools.",
  },
];

function AboutPage() {
  const yearsInFamily =
    new Date().getFullYear() - siteConfig.brand.foundedYear;

  return (
    <>
      <PageHero
        eyebrow="Our story"
        title={
          <>
            Three generations.{" "}
            <span className="italic text-brass">One family.</span>
          </>
        }
        intro={`A family business since ${siteConfig.brand.foundedYear} — from a confectionery counter in ${siteConfig.brand.origin} to five premium adult gaming centres across Chester, North Wales and Greater Manchester.`}
      />

      {/* ============================================================
          FOUNDER NARRATIVE
          ============================================================ */}
      <section className="px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto grid max-w-7xl items-start gap-16 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
              <img
                src={founderImg}
                alt={`${siteConfig.brand.founder} — founder of the Webber family business, photographed in the mid-20th century.`}
                loading="lazy"
                className="img-cinematic aspect-[4/5] w-full object-cover object-top"
                width={1280}
                height={1600}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-brass p-7 text-ink shadow-2xl sm:block">
              <p className="font-display text-5xl font-bold leading-none">
                {yearsInFamily}
              </p>
              <p className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em]">
                Years
                <br />
                in the family
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <p className="eyebrow">The founder</p>
            <h2 className="font-display text-4xl leading-tight text-balance text-foreground sm:text-5xl">
              It started with{" "}
              <span className="italic text-brass">
                {siteConfig.brand.founder}
              </span>{" "}
              in Rhyl.
            </h2>
            <div className="space-y-5 text-muted-foreground">
              <p>
                In {siteConfig.brand.foundedYear}, {siteConfig.brand.founder}{" "}
                set up a confectionery manufacturing business in{" "}
                {siteConfig.brand.origin}, supplying the Woolworths counter and
                the North Wales seaside trade. A decade later the family moved
                onto the seafront fairgrounds — building rides, running penny
                falls and looking after the rooms that local children grew up
                in.
              </p>
              <p>
                Through the 1970s and 80s the family expanded into family
                entertainment centres, and by the 1990s had opened permanent
                rooms in Rhyl and Caernarfon. In the 2000s the business
                crossed the border into Chester, bringing the same standards
                to a cathedral city.
              </p>
              <p>
                Today the estate is modernised into premium, fully-licensed
                Adult Gaming Centres — curated floors of cabinets from{" "}
                {siteConfig.partners.slice(0, -1).join(", ")} and{" "}
                {siteConfig.partners[siteConfig.partners.length - 1]}. We are
                a longstanding member of {siteConfig.compliance.tradeBody} and
                fully licensed by the {siteConfig.compliance.regulator}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          HERITAGE PHOTO — Webbers Super Dodgems, Rhyl
          ============================================================ */}
      <section className="border-t border-white/5 bg-ink px-6 pb-[var(--section-y)] lg:px-10">
        <figure className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
            <img
              src={dodgemsImg}
              alt="The original Webbers Super Dodgems ride on the seafront in Rhyl, North Wales."
              loading="lazy"
              className="img-cinematic aspect-[4/3] w-full object-cover sm:aspect-[16/9]"
              width={2000}
              height={1125}
            />
          </div>
          <figcaption className="mt-5 flex flex-col gap-1 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span className="text-brass">Archive — Rhyl seafront</span>
            <span>The original Webbers Super Dodgems</span>
          </figcaption>
        </figure>
      </section>

      {/* ============================================================
          THREE THINGS — values
          ============================================================ */}
      <section className="border-y border-white/5 bg-surface/30 px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <p className="eyebrow">What we stand by</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Three things have never changed.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-white/5 md:grid-cols-3">
            {values.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-ink p-10">
                <Icon className="mb-6 size-5 text-brass" aria-hidden />
                <h3 className="font-display text-2xl text-foreground">
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

      {/* ============================================================
          TIMELINE — the heritage chronology
          ============================================================ */}
      <section className="px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 max-w-xl">
            <p className="eyebrow">The timeline</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              From the seafront to the high street.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Seven decades, one family. The major moments in the Webber
              story.
            </p>
          </div>

          <ol className="relative space-y-14 border-l border-brass/30 pl-10">
            {siteConfig.timeline.map((t) => (
              <li key={t.decade} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[2.85rem] top-1.5 grid size-5 place-items-center rounded-full bg-ink ring-1 ring-brass/60"
                >
                  <span className="size-1.5 rounded-full bg-brass" />
                </span>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-brass">
                  {t.decade}
                </p>
                <h3 className="mt-3 font-display text-2xl leading-tight text-foreground">
                  {t.title}
                </h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                  {t.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================================================
          THREE GENERATIONS
          ============================================================ */}
      <section className="border-y border-white/5 bg-surface/30 px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <p className="eyebrow">The family</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Three generations of the Webber family.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {generations.map((gen) => (
              <article
                key={gen.ordinal}
                className="lift rounded-2xl bg-ink p-8 ring-1 ring-white/5"
              >
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-brass">
                  {gen.ordinal}
                </p>
                <h3 className="mt-4 font-display text-2xl leading-tight text-foreground">
                  {gen.name}
                </h3>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {gen.period}
                </p>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  {gen.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          COMMITMENT BAND
          ============================================================ */}
      <section className="px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow">Our commitment</p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-balance text-foreground sm:text-4xl">
            A licensed, regulated, family-run operator.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            {siteConfig.brand.name} is licensed by the{" "}
            {siteConfig.compliance.regulator} and a longstanding member of{" "}
            {siteConfig.compliance.tradeBody}. Every venue operates a strict{" "}
            {siteConfig.compliance.idPolicy} ID policy, runs trained staff
            year-round, and is built around the safer gambling tools our
            guests rely on.
          </p>
          <div className="mt-10 inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-white/10 bg-surface/40 px-8 py-5 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            <span>{siteConfig.compliance.regulator} licensed</span>
            <span aria-hidden className="text-brass/50">
              ·
            </span>
            <span>{siteConfig.compliance.tradeBody} member</span>
            <span aria-hidden className="text-brass/50">
              ·
            </span>
            <span>{siteConfig.compliance.idPolicy}</span>
            <span aria-hidden className="text-brass/50">
              ·
            </span>
            <span>Strictly 18+</span>
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA
          ============================================================ */}
      <section className="border-t border-white/5 bg-ink px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl leading-tight text-balance text-foreground sm:text-5xl">
            Come and see a room for yourself.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Five rooms across Chester, North Wales and Greater Manchester —
            no booking, no pressure. We've kept a seat for you.
          </p>
          <div className="mt-10">
            <Link
              to="/venues"
              className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-deep"
            >
              Visit a Webbers venue
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
