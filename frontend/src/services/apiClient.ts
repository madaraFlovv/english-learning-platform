export type ApiErrorDetails = unknown[];

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details: ApiErrorDetails;

  constructor(
    status: number,
    code: string,
    message: string,
    details: ApiErrorDetails = [],
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

type ApiErrorResponse = {
  error?: {
    code?: string;
    message?: string;
    details?: ApiErrorDetails;
  };
};

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? "/api/v1"
).replace(/\/+$/, "");

const readResponseBody = async (response: Response): Promise<unknown> => {
  if (response.status === 204) return undefined;

  const responseText = await response.text();

  if (!responseText) return undefined;

  try {
    return JSON.parse(responseText) as unknown;
  } catch {
    throw new ApiError(
      response.status,
      "INVALID_API_RESPONSE",
      "The server returned an invalid response.",
    );
  }
};

export const apiRequest = async <T>(
  path: string,
  options: RequestInit = {},
): Promise<T> => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const headers = new Headers(options.headers);

  headers.set("Accept", "application/json");

  if (options.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${normalizedPath}`, {
      ...options,
      headers,
      credentials: options.credentials ?? "include",
    });
  } catch {
    throw new ApiError(
      0,
      "NETWORK_ERROR",
      "Unable to reach the server. Check your connection and try again.",
    );
  }

  const responseBody = await readResponseBody(response);

  if (!response.ok) {
    const errorResponse = responseBody as ApiErrorResponse | undefined;
    const apiError = errorResponse?.error;

    throw new ApiError(
      response.status,
      apiError?.code ?? "REQUEST_FAILED",
      apiError?.message ?? "The request could not be completed.",
      apiError?.details ?? [],
    );
  }

  return responseBody as T;
};
