import { useQuery } from '@tanstack/react-query'
import type { DashboardFilters } from '../types'
import { dashboardApi } from '../api'

export interface UseDashboardDataOptions extends DashboardFilters {
  enabled?: boolean
}

export const useDashboardData = (
  options: UseDashboardDataOptions = { timeRange: '30d' }
) => {
  const { enabled = true, ...filters } = options

  return useQuery({
    queryKey: ['dashboard', 'data', filters],
    queryFn: () => dashboardApi.getDashboardData(filters),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  })
}

export const getDashboardDataQueryKey = (filters?: DashboardFilters) => [
  'dashboard',
  'data',
  filters || {},
]
