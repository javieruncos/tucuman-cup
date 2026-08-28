"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateMatchStatsInput, UpdateMatchStatsInput } from "@/types/matchStats";
import {
  fetchMatchStats,
  createMatchStats,
  updateMatchStats,
  deleteMatchStats,
} from "@/lib/api/matchStats";

export const useMatchStats = (matchId: string) => {
  const queryClient = useQueryClient();

  const { data: stats, isPending, isError, refetch } = useQuery({
    queryKey: ["match-stats", matchId],
    queryFn: () => fetchMatchStats(matchId),
    enabled: !!matchId,
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateMatchStatsInput) => createMatchStats(matchId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["match-stats", matchId] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateMatchStatsInput) => updateMatchStats(matchId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["match-stats", matchId] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteMatchStats(matchId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["match-stats", matchId] });
    },
  });

  return {
    stats,
    isLoading: isPending,
    isPending,
    isError,
    refetch,

    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isCreateError: createMutation.isError,
    isUpdateError: updateMutation.isError,
    isDeleteError: deleteMutation.isError,
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,

    createMatchStats: createMutation.mutate,
    updateMatchStats: updateMutation.mutate,
    deleteMatchStats: deleteMutation.mutate,
  };
};