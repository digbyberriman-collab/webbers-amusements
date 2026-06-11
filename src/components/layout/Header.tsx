import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, MapPin } from "lucide-react";
import { Logo } from "@/components/Logo";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61589225037599#";
const INSTAGRAM_URL = "https://www.instagram.com/webberscasinoslots";

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
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid size-11 place-items-center rounded-full border border-white/10 text-foreground transition-colors hover:border-brass hover:text-brass"
            >
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid size-11 place-items-center rounded-full border border-white/10 text-foreground transition-colors hover:border-brass hover:text-brass"
            >
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
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
