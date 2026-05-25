import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";

export function SaferGamblingStrip() {
  return (
    <section
      aria-label="Safer gambling"
      className="border-y border-white/5 bg-surface/40 py-8"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
        <div className="flex items-center gap-5">
          <span className="font-display text-3xl font-bold text-foreground">
            18<span className="text-danger">+</span>
          </span>
          <div className="h-10 w-px bg-white/10" aria-hidden />
          <div>
            <p className="font-display text-lg text-foreground">
              Take time to think.
            </p>
            <p className="text-sm text-muted-foreground">
              When the fun stops, stop. Help is free, 24/7 —{" "}
              <a
                href={`tel:${siteConfig.compliance.helpline.replace(/\s/g, "")}`}
                className="text-gold underline-offset-4 hover:underline"
              >
                {siteConfig.compliance.helpline}
              </a>
              .
            </p>
          </div>
        </div>
        <Link
          to="/safer-gambling"
          className="rounded-full border border-gold/30 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-gold transition-colors hover:bg-gold/10"
        >
          Safer gambling tools
        </Link>
      </div>
    </section>
  );
}
