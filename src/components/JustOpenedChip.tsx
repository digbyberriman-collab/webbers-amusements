interface JustOpenedChipProps {
  /** Visual size — "sm" for inline use in dropdowns, "md" for cards. */
  size?: "sm" | "md";
  className?: string;
}

/**
 * Terracotta "JUST OPENED" pill used wherever the newest venue is listed.
 * The terracotta colour is the brand's heritage accent — sparingly used.
 */
export function JustOpenedChip({
  size = "sm",
  className = "",
}: JustOpenedChipProps) {
  const sizeClass =
    size === "md"
      ? "px-3 py-1 text-[10px]"
      : "px-2 py-0.5 text-[9px]";
  return (
    <span
      className={`inline-flex items-center rounded-full bg-terracotta/15 font-mono font-semibold uppercase tracking-[0.22em] text-terracotta ring-1 ring-terracotta/30 ${sizeClass} ${className}`}
    >
      Just opened
    </span>
  );
}
