/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";

/**
 * Standard error response from API
 */
interface ApiErrorResponse {
  message?: string;
  error?: string;
  code?: string;
  errors?: Record<string, string[]>;
}

/**
 * Extracts a user-friendly error message from API errors
 */
export const handleApiError = (error: unknown): string => {
  if (!error) {
    return "An unknown error occurred";
  }

  // Handle Axios errors
  if (isAxiosError(error)) {
    // Get response error message if it exists
    const responseData = error.response?.data as ApiErrorResponse | undefined;

    // Check for structured error responses
    if (responseData) {
      if (responseData.message) {
        return responseData.message;
      }

      if (responseData.error) {
        return responseData.error;
      }

      // Handle validation errors
      if (responseData.errors) {
        const firstError = Object.values(responseData.errors)[0];
        if (firstError && firstError.length > 0) {
          return firstError[0];
        }
      }
    }

    // Check for specific status codes
    if (error.response) {
      const status = error.response.status;

      if (status === 400) {
        return "Invalid request. Please check your data and try again";
      }

      if (status === 401) {
        return "You need to log in to perform this action";
      }

      if (status === 403) {
        return "You do not have permission to access this resource";
      }

      if (status === 404) {
        return "The requested resource was not found";
      }

      if (status === 422) {
        return "Validation failed. Please check your input";
      }

      if (status === 429) {
        return "Too many requests. Please try again later";
      }

      if (status >= 500) {
        return "A server error occurred. Please try again later";
      }
    }

    // Network errors
    if (error.message === "Network Error") {
      return "Unable to connect to the server. Please check your internet connection";
    }

    // Timeout errors
    if (error.code === "ECONNABORTED") {
      return "The request timed out. Please try again";
    }

    // Default axios error message
    return error.message || "An unknown error occurred";
  }

  // For non-axios errors
  if (error instanceof Error) {
    return error.message;
  }

  // For completely unknown errors
  return "An unexpected error occurred";
};

/**
 * Type guard for Axios errors
 */
export const isAxiosError = (error: any): error is AxiosError => {
  return error && "isAxiosError" in error && error.isAxiosError === true;
};

/**
 * Creates a standardized error object with message and details
 */
export const createApiError = (message: string, details?: unknown) => {
  return {
    message,
    details,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Handles API errors with a default fallback action
 */
export const withErrorHandling = async <T>(
  promise: Promise<T>,
  fallback?: T,
  errorHandler?: (error: unknown) => void,
): Promise<T> => {
  try {
    return await promise;
  } catch (error) {
    if (errorHandler) {
      errorHandler(error);
    } else {
      console.error(handleApiError(error));
    }

    if (fallback !== undefined) {
      return fallback;
    }

    throw error;
  }
};
