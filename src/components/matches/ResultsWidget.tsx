"use client";

import { ArrowRight } from "lucide-react";

import { TeamCrest } from "@/components/shared/TeamCrest";
import { useMatches } from "@/hooks/useMatches";
import { cn } from "@/lib/utils";

function shortDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("es-AR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
}

export function ResultsWidget() {
  const { data: matches = [], isLoading, error } = useMatches();

  const results = matches
    .filter((match) => match.status === "finished")
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, 5);

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

      {isLoading ? (
        <ul>
          {Array.from({ length: 4 }).map((_, index) => (
            <li
              key={index}
              className="flex items-center gap-3 px-5 py-2.5 [&+li]:border-t [&+li]:border-border/40"
            >
              <span className="h-3 w-16 shrink-0 animate-pulse rounded bg-muted" />
              <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
                <span className="h-3 w-10 animate-pulse rounded bg-muted" />
                <span className="size-8 animate-pulse rounded-full bg-muted" />
                <span className="h-5 w-10 shrink-0 animate-pulse rounded-full bg-muted" />
                <span className="size-8 animate-pulse rounded-full bg-muted" />
                <span className="h-3 w-10 animate-pulse rounded bg-muted" />
              </div>
            </li>
          ))}
        </ul>
      ) : error ? (
        <p className="px-5 py-6 text-xs text-muted-foreground">
          No se pudieron cargar los resultados.
        </p>
      ) : results.length === 0 ? (
        <p className="px-5 py-6 text-xs text-muted-foreground">
          Aún no hay resultados.
        </p>
      ) : (
        <ul>
          {results.map((match) => {
            const homeScore = match.homeScore;
            const awayScore = match.awayScore;
            const homeWon = homeScore > awayScore;
            const awayWon = awayScore > homeScore;
            const isDraw = homeScore === awayScore;
            return (
              <li
                key={match._id}
                className={cn(
                  "flex items-center gap-3 px-5 py-2.5 transition-colors hover:bg-surface-1/50",
                  "[&+li]:border-t [&+li]:border-border/40"
                )}
              >
                <span className="w-16 shrink-0 text-[11px] font-medium text-muted-foreground">
                  {shortDate(match.date)}
                </span>
                <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
                  <span
                    className={cn(
                      "truncate text-xs",
                      homeWon ? "font-semibold text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {match.homeTeam.shortName}
                  </span>
                  <TeamCrest team={match.homeTeam} size="md" />
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
                  <TeamCrest team={match.awayTeam} size="md" />
                  <span
                    className={cn(
                      "truncate text-xs",
                      awayWon ? "font-semibold text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {match.awayTeam.shortName}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}