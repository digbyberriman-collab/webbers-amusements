import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/motion";

interface HeritageTimelineProps {
  eyebrow?: string;
  title?: ReactNode;
  intro?: string;
  /** Heritage milestones. Defaults to the shared siteConfig timeline. */
  items?: typeof siteConfig.timeline;
}

/**
 * Scroll-driven heritage timeline. A brass spine fills as the visitor scrolls,
 * milestone nodes light up in turn, and each card rises into view. Shared by
 * the home page and the About page.
 */
export function HeritageTimeline({
  eyebrow = "Our story",
  title = (
    <>
      From a confectionery counter to the{" "}
      <span className="italic text-brass">modern arcade floor.</span>
    </>
  ),
  intro = "Seven decades, one family. The moments that built Webbers — told the long way round.",
  items = siteConfig.timeline,
}: HeritageTimelineProps) {
  const trackRef = useRef<HTMLOListElement>(null);
  // Fill the spine as the list passes through the middle of the viewport.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 65%", "end 60%"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="px-6 py-[var(--section-y)] lg:px-10">
      <div className="mx-auto max-w-4xl">
        <Reveal className="mb-16 max-w-xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-balance text-foreground sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-muted-foreground">{intro}</p>
        </Reveal>

        <ol ref={trackRef} className="relative space-y-16 pl-12 sm:pl-16">
          {/* Static rail */}
          <span
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10 sm:left-[11px]"
          />
          {/* Animated brass fill */}
          <motion.span
            aria-hidden
            style={{ scaleY: fill }}
            className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-brass via-brass to-brass/40 sm:left-[11px]"
          />

          {items.map((t, i) => (
            <li key={t.decade} className="relative">
              <span
                aria-hidden
                className="absolute -left-12 top-1 grid size-4 place-items-center rounded-full bg-ink ring-1 ring-brass/50 sm:-left-16 sm:size-6"
              >
                <span className="size-1.5 rounded-full bg-brass sm:size-2" />
              </span>
              <Reveal delay={Math.min(i * 0.05, 0.2)} direction="up">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-brass">
                  {t.decade}
                </p>
                <h3 className="mt-3 font-display text-2xl leading-tight text-foreground sm:text-3xl">
                  {t.title}
                </h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{t.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
