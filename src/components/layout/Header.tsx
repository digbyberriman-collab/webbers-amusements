import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, MapPin, Phone, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

const nav = [
  { to: "/", label: "Home", symbol: "🎰" },
  { to: "/games", label: "Games", symbol: "🎲" },
  { to: "/venues", label: "Venues", symbol: "📍" },
  { to: "/promotions", label: "Promotions", symbol: "💰" },
  { to: "/about", label: "About", symbol: "★" },
  { to: "/safer-gambling", label: "Safer Gambling", symbol: "🛡️" },
  { to: "/faq", label: "FAQ", symbol: "?" },
  { to: "/contact", label: "Contact", symbol: "✉" },
] as const;

// Chasing marquee bulbs (matches the casino theme)
function BulbRow({ count = 18 }: { count?: number }) {
  return (
    <div className="flex w-full items-center justify-between">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="bulb"
          style={{ animationDelay: `${(i * 0.08).toFixed(2)}s` }}
        />
      ))}
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

  // Lock body scroll when menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  // Close on ESC
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
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "glass border-b border-[color:var(--neon-pink)]/30" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link
            to="/"
            className="flex items-center gap-3"
            aria-label="Webbers Amusements — home"
          >
            <span className="neon-text-pink font-display text-xl font-bold tracking-tight sm:text-2xl">
              Webbers <span className="italic">Amusements</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 rounded-full border border-[color:var(--neon-pink)]/40 bg-[color:var(--neon-pink)]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[color:var(--neon-pink)] sm:inline-flex">
              <span className="size-1.5 rounded-full bg-[color:var(--neon-pink)]" /> 18+
            </span>

            {/* THE MAIN MENU BUTTON — visible on every page, every viewport */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open main menu"
              aria-expanded={open}
              aria-controls="main-menu-overlay"
              className="play-button group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-black uppercase tracking-[0.25em]"
            >
              <Menu className="size-4" aria-hidden />
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN NEON MENU OVERLAY */}
      <div
        id="main-menu-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-ink/95 backdrop-blur-md"
          onClick={() => setOpen(false)}
        />

        {/* Neon haze */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-1/4 h-[60vh] w-[60vh] rounded-full opacity-40 blur-3xl"
          style={{
            background: "radial-gradient(circle, var(--neon-pink), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 bottom-0 h-[60vh] w-[60vh] rounded-full opacity-40 blur-3xl"
          style={{
            background: "radial-gradient(circle, var(--neon-cyan), transparent 70%)",
          }}
        />

        {/* Top bulb rail */}
        <div className="absolute inset-x-6 top-4 text-[color:var(--neon-yellow)] opacity-90">
          <BulbRow count={28} />
        </div>
        {/* Bottom bulb rail */}
        <div className="absolute inset-x-6 bottom-4 text-[color:var(--neon-cyan)] opacity-90">
          <BulbRow count={28} />
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="absolute right-6 top-6 grid size-12 place-items-center rounded-full border border-[color:var(--neon-pink)]/40 bg-ink text-[color:var(--neon-pink)] shadow-[0_0_18px_var(--neon-pink)] transition-transform hover:scale-110"
        >
          <X className="size-5" aria-hidden />
        </button>

        {/* Marquee title */}
        <div
          className={`relative mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 transition-transform duration-500 ${
            open ? "translate-y-0" : "-translate-y-8"
          }`}
        >
          <div className="mb-8 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[color:var(--neon-yellow)]">
              ★ Webbers Amusements ★
            </p>
            <h2 className="neon-text mt-3 font-display text-4xl tracking-[0.15em] sm:text-6xl">
              THE MENU
            </h2>
          </div>

          {/* Nav grid — cabinet-style buttons */}
          <nav
            aria-label="Primary"
            className="grid w-full max-w-3xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3"
          >
            {nav.map((item, i) => {
              const accents = [
                "border-[color:var(--neon-pink)]/60 text-[color:var(--neon-pink)] hover:bg-[color:var(--neon-pink)]/10 hover:shadow-[0_0_24px_var(--neon-pink)]",
                "border-[color:var(--neon-cyan)]/60 text-[color:var(--neon-cyan)] hover:bg-[color:var(--neon-cyan)]/10 hover:shadow-[0_0_24px_var(--neon-cyan)]",
                "border-[color:var(--neon-yellow)]/60 text-[color:var(--neon-yellow)] hover:bg-[color:var(--neon-yellow)]/10 hover:shadow-[0_0_24px_var(--neon-yellow)]",
                "border-[color:var(--neon-green)]/60 text-[color:var(--neon-green)] hover:bg-[color:var(--neon-green)]/10 hover:shadow-[0_0_24px_var(--neon-green)]",
              ];
              const accent = accents[i % accents.length];
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`group relative flex flex-col items-center justify-center gap-2 rounded-2xl border-2 bg-ink/60 px-4 py-6 text-center transition-all ${accent}`}
                  activeProps={{
                    className:
                      "ring-2 ring-[color:var(--neon-yellow)] bg-[color:var(--neon-yellow)]/10",
                  }}
                >
                  <span
                    className="text-3xl transition-transform group-hover:scale-110"
                    aria-hidden
                  >
                    {item.symbol}
                  </span>
                  <span className="font-display text-base font-bold uppercase tracking-[0.2em]">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Footer rail — quick contact */}
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
            <Link
              to="/venues"
              onClick={() => setOpen(false)}
              className="play-button inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-black uppercase tracking-widest"
            >
              <MapPin className="size-4" aria-hidden />
              Find a Venue
            </Link>
            <a
              href={`tel:${siteConfig.compliance.helpline.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/70 hover:text-[color:var(--neon-cyan)]"
            >
              <Phone className="size-3.5" aria-hidden />
              Helpline · {siteConfig.compliance.helpline}
            </a>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--neon-pink)]/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[color:var(--neon-pink)]">
              <Sparkles className="size-3" aria-hidden /> Strictly 18+
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
