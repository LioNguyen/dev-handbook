import type { User } from '@/shared/store/authStore'

// Re-export User for convenience
export type { User } from '@/shared/store/authStore'

export interface CreateUserData {
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'user'
}

export interface UpdateUserData {
  name?: string
  avatar?: string
  role?: 'admin' | 'user'
}

export interface UserFilters {
  search?: string
  role?: 'admin' | 'user' | 'all'
  sortBy?: 'name' | 'email' | 'createdAt' | 'updatedAt'
  sortOrder?: 'asc' | 'desc'
}

export interface UserListParams extends UserFilters {
  page?: number
  limit?: number
}

export interface UserListResponse {
  users: User[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface UserStats {
  total: number
  admins: number
  users: number
  active: number
  recent: number
}
