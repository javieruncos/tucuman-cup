import { StandingType } from "@/models/Stading"
import { Standing } from "@/types/standings"


export const fetchStandings = async ():Promise<Standing[]> =>{
    try {
        const response = await fetch(`/api/standings`) 

        const data = await response.json()
        
        if(!response.ok){
            throw new Error("Error al obtener standings")
        }   
        return data.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const createStanding = async (standing: StandingType) => {
    try {
        const response = await fetch(`/api/standings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(standing),
        });
        if (!response.ok) {
            throw new Error("Error al crear standing");
        }
        return response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const fetchStandingByTeamId = async (
  id: string
): Promise<Standing> => {
  const response = await fetch(`/api/standings/team/${id}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error fetching team standing");
  }

  return data.data;
};