"use client";

import { TeamCrest } from "@/components/shared/TeamCrest";
import { useStandings } from "@/hooks/useStandings";

function GoalsBarSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-6 w-32 animate-pulse rounded bg-elevated sm:w-44" />
      <div className="h-6 flex-1 animate-pulse rounded bg-elevated" />
      <div className="h-6 w-8 animate-pulse rounded bg-elevated" />
    </div>
  );
}

export function GoalsByClub() {
  const { data: standings, isLoading, error } = useStandings();

  if (isLoading) {
    return (
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col gap-3">
          <GoalsBarSkeleton />
          <GoalsBarSkeleton />
          <GoalsBarSkeleton />
        </div>
      </div>
    );
  }

  if (error || standings.length === 0) {
    return null;
  }

  const goalsByTeam = [...standings].sort((a, b) => b.goalsFor - a.goalsFor);
  const maxGf = goalsByTeam[0].goalsFor;

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex flex-col gap-3">
        {goalsByTeam.map((row) => (
          <div key={row._id} className="flex items-center gap-3">
            <div className="flex w-32 shrink-0 items-center gap-2 sm:w-44">
              <TeamCrest team={row.team} size={24} />
              <span className="truncate text-sm font-medium">
                {row.team.name}
              </span>
            </div>
            <div className="flex-1">
              <div
                className="h-6 rounded bg-gradient-to-r from-gold/70 to-gold transition-all"
                style={{ width: `${(row.goalsFor / maxGf) * 100}%` }}
              />
            </div>
            <span className="tabular font-display w-8 text-right text-sm font-bold">
              {row.goalsFor}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}