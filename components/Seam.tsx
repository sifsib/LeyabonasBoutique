import { useId } from "react";

type Props = {
  /** Draw itself once on first load (used once, on the hero). */
  animate?: boolean;
  /** Seam on a cream surface uses the deeper gold. */
  tone?: "gold" | "deep";
  orientation?: "horizontal" | "vertical";
  className?: string;
};

export default function Seam({ animate = false, tone = "gold", orientation = "horizontal", className = "" }: Props) {
  const id = useId().replace(/:/g, "");
  const horizontal = orientation === "horizontal";
  const line = horizontal
    ? { x1: "0", y1: "50%", x2: "100%", y2: "50%" }
    : { x1: "50%", y1: "0", x2: "50%", y2: "100%" };
  const colour = tone === "gold" ? "var(--gold)" : "var(--gold-deep)";

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`block ${horizontal ? "h-3 w-full" : "h-full w-3"} ${className}`}
    >
      <defs>
        <mask id={`seam-${id}`} maskUnits="userSpaceOnUse">
          <line {...line} stroke="#fff" strokeWidth="6" pathLength={1} className="seam-reveal" data-animate={animate || undefined} />
        </mask>
      </defs>
      <line
        {...line}
        stroke={colour}
        strokeWidth="1.5"
        strokeDasharray="7 5"
        strokeLinecap="round"
        mask={`url(#seam-${id})`}
      />
    </svg>
  );
}
