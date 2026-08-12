import { Standing, StandingType } from "@/models/Stading";

export const getStading = async () => {
  try {
    const standings = await Standing.find().populate("team");
    return standings;
  } catch (error) {
    console.log("Error al obtener standings", error);
    throw error;
  }
}


export const createStanding = async (standing: StandingType) => {
  try {
    const response = await Standing.create(standing);
    return response;
  } catch (error) {
    console.log("Error al crear standing", error);
    throw error;
  }
}

export const deleteStanding = async (id: string) => {
  try {
    const response = await Standing.findByIdAndDelete(id);
    return response;
  } catch (error) {
    console.log("Error al eliminar standing", error);
    throw error;
  }
}

export const updateStanding = async (id: string, standing: StandingType) => {
  try {
    const response = await Standing.findByIdAndUpdate(id, standing, { new: true });
    return response;
  } catch (error) {
    console.log("Error al actualizar standing", error);
    throw error;
  }
}

export const getStandingByTeamId = async (teamId: string) => {
  try {
    const response = await Standing.findOne({ team: teamId });

    return response;
  } catch (error) {
    console.error("Error al obtener standing del equipo:", error);
    throw error;
  }
};