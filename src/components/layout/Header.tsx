import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, MapPin } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/games", label: "Games" },
  { to: "/venues", label: "Venues" },
  { to: "/about", label: "About" },
  { to: "/promotions", label: "Promotions" },
  { to: "/safer-gambling", label: "Safer Gambling" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "glass border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3" aria-label="Webbers — home">
          <div className="grid size-9 place-items-center rounded-sm bg-gold">
            <span className="font-display text-lg font-bold text-ink">W</span>
          </div>
          <span className="font-display text-xl tracking-tight text-foreground">
            Webbers
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.slice(1).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 rounded-full border border-danger/30 bg-danger/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-danger sm:inline-flex">
            <span className="size-1.5 rounded-full bg-danger" /> 18+
          </span>
          <Link
            to="/venues"
            className="hidden items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-ink transition-all hover:scale-[1.02] hover:bg-gold-deep sm:inline-flex"
          >
            <MapPin className="size-3.5" aria-hidden /> Find Us
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="grid size-10 place-items-center rounded-full border border-white/10 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden glass border-t border-white/5 animate-rise">
          <nav
            aria-label="Mobile"
            className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-6"
          >
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-muted-foreground hover:bg-white/5 hover:text-gold"
                activeProps={{ className: "text-gold bg-white/5" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-base font-medium text-muted-foreground hover:bg-white/5 hover:text-gold"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
