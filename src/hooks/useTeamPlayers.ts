import { useQuery } from "@tanstack/react-query";

import { fetchTeamPlayers } from "@/lib/api/players";

export const useTeamPlayers = (teamId: string) => {
  return useQuery({
    queryKey: ["players", "team", teamId],
    queryFn: () => fetchTeamPlayers(teamId),
    enabled: !!teamId,
  });
};