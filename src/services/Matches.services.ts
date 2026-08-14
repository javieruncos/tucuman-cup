import { Match } from "@/models/Matches";
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