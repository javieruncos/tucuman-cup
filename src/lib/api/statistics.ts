import type { TopScorer } from "@/types/statistics";

export const fetchTopScorers = async (): Promise<TopScorer[]> => {
  try {
    const response = await fetch(`/api/statistics/top-scorers`);

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Error al obtener goleadores");
    }

    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};