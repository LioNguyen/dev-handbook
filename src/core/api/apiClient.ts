import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

import { attachAuthInterceptor } from "./interceptors/authInterceptor";
import { attachErrorInterceptor } from "./interceptors/errorInterceptor";

/**
 * Get the API client configuration
 */
const getApiConfig = (): CreateAxiosDefaults => {
  // Read from env variables or config file in a real app
  return {
    baseURL: import.meta.env.VITE_BASE_API_URL || "/api",
    timeout: 30000, // 30 seconds
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    withCredentials: false,
  };
};

/**
 * Create and configure the API client
 */
const createApiClient = (): AxiosInstance => {
  const config = getApiConfig();
  const instance = axios.create(config);

  // Attach interceptors
  attachAuthInterceptor(instance);
  attachErrorInterceptor(instance);

  return instance;
};

// Create singleton instance
export const apiClient = createApiClient();

export default apiClient;
