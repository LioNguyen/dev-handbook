import { useQuery } from '@tanstack/react-query'
import type { DashboardFilters } from '../types'
import { dashboardApi } from '../api'

export interface UseDashboardStatsOptions extends DashboardFilters {
  enabled?: boolean
}

export const useDashboardStats = (
  options: UseDashboardStatsOptions = { timeRange: '30d' }
) => {
  const { enabled = true, ...filters } = options

  return useQuery({
    queryKey: ['dashboard', 'stats', filters],
    queryFn: () => dashboardApi.getDashboardStats(),
    enabled,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes
  })
}

export const getDashboardStatsQueryKey = (filters?: DashboardFilters) => [
  'dashboard',
  'stats',
  filters || { timeRange: '30d' },
]
