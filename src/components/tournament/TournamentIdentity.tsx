"use client";

import { useStandings } from "@/hooks/useStandings";
import { useTournament } from "@/hooks/useTournament";

export function TournamentIdentity() {
  const {
    data: tournament,
    isLoading: tournamentLoading,
    error,
  } = useTournament();

  const {
    data: standings = [],
    isLoading: standingsLoading,
    isFetching,
  } = useStandings();
  const standingsPending =
    standingsLoading || (isFetching && standings.length === 0);
  const clubs =
    !standingsPending && standings.length > 0 ? standings.length : undefined;

  if (tournamentLoading || error || !tournament) {
    return null;
  }

  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <span className="font-display text-[11px] font-semibold uppercase tracking-widest text-gold">
        {tournament.name}
      </span>
      <span className="size-1 rounded-full bg-border" aria-hidden="true" />
      <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
        {tournament.season}
      </span>
      {clubs !== undefined && (
        <>
          <span className="size-1 rounded-full bg-border" aria-hidden="true" />
          <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            {clubs} {clubs === 1 ? "club" : "clubes"}
          </span>
        </>
      )}
    </p>
  );
}