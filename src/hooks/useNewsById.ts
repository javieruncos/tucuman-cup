"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchNewsById } from "@/lib/api/news";

export const useNewsById = (id: string) => {
  return useQuery({
    queryKey: ["news", id],
    queryFn: () => fetchNewsById(id),
    enabled: !!id,
  });
};
