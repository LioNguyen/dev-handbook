import axios, { AxiosError } from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { ApiResponse } from '@/shared/types'

// API configuration
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
}

// Create axios instance
export const apiClient: AxiosInstance = axios.create(API_CONFIG)

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Add request timestamp
    config.metadata = { startTime: new Date() }

    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error: AxiosError) => {
    console.error('❌ API Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    const endTime = new Date()
    const startTime = response.config.metadata?.startTime
    const duration = startTime ? endTime.getTime() - startTime.getTime() : 0

    console.log(
      `✅ API Response: ${response.config.method?.toUpperCase()} ${
        response.config.url
      } (${duration}ms)`
    )

    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config

    // Handle 401 unauthorized errors
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        // Try to refresh token
        const refreshToken = localStorage.getItem('refresh_token')
        if (refreshToken) {
          const response = await axios.post(
            `${API_CONFIG.baseURL}/auth/refresh`,
            {
              refreshToken,
            }
          )

          const { accessToken } = response.data
          localStorage.setItem('auth_token', accessToken)

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return apiClient(originalRequest)
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('auth_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    // Handle network errors
    if (!error.response) {
      console.error('❌ Network Error:', error.message)
      return Promise.reject(
        new Error('Network error. Please check your connection.')
      )
    }

    // Handle other HTTP errors
    const errorData = error.response.data as { message?: string }
    const errorMessage = errorData?.message || error.message
    console.error(`❌ API Error: ${error.response.status} - ${errorMessage}`)

    return Promise.reject(error)
  }
)

// Generic API methods
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
    apiClient.get(url, config).then((response) => response.data),

  post: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> =>
    apiClient.post(url, data, config).then((response) => response.data),

  put: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> =>
    apiClient.put(url, data, config).then((response) => response.data),

  patch: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> =>
    apiClient.patch(url, data, config).then((response) => response.data),

  delete: <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> =>
    apiClient.delete(url, config).then((response) => response.data),
}

// Extend AxiosRequestConfig to include metadata
declare module 'axios' {
  interface AxiosRequestConfig {
    metadata?: {
      startTime: Date
    }
    _retry?: boolean
  }
}

export default api
