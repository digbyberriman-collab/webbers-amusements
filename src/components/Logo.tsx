// The Webbers winged-W monogram — an inline SVG mirroring the
// brass medallion mark used on the client's existing material.
// Brass circle, central serif "W", tapering horizontal wings either side.

type LogoProps = {
  /** Total height in px. Width scales to ~3.2× height. */
  size?: number;
  /** Hide the wings (just the circular brass seal). */
  sealOnly?: boolean;
  className?: string;
  title?: string;
};

export function Logo({
  size = 32,
  sealOnly = false,
  className,
  title = "Webbers Amusements",
}: LogoProps) {
  const w = sealOnly ? size : Math.round(size * 3.4);
  const h = size;

  if (sealOnly) {
    return (
      <svg
        viewBox="0 0 32 32"
        width={w}
        height={h}
        role="img"
        aria-label={title}
        className={className}
      >
        <title>{title}</title>
        <circle
          cx="16"
          cy="16"
          r="14"
          fill="var(--color-ink)"
          stroke="var(--color-brass)"
          strokeWidth="1.4"
        />
        <circle
          cx="16"
          cy="16"
          r="11.2"
          fill="none"
          stroke="var(--color-brass)"
          strokeWidth="0.6"
          strokeOpacity="0.5"
        />
        <text
          x="16"
          y="21.6"
          textAnchor="middle"
          fontFamily="Fraunces, Bodoni Moda, serif"
          fontWeight="700"
          fontSize="16"
          fill="var(--color-foreground)"
        >
          W
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 110 32"
      width={w}
      height={h}
      role="img"
      aria-label={title}
      className={className}
    >
      <title>{title}</title>
      <defs>
        <linearGradient id="brass-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-brass)" />
          <stop offset="1" stopColor="var(--color-brass-deep)" />
        </linearGradient>
      </defs>

      {/* Left wing — tapered bar with arrowhead tip */}
      <g fill="url(#brass-grad)">
        <rect x="14" y="14.4" width="26" height="3.2" rx="1.2" />
        <polygon points="14,12.4 6,16 14,19.6" />
        <rect x="4" y="15.4" width="3" height="1.2" rx="0.5" />
      </g>

      {/* Right wing */}
      <g fill="url(#brass-grad)">
        <rect x="70" y="14.4" width="26" height="3.2" rx="1.2" />
        <polygon points="96,12.4 104,16 96,19.6" />
        <rect x="103" y="15.4" width="3" height="1.2" rx="0.5" />
      </g>

      {/* Centre seal */}
      <circle
        cx="55"
        cy="16"
        r="14"
        fill="var(--color-ink)"
        stroke="url(#brass-grad)"
        strokeWidth="1.6"
      />
      <circle
        cx="55"
        cy="16"
        r="11.2"
        fill="none"
        stroke="var(--color-brass)"
        strokeWidth="0.5"
        strokeOpacity="0.5"
      />
      <text
        x="55"
        y="21.5"
        textAnchor="middle"
        fontFamily="Fraunces, Bodoni Moda, serif"
        fontWeight="700"
        fontSize="16"
        fill="var(--color-foreground)"
      >
        W
      </text>
    </svg>
  );
}
