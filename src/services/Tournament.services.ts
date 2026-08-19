import { Tournament } from "@/models/Tournament";

export type TournamentInput = {
  name: string;
  season: string;
  organization?: string;
  location?: string;
  description?: string;
  format?: string;
  status?: "scheduled" | "active" | "finished";
  startDate?: Date;
  endDate?: Date;
};

export const getTournament = async () => {
  try {
    return await Tournament.findOne();
  } catch (error) {
    console.error("Error al obtener el torneo", error);
    throw error;
  }
};

export const createTournament = async (tournament: TournamentInput) => {
  try {
    return await Tournament.findOneAndUpdate(
      {},
      tournament,
      { upsert: true, new: true, runValidators: true }
    );
  } catch (error) {
    console.error("Error al crear el torneo", error);
    throw error;
  }
};