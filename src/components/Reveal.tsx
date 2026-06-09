import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

// useLayoutEffect on the client, useEffect on the server (no-op).
// Lets us check the element's position synchronously before paint
// without warnings during SSR.
const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}

const transformFor = (direction: Direction, distance: number): string => {
  switch (direction) {
    case "up":
      return `translate3d(0, ${distance}px, 0)`;
    case "down":
      return `translate3d(0, ${-distance}px, 0)`;
    case "left":
      return `translate3d(${-distance}px, 0, 0)`;
    case "right":
      return `translate3d(${distance}px, 0, 0)`;
    case "none":
      return "none";
  }
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 900,
  distance = 36,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  // Sync, pre-paint check — if the element is already in the viewport
  // at mount (i.e. above the fold), reveal immediately so there's no
  // flash of hidden content. Below-the-fold elements stay hidden and
  // get observed by IntersectionObserver in the effect below.
  useIsoLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }
    const rect = node.getBoundingClientRect();
    const inView =
      rect.top < window.innerHeight && rect.bottom > 0 && rect.height > 0;
    if (inView) setVisible(true);
  }, []);

  useEffect(() => {
    if (visible) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  const style: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translate3d(0, 0, 0)" : transformFor(direction, distance),
    transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
    willChange: visible ? "auto" : "opacity, transform",
  };

  return (
    <Tag ref={ref as never} style={style} className={className}>
      {children}
    </Tag>
  );
}
