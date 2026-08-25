import type { MatchEventResponseType, MatchEventInput } from "@/types/matchEvents";

export const createMatchEvent = async (matchId: string, event: MatchEventInput): Promise<MatchEventResponseType> => {
  const response = await fetch(`/api/matches/${matchId}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Error al crear evento");
  }

  return response.json();
};

export const fetchMatchEvents = async (matchId: string): Promise<MatchEventResponseType[]> => {
  const response = await fetch(`/api/matches/${matchId}/events`);

  if (!response.ok) {
    throw new Error("Error al obtener los eventos del partido");
  }

  const result = await response.json();

  return result.data;
};


// NUEVA FUNCIÓN: GET /api/matches/[matchId]/events/[eventId]
export const fetchMatchEventById = async (matchId: string, eventId: string): Promise<MatchEventResponseType> => {
  const response = await fetch(`/api/matches/${matchId}/events/${eventId}`);

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Error al obtener evento");
  }

  return response.json();
};


// NUEVA FUNCIÓN: PATCH /api/matches/[matchId]/events/[eventId]
export const updateMatchEvent = async (matchId: string, eventId: string, data: { type?: string; minute?: number }): Promise<MatchEventResponseType> => {
  const response = await fetch(`/api/matches/${matchId}/events/${eventId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Error al actualizar evento");
  }

  return response.json();
};


// NUEVA FUNCIÓN: DELETE /api/matches/[matchId]/events/[eventId]
export const deleteMatchEvent = async (matchId: string, eventId: string): Promise<void> => {
  const response = await fetch(`/api/matches/${matchId}/events/${eventId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Error al eliminar evento");
  }
};