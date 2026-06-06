import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SaferGamblingStrip } from "./SaferGamblingStrip";
import { AgeGate } from "./AgeGate";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    // reducedMotion="user" makes every framer-motion animation respect the
    // visitor's OS "reduce motion" setting — transforms are dropped, only
    // gentle opacity remains. Pairs with the CSS block in styles.css.
    <MotionConfig reducedMotion="user">
      <div className="grain-overlay" aria-hidden />
      <AgeGate />
      <Header />
      <main id="main" className="min-h-dvh">
        {children}
      </main>
      <SaferGamblingStrip />
      <Footer />
    </MotionConfig>
  );
}
