import { siteConfig } from "@/config/site";
import { Reveal, Parallax, Counter } from "@/components/motion";
import floorWideImg from "@/assets/floor-wide.jpg";
import heritageImg from "@/assets/heritage.jpg";
import leverImg from "@/assets/lever-pull.jpg";

export function ExperienceSection() {
  const yearsInFamily = new Date().getFullYear() - siteConfig.brand.foundedYear;

  const stats = [
    { to: yearsInFamily, suffix: "", label: "Years a family business" },
    { to: 3, suffix: "", label: "Generations of the Webber family" },
    { to: siteConfig.venues.length, suffix: "", label: "Arcades across the North-West" },
    { to: 4, suffix: "", label: "Premium hardware partners" },
  ];

  return (
    <section className="border-y border-white/5 bg-surface/30 px-6 py-[var(--section-y)] lg:px-10">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* LEFT — copy + counters */}
        <div>
          <Reveal>
            <p className="eyebrow">Step inside</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-balance text-foreground sm:text-5xl">
              Warm light, low noise, and the moment{" "}
              <span className="italic text-brass">before the spin.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">
              A Webbers arcade is a quieter ritual than the seafront was in 1954 — plush carpet,
              soft lighting, and a row of the best cabinets in the business. Same family standards,
              kept up for seventy years and counting.
            </p>
          </Reveal>

          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10">
            {stats.map((s) => (
              <Reveal key={s.label}>
                <div>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="font-display text-5xl font-semibold leading-none text-brass sm:text-6xl">
                      <Counter to={s.to} suffix={s.suffix} />
                    </span>
                    <p className="mt-3 text-sm leading-snug text-muted-foreground">{s.label}</p>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>

        {/* RIGHT — layered, parallaxing collage */}
        <Reveal direction="left" className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <Parallax distance={28} className="overflow-hidden rounded-2xl ring-1 ring-white/10">
                <img
                  src={floorWideImg}
                  alt="Rows of premium cabinets on a Webbers gaming floor under warm low light."
                  loading="lazy"
                  className="img-cinematic aspect-[3/4] w-full object-cover"
                  width={900}
                  height={1200}
                />
              </Parallax>
              <Parallax distance={18} className="overflow-hidden rounded-2xl ring-1 ring-white/10">
                <img
                  src={heritageImg}
                  alt="A heritage seaside arcade interior — penny falls and classic cabinets."
                  loading="lazy"
                  className="img-cinematic aspect-square w-full object-cover sepia-[0.25]"
                  width={900}
                  height={900}
                />
              </Parallax>
            </div>
            <div className="mt-10">
              <Parallax distance={40} className="overflow-hidden rounded-2xl ring-1 ring-white/10">
                <img
                  src={leverImg}
                  alt="A hand resting on a vintage slot-machine lever."
                  loading="lazy"
                  className="img-cinematic aspect-[3/5] w-full object-cover"
                  width={900}
                  height={1500}
                />
              </Parallax>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
