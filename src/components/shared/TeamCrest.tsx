import type { Team } from "@/lib/mock/portal";
import { cn } from "@/lib/utils";

interface TeamCrestProps {
  team: Team;
  size?: "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  md: "size-12 rounded-xl text-sm",
  lg: "size-20 rounded-2xl text-xl sm:size-24",
  xl: "size-24 rounded-2xl text-2xl sm:size-32 sm:text-3xl",
};

export function TeamCrest({ team, size = "lg", className }: TeamCrestProps) {
  return (
    <span
      className={cn(
        "relative flex items-center justify-center border-2 font-heading font-bold transition-transform duration-300 ease-out hover:scale-[1.04]",
        sizeClasses[size],
        className
      )}
      style={{
        borderColor: `${team.color}66`,
        color: team.color,
        backgroundColor: `${team.color}14`,
        boxShadow: `0 0 48px -16px ${team.color}59, inset 0 1px 0 rgba(255,255,255,0.08)`,
      }}
      aria-hidden="true"
    >
      {team.shortName}
    </span>
  );
}