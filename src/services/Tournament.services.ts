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

export type UpdateTournamentInput = {
  name?: string;
  season?: string;
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

export const updateTournament = async (data: UpdateTournamentInput) => {
  try {
    const tournament = await Tournament.findOne();
    if (!tournament) {
      return { success: false, error: "Torneo no encontrado" };
    }

    // Validaciones
    if (data.name !== undefined && data.name.trim() === "") {
      return { success: false, error: "El nombre no puede estar vacío" };
    }
    if (data.season !== undefined && data.season.trim() === "") {
      return { success: false, error: "La temporada no puede estar vacía" };
    }
    if (data.status !== undefined && !["scheduled", "active", "finished"].includes(data.status)) {
      return { success: false, error: "Estado inválido" };
    }
    if (data.startDate !== undefined && data.endDate !== undefined) {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      if (start >= end) {
        return { success: false, error: "La fecha de inicio debe ser anterior a la fecha de fin" };
      }
    }

    const updateData = { ...data };
    if (updateData.startDate !== undefined) {
      updateData.startDate = new Date(updateData.startDate);
    }
    if (updateData.endDate !== undefined) {
      updateData.endDate = new Date(updateData.endDate);
    }

    const response = await Tournament.findOneAndUpdate(
      {},
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return { success: true, data: response };
  } catch (error) {
    console.error("Error al actualizar el torneo", error);
    return { success: false, error: "Error interno" };
  }
};

export const deleteTournament = async () => {
  try {
    const tournament = await Tournament.findOne();
    if (!tournament) {
      return { success: false, error: "Torneo no encontrado" };
    }

    await Tournament.findOneAndDelete({});

    return { success: true, data: {} };
  } catch (error) {
    console.error("Error al eliminar el torneo", error);
    return { success: false, error: "Error interno" };
  }
};