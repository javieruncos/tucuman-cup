"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMatches } from "@/lib/api/matches";

export const useMatches = () => {
  return useQuery({
    queryKey: ["matches"],
    queryFn: fetchMatches,
  });
};