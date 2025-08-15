import { useQuery } from '@tanstack/react-query'
import { usersApi } from '../api'

export interface UseUserStatsOptions {
  enabled?: boolean
}

export const useUserStats = (options: UseUserStatsOptions = {}) => {
  const { enabled = true } = options

  return useQuery({
    queryKey: ['users', 'stats'],
    queryFn: () => usersApi.getUserStats(),
    enabled,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const getUserStatsQueryKey = () => ['users', 'stats']
