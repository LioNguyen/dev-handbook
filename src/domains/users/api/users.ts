import type {
  User,
  CreateUserData,
  UpdateUserData,
  UserListParams,
  UserListResponse,
  UserStats,
} from '../types'
import type { ApiResponse } from '@/shared/types'
import { mockUsers } from '@/shared/mocks/mockData'

export interface UsersApiInterface {
  getUsers: (params?: UserListParams) => Promise<ApiResponse<UserListResponse>>
  getUser: (id: string) => Promise<ApiResponse<User>>
  createUser: (data: CreateUserData) => Promise<ApiResponse<User>>
  updateUser: (id: string, data: UpdateUserData) => Promise<ApiResponse<User>>
  deleteUser: (id: string) => Promise<ApiResponse<void>>
  getUserStats: () => Promise<ApiResponse<UserStats>>
}

// Custom error class for API errors
export class UsersApiError extends Error {
  public code: string
  public details?: Record<string, unknown>

  constructor(
    message: string,
    code: string,
    details?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'UsersApiError'
    this.code = code
    this.details = details
  }
}

// Mock API implementation - replace with real API calls
export const usersApi: UsersApiInterface = {
  getUsers: async (params = {}) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const {
      page = 1,
      limit = 10,
      search = '',
      role = 'all',
      sortBy = 'name',
      sortOrder = 'asc',
    } = params

    let filteredUsers = [...mockUsers]

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase()
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
      )
    }

    // Apply role filter
    if (role !== 'all') {
      filteredUsers = filteredUsers.filter((user) => user.role === role)
    }

    // Apply sorting
    filteredUsers.sort((a, b) => {
      let aValue: string | Date
      let bValue: string | Date

      switch (sortBy) {
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'email':
          aValue = a.email
          bValue = b.email
          break
        case 'createdAt':
          aValue = new Date(a.createdAt)
          bValue = new Date(b.createdAt)
          break
        case 'updatedAt':
          aValue = new Date(a.updatedAt)
          bValue = new Date(b.updatedAt)
          break
        default:
          aValue = a.name
          bValue = b.name
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    // Apply pagination
    const total = filteredUsers.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const users = filteredUsers.slice(startIndex, endIndex)

    return {
      data: {
        users,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      },
      success: true,
      message: 'Users retrieved successfully',
    }
  },

  getUser: async (id) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const user = mockUsers.find((u) => u.id === id)

    if (!user) {
      throw new UsersApiError('User not found', 'USER_NOT_FOUND', { id })
    }

    return {
      data: user,
      success: true,
      message: 'User retrieved successfully',
    }
  },

  createUser: async (data) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Check if email already exists
    const existingUser = mockUsers.find((u) => u.email === data.email)
    if (existingUser) {
      throw new UsersApiError(
        'A user with this email already exists',
        'EMAIL_EXISTS',
        { email: data.email }
      )
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      avatar: data.avatar,
      role: data.role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Add to mock data (in real app, this would be saved to database)
    mockUsers.push(newUser)

    return {
      data: newUser,
      success: true,
      message: 'User created successfully',
    }
  },

  updateUser: async (id, data) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600))

    const userIndex = mockUsers.findIndex((u) => u.id === id)

    if (userIndex === -1) {
      throw new UsersApiError('User not found', 'USER_NOT_FOUND', { id })
    }

    const updatedUser: User = {
      ...mockUsers[userIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    }

    // Update in mock data
    mockUsers[userIndex] = updatedUser

    return {
      data: updatedUser,
      success: true,
      message: 'User updated successfully',
    }
  },

  deleteUser: async (id) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400))

    const userIndex = mockUsers.findIndex((u) => u.id === id)

    if (userIndex === -1) {
      throw new UsersApiError('User not found', 'USER_NOT_FOUND', { id })
    }

    // Remove from mock data
    mockUsers.splice(userIndex, 1)

    return {
      data: undefined as void,
      success: true,
      message: 'User deleted successfully',
    }
  },

  getUserStats: async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    const now = new Date()
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    const stats: UserStats = {
      total: mockUsers.length,
      admins: mockUsers.filter((u) => u.role === 'admin').length,
      users: mockUsers.filter((u) => u.role === 'user').length,
      active: mockUsers.length, // In real app, this would be users who logged in recently
      recent: mockUsers.filter((u) => new Date(u.createdAt) > sevenDaysAgo)
        .length,
    }

    return {
      data: stats,
      success: true,
      message: 'User stats retrieved successfully',
    }
  },
}
