export type ApiClientConfig = RequestInit & {
  params?: Record<string, string>;
};

export class ApiError extends Error {
  constructor(
    public message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const apiClient = async <T>(
  endpoint: string,
  { params, ...customConfig }: ApiClientConfig = {}
): Promise<T> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...customConfig.headers,
  };

  const config: RequestInit = {
    ...customConfig,
    headers,
  };

  let url = endpoint;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  const response = await fetch(url, config);

  if (response.status === 401) {
    // Handle unauthorized (redirect to login, clear storage, etc.)
    // For now, just throw
    throw new ApiError('Unauthorized', 401);
  }

  let data;
  try {
    data = await response.json();
  } catch (e) {
    data = null;
  }

  if (response.ok) {
    return data as T;
  } else {
    throw new ApiError(
      data?.message || response.statusText || 'An error occurred',
      response.status,
      data
    );
  }
};

apiClient.get = <T>(endpoint: string, config?: ApiClientConfig) =>
  apiClient<T>(endpoint, { ...config, method: 'GET' });

apiClient.post = <T>(endpoint: string, body: any, config?: ApiClientConfig) =>
  apiClient<T>(endpoint, {
    ...config,
    method: 'POST',
    body: JSON.stringify(body),
  });

apiClient.put = <T>(endpoint: string, body: any, config?: ApiClientConfig) =>
  apiClient<T>(endpoint, {
    ...config,
    method: 'PUT',
    body: JSON.stringify(body),
  });

apiClient.delete = <T>(endpoint: string, config?: ApiClientConfig) =>
  apiClient<T>(endpoint, { ...config, method: 'DELETE' });
