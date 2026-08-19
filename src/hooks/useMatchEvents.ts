import { useQuery } from "@tanstack/react-query";

import { fetchMatchEvents } from "@/lib/api/matchEvents";

export const useMatchEvents = (matchId: string) => {
  return useQuery({
    queryKey: ["match-events", matchId],
    queryFn: () => fetchMatchEvents(matchId),
    enabled: !!matchId,
  });
};