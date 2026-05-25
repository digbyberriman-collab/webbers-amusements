import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/PageHero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs: { q: string; a: string }[] = [
  {
    q: "Do I need to be 18 to enter?",
    a: "Yes. Every Webbers room is a licensed Adult Gaming Centre. Entry is strictly limited to those aged 18 and over, and we operate a Think 25 policy across the estate — please bring photo ID if you're asked.",
  },
  {
    q: "What games do you have?",
    a: "A curated mix of modern digital slots (including Megaways titles), classic three-reel cabinets, community jackpots and electronic roulette terminals. Cabinets come from Light & Wonder, Novomatic, Blueprint Gaming and Inspired Gaming — refreshed regularly. The current featured library is on the Games page.",
  },
  {
    q: "What's the maximum prize?",
    a: `On an Adult Gaming Centre slot machine the maximum single prize is £${siteConfig.compliance.maxSlotPrize}, in line with the standard AGC regulations set by the ${siteConfig.compliance.regulator}.`,
  },
  {
    q: "Where are your venues?",
    a: "Five rooms in total: two in Chester (Frodsham Street and Northgate Street), plus Caernarfon, Rhyl and Walkden. Full addresses, phone numbers and opening hours are on the Venues page.",
  },
  {
    q: "What can I expect on a first visit?",
    a: "Walk in any day of the week — no booking, no membership required. A member of the team will show you the floor, explain how any cabinet works, and fix you a tea or coffee. Take your time, play within your limits.",
  },
  {
    q: "Are the venues accessible?",
    a: "Step-free access varies by venue — most of our rooms are at street level. If you have specific accessibility requirements (mobility, hearing, sensory), please call the venue directly before visiting and the team will talk through exactly what to expect. [CLIENT TO CONFIRM per-venue accessibility detail.]",
  },
  {
    q: "Can I host a birthday or small group visit?",
    a: "Of course — small groups are very welcome. There's no formal booking system; just turn up. If it's a birthday, let the team know on arrival. We're not licensed for hosted private events with alcohol, but the room is yours to enjoy. [CLIENT TO CONFIRM group policy.]",
  },
  {
    q: "Do you serve food and drink?",
    a: "Complimentary tea, coffee and soft drinks for every player. On weekend mornings we add pastries through The Weekend Welcome. We don't serve alcohol — Chester, Rhyl, Caernarfon and Walkden all have plenty of food and drink options a short walk away.",
  },
  {
    q: "Is the floor cashless or contactless?",
    a: "Cabinets accept cash on the floor. Contactless and card payment options vary by venue and cabinet — speak to the cashier in person and they'll walk you through what's accepted. [CLIENT TO CONFIRM cashless rollout status.]",
  },
  {
    q: "Is there parking nearby?",
    a: "Most of our venues are on or near the high street, with public car parks within a short walk. In Chester, the Forum Shopping Centre and Pepper Street car parks are closest to Frodsham Street. [CLIENT TO CONFIRM nearest recommended car parks for the other venues.]",
  },
  {
    q: "How do I self-exclude?",
    a: `Speak to any member of staff in venue and they'll walk you through it discreetly. We participate in the ${siteConfig.compliance.tradeBody} multi-operator self-exclusion scheme, which covers every member venue in your area with a single request. Online self-exclusion (across UK-licensed gambling sites) is via GAMSTOP.`,
  },
  {
    q: "How does Webbers handle responsible gambling concerns?",
    a: `Our staff are trained on customer interaction — if we're concerned about a customer, we'll start a quiet, non-judgmental conversation, share the available tools (time limits, breaks, self-exclusion) and signpost free support. Anyone can also call the National Gambling Helpline on ${siteConfig.compliance.helpline} — free, confidential, 24/7. More detail is on the Safer Gambling page.`,
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: `FAQ — ${siteConfig.brand.name}` },
      {
        name: "description",
        content:
          "Frequently asked questions about visiting Webbers Amusements — age policy, games, prizes, accessibility, group visits, refreshments and safer gambling.",
      },
      { property: "og:title", content: `FAQ — ${siteConfig.brand.name}` },
      {
        property: "og:description",
        content:
          "The basics, answered — age policy, games, prizes, accessibility and safer gambling at Webbers Amusements.",
      },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FAQPage,
});

function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={
          <>
            The <span className="italic text-brass">basics</span>, answered.
          </>
        }
        intro="A few of the questions we hear most often — from first-time visitors, regulars and people thinking about a quiet afternoon in a Webbers room."
      />

      <section className="px-6 py-[var(--section-y)] lg:px-10">
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`q-${i}`}
                className="rounded-2xl border-0 bg-surface px-6 ring-1 ring-white/5 transition-shadow hover:ring-brass/30"
              >
                <AccordionTrigger className="text-left font-display text-lg text-foreground hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-16 rounded-2xl bg-surface p-8 ring-1 ring-white/5 hairline-brass">
            <p className="eyebrow">Still got a question?</p>
            <h2 className="mt-3 font-display text-2xl leading-tight text-foreground sm:text-3xl">
              We're happy to talk it through.
            </h2>
            <p className="mt-4 text-muted-foreground">
              The team can be reached on the venue phones or via the message
              form — both routes go to a real person.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-deep"
              >
                Contact the team
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
              <Link
                to="/safer-gambling"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-brass hover:text-brass"
              >
                Safer gambling tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
