"use client";

import { useStandings } from "@/hooks/useStandings";

function StatCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-border bg-card px-5 py-4">
      <div className="h-8 w-16 rounded bg-elevated" />
      <div className="mt-1 h-3 w-20 rounded bg-elevated" />
    </div>
  );
}

export function StatsSummaryCards() {
  const { data: standings, isLoading, error } = useStandings();

  if (isLoading) {
    return (
      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
    );
  }

  if (error || standings.length === 0) {
    return null;
  }

  const teamsCount = standings.length;
  const matchesPlayed = standings.reduce((sum, row) => sum + row.played, 0) / 2;
  const goalsScored = standings.reduce((sum, row) => sum + row.goalsFor, 0);
  const avgGoals =
    matchesPlayed > 0 ? Math.round((goalsScored / matchesPlayed) * 100) / 100 : 0;

  const statCards: Array<[string, number]> = [
    ["Goles", goalsScored],
    ["Partidos", matchesPlayed],
    ["Goles por partido", avgGoals],
    ["Clubes", teamsCount],
  ];

  return (
    <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {statCards.map(([label, value]) => (
        <div
          key={label}
          className="rounded-xl border border-border bg-card px-5 py-4"
        >
          <p className="tabular font-display text-3xl font-bold text-gold">
            {value}
          </p>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}