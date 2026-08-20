"use client";

import { useMemo } from "react";
import Link from "next/link";
import { FormTiles } from "@/components/shared/FormTiles";
import { TeamCrest } from "@/components/shared/TeamCrest";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMatches } from "@/hooks/useMatches";
import { useStandings } from "@/hooks/useStandings";
import { getTeamForm } from "@/lib/teamForm";
import { cn } from "@/lib/utils";

function StandingsTableSkeleton() {
  return (
    <div className="border-b border-border/40">
      <div className="flex items-center gap-4 border-b border-border/40 px-4 py-3 sm:px-6">
        <Skeleton className="h-3 w-6" />
        <Skeleton className="h-3 w-16" />
        <Skeleton className="ml-auto h-3 w-6" />
        <Skeleton className="h-3 w-8" />
        <Skeleton className="h-4 w-6" />
      </div>
      <div className="divide-y divide-border/40">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 px-4 py-3.5 sm:px-6"
          >
            <Skeleton className="h-4 w-6" />
            <Skeleton className="size-6 rounded-full" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-6" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-5 w-7" />
          </div>
        ))}
      </div>
    </div>
  );
}

function StandingsMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-border/40 py-14 text-center">
      {children}
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
      map.set(row.team._id, getTeamForm(matches, row.team._id));
    }
    return map;
  }, [matches, standings]);

  if (loading) return <StandingsTableSkeleton />;

  if (error) {
    return (
      <StandingsMessage>
        <p className="font-display text-lg font-semibold uppercase tracking-wide text-foreground">
          No se pudo cargar la tabla
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Revisá la conexión e intentá de nuevo.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-5"
          onClick={() => refetch()}
        >
          Reintentar
        </Button>
      </StandingsMessage>
    );
  }

  if (standings.length === 0) {
    return (
      <StandingsMessage>
        <p className="font-display text-lg font-semibold uppercase tracking-wide text-foreground">
          La tabla todavía no tiene datos
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Cuando se carguen los clubes del torneo, la clasificación aparecerá
          acá.
        </p>
      </StandingsMessage>
    );
  }

  return (
    <div>
      <table className="w-full table-fixed border-collapse text-sm">
        <thead>
          <tr className="border-b border-border/40 text-xs uppercase tracking-widest text-muted-foreground">
            <th scope="col" className="w-10 py-3 pl-4 pr-1 text-left font-medium sm:pl-6">
              #
            </th>
            <th scope="col" className="px-2 py-3 text-left font-medium sm:px-3">
              Club
            </th>
            <th scope="col" className="w-10 px-2 py-3 text-center font-medium text-foreground">
              PJ
            </th>
            <th scope="col" className="hidden w-10 px-2 py-3 text-center font-medium lg:table-cell">
              PG
            </th>
            <th scope="col" className="hidden w-10 px-2 py-3 text-center font-medium lg:table-cell">
              PE
            </th>
            <th scope="col" className="hidden w-10 px-2 py-3 text-center font-medium lg:table-cell">
              PP
            </th>
            <th scope="col" className="hidden w-10 px-2 py-3 text-center font-medium lg:table-cell">
              GF
            </th>
            <th scope="col" className="hidden w-10 px-2 py-3 text-center font-medium lg:table-cell">
              GC
            </th>
            <th scope="col" className="w-12 px-2 py-3 text-center font-medium">
              DG
            </th>
            <th scope="col" className="w-14 px-2 py-3 pr-4 text-center font-medium text-foreground sm:px-3 sm:pr-3">
              PTS
            </th>
            <th scope="col" className="hidden w-40 px-2 py-3 text-center font-medium sm:table-cell">
              Racha
            </th>
          </tr>
        </thead>
        <tbody>
          {standings.map((row) => {
            const isLeader = row.position === 1;

            return (
              <tr
                key={row._id}
                className={cn(
                  "group transition-colors",
                  isLeader
                    ? "bg-gold-muted hover:bg-gold-muted"
                    : "hover:bg-elevated",
                  row.position < standings.length
                    ? "border-b border-border/40"
                    : "border-b-0"
                )}
              >
                <td className="py-3 pl-4 pr-1 sm:pl-6">
                  <span
                    className={cn(
                      "tabular font-display text-sm font-semibold",
                      isLeader ? "text-gold" : "text-muted-foreground"
                    )}
                  >
                    {String(row.position).padStart(2, "0")}
                  </span>
                </td>
                <td className="px-2 py-3 sm:px-3">
                  <Link
                    href={`/teams/${row.team._id}`}
                    className="flex items-center gap-2.5 rounded-sm transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                  >
                    <TeamCrest team={row.team} size={24} />
                    <span
                      className={cn(
                        "min-w-0 flex-1 truncate font-medium",
                        isLeader && "font-semibold text-gold"
                      )}
                      title={row.team.name}
                    >
                      {row.team.name}
                    </span>
                  </Link>
                </td>
                <td className="tabular w-10 px-2 py-3 text-center font-medium text-foreground">
                  {row.played}
                </td>
                <td className="tabular hidden w-10 px-2 py-3 text-center text-muted-foreground lg:table-cell">
                  {row.won}
                </td>
                <td className="tabular hidden w-10 px-2 py-3 text-center text-muted-foreground lg:table-cell">
                  {row.drawn}
                </td>
                <td className="tabular hidden w-10 px-2 py-3 text-center text-muted-foreground lg:table-cell">
                  {row.lost}
                </td>
                <td className="tabular hidden w-10 px-2 py-3 text-center text-muted-foreground lg:table-cell">
                  {row.goalsFor}
                </td>
                <td className="tabular hidden w-10 px-2 py-3 text-center text-muted-foreground lg:table-cell">
                  {row.goalsAgainst}
                </td>
                <td
                  className={cn(
                    "tabular w-12 px-2 py-3 text-center font-medium",
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
                <td className="tabular font-display w-14 px-2 py-3 pr-4 text-center text-base font-bold text-gold sm:px-3 sm:pr-3">
                  {row.points}
                </td>
                <td className="hidden w-40 px-2 py-3 sm:table-cell">
                  <FormTiles form={forms.get(row.team._id)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}