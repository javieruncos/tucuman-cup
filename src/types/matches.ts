import type { Team } from "./teams";

export type MatchStatus = "scheduled" | "live" | "finished";

export type MatchType = {
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  status: MatchStatus;
  homeScore: number;
  awayScore: number;
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
  createdAt: string;
  updatedAt: string;
}