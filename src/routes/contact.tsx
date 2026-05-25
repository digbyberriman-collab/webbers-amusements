import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${siteConfig.brand.name}` },
      {
        name: "description",
        content:
          "Get in touch with Webbers Amusements — five venues across Chester, North Wales and Greater Manchester. Address, phone and a message form for every room.",
      },
      { property: "og:title", content: `Contact — ${siteConfig.brand.name}` },
      {
        property: "og:description",
        content:
          "Phone, address and a message form for every Webbers Amusements venue.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: `Contact — ${siteConfig.brand.name}`,
          url: "/contact",
          mainEntity: {
            "@type": "Organization",
            name: siteConfig.brand.name,
            email: siteConfig.contact.email,
            contactPoint: siteConfig.venues.map((v) => ({
              "@type": "ContactPoint",
              telephone: v.phone,
              contactType: "customer service",
              areaServed: "GB",
              availableLanguage: "English",
            })),
          },
        }),
      },
    ],
  }),
  component: ContactPage,
});

function chesterStreet(addressLine: string): string {
  if (addressLine.includes("Frodsham")) return "Frodsham Street";
  if (addressLine.includes("Northgate")) return "Northgate Street";
  return "";
}

function ContactPage() {
  const flagship = siteConfig.venues[0];
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title={
          <>
            We'd <span className="italic text-brass">love to hear</span> from
            you.
          </>
        }
        intro={`Drop us a line, give a venue a call, or pop in any day of the week. If you're worried about your gambling — or someone else's — please call the National Gambling Helpline on ${siteConfig.compliance.helpline}. It's free, confidential and open 24 hours.`}
      />

      <section className="px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-5">
          {/* LEFT — venue contact list */}
          <div className="space-y-8 lg:col-span-2">
            <div className="lift hairline-brass rounded-2xl bg-surface p-7 ring-1 ring-white/5">
              <p className="eyebrow">Quickest way to reach us</p>
              <h2 className="mt-3 font-display text-2xl leading-tight text-foreground">
                The flagship — Chester, Frodsham Street
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {flagship.character}
              </p>
              <a
                href={`tel:${flagship.phone.replace(/\s/g, "")}`}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brass px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-deep"
              >
                <Phone className="size-3.5" aria-hidden />
                Call {flagship.phone}
              </a>
            </div>

            <div>
              <p className="eyebrow">Every room</p>
              <h2 className="mt-3 font-display text-2xl leading-tight text-foreground">
                Reach a specific venue
              </h2>
              <ul className="mt-6 space-y-3">
                {siteConfig.venues.map((venue) => {
                  const chesterSuffix = chesterStreet(venue.address[0]);
                  return (
                    <li
                      key={venue.slug}
                      className="lift rounded-2xl bg-surface p-5 ring-1 ring-white/5"
                    >
                      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                        {venue.region}
                      </p>
                      <p className="mt-2 font-display text-lg text-foreground">
                        {venue.city}
                        {chesterSuffix && (
                          <span className="ml-2 text-sm text-muted-foreground">
                            {chesterSuffix}
                          </span>
                        )}
                      </p>
                      <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                        <MapPin
                          className="mt-1 size-3.5 shrink-0 text-brass"
                          aria-hidden
                        />
                        <address className="not-italic leading-relaxed">
                          {venue.address.join(", ")}, {venue.postcode}
                        </address>
                      </div>
                      <a
                        href={`tel:${venue.phone.replace(/\s/g, "")}`}
                        className="link-underline mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brass"
                      >
                        <Phone className="size-3.5" aria-hidden />
                        {venue.phone}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-2xl bg-surface p-6 ring-1 ring-white/5">
              <div className="flex items-center gap-3">
                <Mail className="size-4 text-brass" aria-hidden />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                    General enquiries
                  </p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="link-underline mt-1 inline-block text-sm text-foreground"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — message form */}
          <form
            className="rounded-2xl bg-surface p-8 ring-1 ring-white/5 lg:col-span-3"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            {sent ? (
              <div className="animate-rise py-20 text-center">
                <p className="eyebrow">Thank you</p>
                <h2 className="mt-4 font-display text-3xl text-foreground">
                  Message received.
                </h2>
                <p className="mx-auto mt-4 max-w-md text-muted-foreground">
                  Someone from the Webbers team will come back to you within a
                  couple of working days.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <p className="eyebrow">Send a message</p>
                  <h2 className="mt-3 font-display text-2xl leading-tight text-foreground">
                    A quick note to the team.
                  </h2>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-foreground transition-colors placeholder:text-muted-foreground/50 focus-visible:border-brass/40 focus-visible:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-foreground transition-colors placeholder:text-muted-foreground/50 focus-visible:border-brass/40 focus-visible:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    required
                    className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-foreground transition-colors placeholder:text-muted-foreground/50 focus-visible:border-brass/40 focus-visible:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-foreground transition-colors placeholder:text-muted-foreground/50 focus-visible:border-brass/40 focus-visible:outline-none"
                  />
                </div>

                <p className="text-xs leading-relaxed text-muted-foreground">
                  By submitting you confirm you're 18 or over. This form isn't
                  monitored for gambling-related distress — for that, please
                  call the National Gambling Helpline on{" "}
                  <a
                    href={`tel:${siteConfig.compliance.helpline.replace(/\s/g, "")}`}
                    className="link-underline text-brass"
                  >
                    {siteConfig.compliance.helpline}
                  </a>{" "}
                  (free, confidential, 24/7).
                </p>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-deep"
                >
                  <Send className="size-3.5" aria-hidden />
                  Send message
                </button>
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
