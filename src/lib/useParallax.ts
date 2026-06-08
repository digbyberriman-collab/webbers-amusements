import { useEffect, useRef } from "react";

/**
 * Parallax translate driven by element position. Returns a ref to attach
 * to the moving element. The element should sit inside a clipped parent
 * (overflow-hidden) and be larger than the parent — otherwise the
 * translation will expose seams at the edges.
 */
export function useParallax<T extends HTMLElement = HTMLElement>(
  strength = 0.25,
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const node = ref.current;
    if (!node) return;

    let raf = 0;
    const update = () => {
      const rect = node.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      const offset = center * strength;
      node.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      raf = 0;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return ref;
}
