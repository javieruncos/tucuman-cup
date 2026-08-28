"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNews, createNews, updateNews, deleteNews } from "@/lib/api/news";
import type { CreateNewsInput, UpdateNewsInput } from "@/types/news";

export const useNews = () => {
  const queryClient = useQueryClient();

  const { data: news = [], isPending, isError } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: (data: CreateNewsInput) => createNews(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateNewsInput }) => updateNews(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNews(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });

  return {
    // Query existente (compatible)
    news,
    isLoading: isPending,
    isPending,
    isError,
    refetch: () => queryClient.refetchQueries({ queryKey: ["news"] }),

    // Mutations
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isCreateError: createMutation.isError,
    isUpdateError: updateMutation.isError,
    isDeleteError: deleteMutation.isError,
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,

    // Mutation functions
    createNews: createMutation.mutate,
    updateNews: updateMutation.mutate,
    deleteNews: deleteMutation.mutate,
  };
};