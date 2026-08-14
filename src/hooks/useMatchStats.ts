import { fetchMatchStats } from "@/lib/api/matchStats";
import { MatchStatsType } from "@/types/matchStats";
import { useQuery } from "@tanstack/react-query";



export const useMatchStats = (matchId: string) => {
   return useQuery<MatchStatsType>({
      queryKey: ["match-stats", matchId],
      queryFn: () => fetchMatchStats(matchId),
      enabled: !!matchId,
    });

};