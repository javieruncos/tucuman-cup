import type { MatchStatsType } from "@/types/matchStats";

interface MatchStatsResponse {
  success: boolean;
  data: MatchStatsType;
}

export async function fetchMatchStats(
  matchId: string
): Promise<MatchStatsType> {
  const response = await fetch(`/api/matches/${matchId}/stats`);

  if (!response.ok) {
    throw new Error("Error al obtener las estadísticas del partido");
  }

  const result: MatchStatsResponse = await response.json();

  return result.data;
}