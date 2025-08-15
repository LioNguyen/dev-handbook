import { useState, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/core/api/client'
import type { ApiResponse } from '@/shared/types'

export interface CrudOptions<T> {
  endpoint: string
  queryKey: string[]
  defaultSort?: string
  defaultFilters?: Record<string, unknown>
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

export interface PaginationParams {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
  search?: string
  filters?: Record<string, unknown>
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

/**
 * Generic CRUD hook for API operations
 * Provides common patterns for Create, Read, Update, Delete operations
 */
export const useCrud = <T extends { id: string }>(options: CrudOptions<T>) => {
  const {
    endpoint,
    queryKey,
    defaultSort = 'createdAt',
    defaultFilters = {},
    onSuccess,
    onError,
  } = options

  const queryClient = useQueryClient()
  const [params, setParams] = useState<PaginationParams>({
    page: 1,
    limit: 10,
    sort: defaultSort,
    order: 'desc',
    search: '',
    filters: defaultFilters,
  })

  // GET /endpoint - List items with pagination
  const {
    data: listData,
    isLoading: isListLoading,
    error: listError,
    refetch: refetchList,
  } = useQuery({
    queryKey: [...queryKey, 'list', params],
    queryFn: async (): Promise<PaginatedResponse<T>> => {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<T>>>(
        endpoint,
        { params }
      )
      return response.data.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // GET /endpoint/:id - Get single item
  const useGetOne = (id: string | null) => {
    return useQuery({
      queryKey: [...queryKey, 'detail', id],
      queryFn: async (): Promise<T> => {
        if (!id) throw new Error('ID is required')
        const response = await apiClient.get<ApiResponse<T>>(
          `${endpoint}/${id}`
        )
        return response.data.data
      },
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    })
  }

  // POST /endpoint - Create new item
  const createMutation = useMutation({
    mutationFn: async (
      data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<T> => {
      const response = await apiClient.post<ApiResponse<T>>(endpoint, data)
      return response.data.data
    },
    onSuccess: (data) => {
      // Invalidate and refetch list
      queryClient.invalidateQueries({ queryKey: [...queryKey, 'list'] })
      onSuccess?.(data)
    },
    onError: (error) => {
      onError?.(error as Error)
    },
  })

  // PUT /endpoint/:id - Update item
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string
      data: Partial<T>
    }): Promise<T> => {
      const response = await apiClient.put<ApiResponse<T>>(
        `${endpoint}/${id}`,
        data
      )
      return response.data.data
    },
    onSuccess: (data) => {
      // Update specific item in cache
      queryClient.setQueryData([...queryKey, 'detail', data.id], data)
      // Invalidate list to reflect changes
      queryClient.invalidateQueries({ queryKey: [...queryKey, 'list'] })
      onSuccess?.(data)
    },
    onError: (error) => {
      onError?.(error as Error)
    },
  })

  // DELETE /endpoint/:id - Delete item
  const deleteMutation = useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await apiClient.delete(`${endpoint}/${id}`)
    },
    onSuccess: (_, id) => {
      // Remove item from cache
      queryClient.removeQueries({ queryKey: [...queryKey, 'detail', id] })
      // Invalidate list to reflect changes
      queryClient.invalidateQueries({ queryKey: [...queryKey, 'list'] })
    },
    onError: (error) => {
      onError?.(error as Error)
    },
  })

  // Bulk operations
  const bulkDeleteMutation = useMutation({
    mutationFn: async (ids: string[]): Promise<void> => {
      await apiClient.delete(endpoint, { data: { ids } })
    },
    onSuccess: (_, ids) => {
      // Remove items from cache
      ids.forEach((id) => {
        queryClient.removeQueries({ queryKey: [...queryKey, 'detail', id] })
      })
      // Invalidate list to reflect changes
      queryClient.invalidateQueries({ queryKey: [...queryKey, 'list'] })
    },
    onError: (error) => {
      onError?.(error as Error)
    },
  })

  // Helper functions
  const updateParams = useCallback((newParams: Partial<PaginationParams>) => {
    setParams((prev) => ({ ...prev, ...newParams }))
  }, [])

  const setPage = useCallback(
    (page: number) => {
      updateParams({ page })
    },
    [updateParams]
  )

  const setLimit = useCallback(
    (limit: number) => {
      updateParams({ limit, page: 1 }) // Reset to first page when changing limit
    },
    [updateParams]
  )

  const setSort = useCallback(
    (sort: string, order: 'asc' | 'desc' = 'desc') => {
      updateParams({ sort, order, page: 1 }) // Reset to first page when changing sort
    },
    [updateParams]
  )

  const setSearch = useCallback(
    (search: string) => {
      updateParams({ search, page: 1 }) // Reset to first page when searching
    },
    [updateParams]
  )

  const setFilters = useCallback(
    (filters: Record<string, unknown>) => {
      updateParams({ filters, page: 1 }) // Reset to first page when filtering
    },
    [updateParams]
  )

  const resetParams = useCallback(() => {
    setParams({
      page: 1,
      limit: 10,
      sort: defaultSort,
      order: 'desc',
      search: '',
      filters: defaultFilters,
    })
  }, [defaultSort, defaultFilters])

  // Optimistic updates
  const optimisticUpdate = useCallback(
    (id: string, data: Partial<T>) => {
      queryClient.setQueryData(
        [...queryKey, 'detail', id],
        (old: T | undefined) => {
          if (!old) return old
          return { ...old, ...data }
        }
      )
    },
    [queryClient, queryKey]
  )

  const optimisticDelete = useCallback(
    (id: string) => {
      // Remove from list cache
      queryClient.setQueryData(
        [...queryKey, 'list', params],
        (old: PaginatedResponse<T> | undefined) => {
          if (!old) return old
          return {
            ...old,
            data: old.data.filter((item) => item.id !== id),
            total: old.total - 1,
          }
        }
      )
      // Remove from detail cache
      queryClient.removeQueries({ queryKey: [...queryKey, 'detail', id] })
    },
    [queryClient, queryKey, params]
  )

  return {
    // Data
    data: listData?.data ?? [],
    total: listData?.total ?? 0,
    page: listData?.page ?? 1,
    limit: listData?.limit ?? 10,
    totalPages: listData?.totalPages ?? 0,
    hasNextPage: listData?.hasNextPage ?? false,
    hasPrevPage: listData?.hasPrevPage ?? false,

    // Loading states
    isLoading: isListLoading,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isBulkDeleting: bulkDeleteMutation.isPending,

    // Error states
    error: listError,
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,

    // Actions
    create: createMutation.mutate,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,
    bulkDelete: bulkDeleteMutation.mutate,
    refetch: refetchList,

    // Async actions
    createAsync: createMutation.mutateAsync,
    updateAsync: updateMutation.mutateAsync,
    deleteAsync: deleteMutation.mutateAsync,
    bulkDeleteAsync: bulkDeleteMutation.mutateAsync,

    // Pagination & Filtering
    params,
    updateParams,
    setPage,
    setLimit,
    setSort,
    setSearch,
    setFilters,
    resetParams,

    // Optimistic updates
    optimisticUpdate,
    optimisticDelete,

    // Hooks
    useGetOne,
  }
}

// Specialized hooks for common patterns
export const usePosts = () => {
  return useCrud({
    endpoint: '/posts',
    queryKey: ['posts'],
    defaultSort: 'createdAt',
  })
}
