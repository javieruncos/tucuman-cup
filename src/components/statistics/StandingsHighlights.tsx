"use client";

import { useStandings } from "@/hooks/useStandings";

function HighlightCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-border bg-card p-5">
      <div className="h-3 w-16 rounded bg-elevated" />
      <div className="mt-2 h-5 w-24 rounded bg-elevated" />
      <div className="mt-1 h-3 w-20 rounded bg-elevated" />
    </div>
  );
}

export function StandingsHighlights() {
  const { data: standings, isLoading, error } = useStandings();

  if (isLoading) {
    return (
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <HighlightCardSkeleton />
        <HighlightCardSkeleton />
        <HighlightCardSkeleton />
      </div>
    );
  }

  if (error || standings.length === 0) {
    return null;
  }

  const leader = standings[0];
  const topScorerTeam = standings.reduce((a, b) =>
    a.goalsFor > b.goalsFor ? a : b
  );
  const bestDefense = standings.reduce((a, b) =>
    a.goalsAgainst < b.goalsAgainst ? a : b
  );

  const highlights: Array<[string, string, string]> = [
    ["Líder", leader.team.name, `${leader.points} pts`],
    ["Más goles", topScorerTeam.team.name, `${topScorerTeam.goalsFor} anotados`],
    ["Mejor defensa", bestDefense.team.name, `${bestDefense.goalsAgainst} recibidos`],
  ];

  return (
    <div className="mb-6 grid gap-3 sm:grid-cols-3">
      {highlights.map(([label, name, sub]) => (
        <div
          key={label}
          className="rounded-xl border border-border bg-card p-5"
        >
          <p className="font-display text-xs font-semibold uppercase tracking-widest text-gold">
            {label}
          </p>
          <p className="font-display mt-2 text-xl font-semibold uppercase tracking-wide">
            {name}
          </p>
          <p className="text-sm text-muted-foreground">{sub}</p>
        </div>
      ))}
    </div>
  );
}
