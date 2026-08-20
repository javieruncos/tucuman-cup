import type { Team } from "./teams";

export type MatchStatus = "scheduled" | "live" | "finished";

export type HalftimeScore = {
  home: number | null;
  away: number | null;
};

export type MatchType = {
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  status: MatchStatus;
  homeScore: number;
  awayScore: number;
  halftimeScore?: HalftimeScore;
  round?: string;
  venue?: string;
  category?: string;
};

export interface MatchResponseType {
  _id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  time: string;
  status: MatchStatus;
  homeScore: number;
  awayScore: number;
  halftimeScore?: HalftimeScore;
  round?: string;
  venue?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}