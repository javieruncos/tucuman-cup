import type { MatchResponseType } from "@/types/matches";

export type FormResult = "W" | "D" | "L";

export function getTeamForm(
  matches: MatchResponseType[],
  teamId: string
): FormResult[] {
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
      (entry): entry is { date: string; result: FormResult } => entry !== null
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)
    .map((entry) => entry.result);
}