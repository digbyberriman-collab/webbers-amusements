import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/PageHero";
import { chesterStreetLabel, phoneDisplay, structuredPhone, telHref } from "@/lib/venue";

// There is no backend to receive this form (no server route, no database —
// see SITE_MAP.md). Rather than fake a "message received" confirmation, on
// submit we hand the visitor's message to their own email client via a
// mailto: link, pre-filled and ready to send. TODO: replace with a real
// submission endpoint (e.g. a Cloudflare Worker route + transactional email
// API) once a provider and credentials are chosen.
const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: z.string().trim().email("Enter a valid email address."),
  subject: z.string().trim().min(3, "Enter a short subject."),
  message: z.string().trim().min(10, "Say a little more so the team has enough to go on."),
});
type ContactFormValues = z.infer<typeof contactSchema>;

function buildMailto(values: ContactFormValues): string {
  const body = `${values.message}\n\n— ${values.name} (${values.email})`;
  const params = new URLSearchParams({ subject: values.subject, body });
  return `mailto:${siteConfig.contact.email}?${params.toString()}`;
}

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${siteConfig.brand.name}` },
      {
        name: "description",
        content:
          "Get in touch with Webbers Amusements — five venues across Chester, North Wales and Greater Manchester. Address, phone and a message form for every arcade.",
      },
      { property: "og:title", content: `Contact — ${siteConfig.brand.name}` },
      {
        property: "og:description",
        content: "Phone, address and a message form for every Webbers Amusements venue.",
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
            contactPoint: siteConfig.venues
              .map((v) => {
                const telephone = structuredPhone(v);
                return telephone
                  ? {
                      "@type": "ContactPoint",
                      telephone,
                      contactType: "customer service",
                      areaServed: "GB",
                      availableLanguage: "English",
                    }
                  : null;
              })
              .filter((v): v is NonNullable<typeof v> => v !== null),
          },
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const flagship = siteConfig.venues.find((v) => v.primary) ?? siteConfig.venues[0];
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = handleSubmit((values) => {
    window.location.href = buildMailto(values);
    setSent(true);
  });

  const sendAnother = () => {
    reset();
    setSent(false);
  };

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title={
          <>
            We'd <span className="italic text-brass">love to hear</span> from you.
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
              {telHref(flagship.phone) ? (
                <a
                  href={telHref(flagship.phone)}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-brass px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-deep"
                >
                  <Phone className="size-3.5" aria-hidden />
                  Call {flagship.phone}
                </a>
              ) : (
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-brass px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-deep"
                >
                  <Mail className="size-3.5" aria-hidden />
                  Email the team
                </a>
              )}
            </div>

            <div>
              <p className="eyebrow">Every arcade</p>
              <h2 className="mt-3 font-display text-2xl leading-tight text-foreground">
                Reach a specific venue
              </h2>
              <ul className="mt-6 space-y-3">
                {siteConfig.venues.map((venue) => {
                  const chesterSuffix = chesterStreetLabel(venue);
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
                        <MapPin className="mt-1 size-3.5 shrink-0 text-brass" aria-hidden />
                        <address className="not-italic leading-relaxed">
                          {venue.address.join(", ")}, {venue.postcode}
                        </address>
                      </div>
                      {telHref(venue.phone) ? (
                        <a
                          href={telHref(venue.phone)}
                          className="link-underline mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brass"
                        >
                          <Phone className="size-3.5" aria-hidden />
                          {venue.phone}
                        </a>
                      ) : (
                        <span className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="size-3.5" aria-hidden />
                          {phoneDisplay(venue.phone)}
                        </span>
                      )}
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
            onSubmit={onSubmit}
            noValidate
          >
            {sent ? (
              <div className="animate-rise py-20 text-center">
                <p className="eyebrow">Almost there</p>
                <h2 className="mt-4 font-display text-3xl text-foreground">
                  Your email app should now be open.
                </h2>
                <p className="mx-auto mt-4 max-w-md text-muted-foreground">
                  We've pre-filled a message to {siteConfig.contact.email} with what you wrote —
                  check it over and hit send from there. If nothing opened, or you'd rather not
                  wait, call a venue directly using the numbers on the left.
                </p>
                <button
                  type="button"
                  onClick={sendAnother}
                  className="link-underline mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brass"
                >
                  Write another message
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <p className="eyebrow">Send a message</p>
                  <h2 className="mt-3 font-display text-2xl leading-tight text-foreground">
                    A quick note to the team.
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    This opens the message in your own email app rather than submitting it to a
                    server — nothing is sent until you do.
                  </p>
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
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-foreground transition-colors placeholder:text-muted-foreground/50 focus-visible:border-brass/40 focus-visible:outline-none"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-2 text-xs text-danger">
                        {errors.name.message}
                      </p>
                    )}
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
                      type="email"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-foreground transition-colors placeholder:text-muted-foreground/50 focus-visible:border-brass/40 focus-visible:outline-none"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-2 text-xs text-danger">
                        {errors.email.message}
                      </p>
                    )}
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
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                    className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-foreground transition-colors placeholder:text-muted-foreground/50 focus-visible:border-brass/40 focus-visible:outline-none"
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p id="subject-error" className="mt-2 text-xs text-danger">
                      {errors.subject.message}
                    </p>
                  )}
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
                    rows={6}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className="mt-2 w-full rounded-lg border border-white/10 bg-ink px-4 py-3 text-foreground transition-colors placeholder:text-muted-foreground/50 focus-visible:border-brass/40 focus-visible:outline-none"
                    {...register("message")}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-2 text-xs text-danger">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <p className="text-xs leading-relaxed text-muted-foreground">
                  By submitting you confirm you're 18 or over. This form isn't monitored for
                  gambling-related distress — for that, please call the National Gambling Helpline
                  on{" "}
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
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-deep disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="size-3.5" aria-hidden />
                  {isSubmitting ? "Opening email…" : "Send message"}
                </button>
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
