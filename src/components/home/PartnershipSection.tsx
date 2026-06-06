import { Link } from "@tanstack/react-router";
import { Building2, Landmark, Handshake, Map, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/motion";

const ICONS: Record<string, LucideIcon> = {
  Building2,
  Landmark,
  Handshake,
  Map,
};

export function PartnershipSection() {
  const { partnerships } = siteConfig;

  return (
    <section className="px-6 py-[var(--section-y)] lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">{partnerships.eyebrow}</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-balance text-foreground sm:text-5xl">
              {partnerships.title}
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
              {partnerships.intro}
            </p>
            <div className="mt-10">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-deep"
              >
                Discuss a site or partnership
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
                Trade enquiries · {siteConfig.contact.email}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-px overflow-hidden rounded-2xl bg-white/5 sm:grid-cols-2 lg:col-span-7">
            {partnerships.pillars.map((pillar, i) => {
              const Icon = ICONS[pillar.icon] ?? Building2;
              return (
                <Reveal
                  key={pillar.title}
                  delay={Math.min(i * 0.08, 0.24)}
                  className="bg-ink p-8 transition-colors hover:bg-surface"
                >
                  <Icon className="mb-6 size-5 text-brass" aria-hidden />
                  <h3 className="font-display text-xl text-foreground">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {pillar.body}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
