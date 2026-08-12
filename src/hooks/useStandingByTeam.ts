import { useQuery } from "@tanstack/react-query";
import { fetchStandingByTeamId } from "@/lib/api/standings";

export const useStandingByTeam = (id: string) => {
  return useQuery({
    queryKey: ["standings", "team", id],
    queryFn: () => fetchStandingByTeamId(id),
    enabled: !!id,
  });
};