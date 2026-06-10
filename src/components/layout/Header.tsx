import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, MapPin } from "lucide-react";
import { Logo } from "@/components/Logo";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61589225037599#";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "Our Story" },
  { to: "/venues", label: "Venues" },
  { to: "/games", label: "Gaming Floor" },
  { to: "/promotions", label: "What's On" },
  { to: "/safer-gambling", label: "Safer Gambling" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

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
            {nav.slice(0, 6).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="link-underline text-[13px] font-medium tracking-wide text-foreground/75 transition-colors hover:text-foreground"
                activeProps={{ className: "text-brass" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
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
              <Link
                key={item.to}
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
