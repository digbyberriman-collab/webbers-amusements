import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  MapPin,
  Phone,
  Users,
} from "lucide-react";
import { siteConfig, type Venue } from "@/config/site";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { todaysHours, weeklyHoursTable } from "@/lib/hours";

export const Route = createFileRoute("/venues")({
  head: () => ({
    meta: [
      { title: `Venues — ${siteConfig.brand.name}` },
      {
        name: "description",
        content:
          "Five Webbers Amusements Adult Gaming Centres — Chester (Frodsham Street and Northgate Street), Caernarfon, Rhyl and Walkden. Addresses, phone numbers, weekly opening hours and directions for every venue.",
      },
      {
        property: "og:title",
        content: `Venues — ${siteConfig.brand.name}`,
      },
      {
        property: "og:description",
        content:
          "Five premium Adult Gaming Centres across Chester, North Wales and Greater Manchester. Family-run, licensed by the UK Gambling Commission.",
      },
      { property: "og:url", content: "/venues" },
    ],
    links: [{ rel: "canonical", href: "/venues" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": siteConfig.venues.map((v) => ({
            "@type": "LocalBusiness",
            "@id": `/venues#${v.slug}`,
            name: v.name,
            description: v.character,
            telephone: v.phone,
            address: {
              "@type": "PostalAddress",
              streetAddress: v.address.join(", "),
              addressLocality: v.city,
              addressRegion: v.region,
              postalCode: v.postcode,
              addressCountry: "GB",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: v.lat,
              longitude: v.lng,
            },
            openingHoursSpecification: openingHoursSpec(v),
            parentOrganization: {
              "@type": "Organization",
              name: siteConfig.brand.name,
            },
          })),
        }),
      },
    ],
  }),
  component: VenuesPage,
});

const dayNameMap: Record<string, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

function openingHoursSpec(venue: Venue) {
  return (Object.keys(dayNameMap) as Array<keyof typeof venue.hours>).map(
    (k) => {
      const h = venue.hours[k];
      if ("closed" in h) {
        return {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: dayNameMap[k],
          opens: "00:00",
          closes: "00:00",
        };
      }
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dayNameMap[k],
        opens: h.open,
        closes: h.close,
      };
    },
  );
}

function tabLabel(v: Venue) {
  if (v.city !== "Chester") return v.city;
  return v.slug === "chester-frodsham"
    ? "Chester · Frodsham St"
    : "Chester · Northgate St";
}

function mapEmbedUrl(v: Venue) {
  const bbox = [
    v.lng - 0.01,
    v.lat - 0.005,
    v.lng + 0.01,
    v.lat + 0.005,
  ]
    .map((n) => n.toFixed(5))
    .join("%2C");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${v.lat}%2C${v.lng}`;
}

function VenuesPage() {
  return (
    <>
      <PageHero
        eyebrow="Find your venue"
        title={
          <>
            Five Adult Gaming Centres.{" "}
            <span className="italic text-brass">One family.</span>
          </>
        }
        intro="Two in Chester, one each in Caernarfon, Rhyl and Walkden — a footprint that runs from the North Wales coast across to Greater Manchester. Same family, same standards."
      />

      {/* ============================================================
          STICKY VENUE TABS — anchor links to each section
          ============================================================ */}
      <nav
        aria-label="Jump to a venue"
        className="glass sticky top-16 z-30 border-y border-white/5"
      >
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-4 lg:px-10">
          {siteConfig.venues.map((v) => (
            <a
              key={v.slug}
              href={`#${v.slug}`}
              className="shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-brass hover:text-brass"
            >
              {tabLabel(v)}
            </a>
          ))}
        </div>
      </nav>

      {/* ============================================================
          VENUE SECTIONS — alternating editorial layout
          ============================================================ */}
      <div className="divide-y divide-white/5">
        {siteConfig.venues.map((venue, i) => (
          <VenueSection key={venue.slug} venue={venue} mapLeft={i % 2 === 0} />
        ))}
      </div>

      {/* ============================================================
          GROUP BOOKINGS / VENUE HIRE
          ============================================================ */}
      <section className="border-t border-white/5 bg-surface/30 px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-10 rounded-2xl bg-ink p-10 ring-1 ring-white/5 lg:grid-cols-[auto_1fr_auto] lg:p-14">
            <div className="grid size-14 place-items-center rounded-full bg-brass/10 text-brass">
              <Users className="size-6" aria-hidden />
            </div>
            <div>
              <p className="eyebrow">Group bookings &amp; venue hire</p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl">
                Bringing a group? Talk to us.
              </h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                For stag and hen visits, corporate evenings, charity nights
                and private bookings, we'll set the venue up around you.
                Available across all five locations.
              </p>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-deep"
            >
              Get in touch
              <ArrowRight className="size-3.5" aria-hidden />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

