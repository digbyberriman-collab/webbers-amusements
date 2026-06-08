import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
};

interface RevealProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  children: ReactNode;
  /** Seconds to wait before this element animates in. */
  delay?: number;
  /** Direction the element travels from. */
  direction?: Direction;
  /** Portion of the element that must be visible to trigger (0–1). */
  amount?: number;
  /** Animate only the first time it enters the viewport. */
  once?: boolean;
}

/**
 * Scroll-reveal wrapper. Fades + slides children into view as they enter
 * the viewport. Transform animations are automatically neutralised for
 * visitors who prefer reduced motion (via the root <MotionConfig>), leaving
 * a gentle opacity fade only.
 */
export function Reveal({
  children,
  delay = 0,
  direction = "up",
  amount = 0.2,
  once = true,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...OFFSET[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
