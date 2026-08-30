import type { MatchStatsType, CreateMatchStatsInput, UpdateMatchStatsInput } from "@/types/matchStats";

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

export async function createMatchStats(
  matchId: string,
  data: CreateMatchStatsInput
): Promise<MatchStatsType> {
  const response = await fetch(`/api/matches/${matchId}/stats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Error al crear estadísticas");
  }

  const result = await response.json();
  return result.data;
}

export async function updateMatchStats(
  matchId: string,
  data: UpdateMatchStatsInput
): Promise<MatchStatsType> {
  const response = await fetch(`/api/matches/${matchId}/stats`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Error al actualizar estadísticas");
  }

  const result = await response.json();
  return result.data;
}

export async function deleteMatchStats(matchId: string): Promise<void> {
  const response = await fetch(`/api/matches/${matchId}/stats`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Error al eliminar estadísticas");
  }
}