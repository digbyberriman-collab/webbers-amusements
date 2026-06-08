import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/motion";

export function PartnersStrip() {
  return (
    <section className="border-y border-white/5 bg-surface/30">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <Reveal>
          <p className="eyebrow text-center">Premium gaming partners</p>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted-foreground">
            We curate our floors with cabinets from the four most respected names in modern gaming
            hardware.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/5 sm:grid-cols-4">
          {siteConfig.partners.map((partner, i) => (
            <Reveal
              key={partner}
              delay={Math.min(i * 0.08, 0.24)}
              amount={0.6}
              className="bg-ink px-6 py-10 text-center"
            >
              <span className="font-display text-lg tracking-wide text-foreground/85">
                {partner}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
