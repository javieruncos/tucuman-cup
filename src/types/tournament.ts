export type TournamentStatus = "scheduled" | "active" | "finished";

export type Tournament = {
  _id: string;
  name: string;
  season: string;
  organization?: string;
  location?: string;
  description?: string;
  format?: string;
  status: TournamentStatus;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
};