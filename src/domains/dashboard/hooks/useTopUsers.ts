import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '../api'

export interface UseTopUsersOptions {
  limit?: number
  enabled?: boolean
}

export const useTopUsers = (options: UseTopUsersOptions = {}) => {
  const { limit = 5, enabled = true } = options

  return useQuery({
    queryKey: ['dashboard', 'top-users', limit],
    queryFn: () => dashboardApi.getTopUsers(limit),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  })
}

export const getTopUsersQueryKey = (limit?: number) => [
  'dashboard',
  'top-users',
  limit || 5,
]
