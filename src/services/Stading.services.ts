import { Match } from "@/models/Matches";
import { Team } from "@/models/Team";
import type { Standing } from "@/types/standings";

type FinishedMatch = {
  homeTeam: Standing["team"];
  awayTeam: Standing["team"];
  homeScore: number;
  awayScore: number;
};

type StandingAccumulator = {
  team: Standing["team"];
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
};

const emptyRow = (team: Standing["team"]): StandingAccumulator => ({
  team,
  played: 0,
  won: 0,
  drawn: 0,
  lost: 0,
  goalsFor: 0,
  goalsAgainst: 0,
});

const computeStandings = async (): Promise<Standing[]> => {
  const [teams, matches] = await Promise.all([
    Team.find().lean(),
    Match.find({ status: "finished" })
      .populate("homeTeam")
      .populate("awayTeam")
      .lean(),
  ]);

  const byTeam = new Map<string, StandingAccumulator>();

  for (const team of teams) {
    const key = String(team._id);
    byTeam.set(key, emptyRow(team as unknown as Standing["team"]));
  }

  for (const match of matches as unknown as FinishedMatch[]) {
    const { homeTeam, awayTeam, homeScore, awayScore } = match;

    if (!homeTeam || !awayTeam) continue;

    const homeKey = homeTeam._id.toString();
    const awayKey = awayTeam._id.toString();

    const home = byTeam.get(homeKey) ?? emptyRow(homeTeam);
    const away = byTeam.get(awayKey) ?? emptyRow(awayTeam);

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

export const getStading = async (): Promise<Standing[]> => {
  try {
    return await computeStandings();
  } catch (error) {
    console.log("Error al obtener standings", error);
    throw error;
  }
};