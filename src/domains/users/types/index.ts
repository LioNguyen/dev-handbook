export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  role: 'admin' | 'user'
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
  updatedAt: string
}

export interface CreateUserData {
  email: string
  firstName: string
  lastName: string
  role?: 'admin' | 'user'
}

export interface UpdateUserData {
  firstName?: string
  lastName?: string
  avatar?: string
  role?: 'admin' | 'user'
  status?: 'active' | 'inactive' | 'pending'
}

export interface UsersListParams {
  page?: number
  limit?: number
  search?: string
  role?: 'admin' | 'user'
  status?: 'active' | 'inactive' | 'pending'
  sortBy?: 'firstName' | 'lastName' | 'email' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

export interface UsersListResponse {
  users: User[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
