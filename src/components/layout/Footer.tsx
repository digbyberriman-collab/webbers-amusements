import { Link } from "@tanstack/react-router";
import { Instagram, Facebook } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  const chester = siteConfig.venues.find((v) => v.primary)!;
  return (
    <footer className="bg-ink pt-24 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <div className="grid size-9 place-items-center rounded-sm bg-gold">
                <span className="font-display text-lg font-bold text-ink">
                  W
                </span>
              </div>
              <span className="font-display text-2xl tracking-tight text-foreground">
                Webbers Amusements
              </span>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              {siteConfig.brand.description} Part of the {siteConfig.brand.parent}{" "}
              family, serving the community since {siteConfig.brand.foundedYear}.
            </p>
            <div className="mt-8 flex gap-3">
              <a
                href={siteConfig.contact.socials.instagram}
                aria-label="Webbers on Instagram"
                className="grid size-10 place-items-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-gold hover:text-gold"
              >
                <Instagram className="size-4" aria-hidden />
              </a>
              <a
                href={siteConfig.contact.socials.facebook}
                aria-label="Webbers on Facebook"
                className="grid size-10 place-items-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-gold hover:text-gold"
              >
                <Facebook className="size-4" aria-hidden />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">
                Explore
              </h3>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link to="/games" className="hover:text-gold">
                    Games
                  </Link>
                </li>
                <li>
                  <Link to="/venues" className="hover:text-gold">
                    Venues
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-gold">
                    Our story
                  </Link>
                </li>
                <li>
                  <Link to="/promotions" className="hover:text-gold">
                    Promotions
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-gold">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-gold">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">
                Visit Chester
              </h3>
              <address className="mt-6 space-y-2 text-sm not-italic text-muted-foreground">
                {chester.address.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <p>{chester.postcode}</p>
                <p className="pt-2 text-gold">
                  <a href={`tel:${chester.phone.replace(/\s/g, "")}`}>
                    {chester.phone}
                  </a>
                </p>
              </address>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">
                Safer gambling
              </h3>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link to="/safer-gambling" className="hover:text-gold">
                    Tools & support
                  </Link>
                </li>
                <li>
                  <a
                    href="https://www.begambleaware.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold"
                  >
                    BeGambleAware
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.gamcare.org.uk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold"
                  >
                    GamCare
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.gamstop.co.uk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold"
                  >
                    GAMSTOP (online)
                  </a>
                </li>
                <li>
                  <a
                    href="https://bacta.org.uk/self-exclusion/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold"
                  >
                    BACTA self-exclusion
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Compliance block — every page */}
        <div className="mt-20 border-t border-white/5 pt-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              <span>
                Licence no.{" "}
                <span className="text-foreground">
                  {siteConfig.compliance.licenceNumber}
                </span>
              </span>
              <span>
                National Gambling Helpline{" "}
                <a
                  href={`tel:${siteConfig.compliance.helpline.replace(/\s/g, "")}`}
                  className="text-gold"
                >
                  {siteConfig.compliance.helpline}
                </a>{" "}
                (free, 24/7)
              </span>
              <span>Strictly 18+</span>
            </div>
            <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">
              Webbers Amusements is licensed and regulated by the Gambling
              Commission. Entry to our venues is strictly limited to those aged
              18 and over — we operate a Think 21 policy and ID checks are
              standard. If you're concerned about your gambling or someone
              else's, please visit our{" "}
              <Link to="/safer-gambling" className="text-gold underline-offset-4 hover:underline">
                Safer Gambling
              </Link>{" "}
              page, call the free national helpline, or speak to any member of
              our team in venue.
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-widest text-muted-foreground/70">
              <span>
                © {new Date().getFullYear()} {siteConfig.brand.parent}. All
                rights reserved.
              </span>
              <span>Made in Chester</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
