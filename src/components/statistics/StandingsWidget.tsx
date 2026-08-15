"use client";

import { useMemo } from "react";
import { TeamCrest } from "@/components/shared/TeamCrest";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMatches } from "@/hooks/useMatches";
import { useStandings } from "@/hooks/useStandings";
import { cn } from "@/lib/utils";
import type { MatchResponseType } from "@/types/matches";

const formDot: Record<"W" | "D" | "L", string> = {
  W: "bg-success",
  D: "bg-foreground/30",
  L: "bg-destructive",
};

function FormTiles({ form }: { form?: Array<"W" | "D" | "L"> }) {
  if (!form || form.length === 0) return null;
  return (
    <div className="flex items-center justify-center gap-1.5">
      {form.map((result, index) => (
        <span
          key={index}
          title={result === "W" ? "Victoria" : result === "D" ? "Empate" : "Derrota"}
          className={cn("size-2.5 rounded-full", formDot[result])}
        />
      ))}
    </div>
  );
}

function computeTeamForm(
  matches: MatchResponseType[],
  teamId: string
): Array<"W" | "D" | "L"> {
  return matches
    .filter((match) => match.status === "finished")
    .map((match) => {
      const isHome = match.homeTeam?._id === teamId;
      const isAway = match.awayTeam?._id === teamId;
      if (!isHome && !isAway) return null;
      const scored = isHome ? match.homeScore : match.awayScore;
      const conceded = isHome ? match.awayScore : match.homeScore;
      return {
        date: match.date,
        result:
          scored > conceded
            ? ("W" as const)
            : scored < conceded
              ? ("L" as const)
              : ("D" as const),
      };
    })
    .filter(
      (entry): entry is { date: string; result: "W" | "D" | "L" } => entry !== null
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)
    .map((entry) => entry.result);
}

function StandingsTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex flex-col">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 border-b border-border/60 px-4 py-2.5 last:border-0"
          >
            <Skeleton className="h-4 w-7" />
            <Skeleton className="size-6 rounded-full" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-5 w-7" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function StandingsWidget() {
  const {
    data: standings = [],
    isLoading,
    isFetching,
    error,
    refetch,
  } = useStandings();
  const { data: matches = [], isLoading: matchesLoading } = useMatches();

  const loading =
    isLoading || matchesLoading || (isFetching && standings.length === 0);

  const forms = useMemo(() => {
    const map = new Map<string, Array<"W" | "D" | "L">>();
    for (const row of standings) {
      map.set(row.team._id, computeTeamForm(matches, row.team._id));
    }
    return map;
  }, [matches, standings]);

  if (loading) return <StandingsTableSkeleton />;

  if (error) {
    return (
      <div className="rounded-xl border border-border bg-card px-6 py-14 text-center">
        <p className="text-sm text-muted-foreground">No se pudo cargar la tabla.</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => refetch()}
        >
          Reintentar
        </Button>
      </div>
    );
  }

  if (standings.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card px-6 py-14 text-center">
        <p className="text-sm text-muted-foreground">
          No hay posiciones disponibles.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="overflow-x-auto overscroll-x-contain">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-3 text-left font-medium">#</th>
              <th className="px-2 py-3 text-left font-medium">Club</th>
              <th className="px-3 py-3 text-center font-medium text-foreground">
                PJ
              </th>
              <th className="px-3 py-3 text-center font-medium">PG</th>
              <th className="px-3 py-3 text-center font-medium">PE</th>
              <th className="px-3 py-3 text-center font-medium">PP</th>
              <th className="px-3 py-3 text-center font-medium">GF</th>
              <th className="px-3 py-3 text-center font-medium">GC</th>
              <th className="px-3 py-3 text-center font-medium">DG</th>
              <th className="px-4 py-3 text-center font-medium text-foreground">
                Pts
              </th>
              <th className="px-3 py-3 text-center font-medium">Racha</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((row) => {
              const qualifies = row.position <= 4;
              const relegates = row.position >= standings.length - 1;
              const isLeader = row.position === 1;

              return (
                <tr
                  key={row._id}
                  className={cn(
                    "group border-b border-border/60 transition-colors last:border-0 hover:bg-elevated",
                    isLeader && "bg-gold/[0.05]"
                  )}
                >
                  <td className="relative px-4 py-2.5">
                    <span
                      className={cn(
                        "absolute inset-y-0 left-0 w-0.5",
                        qualifies
                          ? "bg-gold"
                          : relegates
                            ? "bg-destructive/70"
                            : "bg-transparent"
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        "tabular font-display font-semibold",
                        isLeader && "text-gold"
                      )}
                    >
                      {String(row.position).padStart(2, "0")}
                    </span>
                  </td>
                  <td className="px-2 py-2.5">
                    <a
                      href={`/teams/${row.team._id}`}
                      className="flex items-center gap-2.5 hover:text-gold"
                    >
                      <TeamCrest team={row.team} size={26} />
                      <span
                        className={cn(
                          "font-medium",
                          isLeader && "font-semibold text-gold"
                        )}
                      >
                        {row.team.name}
                      </span>
                    </a>
                  </td>
                  <td className="tabular px-3 py-2.5 text-center font-medium text-foreground">
                    {row.played}
                  </td>
                  <td className="tabular px-3 py-2.5 text-center text-muted-foreground">
                    {row.won}
                  </td>
                  <td className="tabular px-3 py-2.5 text-center text-muted-foreground">
                    {row.drawn}
                  </td>
                  <td className="tabular px-3 py-2.5 text-center text-muted-foreground">
                    {row.lost}
                  </td>
                  <td className="tabular px-3 py-2.5 text-center text-muted-foreground">
                    {row.goalsFor}
                  </td>
                  <td className="tabular px-3 py-2.5 text-center text-muted-foreground">
                    {row.goalsAgainst}
                  </td>
                  <td
                    className={cn(
                      "tabular px-3 py-2.5 text-center font-medium",
                      row.goalDifference > 0
                        ? "text-success"
                        : row.goalDifference < 0
                          ? "text-destructive"
                          : "text-muted-foreground"
                    )}
                  >
                    {row.goalDifference > 0 ? "+" : ""}
                    {row.goalDifference}
                  </td>
                  <td className="tabular font-display px-4 py-2.5 text-center text-base font-bold text-gold">
                    {row.points}
                  </td>
                  <td className="px-3 py-2.5">
                    <FormTiles form={forms.get(row.team._id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-4 border-t border-border px-4 py-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-1 rounded-full bg-gold" aria-hidden="true" />
          Clasificación a semifinal
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-1 rounded-full bg-destructive/70"
            aria-hidden="true"
          />
          Descenso
        </span>
      </div>
    </div>
  );
}