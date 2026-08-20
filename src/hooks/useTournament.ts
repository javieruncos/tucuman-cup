import { useQuery } from "@tanstack/react-query";

import { fetchTournament } from "@/lib/api/tournament";

export const useTournament = () => {
  return useQuery({
    queryKey: ["tournament"],
    queryFn: fetchTournament,
  });
};