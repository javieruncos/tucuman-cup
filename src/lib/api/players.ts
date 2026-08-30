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


// GET /api/players/[id]
export const fetchPlayerById = async (id: string): Promise<Player> => {
  const response = await fetch(`/api/players/${id}`);

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Error al obtener jugador");
  }

  return response.json();
};

// PATCH /api/players/[id]
export const updatePlayer = async (id: string, data: {
  name?: string;
  number?: number;
  position?: "GK" | "DEF" | "MID" | "FWD";
  photo?: string;
}): Promise<Player> => {
  const response = await fetch(`/api/players/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Error al actualizar jugador");
  }

  return response.json();
};

// DELETE /api/players/[id]
export const deletePlayer = async (id: string): Promise<void> => {
  const response = await fetch(`/api/players/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Error al eliminar jugador");
  }
};