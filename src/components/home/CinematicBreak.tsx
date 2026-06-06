import type { ReactNode } from "react";
import { Parallax, Reveal } from "@/components/motion";

interface CinematicBreakProps {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: ReactNode;
  body?: string;
}

/**
 * Full-bleed cinematic image break with a slow parallax backdrop and an
 * editorial caption rising in from the bottom-left.
 */
export function CinematicBreak({ image, imageAlt, eyebrow, title, body }: CinematicBreakProps) {
  return (
    <section className="relative h-[80svh] min-h-[460px] overflow-hidden border-y border-white/5">
      <Parallax
        distance={70}
        className="absolute inset-0"
        innerClassName="absolute inset-0 -top-[10%] h-[120%]"
      >
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="img-cinematic size-full object-cover"
          width={1920}
          height={1080}
        />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent" />
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-6 pb-20 lg:px-10">
        <Reveal className="max-w-xl space-y-5">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
            {title}
          </h2>
          {body && <p className="text-muted-foreground">{body}</p>}
        </Reveal>
      </div>
    </section>
  );
}
