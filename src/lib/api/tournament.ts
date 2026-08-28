import type { Tournament, CreateTournamentInput, UpdateTournamentInput } from "@/types/tournament";

export const fetchTournament = async (): Promise<Tournament> => {
  const response = await fetch("/api/tournament");
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al obtener el torneo");
  }

  return data.data;
};

export const createTournament = async (
  tournament: CreateTournamentInput
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

export const updateTournament = async (
  data: UpdateTournamentInput
): Promise<Tournament> => {
  const response = await fetch("/api/tournament", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Error al actualizar el torneo");
  }

  const result = await response.json();
  return result.data;
};

export const deleteTournament = async (): Promise<void> => {
  const response = await fetch("/api/tournament", {
    method: "DELETE",
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Error al eliminar el torneo");
  }
};