import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SaferGamblingStrip } from "./SaferGamblingStrip";
import { AgeGate } from "./AgeGate";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
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
