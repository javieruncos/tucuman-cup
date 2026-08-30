"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTournament, createTournament, updateTournament, deleteTournament } from "@/lib/api/tournament";
import type { CreateTournamentInput, UpdateTournamentInput } from "@/types/tournament";

export const useTournament = () => {
  const queryClient = useQueryClient();

  const { data: tournament, isPending, isError } = useQuery({
    queryKey: ["tournament"],
    queryFn: fetchTournament,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: (data: CreateTournamentInput) => createTournament(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tournament"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateTournamentInput) => updateTournament(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tournament"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteTournament(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tournament"] });
    },
  });

  return {
    // Query existente (compatible)
    tournament,
    isLoading: isPending,
    isPending,
    isError,
    refetch: () => queryClient.refetchQueries({ queryKey: ["tournament"] }),

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
    createTournament: createMutation.mutate,
    updateTournament: updateMutation.mutate,
    deleteTournament: deleteMutation.mutate,
  };
};