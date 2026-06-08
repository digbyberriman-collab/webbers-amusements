import { Quote, Star } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/motion";

export function Testimonials() {
  return (
    <section className="border-y border-white/5 bg-surface/30 px-6 py-[var(--section-y)] lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-12 max-w-xl">
          <p className="eyebrow">In good company</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl">
            Regulars, visitors and partners.
          </h2>
          <p className="mt-4 text-muted-foreground">
            What people say about a well-run room. Reviews below are illustrative placeholders,
            ready to swap for verified quotes.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {siteConfig.testimonials.map((t, i) => (
            <Reveal key={t.detail} delay={Math.min(i * 0.08, 0.24)}>
              <figure className="lift flex h-full flex-col rounded-2xl bg-ink p-8 ring-1 ring-white/5">
                <Quote className="size-6 text-brass/70" aria-hidden />
                {t.kind === "visitor" && (
                  <div className="mt-4 flex gap-0.5" aria-label="Five out of five">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="size-3.5 fill-brass text-brass" aria-hidden />
                    ))}
                  </div>
                )}
                <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-foreground/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-white/5 pt-5">
                  <p className="font-display text-base text-foreground">{t.name}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                    {t.detail}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Google reviews integration placeholder */}
        <Reveal className="mt-8">
          <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-dashed border-white/15 bg-ink/40 px-6 py-5 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-muted-foreground">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-brass">
                Integration slot
              </span>{" "}
              — drop a live Google Reviews widget here once the business profiles are linked.
            </p>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              Per-venue ratings
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
