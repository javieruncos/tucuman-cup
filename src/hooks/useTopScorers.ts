"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchTopScorers } from "@/lib/api/statistics";

export const useTopScorers = () => {
  return useQuery({
    queryKey: ["top-scorers"],
    queryFn: fetchTopScorers,
  });
};