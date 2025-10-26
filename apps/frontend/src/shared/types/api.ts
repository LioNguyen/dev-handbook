// Common API response structure
export interface ApiResponse<T = unknown> {
  data: T
  message: string
  success: boolean
}

// Error response structure
export interface ApiError {
  message: string
  code: string
  details?: Record<string, unknown>
}

// Pagination structure
export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

// Generic list response
export interface ListResponse<T> {
  items: T[]
  pagination: Pagination
}

// Sort direction
export type SortDirection = 'asc' | 'desc'

// Common sort parameters
export interface SortParams {
  sortBy?: string
  sortDirection?: SortDirection
}

// Loading states
export interface LoadingState {
  isLoading: boolean
  error: string | null
}

// Theme types
export type Theme = 'light' | 'dark' | 'system'

// Status types
export type Status = 'idle' | 'loading' | 'success' | 'error'
