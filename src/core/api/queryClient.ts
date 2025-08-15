import { QueryClient } from '@tanstack/react-query'

// Query client configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global query options
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (client errors)
        if (error instanceof Error && 'status' in error) {
          const status = (error as Error & { status: number }).status
          if (status >= 400 && status < 500) {
            return false
          }
        }
        // Retry up to 3 times for other errors
        return failureCount < 3
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    mutations: {
      // Global mutation options
      retry: (failureCount, error) => {
        // Don't retry mutations on client errors
        if (error instanceof Error && 'status' in error) {
          const status = (error as Error & { status: number }).status
          if (status >= 400 && status < 500) {
            return false
          }
        }
        // Retry up to 1 time for server errors
        return failureCount < 1
      },
      retryDelay: 1000,
    },
  },
})

// Query key factories for consistent cache management
export const queryKeys = {
  // Auth
  auth: ['auth'] as const,
  user: (id: string) => ['auth', 'user', id] as const,

  // Users
  users: ['users'] as const,
  usersList: (params?: Record<string, unknown>) =>
    ['users', 'list', params] as const,
  usersDetail: (id: string) => ['users', 'detail', id] as const,

  // Posts (example)
  posts: ['posts'] as const,
  postsList: (params?: Record<string, unknown>) =>
    ['posts', 'list', params] as const,
  postsDetail: (id: string) => ['posts', 'detail', id] as const,

  // Dashboard
  dashboard: ['dashboard'] as const,
  dashboardStats: () => ['dashboard', 'stats'] as const,
  dashboardCharts: (type: string) => ['dashboard', 'charts', type] as const,
}

// Query invalidation helpers
export const invalidateQueries = {
  auth: () => queryClient.invalidateQueries({ queryKey: queryKeys.auth }),
  users: () => queryClient.invalidateQueries({ queryKey: queryKeys.users }),
  posts: () => queryClient.invalidateQueries({ queryKey: queryKeys.posts }),
  dashboard: () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.dashboard }),
  all: () => queryClient.invalidateQueries(),
}

// Prefetch helpers
export const prefetchQueries = {
  usersList: async (params?: Record<string, unknown>) => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.usersList(params),
      queryFn: () => {
        // This would be replaced with actual API call
        return Promise.resolve({ data: [], total: 0 })
      },
    })
  },

  dashboardStats: async () => {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.dashboardStats(),
      queryFn: () => {
        // This would be replaced with actual API call
        return Promise.resolve({})
      },
    })
  },
}

// Cache management utilities
export const cacheUtils = {
  // Get cached data without triggering a fetch
  getCachedData: <T>(queryKey: unknown[]) => {
    return queryClient.getQueryData<T>(queryKey)
  },

  // Set data in cache manually
  setCachedData: <T>(queryKey: unknown[], data: T) => {
    queryClient.setQueryData(queryKey, data)
  },

  // Remove specific query from cache
  removeQuery: (queryKey: unknown[]) => {
    queryClient.removeQueries({ queryKey })
  },

  // Clear all cache
  clearCache: () => {
    queryClient.clear()
  },

  // Check if query is cached
  isQueryCached: (queryKey: unknown[]) => {
    return queryClient.getQueryState(queryKey) !== undefined
  },

  // Get query loading state
  getQueryState: (queryKey: unknown[]) => {
    return queryClient.getQueryState(queryKey)
  },
}

// Error boundary integration
export const handleQueryError = (error: Error) => {
  console.error('Query Error:', error)

  // You can integrate with error reporting services here
  // Example: Sentry, LogRocket, etc.

  // Show user-friendly error messages
  if (error.message.includes('Network Error')) {
    // Handle network errors
    console.warn('Network error occurred')
  } else if (error.message.includes('401')) {
    // Handle authentication errors
    console.warn('Authentication error - redirecting to login')
  } else if (error.message.includes('403')) {
    // Handle authorization errors
    console.warn('Authorization error - insufficient permissions')
  }
}

// Background sync utilities for offline support
export const backgroundSync = {
  // Enable background sync for critical queries
  enableBackgroundSync: (queryKey: unknown[]) => {
    queryClient.invalidateQueries({
      queryKey,
      refetchType: 'active', // Only refetch active queries
    })
  },

  // Sync all stale queries
  syncStaleQueries: () => {
    queryClient.invalidateQueries({
      stale: true,
      refetchType: 'active',
    })
  },
}

export default queryClient
