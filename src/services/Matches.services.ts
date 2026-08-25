import { Match } from "@/models/Matches";
import { MatchStats } from "@/models/MatchStats";
import { MatchEvent } from "@/models/MatchEvent";
import type { MatchType } from "@/types/matches";

export const createMatch = async (match: MatchType) => {
  try {
    const existingMatch = await Match.findOne({
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      date: match.date,
    });

    if (existingMatch) {
      throw new Error("El partido ya existe");
    }

    const response = await Match.create(match);

    return response;
  } catch (error) {
    console.log("Error al crear partido", error);
    throw error;
  }
};

export const getMatches = async () => {
  try {
    const response = await Match.find()
      .populate("homeTeam")
      .populate("awayTeam");

    return response;
  } catch (error) {
    console.log("Error al obtener partidos", error);
    throw error;
  }
};

export const getMatchById = async (id: string) => {
  try {
    const response = await Match.findById(id)
      .populate("homeTeam")
      .populate("awayTeam");

    return response;
  } catch (error) {
    console.log("Error al obtener partido", error);
    throw error;
  }
};

export const updateMatch = async (id: string, data: {
  category?: string;
  date?: string;
  time?: string;
  status?: "scheduled" | "live" | "finished";
  homeScore?: number;
  awayScore?: number;
  halftimeScore?: { home: number | null; away: number | null };
  round?: string;
  venue?: string;
}) => {
  try {
    const existingMatch = await Match.findById(id);
    if (!existingMatch) {
      return { success: false, error: "Partido no encontrado" };
    }

    // Los campos homeTeam y awayTeam están excluidos del tipo UpdateMatchInput,
    // pero validamos por si alguien intenta pasar datos extra por el body
    const forbiddenFields = ["homeTeam", "awayTeam"];
    const hasForbidden = forbiddenFields.some((field) => field in data);
    if (hasForbidden) {
      return { success: false, error: "No se puede modificar homeTeam ni awayTeam" };
    }

    // Si cambia date, verificar duplicidad (excluyendo el propio match)
    if (data.date) {
      const dateExists = await Match.findOne({
        homeTeam: existingMatch.homeTeam,
        awayTeam: existingMatch.awayTeam,
        date: data.date,
        _id: { $ne: id }
      });
      if (dateExists) {
        return { success: false, error: "Ya existe un partido con esa fecha" };
      }
    }

    const response = await Match.findOneAndUpdate(
      { _id: id },
      data,
      { new: true, runValidators: true }
    );

    return { success: true, data: response };
  } catch (error) {
    console.error("Error al actualizar partido", error);
    return { success: false, error: "Error interno" };
  }
};

export const deleteMatch = async (id: string) => {
  try {
    const existingMatch = await Match.findById(id);
    if (!existingMatch) {
      return { success: false, error: "Partido no encontrado" };
    }

    // Verificar dependencias: MatchStats y MatchEvents
    const [statsCount, eventsCount] = await Promise.all([
      MatchStats.countDocuments({ match: id }),
      MatchEvent.countDocuments({ match: id })
    ]);

    if (statsCount > 0 || eventsCount > 0) {
      return {
        success: false,
        error: `No se puede borrar el partido. Tiene ${statsCount} estadística(s) y ${eventsCount} evento(s) asociado(s).`,
        code: "MATCH_HAS_DEPENDENCIES"
      };
    }

    // Si no hay dependencias, eliminar físicamente
    await Match.findByIdAndDelete(id);

    return { success: true, data: {} };
  } catch (error) {
    console.error("Error al eliminar partido", error);
    return { success: false, error: "Error interno" };
  }
};