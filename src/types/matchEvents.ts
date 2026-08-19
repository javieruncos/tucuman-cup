import type { Player } from "@/types/players";
import type { Team } from "@/types/teams";

export type MatchEventName =
  | "goal"
  | "yellow_card"
  | "red_card"
  | "substitution";

export type MatchEventResponseType = {
  _id: string;
  match: string;
  team: Team;
  player: Player;
  type: MatchEventName;
  minute: number;
  additionalPlayer?: Player | null;
  createdAt: string;
  updatedAt: string;
};

export type MatchEventInput = {
  match: string;
  team: string;
  player: string;
  type: MatchEventName;
  minute: number;
  additionalPlayer?: string | null;
};