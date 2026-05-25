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
    <section className="relative overflow-hidden border-b border-white/5 bg-ink px-6 pb-20 pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 50% 0%, rgba(232,197,71,0.18), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl text-center animate-rise">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
          {eyebrow}
        </p>
        <h1 className="mt-5 font-display text-5xl leading-[1.02] text-balance text-foreground sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {intro && (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {intro}
          </p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
