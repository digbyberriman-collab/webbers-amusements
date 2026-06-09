import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SaferGamblingStrip } from "./SaferGamblingStrip";
import { AgeGate } from "./AgeGate";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Skip-link — first focusable element on every page. Hidden
          until focused, so it costs nothing visually but gives
          keyboard users a one-tab path to the main content. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-brass focus:px-5 focus:py-3 focus:font-mono focus:text-[10px] focus:font-semibold focus:uppercase focus:tracking-[0.22em] focus:text-ink"
      >
        Skip to content
      </a>
      <div className="grain-overlay" aria-hidden />
      <AgeGate />
      <Header />
      <main id="main" className="min-h-dvh">
        {children}
      </main>
      <SaferGamblingStrip />
      <Footer />
    </>
  );
}
