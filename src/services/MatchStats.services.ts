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