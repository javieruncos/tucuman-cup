import { Player } from "@/models/Player";
import { MatchEvent } from "@/models/MatchEvent";
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

export const getPlayerById = async (id: string) => {
  try {
    const player = await Player.findById(id).populate("team");
    if (!player) {
      return { success: false, error: "Player not found" };
    }
    return { success: true, data: player };
  } catch (error) {
    return { success: false, error: "Error interno" };
  }
};

export const updatePlayer = async (id: string, data: {
  name?: string;
  number?: number;
  position?: "GK" | "DEF" | "MID" | "FWD";
  photo?: string;
}) => {
  try {
    const existingPlayer = await Player.findById(id);
    if (!existingPlayer) {
      return { success: false, error: "Player not found" };
    }

    // Validar duplicidad de number dentro del mismo team (excluyendo al propio)
    if (data.number && existingPlayer.team) {
      const duplicate = await Player.findOne({
        number: data.number,
        team: existingPlayer.team,
        _id: { $ne: id }
      });
      if (duplicate) {
        return { success: false, error: "Ya existe un jugador con ese número en el equipo" };
      }
    }

    const response = await Player.findOneAndUpdate(
      { _id: id },
      data,
      { new: true, runValidators: true }
    );

    return { success: true, data: response };
  } catch (error) {
    return { success: false, error: "Error interno" };
  }
};

export const deletePlayer = async (id: string) => {
  try {
    // Verificar dependencias en MatchEvent (player y additionalPlayer)
    const eventsCount = await MatchEvent.countDocuments({
      $or: [{ player: id }, { additionalPlayer: id }]
    });

    if (eventsCount > 0) {
      return {
        success: false,
        error: `No se puede eliminar el jugador. Tiene ${eventsCount}(s) evento(s) asociado(s).`,
        code: "PLAYER_HAS_EVENTS"
      };
    }

    // Si no hay dependencias, eliminar físicamente
    await Player.findByIdAndDelete(id);

    return { success: true, data: {} };
  } catch (error) {
    return { success: false, error: "Error interno" };
  }
};