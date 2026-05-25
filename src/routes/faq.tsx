import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/PageHero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Do I need to be 18 to enter?",
    a: "Yes. Webbers Amusements is a licensed Adult Gaming Centre. Entry is strictly limited to those aged 18 and over, and we operate a Think 25 policy — please bring ID if you're asked.",
  },
  {
    q: "What games do you have?",
    a: "A curated mix of modern digital slots (including Megaways titles), classic three-reel cabinets, community jackpots and electronic roulette terminals. The full library is on the Games page.",
  },
  {
    q: "What's the maximum prize?",
    a: "On an Adult Gaming Centre slot machine the maximum single prize is £500, in line with the standard AGC regulations.",
  },
  {
    q: "Where are you?",
    a: "Our flagship is at 28A Frodsham Street, Chester, CH1 3JL. We also have sister venues in Rhyl and Caernarfon. Full details on the Venues page.",
  },
  {
    q: "Is there parking nearby?",
    a: "There are several Chester city-centre car parks within a short walk of Frodsham Street, including the Forum Shopping Centre and Pepper Street car parks. [CLIENT TO CONFIRM nearest recommended car park.]",
  },
  {
    q: "How do I self-exclude?",
    a: "Speak to any member of staff. We're a participating venue in the BACTA multi-operator self-exclusion scheme, which covers all AGCs in your area with a single request.",
  },
  {
    q: "Do you serve food and drink?",
    a: "We offer complimentary tea, coffee and soft drinks for players. Chester city centre has plenty of food options a short walk away.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: `FAQ — ${siteConfig.brand.name}` },
      {
        name: "description",
        content:
          "Frequently asked questions about visiting Webbers Amusements in Chester — age policy, games, prizes, self-exclusion and more.",
      },
      { property: "og:title", content: `FAQ — ${siteConfig.brand.name}` },
      { property: "og:description", content: "Frequently asked questions about visiting Webbers." },
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
            The <span className="italic text-gold">basics</span>, answered.
          </>
        }
      />
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`q-${i}`}
                className="rounded-2xl border-0 bg-surface px-6 ring-1 ring-white/5"
              >
                <AccordionTrigger className="text-left font-display text-lg text-foreground hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
