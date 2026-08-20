import type { TopScorer } from "@/types/statistics";

export const fetchTopScorers = async (category?: string): Promise<TopScorer[]> => {
  try {
    const query = category ? `?category=${encodeURIComponent(category)}` : "";
    const response = await fetch(`/api/statistics/top-scorers${query}`);

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