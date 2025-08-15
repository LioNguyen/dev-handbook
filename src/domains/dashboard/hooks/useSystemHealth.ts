import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '../api'

export interface UseSystemHealthOptions {
  enabled?: boolean
}

export const useSystemHealth = (options: UseSystemHealthOptions = {}) => {
  const { enabled = true } = options

  return useQuery({
    queryKey: ['dashboard', 'system-health'],
    queryFn: () => dashboardApi.getSystemHealth(),
    enabled,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  })
}

export const getSystemHealthQueryKey = () => ['dashboard', 'system-health']
