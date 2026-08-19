import type { Player } from "@/types/players";
import type { Team } from "@/types/teams";

export type TopScorer = {
  player: Player;
  team: Team;
  goals: number;
};