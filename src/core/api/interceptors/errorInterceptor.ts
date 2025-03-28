import { AxiosError, AxiosInstance } from "axios";

import { createApiError, handleApiError } from "../errorHandling";

/**
 * Handles response errors globally
 */
export function attachErrorInterceptor(axiosInstance: AxiosInstance): void {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      // Get user-friendly error message
      const errorMessage = handleApiError(error);

      // Handle specific status codes
      if (error.response) {
        const { status } = error.response;

        // Authentication errors - could trigger auth workflow
        if (status === 401) {
          // Could dispatch an action to refresh token or logout
          console.error("Authentication failed:", errorMessage);
          // Example: authService.refreshToken() or redirect to login
        }

        // Forbidden access
        if (status === 403) {
          console.error("Permission denied:", errorMessage);
          // Could show a notification or redirect
        }

        // Rate limiting
        if (status === 429) {
          console.error("Rate limit exceeded:", errorMessage);
          // Could implement retry logic with exponential backoff
        }

        // Server errors
        if (status >= 500) {
          console.error("Server error:", errorMessage);
          // Could report to error monitoring service
        }
      } else if (error.request) {
        // Request made but no response received (network issues)
        console.error("Network error - no response received:", errorMessage);
        // Could check connectivity or retry
      }

      // Create standardized error object with message and details
      const apiError = createApiError(errorMessage, error);

      // Optional: Log to monitoring service
      // logErrorToMonitoring(apiError);

      // Pass along standardized error
      return Promise.reject(apiError);
    },
  );
}
