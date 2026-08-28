import { MatchStats } from "@/models/MatchStats";
import { Match } from "@/models/Matches";

export const getMatchStats = async (matchId: string) => {
  return MatchStats.findOne({
    match: matchId,
  });
};

export const createMatchStats = async (
  matchId: string,
  data: {
    home: {
      possession: number;
      shots: number;
      shotsOnTarget: number;
    };
    away: {
      possession: number;
      shots: number;
      shotsOnTarget: number;
    };
  }
) => {
  const match = await Match.findById(matchId);

  if (!match) {
    throw new Error("Partido no encontrado");
  }

  const existingStats = await MatchStats.findOne({
    match: matchId,
  });

  if (existingStats) {
    throw new Error("Las estadísticas de este partido ya existen");
  }

  return MatchStats.create({
    match: matchId,
    home: data.home,
    away: data.away,
  });
};

export const updateMatchStats = async (
  matchId: string,
  data: {
    home?: {
      possession?: number;
      shots?: number;
      shotsOnTarget?: number;
    };
    away?: {
      possession?: number;
      shots?: number;
      shotsOnTarget?: number;
    };
  }
) => {
  try {
    if (!data || Object.keys(data).length === 0) {
      return { success: false, error: "No hay campos para actualizar" };
    }

    if (data.home) {
      if (data.home.possession !== undefined && (data.home.possession < 0 || data.home.possession > 100)) {
        return { success: false, error: "Posesión debe estar entre 0 y 100" };
      }
      if (data.home.shots !== undefined && data.home.shots < 0) {
        return { success: false, error: "Tiros no pueden ser negativos" };
      }
      if (data.home.shotsOnTarget !== undefined && data.home.shotsOnTarget < 0) {
        return { success: false, error: "Tiros al arco no pueden ser negativos" };
      }
      if (data.home.shotsOnTarget !== undefined && data.home.shots !== undefined && data.home.shotsOnTarget > data.home.shots) {
        return { success: false, error: "Tiros al arco no pueden superar tiros totales" };
      }
    }

    if (data.away) {
      if (data.away.possession !== undefined && (data.away.possession < 0 || data.away.possession > 100)) {
        return { success: false, error: "Posesión debe estar entre 0 y 100" };
      }
      if (data.away.shots !== undefined && data.away.shots < 0) {
        return { success: false, error: "Tiros no pueden ser negativos" };
      }
      if (data.away.shotsOnTarget !== undefined && data.away.shotsOnTarget < 0) {
        return { success: false, error: "Tiros al arco no pueden ser negativos" };
      }
      if (data.away.shotsOnTarget !== undefined && data.away.shots !== undefined && data.away.shotsOnTarget > data.away.shots) {
        return { success: false, error: "Tiros al arco no pueden superar tiros totales" };
      }
    }

    const updateData: Record<string, number> = {};
    if (data.home) {
      if (data.home.possession !== undefined) updateData["home.possession"] = data.home.possession;
      if (data.home.shots !== undefined) updateData["home.shots"] = data.home.shots;
      if (data.home.shotsOnTarget !== undefined) updateData["home.shotsOnTarget"] = data.home.shotsOnTarget;
    }
    if (data.away) {
      if (data.away.possession !== undefined) updateData["away.possession"] = data.away.possession;
      if (data.away.shots !== undefined) updateData["away.shots"] = data.away.shots;
      if (data.away.shotsOnTarget !== undefined) updateData["away.shotsOnTarget"] = data.away.shotsOnTarget;
    }

    const stats = await MatchStats.findOneAndUpdate(
      { match: matchId },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!stats) {
      return { success: false, error: "Estadísticas no encontradas" };
    }

    return { success: true, data: stats };
  } catch (error) {
    console.error("Error al actualizar estadísticas:", error);
    return { success: false, error: "Error interno" };
  }
};

export const deleteMatchStats = async (matchId: string) => {
  try {
    const stats = await MatchStats.findOneAndDelete({ match: matchId });

    if (!stats) {
      return { success: false, error: "Estadísticas no encontradas" };
    }

    return { success: true, data: {} };
  } catch (error) {
    console.error("Error al eliminar estadísticas:", error);
    return { success: false, error: "Error interno" };
  }
};