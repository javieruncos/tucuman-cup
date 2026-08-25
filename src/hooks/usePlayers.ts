import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPlayers, createPlayer, updatePlayer, deletePlayer } from "@/lib/api/players";

export const usePlayers = () => {
  const { data: players = [], isPending, isError } = useQuery({
    queryKey: ["players"],
    queryFn: fetchPlayers,
  });

  const queryClient = useQueryClient();

  // Mutations
  const createMutation = useMutation({
    mutationFn: (player: {
      name: string;
      number: number;
      position: "GK" | "DEF" | "MID" | "FWD";
      team: string;
      photo?: string;
    }) => createPlayer(player),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
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
        number?: number;
        position?: "GK" | "DEF" | "MID" | "FWD";
        photo?: string;
      };
    }) => updatePlayer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deletePlayer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
  });

  // Retornar forma compatible con código existente + mutations
  return {
    // Forma antigua (compatible)
    data: players,
    isLoading: isPending,
    error: isError ? isError : null,
    refetch: () => queryClient.refetchQueries({ queryKey: ["players"] }),

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
    createPlayer: createMutation.mutate,
    updatePlayer: updateMutation.mutate,
    deletePlayer: deleteMutation.mutate,
  };
};