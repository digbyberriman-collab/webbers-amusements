import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/PageHero";
import { todaysHours, weeklyHoursTable } from "@/lib/hours";

export const Route = createFileRoute("/venues")({
  head: () => ({
    meta: [
      { title: `Our Venues — ${siteConfig.brand.name}` },
      {
        name: "description",
        content:
          "Find Webbers Amusements in Chester, Rhyl and Caernarfon. Addresses, opening hours and directions for every venue.",
      },
      { property: "og:title", content: `Our Venues — ${siteConfig.brand.name}` },
      {
        property: "og:description",
        content:
          "Webbers Amusements venues across Chester, Rhyl and Caernarfon.",
      },
      { property: "og:url", content: "/venues" },
    ],
    links: [{ rel: "canonical", href: "/venues" }],
  }),
  component: VenuesPage,
});

function VenuesPage() {
  const [active, setActive] = useState(siteConfig.venues[0].slug);
  const activeVenue =
    siteConfig.venues.find((v) => v.slug === active) ?? siteConfig.venues[0];

  return (
    <>
      <PageHero
        eyebrow="Three venues"
        title={
          <>
            Find your <span className="italic text-gold">Webbers</span>.
          </>
        }
        intro="Our flagship is on Frodsham Street in Chester, with sister venues on the North Wales coast."
      />

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-5">
          {/* Venue list */}
          <div className="space-y-4 lg:col-span-2">
            {siteConfig.venues.map((v) => {
              const h = todaysHours(v);
              const isActive = v.slug === active;
              return (
                <button
                  type="button"
                  key={v.slug}
                  onClick={() => setActive(v.slug)}
                  aria-pressed={isActive}
                  className={`w-full rounded-2xl p-6 text-left ring-1 transition-all ${
                    isActive
                      ? "bg-surface ring-gold/40 shadow-[0_0_40px_-12px_rgba(232,197,71,0.4)]"
                      : "bg-surface/40 ring-white/5 hover:bg-surface hover:ring-white/15"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-2xl text-foreground">
                        {v.name}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {v.address[0]} · {v.postcode}
                      </p>
                    </div>
                    {v.primary && (
                      <span className="rounded-full bg-gold/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-gold">
                        Flagship
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs">
                    <span
                      className={`size-2 rounded-full ${h.isOpen ? "bg-electric animate-pulse" : "bg-muted-foreground"}`}
                    />
                    <span className="text-muted-foreground">
                      {h.isOpen ? "Open now" : "Closed"} · {h.text}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail */}
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-2xl bg-surface ring-1 ring-white/10">
              <div className="aspect-[4/3]">
                <iframe
                  key={activeVenue.slug}
                  title={`Map of ${activeVenue.name}`}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${activeVenue.lng - 0.01}%2C${activeVenue.lat - 0.005}%2C${activeVenue.lng + 0.01}%2C${activeVenue.lat + 0.005}&layer=mapnik&marker=${activeVenue.lat}%2C${activeVenue.lng}`}
                  className="size-full grayscale-[60%] invert-[0.92] hue-rotate-180 contrast-[0.9]"
                  loading="lazy"
                />
              </div>
              <div className="p-8">
                <h3 className="font-display text-3xl text-foreground">
                  {activeVenue.name}
                </h3>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin
                        className="mt-1 size-4 shrink-0 text-gold"
                        aria-hidden
                      />
                      <address className="not-italic text-sm text-foreground">
                        {activeVenue.address.map((l) => (
                          <p key={l}>{l}</p>
                        ))}
                        <p>
                          {activeVenue.city}, {activeVenue.postcode}
                        </p>
                      </address>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone
                        className="mt-1 size-4 shrink-0 text-gold"
                        aria-hidden
                      />
                      <a
                        href={`tel:${activeVenue.phone.replace(/\s/g, "")}`}
                        className="text-sm text-foreground hover:text-gold"
                      >
                        {activeVenue.phone}
                      </a>
                    </div>
                  </div>
                  <div>
                    <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gold">
                      <Clock className="size-3.5" aria-hidden /> Weekly hours
                    </div>
                    <dl className="space-y-1.5 text-sm">
                      {weeklyHoursTable(activeVenue).map((d) => (
                        <div
                          key={d.key}
                          className="flex justify-between border-b border-white/5 py-1"
                        >
                          <dt className="text-muted-foreground">{d.label}</dt>
                          <dd className="text-foreground">{d.text}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${activeVenue.lat},${activeVenue.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-ink hover:bg-gold-deep"
                  >
                    Get directions
                  </a>
                  <a
                    href={`tel:${activeVenue.phone.replace(/\s/g, "")}`}
                    className="rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-foreground hover:bg-white/5"
                  >
                    Call the venue
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
