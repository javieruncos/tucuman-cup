"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMatchById } from "@/lib/api/matches";

export const useMatch = (id: string) => {
  return useQuery({
    queryKey: ["matches", id],
    queryFn: () => fetchMatchById(id),
    enabled: !!id,
  });
};