import type { MatchResponseType } from "@/types/matches";

export const fetchMatches = async (): Promise<MatchResponseType[]> => {
  const response = await fetch("/api/matches");

  if (!response.ok) {
    throw new Error("Error al obtener los partidos");
  }

  const result = await response.json();

  return result.data;
};


export const fetchMatchesByCategory = async (slug: string): Promise<MatchResponseType[]> => {
  const response = await fetch(`/api/matches?category=${encodeURIComponent(slug)}`);

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Error al obtener partidos por categoría");
  }

  const result = await response.json();
  return result.data;
};


export const fetchMatchById = async (id: string): Promise<MatchResponseType> => {
  const response = await fetch(`/api/matches/${id}`);

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Error al obtener el partido");
  }

  return response.json();
};


// CREATE
export const createMatch = async (match: { homeTeam: string; awayTeam: string; date: string; time: string; status?: "scheduled" | "live" | "finished"; homeScore?: number; awayScore?: number; halftimeScore?: { home: number | null; away: number | null }; round?: string; venue?: string; category?: string }): Promise<MatchResponseType> => {
  const response = await fetch("/api/matches", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(match),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Error al crear partido");
  }

  const result = await response.json();
  return result.data;
};

// UPDATE
export const updateMatch = async (id: string, data: {
  date?: string;
  time?: string;
  status?: "scheduled" | "live" | "finished";
  homeScore?: number;
  awayScore?: number;
  halftimeScore?: { home: number | null; away: number | null };
  round?: string;
  venue?: string;
}): Promise<MatchResponseType> => {
  const response = await fetch(`/api/matches/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Error al actualizar partido");
  }

  const result = await response.json();
  return result.data;
};

// DELETE
export const deleteMatch = async (id: string): Promise<void> => {
  const response = await fetch(`/api/matches/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Error al eliminar partido");
  }
};