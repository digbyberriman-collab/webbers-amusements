import { useEffect, useRef, useState, type CSSProperties } from "react";

export interface SlotItem {
  key: string;
  symbol: string; // emoji / glyph
  label: string;  // short text under symbol
}

interface SlotMachineProps {
  items: SlotItem[];
  selectedKey: string;
  onLand: (key: string) => void;
  /** If true, lever pull advances to next item; otherwise random. */
  cycleOnPull?: boolean;
  headerTitle?: string;
  idleHint?: string;
}

const ROW = 96;
const COPIES = 8;
const DURATIONS = [2.0, 2.6, 3.2]; // staggered stop

// Decorative chasing bulbs
function BulbRow({ count = 14 }: { count?: number }) {
  return (
    <div className="flex items-center justify-between">
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

function Reel({
  items,
  target,
  duration,
  spinning,
  spinKey,
  onDone,
}: {
  items: SlotItem[];
  target: number;
  duration: number;
  spinning: boolean;
  spinKey: number;
  onDone: () => void;
}) {
  const longList = Array.from({ length: COPIES }, () => items).flat();
  const restingIndex = (COPIES - 1) * items.length + target;
  const restingOffset = -restingIndex * ROW;

  const style: CSSProperties = {
    transform: `translateY(${restingOffset}px)`,
    ...(spinning
      ? {
          animationName: "slot-spin",
          animationDuration: `${duration}s`,
          animationTimingFunction: "cubic-bezier(0.2, 0.85, 0.2, 1)",
          animationFillMode: "forwards",
        }
      : {}),
  };
  // CSS var for the keyframe destination
  (style as Record<string, string>)["--rest"] = `${restingOffset}px`;

  return (
    <div className="slot-window relative h-24 overflow-hidden rounded-md ring-1 ring-white/15">
      <div
        key={spinKey}
        className="flex flex-col"
        style={style}
        onAnimationEnd={() => spinning && onDone()}
      >
        {longList.map((it, i) => (
          <div
            key={i}
            className="flex h-24 shrink-0 flex-col items-center justify-center text-center"
          >
            <span className="text-3xl leading-none">{it.symbol}</span>
            <span className="mt-1 px-1 text-[9px] font-bold uppercase tracking-widest text-foreground/80">
              {it.label}
            </span>
          </div>
        ))}
      </div>
      {/* Pay-line */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-[color:var(--neon-yellow)] shadow-[0_0_12px_var(--neon-yellow)]" />
    </div>
  );
}

function Lever({
  onPull,
  disabled,
}: {
  onPull: () => void;
  disabled?: boolean;
}) {
  const [pull, setPull] = useState(0);
  const [animating, setAnimating] = useState(false);
  const startY = useRef<number | null>(null);
  const pulledRef = useRef(false);
  const draggingRef = useRef(false);
  const MAX = 56;

  const triggerAnimatedPull = () => {
    if (disabled || animating) return;
    setAnimating(true);
    setPull(MAX);
    onPull();
    window.setTimeout(() => {
      setPull(0);
      window.setTimeout(() => setAnimating(false), 450);
    }, 220);
  };

  const release = () => {
    const wasDragging = draggingRef.current;
    const didPull = pulledRef.current;
    draggingRef.current = false;
    startY.current = null;
    pulledRef.current = false;
    if (wasDragging) {
      setPull(0);
      if (didPull && !disabled) onPull();
    } else {
      triggerAnimatedPull();
    }
  };

  return (
    <div
      className="relative flex w-9 shrink-0 flex-col items-center"
      style={{ height: `${96 + MAX}px` }}
    >
      <div className="absolute top-0 left-1/2 h-3.5 w-8 -translate-x-1/2 rounded-md bg-gradient-to-b from-zinc-500 to-zinc-800 shadow-inner ring-1 ring-black/40" />
      <div
        className="absolute left-1/2 w-1.5 -translate-x-1/2 rounded-full bg-gradient-to-b from-zinc-200 via-zinc-400 to-zinc-600"
        style={{ top: 12, height: `${10 + pull}px` }}
      />
      <button
        type="button"
        onPointerDown={(e) => {
          if (disabled || animating) return;
          startY.current = e.clientY;
          pulledRef.current = false;
          draggingRef.current = false;
          (e.currentTarget as Element).setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (startY.current === null || disabled) return;
          const dy = Math.max(0, Math.min(MAX, e.clientY - startY.current));
          if (dy > 4) draggingRef.current = true;
          setPull(dy);
          if (dy >= MAX * 0.7) pulledRef.current = true;
        }}
        onPointerUp={release}
        onPointerCancel={release}
        disabled={disabled}
        aria-label="Pull lever to spin reels"
        className="absolute left-1/2 size-8 -translate-x-1/2 cursor-grab touch-none rounded-full active:cursor-grabbing disabled:cursor-not-allowed"
        style={{
          top: `${18 + pull}px`,
          background:
            "radial-gradient(circle at 30% 28%, #ff8a8a 0%, #d23030 45%, #6b0000 100%)",
          boxShadow:
            "0 0 18px var(--neon-pink), inset 0 -5px 10px rgba(0,0,0,0.55), inset 0 4px 8px rgba(255,255,255,0.25)",
          transition:
            pull === 0
              ? "top 0.45s cubic-bezier(0.34,1.56,0.64,1)"
              : animating
                ? "top 0.22s ease-in"
                : "none",
        }}
      />
    </div>
  );
}

export function SlotMachine({
  items,
  selectedKey,
  onLand,
  cycleOnPull = true,
  headerTitle = "Webbers",
  idleHint = "Pull the lever",
}: SlotMachineProps) {
  const findIdx = (k: string) => Math.max(0, items.findIndex((i) => i.key === k));
  const [target, setTarget] = useState(() => findIdx(selectedKey));
  const [spinning, setSpinning] = useState(false);
  const [spinKey, setSpinKey] = useState(0);
  const finishedRef = useRef(0);
  const pendingRef = useRef(target);

  // sync external selection only when idle
  useEffect(() => {
    if (!spinning) setTarget(findIdx(selectedKey));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKey, items.length]);

  const triggerSpin = () => {
    if (spinning || items.length === 0) return;
    const currentIdx = findIdx(selectedKey);
    let next: number;
    if (cycleOnPull) {
      next = (currentIdx + 1) % items.length;
    } else {
      // random but not the same
      next = currentIdx;
      while (next === currentIdx && items.length > 1) {
        next = Math.floor(Math.random() * items.length);
      }
    }
    pendingRef.current = next;
    setTarget(next);
    finishedRef.current = 0;
    setSpinKey((k) => k + 1);
    setSpinning(true);
  };

  const onReelDone = () => {
    finishedRef.current += 1;
    if (finishedRef.current >= 3) {
      setSpinning(false);
      onLand(items[pendingRef.current].key);
    }
  };

  return (
    <div className="cabinet-frame relative mx-auto w-full max-w-md p-2.5">
      {/* Top bulbs */}
      <div className="px-1 py-1.5 text-[color:var(--neon-yellow)]">
        <BulbRow count={14} />
      </div>

      {/* Marquee header */}
      <div className="rounded-t-xl bg-gradient-to-b from-ink to-surface px-4 py-3 text-center">
        <p className="neon-text font-display text-lg font-bold tracking-[0.35em]">
          ★ {headerTitle.toUpperCase()} ★
        </p>
      </div>

      {/* Reels + lever */}
      <div className="flex items-start gap-3 bg-black/85 p-3">
        <div className="grid flex-1 grid-cols-3 gap-2">
          {DURATIONS.map((dur, i) => (
            <Reel
              key={i}
              items={items}
              target={target}
              duration={dur}
              spinning={spinning}
              spinKey={spinKey}
              onDone={onReelDone}
            />
          ))}
        </div>
        <Lever onPull={triggerSpin} disabled={spinning} />
      </div>

      {/* Bottom bulbs */}
      <div className="px-1 py-1.5 text-[color:var(--neon-cyan)]">
        <BulbRow count={14} />
      </div>

      {/* Status bar */}
      <div className="rounded-b-xl bg-ink/90 px-4 py-3 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--neon-yellow)]">
          {spinning ? "Spinning…" : idleHint}
        </p>
      </div>
    </div>
  );
}
