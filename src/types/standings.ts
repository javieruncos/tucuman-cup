import type { Team } from "@/types/teams";

export type Standing = {
  _id: string;
  team: Team;
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  createdAt?: string;
  updatedAt?: string;
};