import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { CreateUserData, UpdateUserData } from '../types'
import { usersApi } from '../api'
import { getUserQueryKey } from './useUser'

export const useUserMutations = () => {
  const queryClient = useQueryClient()

  const createUser = useMutation({
    mutationFn: (data: CreateUserData) => usersApi.createUser(data),
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users', 'list'] })
      queryClient.invalidateQueries({ queryKey: ['users', 'stats'] })
    },
  })

  const updateUser = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserData }) =>
      usersApi.updateUser(id, data),
    onSuccess: (response, variables) => {
      // Update the specific user in cache
      queryClient.setQueryData(getUserQueryKey(variables.id), response)
      // Invalidate users list to refresh data
      queryClient.invalidateQueries({ queryKey: ['users', 'list'] })
      queryClient.invalidateQueries({ queryKey: ['users', 'stats'] })
    },
  })

  const deleteUser = useMutation({
    mutationFn: (id: string) => usersApi.deleteUser(id),
    onSuccess: (_, deletedId) => {
      // Remove the user from cache
      queryClient.removeQueries({ queryKey: getUserQueryKey(deletedId) })
      // Invalidate users list to refresh data
      queryClient.invalidateQueries({ queryKey: ['users', 'list'] })
      queryClient.invalidateQueries({ queryKey: ['users', 'stats'] })
    },
  })

  return {
    createUser,
    updateUser,
    deleteUser,
  }
}
