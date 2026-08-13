import type { MatchResponseType } from "@/types/matches";

export const fetchMatches = async (): Promise<MatchResponseType[]> => {
  const response = await fetch("/api/matches");

  if (!response.ok) {
    throw new Error("Error al obtener los partidos");
  }

  const result = await response.json();

  return result.data;
};

export const fetchMatchById = async (
  id: string
): Promise<MatchResponseType> => {
  const response = await fetch(`/api/matches/${id}`);

  if (!response.ok) {
    throw new Error("Error al obtener el partido");
  }

  const result = await response.json();

  return result.data;
};