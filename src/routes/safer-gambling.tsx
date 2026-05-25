import { createFileRoute } from "@tanstack/react-router";
import { Phone, Clock, ShieldCheck, Eye, HeartHandshake } from "lucide-react";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/safer-gambling")({
  head: () => ({
    meta: [
      { title: `Safer Gambling — ${siteConfig.brand.name}` },
      {
        name: "description",
        content:
          "Tools, warning signs and support for safer gambling at Webbers Amusements. Free 24/7 help is available on 0808 8020 133.",
      },
      {
        property: "og:title",
        content: `Safer Gambling — ${siteConfig.brand.name}`,
      },
      {
        property: "og:description",
        content:
          "Tools, support and the National Gambling Helpline — 0808 8020 133, free, 24/7.",
      },
      { property: "og:url", content: "/safer-gambling" },
    ],
    links: [{ rel: "canonical", href: "/safer-gambling" }],
  }),
  component: SaferGamblingPage,
});

function SaferGamblingPage() {
  return (
    <>
      <PageHero
        eyebrow="Stay in control"
        title={
          <>
            Play within your <span className="italic text-gold">limits.</span>
          </>
        }
        intro="Gambling is meant to be entertainment. We're here to keep it that way — with tools, training and free, confidential support if you need it."
      />

      {/* Helpline panel */}
      <section className="px-6 pt-10">
        <div className="mx-auto max-w-4xl rounded-2xl bg-surface p-8 ring-1 ring-gold/30">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                Free, 24/7, confidential
              </p>
              <p className="mt-2 font-display text-3xl text-foreground">
                National Gambling Helpline
              </p>
            </div>
            <a
              href={`tel:${siteConfig.compliance.helpline.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-lg font-bold text-ink hover:bg-gold-deep"
            >
              <Phone className="size-5" aria-hidden />
              {siteConfig.compliance.helpline}
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl space-y-20">
          {/* Tools */}
          <div>
            <h2 className="font-display text-4xl text-foreground">
              Tools available in venue
            </h2>
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
                  title: "Self-exclude via BACTA",
                  body: "The multi-operator scheme covers every member venue in your area. One conversation, one form, all venues.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="bg-ink p-8">
                  <Icon className="mb-5 size-6 text-gold" aria-hidden />
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

          {/* Warning signs */}
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <Eye className="mb-4 size-6 text-gold" aria-hidden />
              <h2 className="font-display text-4xl text-foreground">
                Signs to watch for
              </h2>
              <p className="mt-4 text-muted-foreground">
                If any of these feel familiar — in yourself or someone you care
                about — that's worth talking about. There's no judgement here.
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
                <li key={s} className="flex gap-3 border-b border-white/5 pb-4">
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-gold"
                    aria-hidden
                  />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Support directory */}
          <div>
            <h2 className="font-display text-4xl text-foreground">
              Where to get help
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
                  name: "BACTA self-exclusion",
                  body: "Multi-operator self-exclusion across land-based AGCs in your area.",
                  href: "https://bacta.org.uk/self-exclusion/",
                },
              ].map((r) => (
                <a
                  key={r.name}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl bg-surface p-6 ring-1 ring-white/5 hover:ring-gold/30"
                >
                  <h3 className="font-display text-xl text-foreground">
                    {r.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Commitment */}
          <div className="rounded-2xl bg-surface p-10 ring-1 ring-white/5">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              Our commitment
            </p>
            <h2 className="mt-3 font-display text-3xl text-foreground">
              How we run our venues.
            </h2>
            <ul className="mt-6 grid gap-4 text-muted-foreground sm:grid-cols-2">
              <li>· Trained, certified staff on every shift.</li>
              <li>· Robust age verification — Think 25, no exceptions.</li>
              <li>· Visible, calm spaces — never crowded or coercive.</li>
              <li>· Self-exclusion offered and respected.</li>
              <li>· Customer interaction policy when concerns arise.</li>
              <li>
                · Full compliance with the Gambling Commission Licence Conditions
                and Codes of Practice.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
