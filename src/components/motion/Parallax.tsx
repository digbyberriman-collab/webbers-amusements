import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  /** Vertical travel in pixels across the scroll range (split +/-). */
  distance?: number;
  className?: string;
  /** Class applied to the moving inner layer. */
  innerClassName?: string;
}

/**
 * Scroll-linked parallax. Translates its children vertically as the element
 * passes through the viewport. Disabled entirely under prefers-reduced-motion.
 */
export function Parallax({
  children,
  distance = 60,
  className,
  innerClassName = "size-full",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [distance, -distance]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className={innerClassName}>
        {children}
      </motion.div>
    </div>
  );
}
