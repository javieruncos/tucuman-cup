import type { Tournament } from "@/types/tournament";

export const fetchTournament = async (): Promise<Tournament> => {
  const response = await fetch("/api/tournament");
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al obtener el torneo");
  }

  return data.data;
};

export const createTournament = async (
  tournament: Omit<Tournament, "_id" | "createdAt" | "updatedAt">
): Promise<Tournament> => {
  const response = await fetch("/api/tournament", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tournament),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al crear el torneo");
  }

  return data.data;
};