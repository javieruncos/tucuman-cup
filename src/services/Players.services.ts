import { Player } from "@/models/Player";
import type { PlayerInput } from "@/types/players";

export const getPlayers = async () => {
  try {
    return await Player.find().populate("team").sort({ number: 1 });
  } catch (error) {
    console.error("Error al obtener jugadores", error);
    throw error;
  }
};

export const getPlayersByTeam = async (teamId: string) => {
  try {
    return await Player.find({ team: teamId })
      .populate("team")
      .sort({ number: 1 });
  } catch (error) {
    console.error("Error al obtener el plantel", error);
    throw error;
  }
};

export const createPlayer = async (player: PlayerInput) => {
  try {
    const response = await Player.create(player);
    return response.populate("team");
  } catch (error) {
    console.error("Error al crear jugador", error);
    throw error;
  }
};