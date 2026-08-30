import type { Team } from "@/types/teams";

export type PlayerPosition = "GK" | "DEF" | "MID" | "FWD";

export type Player = {
  _id: string;
  name: string;
  number: number;
  position: PlayerPosition;
  team: Team;
  photo?: string;
  createdAt: string;
  updatedAt: string;
};

export type PlayerInput = {
  name: string;
  number: number;
  position: PlayerPosition;
  team: string;
  photo?: string;
};

export type UpdatePlayerInput = {
  name?: string;
  number?: number;
  position?: PlayerPosition;
  photo?: string;
};