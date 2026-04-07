import { apiClient } from "@/shared/lib/api-client";
import { env } from "@/shared/lib/env";
import {
  Team,
  CreateTeamData,
  UpdateTeamData,
  InviteMemberData,
} from "../types";

export const teamsApi = {
  // Get all teams for current user
  getTeams: () => apiClient<Team[]>(`${env.API_BASE_URL}/teams`),

  // Get single team
  getTeam: (id: string) => apiClient<Team>(`${env.API_BASE_URL}/teams/${id}`),

  // Create new team
  createTeam: (data: CreateTeamData) =>
    apiClient<Team>(`${env.API_BASE_URL}/teams`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Update team
  updateTeam: (id: string, data: UpdateTeamData) =>
    apiClient<Team>(`${env.API_BASE_URL}/teams/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  // Delete team
  deleteTeam: (id: string) =>
    apiClient<void>(`${env.API_BASE_URL}/teams/${id}`, {
      method: "DELETE",
    }),

  // Invite member
  inviteMember: (teamId: string, data: InviteMemberData) =>
    apiClient<void>(`${env.API_BASE_URL}/teams/${teamId}/members`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Remove member
  removeMember: (teamId: string, memberId: string) =>
    apiClient<void>(`${env.API_BASE_URL}/teams/${teamId}/members/${memberId}`, {
      method: "DELETE",
    }),
};
