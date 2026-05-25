import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  children?: ReactNode;
  /** Background image (subtle, overlaid). Optional. */
  image?: string;
  imageAlt?: string;
  /** Text alignment. Defaults to left for editorial feel. */
  align?: "left" | "center";
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  image,
  imageAlt = "",
  align = "left",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-ink px-6 pb-20 pt-40 lg:px-10">
      {image && (
        <>
          <img
            src={image}
            alt={imageAlt}
            aria-hidden={imageAlt ? undefined : true}
            className="img-cinematic absolute inset-0 size-full object-cover opacity-25"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent" />
        </>
      )}
      <div
        className={`relative mx-auto max-w-5xl animate-rise ${
          align === "center" ? "text-center" : ""
        }`}
      >
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 font-display text-5xl leading-[1.04] text-balance text-foreground sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {intro && (
          <p
            className={`mt-6 max-w-2xl text-lg leading-relaxed text-foreground/85 ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {intro}
          </p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
