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

// INPUTS PARA CRUD

export interface CreateMatchInput {
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  status?: "scheduled" | "live" | "finished";
  homeScore?: number;
  awayScore?: number;
  halftimeScore?: { home: number | null; away: number | null };
  round?: string;
  venue?: string;
  category?: string;
}

export interface UpdateMatchInput {
  date?: string;
  time?: string;
  status?: "scheduled" | "live" | "finished";
  homeScore?: number;
  awayScore?: number;
  halftimeScore?: { home: number | null; away: number | null };
  round?: string;
  venue?: string;
}