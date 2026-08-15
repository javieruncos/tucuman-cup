import { Match } from "@/models/Matches";
import { Standing, StandingType } from "@/models/Stading";
import type { Standing as StandingResponse } from "@/types/standings";

type FinishedMatch = {
  homeTeam: StandingResponse["team"];
  awayTeam: StandingResponse["team"];
  homeScore: number;
  awayScore: number;
};

type StandingAccumulator = {
  team: StandingResponse["team"];
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
};

const computeStandings = async (): Promise<StandingResponse[]> => {
  const matches = (await Match.find({ status: "finished" })
    .populate("homeTeam")
    .populate("awayTeam")) as unknown as FinishedMatch[];

  const byTeam = new Map<string, StandingAccumulator>();

  for (const match of matches) {
    const { homeTeam, awayTeam, homeScore, awayScore } = match;

    if (!homeTeam || !awayTeam) continue;

    const homeKey = homeTeam._id.toString();
    const awayKey = awayTeam._id.toString();

    const home =
      byTeam.get(homeKey) ?? {
        team: homeTeam,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
      };
    const away =
      byTeam.get(awayKey) ?? {
        team: awayTeam,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
      };

    home.played += 1;
    away.played += 1;
    home.goalsFor += homeScore;
    home.goalsAgainst += awayScore;
    away.goalsFor += awayScore;
    away.goalsAgainst += homeScore;

    if (homeScore > awayScore) {
      home.won += 1;
      away.lost += 1;
    } else if (homeScore < awayScore) {
      home.lost += 1;
      away.won += 1;
    } else {
      home.drawn += 1;
      away.drawn += 1;
    }

    byTeam.set(homeKey, home);
    byTeam.set(awayKey, away);
  }

  return [...byTeam.values()]
    .map((row) => ({
      _id: row.team._id.toString(),
      team: row.team,
      position: 0,
      played: row.played,
      won: row.won,
      drawn: row.drawn,
      lost: row.lost,
      goalsFor: row.goalsFor,
      goalsAgainst: row.goalsAgainst,
      goalDifference: row.goalsFor - row.goalsAgainst,
      points: row.won * 3 + row.drawn,
    }))
    .sort(
      (a, b) =>
        b.points - a.points ||
        b.goalDifference - a.goalDifference ||
        b.goalsFor - a.goalsFor ||
        a.team.name.localeCompare(b.team.name, "es")
    )
    .map((row, index) => ({ ...row, position: index + 1 }));
};

export const getStading = async (): Promise<StandingResponse[]> => {
  try {
    return await computeStandings();
  } catch (error) {
    console.log("Error al obtener standings", error);
    throw error;
  }
}


export const createStanding = async (standing: StandingType) => {
  try {
    const response = await Standing.create(standing);
    return response;
  } catch (error) {
    console.log("Error al crear standing", error);
    throw error;
  }
}

export const deleteStanding = async (id: string) => {
  try {
    const response = await Standing.findByIdAndDelete(id);
    return response;
  } catch (error) {
    console.log("Error al eliminar standing", error);
    throw error;
  }
}

export const updateStanding = async (id: string, standing: StandingType) => {
  try {
    const response = await Standing.findByIdAndUpdate(id, standing, { new: true });
    return response;
  } catch (error) {
    console.log("Error al actualizar standing", error);
    throw error;
  }
}

export const getStandingByTeamId = async (teamId: string) => {
  try {
    const standings = await computeStandings();

    return standings.find((row) => row._id === teamId) ?? null;
  } catch (error) {
    console.error("Error al obtener standing del equipo:", error);
    throw error;
  }
};