import { ArrowRight } from "lucide-react";

import { topScorers } from "@/lib/mock/portal";
import { cn } from "@/lib/utils";

const medalStyles = [
  "border-primary/70 text-primary",
  "border-muted-foreground/50 text-muted-foreground",
  "border-primary-600/70 text-primary-600",
];

const maxGoals = topScorers[0].goals;

export function TopScorersWidget() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-surface-1/40">
      <div className="flex items-center justify-between border-b border-border/40 px-5 py-4">
        <h3 className="font-heading text-sm font-bold uppercase tracking-tight text-foreground">
          Goleadores
        </h3>
        <a
          href="#goleadores"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary-300"
        >
          Ranking
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </a>
      </div>

      <ul>
        {topScorers.map((scorer, index) => {
          const goalsPct = Math.round((scorer.goals / maxGoals) * 100);
          return (
            <li
              key={scorer.id}
              className={cn(
                "flex items-center gap-3 px-5 py-2.5 transition-colors hover:bg-surface-1/50",
                index === 0 && "bg-primary/[0.05]",
                "[&+li]:border-t [&+li]:border-border/40"
              )}
            >
              <span
                className={cn(
                  "flex size-6 items-center justify-center rounded-full border text-[11px] font-bold tabular-nums",
                  medalStyles[index] ?? "text-muted-foreground"
                )}
              >
                {index + 1}
              </span>
              <span
                className="flex size-9 shrink-0 items-center justify-center rounded-xl border-2 font-heading text-[10px] font-bold"
                style={{
                  borderColor: `${scorer.team.color}66`,
                  color: scorer.team.color,
                  backgroundColor: `${scorer.team.color}14`,
                }}
              >
                {scorer.team.shortName}
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="truncate text-sm font-semibold text-foreground">
                  {scorer.name}
                </span>
                <span className="relative h-px w-full overflow-hidden rounded-full bg-surface-3">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-primary/50"
                    style={{ width: `${goalsPct}%` }}
                    aria-hidden="true"
                  />
                </span>
              </div>
              <span className="w-6 shrink-0 text-center font-heading text-lg font-bold tabular-nums text-primary">
                {scorer.goals}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}