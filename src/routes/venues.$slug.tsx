import {
  createFileRoute,
  Link,
  notFound,
  useParams,
} from "@tanstack/react-router";
import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  BadgePoundSterling,
  Bus,
  Check,
  ChevronRight,
  Coffee,
  Ear,
  Landmark,
  MapPin,
  ParkingCircle,
  Phone,
  ShieldCheck,
  UserPlus,
  Users,
  Wifi,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { siteConfig, type Venue } from "@/config/site";
import { todaysHours, weeklyHoursTable } from "@/lib/hours";
import { Reveal } from "@/components/Reveal";
import { JustOpenedChip } from "@/components/JustOpenedChip";
import { useParallax } from "@/lib/useParallax";

const FACILITY_ICONS: Record<string, LucideIcon> = {
  Wifi,
  Coffee,
  BadgePoundSterling,
  Landmark,
  Accessibility,
  Ear,
  UserPlus,
  ShieldCheck,
  ParkingCircle,
  Bus,
};

const dayNameMap: Record<string, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

function findVenue(slug: string): Venue | undefined {
  return siteConfig.venues.find((v) => v.slug === slug);
}

function mapEmbedUrl(v: Venue) {
  const bbox = [v.lng - 0.01, v.lat - 0.005, v.lng + 0.01, v.lat + 0.005]
    .map((n) => n.toFixed(5))
    .join("%2C");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${v.lat}%2C${v.lng}`;
}

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

export const Route = createFileRoute("/venues/$slug")({
  loader: ({ params }) => {
    const venue = findVenue(params.slug);
    if (!venue) throw notFound();
    return { venue };
  },
  head: ({ params }) => {
    const venue = findVenue(params.slug);
    if (!venue) return { meta: [{ title: `Venue — ${siteConfig.brand.name}` }] };

    const title = `${venue.name} — Adult Gaming Centre in ${venue.city}`;
    const description = `${venue.character} Address: ${venue.address.join(
      ", ",
    )}, ${venue.city}, ${venue.postcode}. Open seven days a week. Strictly 18+.`;

    const facilityLabels = siteConfig.facilities
      .filter((f) => venue.facilities.includes(f.key))
      .map((f) => ({ "@type": "LocationFeatureSpecification", name: f.label, value: true }));

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `/venues/${venue.slug}` },
        { property: "og:type", content: "place" },
      ],
      links: [{ rel: "canonical", href: `/venues/${venue.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            // AmusementCenter is the closest schema.org type for a UK AGC.
            // We list LocalBusiness as a secondary @type so search engines
            // that don't recognise AmusementCenter still match it.
            "@type": ["AmusementCenter", "LocalBusiness"],
            "@id": `/venues/${venue.slug}`,
            url: `/venues/${venue.slug}`,
            name: venue.name,
            description: venue.character,
            telephone: venue.phone,
            priceRange: "££",
            isAccessibleForFree: true,
            publicAccess: true,
            image: venue.photos.hero,
            address: {
              "@type": "PostalAddress",
              streetAddress: venue.address.join(", "),
              addressLocality: venue.city,
              addressRegion: venue.region,
              postalCode: venue.postcode,
              addressCountry: "GB",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: venue.lat,
              longitude: venue.lng,
            },
            openingHoursSpecification: openingHoursSpec(venue),
            amenityFeature: facilityLabels,
            parentOrganization: {
              "@type": "Organization",
              name: siteConfig.brand.name,
              foundingDate: String(siteConfig.brand.foundedYear),
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Venues",
                item: "/venues",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: venue.name,
                item: `/venues/${venue.slug}`,
              },
            ],
          }),
        },
      ],
    };
  },
  component: VenueDetailPage,
});

