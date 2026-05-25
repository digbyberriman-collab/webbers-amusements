import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { todaysHours, weeklyHoursTable } from "@/lib/hours";
import { SlotMachine, type SlotItem } from "@/components/SlotMachine";

export const Route = createFileRoute("/venues")({
  head: () => ({
    meta: [
      { title: `Our Venues — ${siteConfig.brand.name}` },
      {
        name: "description",
        content:
          "Pull the lever to find a Webbers Amusements venue — Chester (Frodsham & Northgate), Manchester, Rhyl and Caernarfon.",
      },
      { property: "og:title", content: `Our Venues — ${siteConfig.brand.name}` },
      {
        property: "og:description",
        content:
          "Five Webbers Amusements venues across Chester, Manchester and North Wales.",
      },
      { property: "og:url", content: "/venues" },
    ],
    links: [{ rel: "canonical", href: "/venues" }],
  }),
  component: VenuesPage,
});

// Bright, distinctive symbol per venue
const venueSymbols: Record<string, string> = {
  "chester-frodsham": "🎰",
  "chester-northgate": "🏛️",
  manchester: "🐝",
  rhyl: "🌊",
  caernarfon: "🏰",
};

// Short label for the reel face
const venueShort: Record<string, string> = {
  "chester-frodsham": "Frodsham",
  "chester-northgate": "Northgate",
  manchester: "Manchester",
  rhyl: "Rhyl",
  caernarfon: "Caernarfon",
};

function VenuesPage() {
  const items: SlotItem[] = siteConfig.venues.map((v) => ({
    key: v.slug,
    symbol: venueSymbols[v.slug] ?? "🎰",
    label: venueShort[v.slug] ?? v.city,
    description: `${v.name} · ${v.address.join(", ")}, ${v.city}`,
  }));

  const [active, setActive] = useState(siteConfig.venues[0].slug);
  const activeVenue =
    siteConfig.venues.find((v) => v.slug === active) ?? siteConfig.venues[0];
  const h = todaysHours(activeVenue);

  return (
    <>
      {/* HERO with functional slot machine */}
      <section className="relative overflow-hidden border-b border-[color:var(--neon-pink)]/40 bg-ink px-6 pb-16 pt-32">
        {/* Neon haze */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-10 h-[60vh] w-[60vh] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--neon-pink), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 bottom-0 h-[55vh] w-[55vh] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--neon-cyan), transparent 70%)",
          }}
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div className="space-y-6 animate-rise">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--neon-yellow)]">
              Five venues · One family
            </p>
            <h1 className="neon-text font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
              Pull to find <span className="italic">your Webbers</span>.
            </h1>
            <p className="max-w-md text-lg text-foreground/90">
              Yank the lever on the cabinet. Wherever the reels land — that's
              the room. Hit it again to keep spinning the floor.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {siteConfig.venues.map((v) => (
                <button
                  key={v.slug}
                  type="button"
                  onClick={() => setActive(v.slug)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-all ${
                    v.slug === active
                      ? "border-[color:var(--neon-yellow)] bg-[color:var(--neon-yellow)] text-ink shadow-[0_0_16px_var(--neon-yellow)]"
                      : "border-white/15 text-muted-foreground hover:border-[color:var(--neon-cyan)] hover:text-[color:var(--neon-cyan)]"
                  }`}
                >
                  {v.city === "Chester" ? `${v.city} · ${venueShort[v.slug]}` : v.city}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <SlotMachine
              items={items}
              selectedKey={active}
              onLand={(k) => setActive(k)}
              headerTitle="Find a Venue"
              idleHint={`Pull → ${venueShort[active] ?? activeVenue.city}`}
            />
          </div>
        </div>
      </section>

      {/* REVEALED VENUE PANEL */}
      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center gap-4">
            <span className="jackpot font-display text-3xl">★</span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--neon-pink)]">
                Winner · You landed on
              </p>
              <h2 className="neon-text-cyan font-display text-3xl sm:text-4xl">
                {activeVenue.name}
              </h2>
            </div>
          </div>

          <div
            key={activeVenue.slug}
            className="cabinet-frame relative overflow-hidden rounded-2xl bg-black/60 p-1 animate-rise"
          >
            <div className="grid gap-px overflow-hidden rounded-xl bg-white/10 lg:grid-cols-5">
              {/* Map */}
              <div className="aspect-[4/3] lg:col-span-3 lg:aspect-auto">
                <iframe
                  key={activeVenue.slug}
                  title={`Map of ${activeVenue.name}`}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${activeVenue.lng - 0.01}%2C${activeVenue.lat - 0.005}%2C${activeVenue.lng + 0.01}%2C${activeVenue.lat + 0.005}&layer=mapnik&marker=${activeVenue.lat}%2C${activeVenue.lng}`}
                  className="size-full grayscale-[60%] invert-[0.92] hue-rotate-180 contrast-[0.9]"
                  loading="lazy"
                />
              </div>
              {/* Details */}
              <div className="space-y-6 bg-ink p-8 lg:col-span-2">
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`size-2 rounded-full ${h.isOpen ? "animate-pulse bg-[color:var(--neon-green)] shadow-[0_0_10px_var(--neon-green)]" : "bg-muted-foreground"}`}
                  />
                  <span className="font-mono uppercase tracking-widest text-foreground/80">
                    {h.isOpen ? "Open now" : "Closed"} · {h.text}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 size-4 shrink-0 text-[color:var(--neon-yellow)]" aria-hidden />
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
                  <Phone className="mt-1 size-4 shrink-0 text-[color:var(--neon-yellow)]" aria-hidden />
                  <a
                    href={`tel:${activeVenue.phone.replace(/\s/g, "")}`}
                    className="text-sm text-foreground hover:text-[color:var(--neon-cyan)]"
                  >
                    {activeVenue.phone}
                  </a>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[color:var(--neon-yellow)]">
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

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${activeVenue.lat},${activeVenue.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="play-button inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-black uppercase tracking-widest"
                  >
                    Get directions
                    <ArrowRight className="size-3.5" aria-hidden />
                  </a>
                  <a
                    href={`tel:${activeVenue.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 rounded-full border border-[color:var(--neon-cyan)]/50 px-6 py-3 text-xs font-bold uppercase tracking-widest text-[color:var(--neon-cyan)] hover:bg-[color:var(--neon-cyan)]/10"
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
