"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMatches, createMatch, updateMatch, deleteMatch } from "@/lib/api/matches";

export const useMatches = () => {
  const { data: matches = [], isPending, isError } = useQuery({
    queryKey: ["matches"],
    queryFn: fetchMatches,
  });

  const queryClient = useQueryClient();

  // Mutations
  const createMutation = useMutation({
    mutationFn: (match: {
      homeTeam: string;
      awayTeam: string;
      date: string;
      time: string;
      status?: "scheduled" | "live" | "finished";
      homeScore?: number;
      awayScore?: number;
      halftimeScore?: { home: number | null; away: number | null };
      round?: string;
      venue?: string;
      category?: string;
    }) => createMatch(match),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        category?: string;
        date?: string;
        time?: string;
        status?: "scheduled" | "live" | "finished";
        homeScore?: number;
        awayScore?: number;
        halftimeScore?: { home: number | null; away: number | null };
        round?: string;
        venue?: string;
      };
    }) => updateMatch(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
      queryClient.invalidateQueries({ queryKey: ["standings"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteMatch(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
  });

  // Retornar forma compatible con código existente + mutations
  return {
    // Forma antigua (compatible)
    data: matches,
    isLoading: isPending,
    error: isError ? isError : null,
    refetch: () => queryClient.refetchQueries({ queryKey: ["matches"] }),

    // Forma nueva (mutations)
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isCreateError: createMutation.isError,
    isUpdateError: updateMutation.isError,
    isDeleteError: deleteMutation.isError,
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,

    // Mutations functions
    createMatch: createMutation.mutate,
    updateMatch: updateMutation.mutate,
    deleteMatch: deleteMutation.mutate,
  };
};