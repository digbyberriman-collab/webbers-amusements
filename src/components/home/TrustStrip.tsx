import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/motion";

export function TrustStrip() {
  return (
    <section className="border-y border-white/5 bg-surface/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/5 px-6 py-10 sm:grid-cols-4 lg:px-10">
        {siteConfig.trustMarks.map((mark, i) => (
          <Reveal
            key={mark.key}
            delay={Math.min(i * 0.08, 0.24)}
            amount={0.6}
            className="px-4 sm:px-8"
          >
            <p className="font-display text-sm leading-snug text-foreground">{mark.label}</p>
            <p className="mt-1 text-xs text-muted-foreground">{mark.detail}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
