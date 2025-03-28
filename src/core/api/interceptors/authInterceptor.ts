import { AxiosInstance, InternalAxiosRequestConfig } from "axios";

/**
 * Adds authentication headers to requests
 */
export function attachAuthInterceptor(axiosInstance: AxiosInstance): void {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Get auth token from storage
      const token = localStorage.getItem("auth_token");

      // If token exists, add to headers
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
}
