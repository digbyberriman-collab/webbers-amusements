import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-lounge.jpg";
import { siteConfig } from "@/config/site";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Slow parallax + fade as the hero scrolls away.
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.08, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100dvh] items-center overflow-hidden">
      <motion.img
        src={heroImg}
        alt=""
        aria-hidden
        style={{ y: imgY, scale: imgScale }}
        className="img-cinematic absolute inset-0 size-full object-cover opacity-55 will-change-transform"
        width={1920}
        height={1080}
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-40 lg:px-10"
      >
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          <motion.p variants={item} className="eyebrow">
            A family business · Since {siteConfig.brand.foundedYear}
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-6 font-display text-5xl leading-[1.02] text-balance text-foreground sm:text-7xl lg:text-[5.5rem]"
          >
            Family entertainment, <span className="italic text-brass">built over generations.</span>
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-8 max-w-xl text-lg leading-relaxed text-foreground/85"
          >
            From the seaside arcades of 1950s North Wales to five premium adult gaming centres today
            — four generations of the Webber family, running calm, well-kept arcades across
            Chester, North Wales and Greater Manchester.
          </motion.p>
          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/games"
              className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-deep"
            >
              <Sparkles className="size-4" aria-hidden />
              Explore the gaming floor
            </Link>
            <Link
              to="/venues"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-brass hover:text-brass"
            >
              <MapPin className="size-3.5" aria-hidden />
              Find your nearest venue
            </Link>
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 px-2 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:text-brass"
            >
              Our story
              <ArrowRight
                className="size-3.5 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-12 font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground"
          >
            Five venues · {siteConfig.compliance.regulator} licensed · Bacta member · 18+
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <span className="block h-12 w-px animate-scroll-cue bg-gradient-to-b from-transparent via-brass to-transparent" />
      </div>
    </section>
  );
}
