import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi } from 'vitest';
import { useTeams } from '../hooks';
import { teamsApi } from '../api';

// Mock the API
vi.mock('../api', () => ({
  teamsApi: {
    getTeams: vi.fn(),
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

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useTeams', () => {
  it('should return teams data when API call succeeds', async () => {
    const mockTeams = [
      {
        id: '1',
        name: 'Team Alpha',
        description: 'First team',
        members: [],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
    ];

    (teamsApi.getTeams as any).mockResolvedValue(mockTeams);

    const { result } = renderHook(() => useTeams(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockTeams);
  });

  it('should handle API errors', async () => {
    const error = new Error('API Error');
    (teamsApi.getTeams as any).mockRejectedValue(error);

    const { result } = renderHook(() => useTeams(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(error);
  });
});