interface VenueSectionProps {
  venue: Venue;
  mapLeft: boolean;
}

function VenueSection({ venue, mapLeft }: VenueSectionProps) {
  const hours = todaysHours(venue);
  const week = weeklyHoursTable(venue);
  const telHref = `tel:${venue.phone.replace(/\s/g, "")}`;
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${venue.lat},${venue.lng}`;

  return (
    <section
      id={venue.slug}
      className="scroll-mt-24 px-6 py-[var(--section-y)] lg:px-10"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-5 lg:gap-16">
        <Reveal
          direction={mapLeft ? "left" : "right"}
          className={`${
            mapLeft ? "lg:order-1" : "lg:order-2"
          } overflow-hidden rounded-2xl ring-1 ring-white/10 lg:col-span-3`}
        >
          <div className="aspect-[4/3] w-full bg-surface">
            <iframe
              title={`Map of ${venue.name}`}
              src={mapEmbedUrl(venue)}
              loading="lazy"
              className="size-full grayscale-[60%] invert-[0.92] hue-rotate-180 contrast-[0.9]"
            />
          </div>
        </Reveal>

        <Reveal
          direction={mapLeft ? "right" : "left"}
          delay={140}
          className={`${
            mapLeft ? "lg:order-2" : "lg:order-1"
          } space-y-8 lg:col-span-2`}
        >
          <div>
            <p className="eyebrow">
              {venue.region} · {venue.signage}
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              {venue.city}
              {venue.city === "Chester" && (
                <span className="mt-2 block font-display text-xl italic text-brass">
                  {venue.slug === "chester-frodsham"
                    ? "Frodsham Street"
                    : "Northgate Street"}
                </span>
              )}
            </h2>
            <p className="mt-5 text-muted-foreground">{venue.character}</p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span
              aria-hidden
              className={`size-1.5 rounded-full ${
                hours.isOpen ? "bg-sage" : "bg-muted-foreground/40"
              }`}
            />
            <span className="font-mono uppercase tracking-[0.22em] text-foreground/80">
              {hours.isOpen ? "Open now" : "Closed"} · {hours.text}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin
                className="mt-0.5 size-4 shrink-0 text-brass"
                aria-hidden
              />
              <address className="not-italic text-sm leading-relaxed text-foreground/90">
                {venue.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <span className="block">
                  {venue.city}, {venue.postcode}
                </span>
              </address>
            </div>
            <div className="flex items-start gap-3">
              <Phone
                className="mt-0.5 size-4 shrink-0 text-brass"
                aria-hidden
              />
              <a
                href={telHref}
                className="link-underline text-sm text-foreground/90"
              >
                {venue.phone}
              </a>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-brass">
              <Clock className="size-3.5" aria-hidden />
              Weekly hours
            </div>
            <dl className="divide-y divide-white/5 rounded-xl border border-white/10 bg-surface/40 px-5 py-2 text-sm">
              {week.map((d) => (
                <div
                  key={d.key}
                  className="flex items-center justify-between py-2.5"
                >
                  <dt className="text-muted-foreground">{d.label}</dt>
                  <dd className="font-mono text-xs uppercase tracking-[0.18em] text-foreground/90">
                    {d.text}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/venues/$slug"
              params={{ slug: venue.slug }}
              className="group inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-deep"
            >
              View this venue
              <ArrowRight
                className="size-3.5 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-brass hover:text-brass"
            >
              <MapPin className="size-3.5" aria-hidden />
              Get directions
            </a>
            <a
              href={telHref}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-brass hover:text-brass"
            >
              <Phone className="size-3.5" aria-hidden />
              Call
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
