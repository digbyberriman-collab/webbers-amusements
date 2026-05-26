import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X, MapPin } from "lucide-react";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/config/site";

type NavItem =
  | { to: string; label: string; venuesMenu?: undefined }
  | { to: string; label: string; venuesMenu: true };

const nav: readonly NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/about", label: "Our Story" },
  { to: "/venues", label: "Venues", venuesMenu: true },
  { to: "/games", label: "Gaming Floor" },
  { to: "/promotions", label: "What's On" },
  { to: "/safer-gambling", label: "Safer Gambling" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

function venueLabel(city: string, slug: string) {
  if (city !== "Chester") return city;
  return slug === "chester-frodsham"
    ? "Chester · Frodsham St"
    : "Chester · Northgate St";
}

function VenuesNavItem() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  // Close on Escape, restore focus to the trigger.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        const trigger = containerRef.current?.querySelector<HTMLElement>(
          "[data-venues-trigger]",
        );
        trigger?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onFocus={() => {
        cancelClose();
        setOpen(true);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          scheduleClose();
        }
      }}
    >
      <Link
        to="/venues"
        data-venues-trigger
        aria-haspopup="menu"
        aria-expanded={open}
        className="link-underline inline-flex items-center gap-1 text-[13px] font-medium tracking-wide text-foreground/75 transition-colors hover:text-foreground"
        activeProps={{ className: "text-brass" }}
      >
        Venues
        <ChevronDown
          className={`size-3 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </Link>

      {/* Dropdown panel */}
      <div
        role="menu"
        aria-label="Webbers venues"
        className={`absolute left-1/2 top-full z-50 mt-3 w-80 -translate-x-1/2 transition-all duration-200 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div className="glass hairline-brass overflow-hidden rounded-2xl border border-white/5 shadow-2xl">
          <div className="border-b border-white/5 px-5 pb-2 pt-4">
            <p className="eyebrow">Our five Adult Gaming Centres</p>
          </div>
          <ul className="divide-y divide-white/5">
            {siteConfig.venues.map((v) => (
              <li key={v.slug}>
                <Link
                  to="/venues/$slug"
                  params={{ slug: v.slug }}
                  role="menuitem"
                  className="group flex items-baseline justify-between gap-4 px-5 py-3 transition-colors hover:bg-surface"
                >
                  <div className="min-w-0">
                    <p className="font-display text-base text-foreground transition-colors group-hover:text-brass">
                      {venueLabel(v.city, v.slug)}
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      {v.region}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="text-brass opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/venues"
            role="menuitem"
            className="block border-t border-white/5 px-5 py-3 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-brass transition-colors hover:bg-surface"
          >
            See all venues
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "glass border-b border-white/5"
            : "bg-gradient-to-b from-ink/60 to-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* Brand mark */}
          <Link
            to="/"
            className="flex items-center gap-3"
            aria-label="Webbers Amusements — home"
            onClick={() => setOpen(false)}
          >
            <Logo size={30} sealOnly className="shrink-0" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg tracking-[0.02em] text-foreground sm:text-xl">
                Webbers
              </span>
              <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.32em] text-brass">
                Est. 1954
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 lg:flex"
          >
            {nav.slice(0, 6).map((item) =>
              item.venuesMenu ? (
                <VenuesNavItem key={item.to} />
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  className="link-underline text-[13px] font-medium tracking-wide text-foreground/75 transition-colors hover:text-foreground"
                  activeProps={{ className: "text-brass" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* Right-side actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/venues"
              className="hidden items-center gap-2 rounded-full bg-brass px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-brass-deep sm:inline-flex"
            >
              <MapPin className="size-3.5" aria-hidden />
              Find a venue
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open main menu"
              aria-expanded={open}
              aria-controls="main-menu-overlay"
              className="grid size-11 place-items-center rounded-full border border-white/10 text-foreground transition-colors hover:border-brass hover:text-brass lg:hidden"
            >
              <Menu className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open full menu"
              aria-expanded={open}
              aria-controls="main-menu-overlay"
              className="hidden items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/80 transition-colors hover:border-brass hover:text-foreground lg:inline-flex"
            >
              <Menu className="size-3.5" aria-hidden />
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Overlay menu — quiet, editorial, no flashing bulbs */}
      <div
        id="main-menu-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className={`fixed inset-0 z-[60] transition-opacity duration-500 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-ink/96 backdrop-blur-xl"
          onClick={() => setOpen(false)}
          aria-hidden
        />
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="absolute right-6 top-6 grid size-11 place-items-center rounded-full border border-white/10 text-foreground transition-colors hover:border-brass hover:text-brass"
        >
          <X className="size-4" aria-hidden />
        </button>

        <div
          className={`relative mx-auto flex h-full max-w-3xl flex-col justify-center px-8 transition-transform duration-500 ${
            open ? "translate-y-0" : "translate-y-4"
          }`}
        >
          <Logo size={36} sealOnly className="mb-10" />
          <p className="eyebrow mb-4">Webbers Amusements · Est. 1954</p>
          <nav aria-label="Primary" className="space-y-1">
            {nav.map((item, i) => (
              <div key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-6 border-b border-white/5 py-4 transition-colors hover:border-brass/40"
                  activeProps={{ className: "border-brass/40" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-3xl text-foreground transition-colors group-hover:text-brass sm:text-4xl">
                    {item.label}
                  </span>
                </Link>
                {item.venuesMenu && (
                  <ul className="ml-12 mt-2 space-y-1 border-l border-white/5 pl-4">
                    {siteConfig.venues.map((v) => (
                      <li key={v.slug}>
                        <Link
                          to="/venues/$slug"
                          params={{ slug: v.slug }}
                          onClick={() => setOpen(false)}
                          className="block py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-brass"
                        >
                          {venueLabel(v.city, v.slug)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/venues"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-deep"
            >
              <MapPin className="size-3.5" aria-hidden />
              Find a venue
            </Link>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Strictly 18+ · Licensed AGC
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
