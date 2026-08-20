"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchTopScorers } from "@/lib/api/statistics";

export const useTopScorers = (category?: string) => {
  return useQuery({
    queryKey: ["top-scorers", category ?? "all"],
    queryFn: () => fetchTopScorers(category),
  });
};