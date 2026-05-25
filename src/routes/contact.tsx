import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${siteConfig.brand.name}` },
      {
        name: "description",
        content:
          "Get in touch with Webbers Amusements Chester. Address, phone, opening hours and a message form.",
      },
      { property: "og:title", content: `Contact — ${siteConfig.brand.name}` },
      {
        property: "og:description",
        content: "Address, phone and message form for Webbers Chester.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const chester = siteConfig.venues[0];
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title={
          <>
            We'd love to <span className="italic text-gold">hear</span> from you.
          </>
        }
        intro="Drop us a line below, give the venue a call, or pop in any day of the week. (Gambling concerns should go to the National Gambling Helpline.)"
      />

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl bg-surface p-7 ring-1 ring-white/5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 size-4 text-gold" aria-hidden />
                <address className="not-italic text-foreground">
                  {chester.address.map((l) => (
                    <p key={l}>{l}</p>
                  ))}
                  <p>
                    {chester.city}, {chester.postcode}
                  </p>
                </address>
              </div>
            </div>
            <div className="rounded-2xl bg-surface p-7 ring-1 ring-white/5">
              <div className="flex items-center gap-3">
                <Phone className="size-4 text-gold" aria-hidden />
                <a
                  href={`tel:${chester.phone.replace(/\s/g, "")}`}
                  className="text-foreground hover:text-gold"
                >
                  {chester.phone}
                </a>
              </div>
            </div>
            <div className="rounded-2xl bg-surface p-7 ring-1 ring-white/5">
              <div className="flex items-center gap-3">
                <Mail className="size-4 text-gold" aria-hidden />
                <span className="text-foreground">
                  {siteConfig.contact.email}
                </span>
              </div>
            </div>
          </div>

          <form
            className="space-y-5 rounded-2xl bg-surface p-8 ring-1 ring-white/5 lg:col-span-3"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            {sent ? (
              <div className="py-20 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                  Thank you
                </p>
                <h2 className="mt-3 font-display text-3xl text-foreground">
                  Message received.
                </h2>
                <p className="mt-3 text-muted-foreground">
                  We'll come back to you within a couple of working days.
                </p>
              </div>
            ) : (
              <>
                <div>
                  <label
                    htmlFor="name"
                    className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-foreground focus:border-gold/40 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-foreground focus:border-gold/40 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-foreground focus:border-gold/40 focus:outline-none"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  By submitting you confirm you're 18 or over. This form is not
                  for gambling-related disputes — please contact the National
                  Gambling Helpline on {siteConfig.compliance.helpline}.
                </p>
                <button
                  type="submit"
                  className="rounded-full bg-gold px-7 py-3 text-sm font-bold text-ink hover:bg-gold-deep"
                >
                  Send message
                </button>
              </>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
