import { ArrowRight } from "lucide-react";

import { TeamCrest } from "@/components/shared/TeamCrest";
import { recentResults } from "@/lib/mock/portal";
import { cn } from "@/lib/utils";

export function ResultsWidget() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-surface-1/40">
      <div className="flex items-center justify-between border-b border-border/40 px-5 py-4">
        <h3 className="font-heading text-sm font-bold uppercase tracking-tight text-foreground">
          Últimos resultados
        </h3>
        <a
          href="#resultados"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary-300"
        >
          Ver todos
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </a>
      </div>
      <ul>
        {recentResults.map((match) => {
          const homeScore = match.homeScore ?? 0;
          const awayScore = match.awayScore ?? 0;
          const homeWon = homeScore > awayScore;
          const awayWon = awayScore > homeScore;
          const isDraw = homeScore === awayScore;
          return (
            <li
              key={match.id}
              className={cn(
                "flex items-center gap-3 px-5 py-2.5 transition-colors hover:bg-surface-1/50",
                "[&+li]:border-t [&+li]:border-border/40"
              )}
            >
              <span className="w-16 shrink-0 text-[11px] font-medium text-muted-foreground">
                {match.date}
              </span>
              <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
                <span
                  className={cn(
                    "truncate text-xs",
                    homeWon ? "font-semibold text-foreground" : "text-muted-foreground"
                  )}
                >
                  {match.home.shortName}
                </span>
                <TeamCrest team={match.home} size="md" />
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-1 font-heading text-xs font-bold tabular-nums",
                    isDraw
                      ? "bg-surface-2 text-muted-foreground"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  {homeScore}–{awayScore}
                </span>
                <TeamCrest team={match.away} size="md" />
                <span
                  className={cn(
                    "truncate text-xs",
                    awayWon ? "font-semibold text-foreground" : "text-muted-foreground"
                  )}
                >
                  {match.away.shortName}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}