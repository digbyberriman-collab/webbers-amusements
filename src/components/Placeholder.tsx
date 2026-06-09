import type { ReactNode } from "react";

interface PlaceholderProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps content that's still awaiting client confirmation. Renders the
 * text in a subtle "draft" style so the live site stays readable while
 * also making it obvious to anyone reviewing that this copy is provisional.
 */
export function Placeholder({ children, className = "" }: PlaceholderProps) {
  return (
    <span
      className={`italic text-muted-foreground/70 ${className}`}
      title="Draft — pending client confirmation"
      data-placeholder
    >
      {children}
    </span>
  );
}
