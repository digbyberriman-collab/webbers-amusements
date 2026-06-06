import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { todaysHours } from "@/lib/hours";
import { Reveal } from "@/components/motion";

export function FinalCta() {
  const flagship = siteConfig.venues[0];
  const hours = todaysHours(flagship);

  return (
    <section className="cta-glow relative overflow-hidden border-t border-white/5 bg-ink px-6 py-[var(--section-y)] lg:px-10">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="eyebrow">Come and see us</p>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] text-balance text-foreground sm:text-6xl">
            Pull up a stool. We've kept <span className="italic text-brass">a seat for you.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Visit any of our five arcades, or get in touch about a site or partnership. Either way,
            you'll talk to the family.
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/venues"
            className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-deep"
          >
            <MapPin className="size-4" aria-hidden />
            Find your nearest venue
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-brass hover:text-brass"
          >
            <Mail className="size-4" aria-hidden />
            Make an enquiry
          </Link>
          <a
            href={`tel:${flagship.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 px-3 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:text-brass"
          >
            <Phone className="size-4" aria-hidden />
            Call the team
          </a>
        </Reveal>

        <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          {hours.isOpen ? `Open now in Chester · ${hours.text}` : `Chester today · ${hours.text}`} ·
          Strictly 18+
        </p>
      </div>
    </section>
  );
}
