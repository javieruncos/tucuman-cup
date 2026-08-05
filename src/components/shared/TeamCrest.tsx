import type { Team } from "@/lib/mock/portal";
import { cn } from "@/lib/utils";

interface TeamCrestProps {
  team: Team;
  size?: number | "md" | "lg" | "xl";
  className?: string;
}

const stringSizes = {
  md: 40,
  lg: 64,
  xl: 88,
};

// Escudo generado (SVG) para no depender de assets externos.
export function TeamCrest({ team, size = "lg", className }: TeamCrestProps) {
  const px = typeof size === "number" ? size : stringSizes[size];

  return (
    <span
      className={cn("relative inline-flex shrink-0 items-center justify-center", className)}
      style={{ width: px, height: px }}
      aria-hidden="true"
    >
      <svg width={px} height={px} viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id={`crest-${team.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={team.color} stopOpacity="0.95" />
            <stop offset="100%" stopColor={team.color} stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <path
          d="M24 2 6 8v16c0 11 8 18 18 22 10-4 18-11 18-22V8L24 2Z"
          fill={`url(#crest-${team.id})`}
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="1.2"
        />
        <path
          d="M24 2 6 8v16c0 11 8 18 18 22 10-4 18-11 18-22V8L24 2Z"
          fill="none"
          stroke="rgba(0,0,0,0.25)"
          strokeWidth="0.5"
          transform="scale(0.9) translate(2.6 2.4)"
        />
      </svg>
      <span
        className="font-display absolute inset-0 flex items-center justify-center font-bold text-white"
        style={{ fontSize: px * 0.3, textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}
      >
        {team.shortName.slice(0, 3)}
      </span>
    </span>
  );
}
