import { describe, it, expect, vi } from "vitest";
import { teamsApi } from "../api";
import { server } from "@/test/mocks/server";
import { http, HttpResponse } from "msw";

// Mock the env
vi.mock("@/shared/lib/env", () => ({
  env: {
    API_BASE_URL: "http://localhost:3001",
  },
}));

describe("teamsApi", () => {
  it("should fetch teams successfully", async () => {
    const mockTeams = [
      {
        id: "1",
        name: "Team Alpha",
        members: [],
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      },
    ];

    server.use(
      http.get("http://localhost:3001/teams", () => {
        return HttpResponse.json(mockTeams);
      }),
    );

    const result = await teamsApi.getTeams();
    expect(result).toEqual(mockTeams);
  });

  it("should create a team", async () => {
    const newTeam = {
      name: "New Team",
      description: "A new team",
    };

    const createdTeam = {
      id: "2",
      ...newTeam,
      members: [],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    };

    server.use(
      http.post("http://localhost:3001/teams", () => {
        return HttpResponse.json(createdTeam);
      }),
    );

    const result = await teamsApi.createTeam(newTeam);
    expect(result).toEqual(createdTeam);
  });
});
