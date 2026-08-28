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

export type CreateMatchStatsInput = {
  match: string;
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
};

export type UpdateMatchStatsInput = {
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
};

export type MatchStatsResponseType = MatchStatsType & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};