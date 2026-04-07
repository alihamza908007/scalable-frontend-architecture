import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect, vi, type MockedFunction } from "vitest";
import { useTeams } from "../hooks";
import { teamsApi } from "../api";
import type { Team } from "../types";

// Mock the API
const mockGetTeams = vi.fn() as MockedFunction<typeof teamsApi.getTeams>;
vi.mock("../api", () => ({
  teamsApi: {
    getTeams: mockGetTeams,
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  Wrapper.displayName = "QueryClientWrapper";

  return Wrapper;
};

describe("useTeams", () => {
  it("should return teams data when API call succeeds", async () => {
    const mockTeams: Team[] = [
      {
        id: "1",
        name: "Team Alpha",
        description: "First team",
        members: [],
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
      },
    ];

    mockGetTeams.mockResolvedValue(mockTeams);

    const { result } = renderHook(() => useTeams(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockTeams);
  });

  it("should handle API errors", async () => {
    const error = new Error("API Error");
    mockGetTeams.mockRejectedValue(error);

    const { result } = renderHook(() => useTeams(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(error);
  });
});
