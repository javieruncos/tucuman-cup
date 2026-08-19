"use client";

import { TeamCrest } from "@/components/shared/TeamCrest";
import { Skeleton } from "@/components/ui/skeleton";
import { useTopScorers } from "@/hooks/useTopScorers";
import { cn } from "@/lib/utils";

export function TopScorersWidget({ limit }: { limit?: number }) {
  const {
    data: scorers = [],
    isLoading,
    isError,
    refetch,
  } = useTopScorers();

  const list = limit ? scorers.slice(0, limit) : scorers;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {isLoading ? (
        <div className="divide-y divide-border/60">
          {Array.from({ length: Math.min(limit ?? 5, 5) }).map((_, index) => (
            <div key={index} className="flex items-center gap-4 px-4 py-3.5">
              <Skeleton className="size-8 rounded-md" />
              <Skeleton className="size-8 rounded-full" />
              <div className="min-w-0 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="mt-1.5 h-3 w-20" />
              </div>
              <Skeleton className="h-5 w-8" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="px-4 py-6">
          <p className="text-sm text-muted-foreground">
            No se pudieron cargar los goleadores.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-3 text-sm font-medium text-gold transition-colors hover:text-gold-muted"
          >
            Reintentar
          </button>
        </div>
      ) : list.length === 0 ? (
        <p className="px-4 py-6 text-sm text-muted-foreground">
          Aún no hay goleadores cargados.
        </p>
      ) : (
        <div className="divide-y divide-border/60">
          {list.map((scorer, index) => (
            <div
              key={scorer.player._id}
              className="flex items-center gap-4 border-b border-border/60 px-4 py-3.5 transition-colors last:border-0 hover:bg-elevated"
            >
              <span
                className={cn(
                  "tabular font-display grid size-8 shrink-0 place-items-center rounded-md text-sm font-bold",
                  index === 0
                    ? "bg-gold text-primary-foreground"
                    : "bg-elevated text-muted-foreground"
                )}
              >
                {index + 1}
              </span>
              <TeamCrest team={scorer.team} size={30} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{scorer.player.name}</p>
                <p className="text-xs text-muted-foreground">
                  {scorer.team.shortName}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Goles</p>
                <p className="tabular font-display text-xl font-bold text-gold">
                  {scorer.goals}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}