import { Reveal } from "@/components/motion";

import floorWideImg from "@/assets/floor-wide.jpg";
import heritageImg from "@/assets/heritage.jpg";
import leverImg from "@/assets/lever-pull.jpg";
import dodgemsImg from "@/assets/webbers-dodgems-rhyl.jpg";
import signageImg from "@/assets/webbers-signage.jpeg";
import jackpotImg from "@/assets/game-jackpot.jpg";
import heroImg from "@/assets/hero-lounge.jpg";

interface Shot {
  src: string;
  caption: string;
  alt: string;
  sepia?: boolean;
}

const shots: Shot[] = [
  {
    src: signageImg,
    caption: "A family name above the door",
    alt: "Webbers Amusements signage on a high-street arcade frontage.",
  },
  {
    src: floorWideImg,
    caption: "Evening on the floor",
    alt: "A wide view of a Webbers gaming floor under warm low light.",
  },
  {
    src: dodgemsImg,
    caption: "Webbers Super Dodgems, Rhyl",
    alt: "The original Webbers Super Dodgems ride on the Rhyl seafront.",
    sepia: true,
  },
  {
    src: leverImg,
    caption: "The pull before the spin",
    alt: "A hand resting on a vintage slot-machine lever.",
  },
  {
    src: heritageImg,
    caption: "Classic seaside arcades",
    alt: "A heritage British seaside amusement arcade interior.",
    sepia: true,
  },
  {
    src: jackpotImg,
    caption: "Lights and late evenings",
    alt: "A jackpot cabinet glowing on the gaming floor.",
  },
  {
    src: heroImg,
    caption: "Built for the evening",
    alt: "The lounge-like atmosphere of a Webbers arcade after dark.",
  },
];

export function Gallery() {
  return (
    <section className="px-6 py-[var(--section-y)] lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-12 max-w-xl">
          <p className="eyebrow">In pictures</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl">
            Seventy years, frame by frame.
          </h2>
          <p className="mt-4 text-muted-foreground">
            From the seafront in the 1950s to the modern floor today — the same family, the same
            care for the room.
          </p>
        </Reveal>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {shots.map((shot, i) => (
            <Reveal
              key={shot.caption}
              delay={Math.min((i % 3) * 0.06, 0.18)}
              className="break-inside-avoid"
            >
              <figure className="group relative overflow-hidden rounded-2xl ring-1 ring-white/10">
                <img
                  src={shot.src}
                  alt={shot.alt}
                  loading="lazy"
                  className={`img-cinematic w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.05] ${
                    shot.sepia ? "sepia-[0.3]" : ""
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-1 p-5 font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/90 transition-transform duration-500 group-hover:translate-y-0">
                  {shot.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
