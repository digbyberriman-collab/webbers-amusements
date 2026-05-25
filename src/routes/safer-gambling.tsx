import { createFileRoute } from "@tanstack/react-router";
import {
  Phone,
  Clock,
  ShieldCheck,
  Eye,
  HeartHandshake,
  Users,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/safer-gambling")({
  head: () => ({
    meta: [
      { title: `Safer Gambling — ${siteConfig.brand.name}` },
      {
        name: "description",
        content: `Tools, warning signs and free support for safer gambling at Webbers Amusements. The National Gambling Helpline — ${siteConfig.compliance.helpline} — is free, confidential and open 24/7.`,
      },
      {
        property: "og:title",
        content: `Safer Gambling — ${siteConfig.brand.name}`,
      },
      {
        property: "og:description",
        content: `The National Gambling Helpline — ${siteConfig.compliance.helpline}, free, confidential, 24/7. Tools and support across every Webbers venue.`,
      },
      { property: "og:url", content: "/safer-gambling" },
    ],
    links: [{ rel: "canonical", href: "/safer-gambling" }],
  }),
  component: SaferGamblingPage,
});

function SaferGamblingPage() {
  const helplineTel = siteConfig.compliance.helpline.replace(/\s/g, "");

  return (
    <>
      <PageHero
        eyebrow="Stay in control"
        title={
          <>
            Play within your{" "}
            <span className="italic text-brass">limits.</span>
          </>
        }
        intro="Gambling is meant to be entertainment. We're here to keep it that way — with practical tools in venue, staff trained to start the conversation, and free, confidential support if you need it."
      />

      {/* Helpline panel */}
      <section className="px-6 pt-10">
        <div className="hairline-brass mx-auto max-w-4xl rounded-2xl bg-surface p-8 ring-1 ring-white/5">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow">Free, confidential, 24/7</p>
              <p className="mt-2 font-display text-3xl text-foreground">
                National Gambling Helpline
              </p>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Trained advisors, any hour of the day. Whether you're worried
                about your own play or someone you care about — one call.
              </p>
            </div>
            <a
              href={`tel:${helplineTel}`}
              className="inline-flex items-center gap-3 rounded-full bg-brass px-7 py-4 text-lg font-bold text-ink transition-colors hover:bg-brass-deep"
            >
              <Phone className="size-5" aria-hidden />
              {siteConfig.compliance.helpline}
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto max-w-6xl space-y-20">
          {/* Tools */}
          <div>
            <p className="eyebrow">In venue</p>
            <h2 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
              Tools available on every floor.
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Small, practical things you can ask any member of staff for —
              quietly, without fuss.
            </p>
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Clock,
                  title: "Set a time limit",
                  body: "Decide before you play how long you'll stay. Ask any member of staff to give you a reminder.",
                },
                {
                  icon: ShieldCheck,
                  title: "Take a break",
                  body: "Step away for a fixed period — a day, a week, a month. We'll respect it and welcome you back when you're ready.",
                },
                {
                  icon: HeartHandshake,
                  title: `Self-exclude via ${siteConfig.compliance.tradeBody}`,
                  body: "The multi-operator scheme covers every member venue in your area. One conversation, one form, all venues.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="bg-ink p-8">
                  <Icon className="mb-5 size-6 text-brass" aria-hidden />
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

          {/* Trained team */}
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Users className="mb-4 size-6 text-brass" aria-hidden />
              <p className="eyebrow">Our trained team</p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
                A real person, every shift.
              </h2>
            </div>
            <div className="space-y-5 text-muted-foreground lg:col-span-3">
              <p>
                Every Webbers staff member is trained in customer interaction,
                age verification and the safer-gambling tools available on the
                floor. That training is renewed regularly — it isn't a tick-box
                induction, it's a working part of how the rooms run.
              </p>
              <p>
                If we notice signs that a customer's play might be drifting
                outside their limits, we'll start a quiet, non-judgmental
                conversation. There's no script for that — just an offer of a
                tea, a chat, and the tools above if they're wanted.
              </p>
              <p>
                We participate in the {siteConfig.compliance.tradeBody}{" "}
                multi-operator self-exclusion scheme, and we operate strictly
                within the {siteConfig.compliance.regulator} Licence Conditions
                and Codes of Practice (LCCP) for Adult Gaming Centres.
              </p>
            </div>
          </div>

          {/* Warning signs */}
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <Eye className="mb-4 size-6 text-brass" aria-hidden />
              <p className="eyebrow">Signs to watch for</p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
                When the fun stops.
              </h2>
              <p className="mt-4 text-muted-foreground">
                If any of these feel familiar — in yourself, or someone you
                care about — that's worth talking about. There's no judgement
                here.
              </p>
            </div>
            <ul className="space-y-4 text-muted-foreground">
              {[
                "Playing for longer than you planned, more often than you planned.",
                "Spending money you don't have spare — or chasing losses.",
                "Hiding how much you've played from people close to you.",
                "Feeling anxious, irritable or low when you're not playing.",
                "Letting other things — sleep, work, relationships — slip.",
              ].map((s) => (
                <li
                  key={s}
                  className="flex gap-3 border-b border-white/5 pb-4"
                >
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-brass"
                    aria-hidden
                  />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Support directory */}
          <div>
            <p className="eyebrow">Independent support</p>
            <h2 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
              Where to get help.
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {[
                {
                  name: "BeGambleAware",
                  body: "Independent advice, information and free treatment across Great Britain.",
                  href: "https://www.begambleaware.org/",
                },
                {
                  name: "GamCare",
                  body: "Free counselling, NetLine chat, and the National Gambling Helpline.",
                  href: "https://www.gamcare.org.uk/",
                },
                {
                  name: "GAMSTOP",
                  body: "Free self-exclusion from all UK-licensed online gambling sites. (Online only.)",
                  href: "https://www.gamstop.co.uk/",
                },
                {
                  name: `${siteConfig.compliance.tradeBody} self-exclusion`,
                  body: "Multi-operator self-exclusion across land-based AGCs in your area.",
                  href: "https://bacta.org.uk/self-exclusion/",
                },
              ].map((r) => (
                <a
                  key={r.name}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lift group block rounded-2xl bg-surface p-6 ring-1 ring-white/5 hover:ring-brass/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl text-foreground transition-colors group-hover:text-brass">
                      {r.name}
                    </h3>
                    <ExternalLink
                      className="mt-1.5 size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-brass"
                      aria-hidden
                    />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {r.body}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* Commitment */}
          <div className="rounded-2xl bg-surface p-10 ring-1 ring-white/5">
            <p className="eyebrow">Our commitment</p>
            <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
              How we run our venues.
            </h2>
            <ul className="mt-6 grid gap-4 text-muted-foreground sm:grid-cols-2">
              {[
                "Trained, certified staff on every shift.",
                `Robust age verification — ${siteConfig.compliance.idPolicy}, no exceptions.`,
                "Visible, calm spaces — never crowded or coercive.",
                "Self-exclusion offered and respected.",
                "Customer interaction policy when concerns arise.",
                `Full compliance with the ${siteConfig.compliance.regulator} Licence Conditions and Codes of Practice.`,
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-brass"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Take a break right now */}
          <div className="hairline-brass rounded-2xl bg-ink p-10 text-center ring-1 ring-white/5">
            <p className="eyebrow">Take a break right now</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-balance text-foreground sm:text-4xl">
              If something doesn't feel right, the next step is small.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              One phone call, one form, one conversation. Free, confidential,
              and on your terms — whether that's now or whenever you're ready.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={`tel:${helplineTel}`}
                className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-deep"
              >
                <Phone className="size-3.5" aria-hidden />
                Call {siteConfig.compliance.helpline}
              </a>
              <a
                href="https://www.begambleaware.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-brass hover:text-brass"
              >
                Visit BeGambleAware
                <ArrowRight className="size-3.5" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
