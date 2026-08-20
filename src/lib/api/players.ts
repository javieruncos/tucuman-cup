import type { Player, PlayerInput } from "@/types/players";

export const fetchPlayers = async (): Promise<Player[]> => {
  const response = await fetch("/api/players");

  if (!response.ok) {
    throw new Error("Error al obtener jugadores");
  }

  const result = await response.json();

  return result.data;
};

export const fetchTeamPlayers = async (teamId: string): Promise<Player[]> => {
  const response = await fetch(`/api/teams/${teamId}/players`);

  if (!response.ok) {
    throw new Error("Error al obtener el plantel");
  }

  const result = await response.json();

  return result.data;
};

export const createPlayer = async (player: PlayerInput): Promise<Player> => {
  const response = await fetch("/api/players", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(player),
  });

  if (!response.ok) {
    throw new Error("Error al crear jugador");
  }

  const result = await response.json();

  return result.data;
};