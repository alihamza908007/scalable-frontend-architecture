import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/lib/query-keys";
import { teamsApi } from "../api";
import { UpdateTeamData, InviteMemberData } from "../types.ts";

export const useTeams = () => {
  return useQuery({
    queryKey: queryKeys.teams.list(),
    queryFn: teamsApi.getTeams,
  });
};

export const useTeam = (id: string) => {
  return useQuery({
    queryKey: queryKeys.teams.detail(id),
    queryFn: () => teamsApi.getTeam(id),
    enabled: !!id,
  });
};

export const useCreateTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: teamsApi.createTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.teams.list() });
    },
  });
};

export const useUpdateTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTeamData }) =>
      teamsApi.updateTeam(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.teams.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.teams.list() });
    },
  });
};

export const useDeleteTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: teamsApi.deleteTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.teams.list() });
    },
  });
};

export const useInviteMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      teamId,
      data,
    }: {
      teamId: string;
      data: InviteMemberData;
    }) => teamsApi.inviteMember(teamId, data),
    onSuccess: (_, { teamId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.teams.detail(teamId),
      });
    },
  });
};

export const useRemoveMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ teamId, memberId }: { teamId: string; memberId: string }) =>
      teamsApi.removeMember(teamId, memberId),
    onSuccess: (_, { teamId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.teams.detail(teamId),
      });
    },
  });
};
