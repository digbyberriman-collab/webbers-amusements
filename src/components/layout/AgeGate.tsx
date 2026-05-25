import { useEffect, useState } from "react";
import { ShieldAlert } from "lucide-react";

const STORAGE_KEY = "webbers:age-confirmed";

export function AgeGate() {
  const [open, setOpen] = useState(false);
  const [declined, setDeclined] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const confirmed = window.localStorage.getItem(STORAGE_KEY);
    if (!confirmed) setOpen(true);
  }, []);

  if (!open) return null;

  const confirm = () => {
    window.localStorage.setItem(STORAGE_KEY, "yes");
    setOpen(false);
  };

  if (declined) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-gate-decline-title"
        className="fixed inset-0 z-[100] grid place-items-center bg-ink p-6"
      >
        <div className="max-w-md text-center">
          <ShieldAlert
            className="mx-auto mb-6 size-10 text-danger"
            aria-hidden
          />
          <h2
            id="age-gate-decline-title"
            className="font-display text-3xl text-foreground mb-4"
          >
            Sorry — you must be 18 or over.
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Webbers Amusements is a licensed adult gaming centre. If you're
            worried about gambling — yours or someone else's — free,
            confidential support is available.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="https://www.begambleaware.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink hover:bg-gold-deep transition-colors"
            >
              Visit BeGambleAware
            </a>
            <a
              href="https://www.gamcare.org.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground underline underline-offset-4"
            >
              GamCare — 0808 8020 133
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-[100] grid place-items-center bg-ink/95 p-6 backdrop-blur-md"
    >
      <div className="glass hairline-gold w-full max-w-lg rounded-2xl p-10 text-center animate-rise">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-danger/30 bg-danger/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-danger">
          <span className="size-1.5 rounded-full bg-danger" /> Strictly 18+
        </div>
        <h2
          id="age-gate-title"
          className="font-display text-4xl leading-tight text-foreground mb-4"
        >
          Are you 18 or over?
        </h2>
        <p className="text-muted-foreground mb-8 text-balance">
          You must be 18 or over to enter the Webbers Amusements website. By
          continuing you confirm you meet our age requirement.
        </p>
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => setDeclined(true)}
            className="rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold text-foreground hover:bg-white/10 transition-colors"
          >
            No, I'm under 18
          </button>
          <button
            type="button"
            onClick={confirm}
            className="rounded-full bg-gold px-8 py-3 text-sm font-semibold text-ink hover:bg-gold-deep transition-colors"
          >
            Yes, I'm 18 or over
          </button>
        </div>
        <p className="mt-6 text-[10px] uppercase tracking-widest text-muted-foreground">
          When the fun stops, stop · 0808 8020 133
        </p>
      </div>
    </div>
  );
}
