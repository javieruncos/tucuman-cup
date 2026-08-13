export type MatchStatsTeam = {
  possession: number;
  shots: number;
  shotsOnTarget: number;
};

export type MatchStatsType = {
  match: string;
  home: MatchStatsTeam;
  away: MatchStatsTeam;
};