"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNews } from "@/lib/api/news";

export const useNews = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
  });
};
