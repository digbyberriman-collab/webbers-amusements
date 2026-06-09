import { createFileRoute, Link } from "@tanstack/react-router";
import { Coffee, Heart, MapPin, ShieldCheck, Users } from "lucide-react";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/PageHero";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: `Careers — ${siteConfig.brand.name}` },
      {
        name: "description",
        content: `Work with Webbers Amusements — a family-run UK leisure business since ${siteConfig.brand.foundedYear}. Roles across five Adult Gaming Centres in Chester, North Wales and Greater Manchester.`,
      },
      {
        property: "og:title",
        content: `Careers — ${siteConfig.brand.name}`,
      },
      {
        property: "og:description",
        content: `Work with a family-run UK leisure business — five venues, three generations, calm hospitality.`,
      },
      { property: "og:url", content: "/careers" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: CareersPage,
});

const reasons = [
  {
    icon: Heart,
    title: "Hospitality, not pressure",
    body: "We hire for warmth and good judgement. The cabinets are looked after; the customers are looked after; you'll be too.",
  },
  {
    icon: Users,
    title: "A family business, properly",
    body: "Three generations of the Webber family still run the company. Decisions are made by people who answer the phone, not a head-office number.",
  },
  {
    icon: MapPin,
    title: "Hire local, stay local",
    body: "Every venue is staffed by people who live nearby. We don't shuffle teams between towns or run skeleton rotas.",
  },
  {
    icon: Coffee,
    title: "Trained from day one",
    body: "Full safer-gambling, age-verification and customer-interaction training, paid time on the floor with senior colleagues, ongoing development.",
  },
];

type Role = {
  title: string;
  venue: string;
  type: string;
  draft?: boolean;
};

const roles: Role[] = [
  {
    title: "Floor Host",
    venue: "Webbers Walkden — Bolton Road",
    type: "Full time",
    draft: true,
  },
  {
    title: "Cashier",
    venue: "Webbers Chester — Frodsham Street",
    type: "Part time",
    draft: true,
  },
  {
    title: "Venue Manager",
    venue: "Webbers Caernarfon — Pool Street",
    type: "Full time",
    draft: true,
  },
];

function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers at Webbers"
        title={
          <>
            Work somewhere that{" "}
            <span className="italic text-brass">knows your name.</span>
          </>
        }
        intro={`A family-run leisure business since ${siteConfig.brand.foundedYear}. Five Adult Gaming Centres across Chester, North Wales and Greater Manchester — looking for people who care about doing the small things well.`}
      />

      {/* ============================================================
          WHY WORK HERE
          ============================================================ */}
      <section className="border-y border-white/5 bg-surface/30 px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <p className="eyebrow">Why Webbers</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              The kind of place we'd want to work.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-white/5 md:grid-cols-2">
            {reasons.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-ink p-10">
                <Icon className="mb-6 size-5 text-brass" aria-hidden />
                <h3 className="font-display text-xl text-foreground">
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
          OPEN ROLES
          ============================================================ */}
      <section className="px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <p className="eyebrow">Open roles</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Currently hiring.
            </h2>
            <p className="mt-4 text-muted-foreground">
              <Placeholder>
                The roles below are example listings, pending client
                confirmation. Replace with live vacancies as they open.
              </Placeholder>
            </p>
          </div>
          <ul className="divide-y divide-white/5 overflow-hidden rounded-2xl ring-1 ring-white/10">
            {roles.map((role) => (
              <li
                key={`${role.title}-${role.venue}`}
                className="grid items-center gap-4 bg-surface/30 px-6 py-6 sm:grid-cols-[1fr_auto] sm:gap-8"
              >
                <div>
                  <p className="font-display text-xl text-foreground">
                    {role.draft ? (
                      <Placeholder>{role.title}</Placeholder>
                    ) : (
                      role.title
                    )}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {role.draft ? (
                      <Placeholder>{role.venue} · {role.type}</Placeholder>
                    ) : (
                      `${role.venue} · ${role.type}`
                    )}
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-brass hover:text-brass"
                >
                  Express interest
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================================================
          HOW TO APPLY
          ============================================================ */}
      <section className="border-t border-white/5 bg-ink px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <ShieldCheck className="mx-auto size-6 text-brass" aria-hidden />
          <h2 className="mt-6 font-display text-4xl leading-tight text-balance text-foreground sm:text-5xl">
            Want to come and work with us?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Drop into the venue you'd like to work at, hand your CV to the
            cashier and ask to speak to the Venue Manager — that's
            genuinely how most of our team got the job. Or send a note
            through our contact form and we'll come back to you.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-deep"
            >
              Send us a note
            </Link>
            <Link
              to="/venues"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-brass hover:text-brass"
            >
              Find your nearest venue
            </Link>
          </div>
          <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            Strictly 18+ to work on the gaming floor · {siteConfig.compliance.idPolicy} ID policy
          </p>
        </div>
      </section>
    </>
  );
}
