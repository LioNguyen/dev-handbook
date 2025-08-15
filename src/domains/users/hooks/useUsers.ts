import { useQuery } from '@tanstack/react-query'
import type { UserListParams } from '../types'
import { usersApi } from '../api'

export interface UseUsersOptions extends UserListParams {
  enabled?: boolean
}

export const useUsers = (options: UseUsersOptions = {}) => {
  const { enabled = true, ...params } = options

  return useQuery({
    queryKey: ['users', 'list', params],
    queryFn: () => usersApi.getUsers(params),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const getUsersQueryKey = (params?: UserListParams) => [
  'users',
  'list',
  params || {},
]
