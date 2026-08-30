"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { MatchEventInput } from "@/types/matchEvents";
import { fetchMatchEvents, fetchMatchEventById, createMatchEvent, updateMatchEvent, deleteMatchEvent } from "@/lib/api/matchEvents";

export const useMatchEvents = (matchId: string) => {
  const { data: events = [], isPending, isError } = useQuery({
    queryKey: ["match-events", matchId],
    queryFn: () => fetchMatchEvents(matchId),
    enabled: !!matchId,
  });

  const queryClient = useQueryClient();

  // Mutations
  const createMutation = useMutation({
    mutationFn: (event: MatchEventInput) => createMatchEvent(matchId, event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["match-events", matchId] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ eventId, data }: { eventId: string; data: { type?: string; minute?: number } }) => updateMatchEvent(matchId, eventId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["match-events", matchId] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (eventId: string) => deleteMatchEvent(matchId, eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["match-events", matchId] });
    },
  });

  return {
    // Query existente
    events,
    isPending,
    isError,
    refetch: () => queryClient.refetchQueries({ queryKey: ["match-events", matchId] }),

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
    createMatchEvent: createMutation.mutate,
    updateMatchEvent: updateMutation.mutate,
    deleteMatchEvent: deleteMutation.mutate,
  };
};