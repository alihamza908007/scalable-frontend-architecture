export type ApiClientConfig = RequestInit & {
  params?: Record<string, string>;
  retries?: number;
  retryDelay?: number;
};

export class ApiError extends Error {
  constructor(
    public message: string,
    public status?: number,
    public data?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const retry = async <T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000,
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && (error as ApiError).status !== 401) {
      await sleep(delay);
      return retry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

export const apiClient = async <T>(
  endpoint: string,
  {
    params,
    retries = 0,
    retryDelay = 1000,
    ...customConfig
  }: ApiClientConfig = {},
): Promise<T> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
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

  const makeRequest = async (): Promise<T> => {
    const response = await fetch(url, config);

    if (response.status === 401) {
      // Handle unauthorized
      throw new ApiError("Unauthorized", 401);
    }

    if (!response.ok) {
      let errorData: unknown;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: "Unknown error" };
      }
      throw new ApiError(
        (errorData as { message?: string })?.message || "Request failed",
        response.status,
        errorData,
      );
    }

    let data: unknown;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    return data as T;
  };

  return retry(makeRequest, retries, retryDelay);
};

// Convenience methods
export const apiClientGet = <T>(endpoint: string, config?: ApiClientConfig) =>
  apiClient<T>(endpoint, { ...config, method: "GET" });

export const apiClientPost = <T>(
  endpoint: string,
  body: unknown,
  config?: ApiClientConfig,
) =>
  apiClient<T>(endpoint, {
    ...config,
    method: "POST",
    body: JSON.stringify(body),
  });

export const apiClientPut = <T>(
  endpoint: string,
  body: unknown,
  config?: ApiClientConfig,
) =>
  apiClient<T>(endpoint, {
    ...config,
    method: "PUT",
    body: JSON.stringify(body),
  });

export const apiClientDelete = <T>(
  endpoint: string,
  config?: ApiClientConfig,
) => apiClient<T>(endpoint, { ...config, method: "DELETE" });
