import { useEffect, useRef, useState } from "react";
import { ShieldAlert } from "lucide-react";
import { Logo } from "@/components/Logo";

const STORAGE_KEY = "webbers:age-confirmed";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function AgeGate() {
  const [open, setOpen] = useState(false);
  const [declined, setDeclined] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const confirmed = window.localStorage.getItem(STORAGE_KEY);
    if (!confirmed) setOpen(true);
  }, []);

  // Focus trap — auto-focus the primary action and cycle Tab inside the dialog.
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusables = Array.from(
      dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    );
    if (focusables.length === 0) return;

    const primary = declined ? focusables[0] : focusables[focusables.length - 1];
    primary.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    dialog.addEventListener("keydown", handleKey);
    return () => dialog.removeEventListener("keydown", handleKey);
  }, [open, declined]);

  if (!open) return null;

  const confirm = () => {
    window.localStorage.setItem(STORAGE_KEY, "yes");
    setOpen(false);
  };

  if (declined) {
    return (
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-gate-decline-title"
        className="fixed inset-0 z-[100] grid place-items-center bg-ink p-6"
      >
        <div className="max-w-md text-center animate-rise">
          <ShieldAlert
            className="mx-auto mb-6 size-10 text-danger"
            aria-hidden
          />
          <h2
            id="age-gate-decline-title"
            className="mb-4 font-display text-3xl text-foreground"
          >
            You must be 18 or over.
          </h2>
          <p className="mb-8 leading-relaxed text-muted-foreground">
            Webbers Amusements is a licensed adult gaming centre. If you're
            worried about gambling — yours or someone else's — free,
            confidential support is available.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="https://www.begambleaware.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-brass px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-brass-deep"
            >
              Visit BeGambleAware
            </a>
            <a
              href="tel:08088020133"
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
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-[100] grid place-items-center bg-ink/95 p-6 backdrop-blur-md"
    >
      <div className="hairline-brass w-full max-w-lg rounded-2xl bg-surface p-10 text-center animate-rise">
        <Logo size={32} sealOnly className="mx-auto mb-6" />
        <p className="eyebrow">Webbers Amusements · Est. 1954</p>
        <h2
          id="age-gate-title"
          className="mt-4 mb-4 font-display text-4xl leading-tight text-foreground"
        >
          Are you 18 or over?
        </h2>
        <p className="mb-8 text-balance text-muted-foreground">
          You must be 18 or over to enter the Webbers Amusements website. By
          continuing you confirm you meet our age requirement.
        </p>
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => setDeclined(true)}
            className="rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/10"
          >
            No, I'm under 18
          </button>
          <button
            type="button"
            onClick={confirm}
            className="rounded-full bg-brass px-8 py-3 text-sm font-semibold text-ink transition-colors hover:bg-brass-deep"
          >
            Yes, I'm 18 or over
          </button>
        </div>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          When the fun stops, stop · 0808 8020 133
        </p>
      </div>
    </div>
  );
}