function VenueDetailPage() {
  const { slug } = useParams({ from: "/venues/$slug" });
  const venue = findVenue(slug);
  const heroParallaxRef = useParallax<HTMLImageElement>(0.15);
  if (!venue) return null;

  const hours = todaysHours(venue);
  const week = weeklyHoursTable(venue);
  const telHref = `tel:${venue.phone.replace(/\s/g, "")}`;
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${venue.lat},${venue.lng}`;
  const facilityLookup = siteConfig.facilities.filter((f) =>
    venue.facilities.includes(f.key),
  );

  return (
    <>
      {/* ============================================================
          BREADCRUMB
          ============================================================ */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-white/5 bg-ink px-6 pt-32 pb-4 lg:px-10"
      >
        <ol className="mx-auto flex max-w-7xl items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <li>
            <Link
              to="/venues"
              className="inline-flex items-center gap-1.5 hover:text-brass"
            >
              <ArrowLeft className="size-3" aria-hidden />
              Venues
            </Link>
          </li>
          <li aria-hidden>
            <ChevronRight className="size-3 text-muted-foreground/40" />
          </li>
          <li className="text-foreground/80">{venue.city}</li>
        </ol>
      </nav>

      {/* ============================================================
          HERO — placeholder photograph + venue title block
          ============================================================ */}
      <section className="relative overflow-hidden bg-ink">
        <div className="relative aspect-[21/9] min-h-[440px] w-full">
          <img
            ref={heroParallaxRef}
            src={venue.photos.hero}
            alt={`${venue.name} — photography placeholder`}
            className="absolute inset-0 size-[115%] object-cover opacity-90"
            width={1600}
            height={900}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/15" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-transparent" />

          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-7xl px-6 pb-14 lg:px-10 lg:pb-20">
              <div className="max-w-2xl animate-rise">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="eyebrow">
                    {venue.region} · {venue.signage}
                  </p>
                  {venue.isJustOpened && <JustOpenedChip size="md" />}
                </div>
                <h1 className="mt-5 font-display text-5xl leading-[1.04] text-balance text-foreground sm:text-6xl lg:text-7xl">
                  {venue.city}
                  {venue.city === "Chester" && (
                    <span className="mt-2 block font-display text-2xl italic text-brass sm:text-3xl">
                      {venue.slug === "chester-frodsham"
                        ? "Frodsham Street"
                        : "Northgate Street"}
                    </span>
                  )}
                </h1>
                {venue.tagline && (
                  <p className="mt-5 font-display text-xl italic text-brass/90">
                    {venue.tagline}
                  </p>
                )}
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/85">
                  {venue.character}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-foreground/85">
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className={`size-1.5 rounded-full ${
                        hours.isOpen ? "bg-sage" : "bg-muted-foreground/40"
                      }`}
                    />
                    <span className="font-mono uppercase tracking-[0.22em]">
                      {hours.isOpen ? "Open now" : "Closed"} · {hours.text}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-3.5 text-brass" aria-hidden />
                    <span>
                      {venue.address.join(", ")}, {venue.postcode}
                    </span>
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <a
                    href={directionsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-deep"
                  >
                    <MapPin className="size-3.5" aria-hidden />
                    Get directions
                  </a>
                  <a
                    href={telHref}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-brass hover:text-brass"
                  >
                    <Phone className="size-3.5" aria-hidden />
                    Call venue
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          OPENING OFFERS — only on the newest venue
          ============================================================ */}
      {venue.isJustOpened && (
        <section className="border-b border-white/5 bg-terracotta/5 px-6 py-12 lg:px-10">
          <Reveal direction="up" className="mx-auto max-w-6xl">
            <div className="grid items-start gap-8 rounded-2xl bg-ink p-8 ring-1 ring-terracotta/20 sm:p-10 md:grid-cols-[auto_1fr]">
              <JustOpenedChip size="md" />
              <div className="space-y-5">
                <h2 className="font-display text-2xl leading-tight text-foreground sm:text-3xl">
                  Opening offers — drop in this week.
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-terracotta" />
                    <span>
                      <strong className="text-foreground">First visit?</strong>{" "}
                      Complimentary tea or coffee on the house — just ask
                      at the cashier when you arrive.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-terracotta" />
                    <span>
                      <strong className="text-foreground">Webbers Club sign-up.</strong>{" "}
                      Members get birthday cards, early access to new
                      cabinets and the occasional invitation. Register at
                      the cashier in venue — takes a minute.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-terracotta" />
                    <span>
                      <strong className="text-foreground">Open seven days</strong>,{" "}
                      9am — 10pm on weekdays. The team will show you
                      around — no booking, no pressure.
                    </span>
                  </li>
                </ul>
                <p className="pt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  18+ · T&Cs apply · One per visit
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* ============================================================
          PHOTO GALLERY — 4-tile placeholder grid
          ============================================================ */}
      <section className="px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal direction="up" className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">Inside the room</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl">
                A look around the {venue.city} floor.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Photography of the {venue.city} room — exterior, lounge,
                cabinets and cashier. Replace these placeholders with real
                imagery in <code className="font-mono text-xs text-brass">siteConfig.venues</code>.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {venue.photos.gallery.map((src, i) => (
              <Reveal
                key={i}
                direction={i % 2 === 0 ? "left" : "right"}
                delay={i * 90}
                className="overflow-hidden rounded-2xl bg-surface ring-1 ring-white/10"
              >
                <div className="aspect-square w-full">
                  <img
                    src={src}
                    alt={`${venue.city} venue — photography placeholder ${i + 1}`}
                    loading="lazy"
                    className="img-cinematic size-full object-cover"
                    width={800}
                    height={800}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          MEET THE TEAM
          ============================================================ */}
      <section className="border-y border-white/5 bg-surface/30 px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal direction="up" className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">Meet the team</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl">
                The room is the team.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Trained, certified and on the floor every day — the people
                who keep the {venue.city} room calm, well-run and welcoming.
              </p>
            </div>
            <Link
              to="/about"
              className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-brass"
            >
              About the family
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {venue.team.map((member, i) => (
              <Reveal
                as="article"
                key={`${member.role}-${i}`}
                direction="up"
                delay={i * 130}
                className="lift rounded-2xl bg-ink p-7 ring-1 ring-white/5"
              >
                <div className="mx-auto size-28 overflow-hidden rounded-full ring-1 ring-brass/30">
                  <img
                    src={member.portrait}
                    alt={`${member.role} — portrait placeholder`}
                    loading="lazy"
                    className="size-full object-cover"
                    width={224}
                    height={224}
                  />
                </div>
                <p className="mt-6 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-brass">
                  {member.role}
                </p>
                <h3 className="mt-2 text-center font-display text-xl text-foreground">
                  {member.name}
                </h3>
                {member.bio && (
                  <p className="mt-3 text-center text-sm leading-relaxed text-muted-foreground">
                    {member.bio}
                  </p>
                )}
              </Reveal>
            ))}
          </div>

          <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            Every team member is trained on safer-gambling tools, age
            verification and the Bacta multi-operator self-exclusion scheme.
          </p>
        </div>
      </section>

      {/* ============================================================
          FACILITIES
          ============================================================ */}
      <section className="px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal direction="up" className="mb-12 max-w-xl">
            <p className="eyebrow">Facilities</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              What's in the room.
            </h2>
            <p className="mt-4 text-muted-foreground">
              The same standards run through every Webbers venue — here's
              what's on offer at {venue.city}.
            </p>
          </Reveal>

          <div className="grid gap-px overflow-hidden rounded-2xl bg-white/5 sm:grid-cols-2">
            {facilityLookup.map((facility, i) => {
              const Icon = FACILITY_ICONS[facility.icon] ?? Check;
              return (
                <Reveal
                  key={facility.key}
                  direction={i % 2 === 0 ? "left" : "right"}
                  delay={i * 60}
                  className="flex items-start gap-4 bg-ink p-6"
                >
                  <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full bg-brass/10 text-brass">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-base text-foreground">
                      {facility.label}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          GETTING HERE — map + travel notes
          ============================================================ */}
      <section className="border-y border-white/5 bg-surface/30 px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="overflow-hidden rounded-2xl ring-1 ring-white/10 lg:col-span-3">
            <div className="aspect-[4/3] w-full bg-surface">
              <iframe
                title={`Map of ${venue.name}`}
                src={mapEmbedUrl(venue)}
                loading="lazy"
                className="size-full grayscale-[60%] invert-[0.92] hue-rotate-180 contrast-[0.9]"
              />
            </div>
          </div>

          <div className="space-y-8 lg:col-span-2">
            <div>
              <p className="eyebrow">Getting here</p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-foreground sm:text-4xl">
                Walk in. We've kept a seat for you.
              </h2>
            </div>

            <div className="space-y-5">
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
                <a href={telHref} className="link-underline text-sm">
                  {venue.phone}
                </a>
              </div>
            </div>

            {(venue.parkingNotes || venue.transportNotes) && (
              <div className="space-y-5 border-t border-white/5 pt-6 text-sm leading-relaxed text-muted-foreground">
                {venue.parkingNotes && (
                  <div>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-brass">
                      Parking
                    </p>
                    <p className="mt-2">{venue.parkingNotes}</p>
                  </div>
                )}
                {venue.transportNotes && (
                  <div>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-brass">
                      Public transport
                    </p>
                    <p className="mt-2">{venue.transportNotes}</p>
                  </div>
                )}
              </div>
            )}

            <div>
              <div className="mb-4 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-brass">
                Weekly hours
              </div>
              <dl className="divide-y divide-white/5 rounded-xl border border-white/10 bg-ink px-5 py-2 text-sm">
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
              <a
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-deep"
              >
                <MapPin className="size-3.5" aria-hidden />
                Get directions
              </a>
              <a
                href={telHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-brass hover:text-brass"
              >
                <Phone className="size-3.5" aria-hidden />
                Call venue
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          WHAT'S ON THE FLOOR — link out to /games
          ============================================================ */}
      <section className="px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-10 rounded-2xl bg-surface/40 p-10 ring-1 ring-white/5 lg:grid-cols-[auto_1fr_auto] lg:p-14">
            <div className="grid size-14 place-items-center rounded-full bg-brass/10 text-brass">
              <Users className="size-6" aria-hidden />
            </div>
            <div>
              <p className="eyebrow">On the {venue.city} floor</p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl">
                The same premium library, every room.
              </h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Cabinets from Light &amp; Wonder, Novomatic, Blueprint and
                Inspired Gaming. Megaways, Cash Collect, classic reels and
                electronic roulette — refreshed across the estate.
              </p>
            </div>
            <Link
              to="/games"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-brass hover:text-brass"
            >
              See the gaming floor
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          OTHER VENUES — internal linking for SEO and journey
          ============================================================ */}
      <section className="border-t border-white/5 bg-ink px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="eyebrow">Other Webbers rooms</p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-foreground sm:text-4xl">
              Four more rooms across the family.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.venues
              .filter((v) => v.slug !== venue.slug)
              .map((other) => (
                <Link
                  key={other.slug}
                  to="/venues/$slug"
                  params={{ slug: other.slug }}
                  className="group bg-surface p-6 transition-colors hover:bg-surface-2"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                    {other.region}
                  </p>
                  <h3 className="mt-3 font-display text-xl text-foreground transition-colors group-hover:text-brass">
                    {other.city}
                    {other.city === "Chester" && (
                      <span className="ml-2 text-sm text-muted-foreground">
                        {other.slug === "chester-frodsham"
                          ? "Frodsham St"
                          : "Northgate St"}
                      </span>
                    )}
                  </h3>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {other.postcode}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brass">
                    View venue
                    <ArrowRight
                      className="size-3 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
