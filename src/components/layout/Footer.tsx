import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink pt-24 pb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Top — brand block + 3 columns */}
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo size={34} className="mb-6" />
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              {siteConfig.brand.shortDescription} Part of{" "}
              {siteConfig.brand.parent}, a family business since{" "}
              {siteConfig.brand.foundedYear}.
            </p>
            <div className="mt-8 flex gap-3">
              <a
                href={siteConfig.contact.socials.instagram}
                aria-label="Webbers on Instagram"
                className="grid size-10 place-items-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-brass hover:text-brass"
              >
                <Instagram className="size-4" aria-hidden />
              </a>
              <a
                href={siteConfig.contact.socials.facebook}
                aria-label="Webbers on Facebook"
                className="grid size-10 place-items-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-brass hover:text-brass"
              >
                <Facebook className="size-4" aria-hidden />
              </a>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <h3 className="eyebrow">Explore</h3>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link to="/about" className="hover:text-brass">
                    Our story
                  </Link>
                </li>
                <li>
                  <Link to="/venues" className="hover:text-brass">
                    Venues
                  </Link>
                </li>
                <li>
                  <Link to="/games" className="hover:text-brass">
                    Gaming floor
                  </Link>
                </li>
                <li>
                  <Link to="/promotions" className="hover:text-brass">
                    What's on
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-brass">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-brass">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="eyebrow">Our venues</h3>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                {siteConfig.venues.map((v) => (
                  <li key={v.slug}>
                    <Link
                      to="/venues/$slug"
                      params={{ slug: v.slug }}
                      className="hover:text-brass"
                    >
                      {v.city}
                      {v.city === "Chester"
                        ? ` · ${v.address[0].split(" ")[1] ?? ""}`
                        : ""}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="eyebrow">Safer gambling</h3>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link to="/safer-gambling" className="hover:text-brass">
                    Tools & support
                  </Link>
                </li>
                <li>
                  <a
                    href="https://www.begambleaware.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brass"
                  >
                    BeGambleAware
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.gamcare.org.uk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brass"
                  >
                    GamCare
                  </a>
                </li>
                <li>
                  <a
                    href="https://bacta.org.uk/self-exclusion/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brass"
                  >
                    Bacta self-exclusion
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Trust marks band */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.trustMarks.map((mark) => (
            <div key={mark.key} className="bg-ink p-6">
              <ShieldCheck className="mb-3 size-4 text-brass" aria-hidden />
              <p className="font-display text-sm leading-snug text-foreground">
                {mark.label}
              </p>
              <p className="mt-1.5 text-xs text-muted-foreground">
                {mark.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Compliance block */}
        <div className="mt-16 border-t border-white/5 pt-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              <span>
                {siteConfig.compliance.regulator}{" "}
                <span className="text-foreground">
                  Licence {siteConfig.compliance.licenceNumber}
                </span>
                {siteConfig.compliance.licenceType && (
                  <span className="ml-2 normal-case tracking-normal text-muted-foreground/80">
                    ({siteConfig.compliance.licenceType})
                  </span>
                )}
              </span>
              <span>
                Helpline{" "}
                <a
                  href={`tel:${siteConfig.compliance.helpline.replace(/\s/g, "")}`}
                  className="text-brass"
                >
                  {siteConfig.compliance.helpline}
                </a>{" "}
                · free, 24/7
              </span>
              <span>Strictly 18+</span>
              <span>{siteConfig.compliance.idPolicy} ID policy</span>
            </div>
            <p className="max-w-4xl text-xs leading-relaxed text-muted-foreground">
              Webbers Amusements is licensed and regulated by the{" "}
              {siteConfig.compliance.regulator}. Entry to all venues is
              strictly limited to those aged 18 and over — we operate a{" "}
              {siteConfig.compliance.idPolicy} policy and ID checks are
              standard. The maximum slot prize on an Adult Gaming Centre
              cabinet is £{siteConfig.compliance.maxSlotPrize}. If you're
              concerned about your gambling or someone else's, please visit
              our{" "}
              <Link
                to="/safer-gambling"
                className="text-brass underline-offset-4 hover:underline"
              >
                Safer Gambling
              </Link>{" "}
              page, call the free national helpline, or speak to any member of
              our team in venue.
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">
              <span>
                © {new Date().getFullYear()} {siteConfig.brand.parent}. All
                rights reserved.
              </span>
              <span>A family business · Since {siteConfig.brand.foundedYear}</span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/50">
              Registered office: {siteConfig.registeredOffice.company},{" "}
              {siteConfig.registeredOffice.address.join(", ")},{" "}
              {siteConfig.registeredOffice.city},{" "}
              {siteConfig.registeredOffice.postcode}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
