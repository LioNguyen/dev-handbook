import { useQuery } from '@tanstack/react-query'
import { usersApi } from '../api'

export interface UseUserOptions {
  enabled?: boolean
}

export const useUser = (id: string, options: UseUserOptions = {}) => {
  const { enabled = true } = options

  return useQuery({
    queryKey: ['users', 'detail', id],
    queryFn: () => usersApi.getUser(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const getUserQueryKey = (id: string) => ['users', 'detail', id]
