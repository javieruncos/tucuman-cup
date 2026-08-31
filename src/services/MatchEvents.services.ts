import { MatchEvent } from "@/models/MatchEvent";
import { Match } from "@/models/Matches";
import "@/models/Player";
import "@/models/Team";
import { buildCategoryFilter } from "@/lib/categories";
import { getCategoryId } from "@/services/Categories.services";
import type { MatchEventInput } from "@/types/matchEvents";
import type { TopScorer } from "@/types/statistics";
import { Player } from "@/models/Player";
import { Team } from "@/models/Team";

type TopScorerEvent = {
  player: unknown;
  team: unknown;
};

export const getEventsByMatch = async (matchId: string) => {
  try {
    return await MatchEvent.find({ match: matchId })
      .populate("player")
      .populate("additionalPlayer")
      .populate("team")
      .sort({ minute: 1 });
  } catch (error) {
    console.error("Error al obtener eventos del partido", error);
    throw error;
  }
};

export const getMatchEventById = async (eventId: string) => {
  try {
    const event = await MatchEvent.findById(eventId)
      .populate("player")
      .populate("additionalPlayer")
      .populate("team")
      .populate("match");
    if (!event) {
      return { success: false, error: "Evento no encontrado" };
    }
    return { success: true, data: event };
  } catch (error) {
    console.error("Error al obtener evento", error);
    throw error;
  }
};

export const createMatchEvent = async (event: { match: string; team: string; player: string; type: string; minute: number; additionalPlayer?: string | null }) => {
  try {
    //buscamos en la DB si existe el player
    const player = await Player.findById(event.player);

    //buscamos en la DB si existe el team
    const team = await Team.findById(event.team);

    //buscamos en la DB si existe el match
    const match = await Match.findById(event.match);

    //si no existe alguno de los anteriores, devolvemos error
    if (!player) {
      return { success: false, error: "Jugador no encontrado" };
    }

    if (!team) {
      return { success: false, error: "Equipo no encontrado" };
    }

    if (!match) {
      return { success: false, error: "Partido no encontrado" };
    }

    if (player.team.toString() !== event.team) {
      return { success: false, error: "El jugador no pertenece al equipo" };
    }

    if (event.additionalPlayer) {
      const additionalPlayer = await Player.findById(event.additionalPlayer);
      if (!additionalPlayer) {
        return { success: false, error: "Jugador adicional no encontrado" };
      }

      if (additionalPlayer.team.toString() !== event.team) {
        return { success: false, error: "El jugador adicional no pertenece al equipo" };
      }
    }

    //creamos el evento
    const response = await MatchEvent.create(event);
    return response.populate(["player", "additionalPlayer", "team"]);
  } catch (error) {
    console.error("Error al crear evento", error);
    throw error;
  }
};

export const updateMatchEvent = async (eventId: string, data: { type?: string; minute?: number }) => {
  try {
    const existingEvent = await MatchEvent.findById(eventId);
    if (!existingEvent) {
      return { success: false, error: "Evento no encontrado" };
    }

    // SOLO permitir modificar type y minute
    if (data.type && !["goal", "yellow_card", "red_card", "substitution"].includes(data.type)) {
      return { success: false, error: "Tipo de evento inválido" };
    }

    const response = await MatchEvent.findOneAndUpdate(
      { _id: eventId },
      data,
      { new: true, runValidators: true }
    );

    return { success: true, data: response };
  } catch (error) {
    console.error("Error al actualizar evento", error);
    return { success: false, error: "Error interno" };
  }
};

export const deleteMatchEvent = async (eventId: string) => {
  try {
    const existingEvent = await MatchEvent.findById(eventId);
    if (!existingEvent) {
      return { success: false, error: "Evento no encontrado" };
    }

    // NO hacer cascade delete, NO bloquear por dependencias
    await MatchEvent.findByIdAndDelete(eventId);

    return { success: true, data: {} };
  } catch (error) {
    console.error("Error al eliminar evento", error);
    return { success: false, error: "Error interno" };
  }
};