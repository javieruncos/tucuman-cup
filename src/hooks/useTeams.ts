"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTeams, fetchTeamsByCategory, createTeam, updateTeam, deleteTeam } from "@/lib/api/teams";

export const useTeams = (categorySlug?: string) => {
  const queryKey = categorySlug ? ["teams", categorySlug] : ["teams"];
  const queryFn = categorySlug ? () => fetchTeamsByCategory(categorySlug) : fetchTeams;

  const { data: teams = [], isPending, isError } = useQuery({
    queryKey,
    queryFn,
  });

  const queryClient = useQueryClient();

  // Mutations
  const createMutation = useMutation({
    mutationFn: (team: {
      name: string;
      shortName: string;
      city: string;
      color: string;
      founded: number;
      category: string;
      active?: boolean;
    }) => createTeam(team),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        name?: string;
        shortName?: string;
        city?: string;
        color?: string;
        founded?: number;
        category?: string;
        active?: boolean;
      };
    }) => updateTeam(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTeam(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });

  // Retornar forma compatible con código existente + mutations
  return {
    // Forma antigua (compatible)
    data: teams,
    isLoading: isPending,
    error: isError ? isError : null,
    refetch: () => queryClient.refetchQueries({ queryKey }),

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
    createTeam: createMutation.mutate,
    updateTeam: updateMutation.mutate,
    deleteTeam: deleteMutation.mutate,
  };
};