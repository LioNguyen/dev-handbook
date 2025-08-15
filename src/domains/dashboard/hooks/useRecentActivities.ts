import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '../api'

export interface UseRecentActivitiesOptions {
  limit?: number
  enabled?: boolean
}

export const useRecentActivities = (
  options: UseRecentActivitiesOptions = {}
) => {
  const { limit = 10, enabled = true } = options

  return useQuery({
    queryKey: ['dashboard', 'recent-activities', limit],
    queryFn: () => dashboardApi.getRecentActivities(limit),
    enabled,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 60 * 1000, // Refetch every minute
  })
}

export const getRecentActivitiesQueryKey = (limit?: number) => [
  'dashboard',
  'recent-activities',
  limit || 10,
]
