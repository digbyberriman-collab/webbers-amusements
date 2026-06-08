import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { todaysHours } from "@/lib/hours";
import { Reveal } from "@/components/motion";

function chesterSuffix(addressLine: string): string | null {
  if (addressLine.includes("Frodsham")) return "Frodsham St";
  if (addressLine.includes("Northgate")) return "Northgate St";
  return null;
}

export function WhatsOn() {
  return (
    <section className="border-y border-white/5 bg-surface/30 px-6 py-[var(--section-y)] lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">Where to find us</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Five arcades, open today.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Two in Chester, one each in Caernarfon, Rhyl and Walkden. No booking, no pressure —
              pop in any day of the week.
            </p>
          </div>
          <Link
            to="/venues"
            className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-brass"
          >
            All venue details
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>

        {/* LOCATIONS — live open/closed status */}
        <div className="grid gap-px overflow-hidden rounded-2xl bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.venues.map((venue, i) => {
            const hours = todaysHours(venue);
            const suffix = chesterSuffix(venue.address[0]);
            return (
              <Reveal key={venue.slug} delay={Math.min(i * 0.06, 0.3)}>
                <Link
                  to="/venues/$slug"
                  params={{ slug: venue.slug }}
                  className="group flex h-full flex-col bg-ink p-8 transition-colors hover:bg-surface"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                      {venue.region}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] ${
                        hours.isOpen ? "bg-sage/15 text-sage" : "bg-white/5 text-muted-foreground"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`size-1.5 rounded-full ${
                          hours.isOpen ? "bg-sage" : "bg-muted-foreground/50"
                        }`}
                      />
                      {hours.isOpen ? "Open now" : "Closed"}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl text-foreground transition-colors group-hover:text-brass">
                    {venue.city}
                    {suffix && (
                      <span className="ml-2 text-base text-muted-foreground">{suffix}</span>
                    )}
                  </h3>
                  <address className="mt-3 not-italic text-sm leading-relaxed text-muted-foreground">
                    {venue.address.join(", ")}, {venue.postcode}
                  </address>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70">
                    Today · {hours.text}
                  </p>
                  <div className="mt-auto pt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brass">
                    Venue details
                    <ArrowRight
                      className="size-3.5 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* WHAT'S ON — promotions */}
        <Reveal className="mt-16 mb-8">
          <p className="eyebrow">What's on</p>
          <h3 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl">
            Small things that make a visit better.
          </h3>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {siteConfig.promotions.map((promo, i) => (
            <Reveal key={promo.id} delay={Math.min(i * 0.08, 0.24)}>
              <article className="lift h-full rounded-2xl bg-ink p-8 ring-1 ring-white/5">
                <div className="mb-6 flex items-center justify-between">
                  <span className="rounded-full bg-brass/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brass">
                    {promo.badge}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {promo.startsOn}
                    {promo.endsOn ? ` — ${promo.endsOn}` : ""}
                  </span>
                </div>
                <h4 className="font-display text-2xl leading-tight text-foreground">
                  {promo.title}
                </h4>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {promo.description}
                </p>
                <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  18+ · T&amp;Cs apply · Ask the team in venue
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
