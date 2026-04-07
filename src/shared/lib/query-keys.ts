export const queryKeys = {
  auth: {
    user: () => ["auth", "user"] as const,
    session: () => ["auth", "session"] as const,
  },
  teams: {
    list: (filters?: Record<string, any>) =>
      ["teams", "list", filters] as const,
    detail: (id: string) => ["teams", "detail", id] as const,
  },
} as const;
