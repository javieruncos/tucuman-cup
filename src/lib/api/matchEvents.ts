import type {
  MatchEventInput,
  MatchEventResponseType,
} from "@/types/matchEvents";

export const fetchMatchEvents = async (
  matchId: string
): Promise<MatchEventResponseType[]> => {
  const response = await fetch(`/api/matches/${matchId}/events`);

  if (!response.ok) {
    throw new Error("Error al obtener los eventos del partido");
  }

  const result = await response.json();

  return result.data;
};

export const createMatchEvent = async (
  matchId: string,
  event: Omit<MatchEventInput, "match">
): Promise<MatchEventResponseType> => {
  const response = await fetch(`/api/matches/${matchId}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    throw new Error("Error al crear el evento");
  }

  const result = await response.json();

  return result.data;
};