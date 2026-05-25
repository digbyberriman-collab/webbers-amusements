import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--neon-pink)]/40 bg-ink px-6 pb-20 pt-40">
      {/* Neon haze */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-[55vh] w-[55vh] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--neon-pink), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[55vh] w-[55vh] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--neon-cyan), transparent 70%)",
        }}
      />
      {/* Top/bottom bulb rails */}
      <div className="pointer-events-none absolute inset-x-6 top-24 flex justify-between text-[color:var(--neon-yellow)] opacity-80">
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="bulb"
            style={{ animationDelay: `${(i * 0.08).toFixed(2)}s` }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-5xl text-center animate-rise">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--neon-yellow)]">
          ★ {eyebrow} ★
        </p>
        <h1 className="neon-text mt-5 font-display text-5xl leading-[1.02] text-balance sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {intro && (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/85">
            {intro}
          </p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
