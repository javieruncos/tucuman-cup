import type { Team } from "@/lib/mock/portal";
import { cn } from "@/lib/utils";

interface TeamBadgeProps {
  team: Team;
  size?: "sm" | "md" | "lg";
  align?: "left" | "center" | "right";
  withName?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "size-8 text-[11px]",
  md: "size-11 text-xs",
  lg: "size-14 text-sm",
};

const alignClasses = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
};

export function TeamBadge({
  team,
  size = "md",
  align = "center",
  withName = false,
  className,
}: TeamBadgeProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", alignClasses[align], className)}>
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full border-2 font-heading font-bold",
          sizeClasses[size]
        )}
        style={{ backgroundColor: `${team.color}1f`, borderColor: `${team.color}66`, color: team.color }}
      >
        {team.shortName}
      </span>
      {withName && (
        <span className="text-xs font-medium leading-tight text-foreground">
          {team.name}
        </span>
      )}
    </div>
  );
}