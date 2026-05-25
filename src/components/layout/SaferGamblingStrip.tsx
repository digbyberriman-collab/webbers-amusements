import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";

export function SaferGamblingStrip() {
  return (
    <section
      aria-label="Safer gambling"
      className="border-t border-white/5 bg-ink"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center lg:px-10">
        <div className="flex items-center gap-6">
          <span
            aria-hidden
            className="grid size-12 place-items-center rounded-full border border-brass/40 font-display text-lg font-bold text-brass"
          >
            18+
          </span>
          <div className="max-w-xl">
            <p className="font-display text-lg text-foreground">
              When the fun stops, stop.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Free, confidential support is available 24/7 —{" "}
              <a
                href={`tel:${siteConfig.compliance.helpline.replace(/\s/g, "")}`}
                className="text-brass underline-offset-4 hover:underline"
              >
                {siteConfig.compliance.helpline}
              </a>
              . Speak to any member of our team in venue.
            </p>
          </div>
        </div>
        <Link
          to="/safer-gambling"
          className="rounded-full border border-brass/40 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brass transition-colors hover:bg-brass/10"
        >
          Safer gambling tools
        </Link>
      </div>
    </section>
  );
}
