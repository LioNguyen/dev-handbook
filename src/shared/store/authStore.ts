import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'user'
  createdAt: string
  updatedAt: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  // Actions
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
  setToken: (token: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
  refreshToken: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

// Mock API functions (will be replaced with real API calls)
const mockAuthAPI = {
  login: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock validation
    if (email === 'admin@example.com' && password === 'admin123') {
      return {
        user: {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin' as const,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        token: 'mock_jwt_token_admin',
      }
    } else if (email === 'user@example.com' && password === 'user123') {
      return {
        user: {
          id: '2',
          email: 'user@example.com',
          name: 'Regular User',
          role: 'user' as const,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        token: 'mock_jwt_token_user',
      }
    } else {
      throw new Error('Invalid email or password')
    }
  },

  register: async (email: string, password: string, name: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock validation
    if (email === 'admin@example.com' || email === 'user@example.com') {
      throw new Error('Email already exists')
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters')
    }

    return {
      user: {
        id: Math.random().toString(36).substring(2),
        email,
        name,
        role: 'user' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      token: 'mock_jwt_token_new_user',
    }
  },

  refreshToken: async (token: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (!token) {
      throw new Error('No token provided')
    }

    return {
      token: 'mock_refreshed_jwt_token',
    }
  },

  updateProfile: async (token: string, data: Partial<User>) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (!token) {
      throw new Error('No token provided')
    }

    return {
      user: {
        id: '1',
        email: 'admin@example.com',
        name: data.name || 'Admin User',
        role: 'admin' as const,
        avatar: data.avatar,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }
  },
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null })

          const response = await mockAuthAPI.login(email, password)

          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })

          // Store token in localStorage for API client
          localStorage.setItem('auth_token', response.token)
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: error instanceof Error ? error.message : 'Login failed',
          })
          throw error
        }
      },

      register: async (email: string, password: string, name: string) => {
        try {
          set({ isLoading: true, error: null })

          const response = await mockAuthAPI.register(email, password, name)

          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })

          // Store token in localStorage for API client
          localStorage.setItem('auth_token', response.token)
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error:
              error instanceof Error ? error.message : 'Registration failed',
          })
          throw error
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        })

        // Remove token from localStorage
        localStorage.removeItem('auth_token')
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: true })
      },

      setToken: (token: string) => {
        set({ token, isAuthenticated: true })
        localStorage.setItem('auth_token', token)
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },

      setError: (error: string | null) => {
        set({ error })
      },

      clearError: () => {
        set({ error: null })
      },

      refreshToken: async () => {
        try {
          const { token } = get()
          if (!token) {
            throw new Error('No token to refresh')
          }

          set({ isLoading: true, error: null })

          const response = await mockAuthAPI.refreshToken(token)

          set({
            token: response.token,
            isLoading: false,
            error: null,
          })

          localStorage.setItem('auth_token', response.token)
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error:
              error instanceof Error ? error.message : 'Token refresh failed',
          })

          localStorage.removeItem('auth_token')
          throw error
        }
      },

      updateProfile: async (data: Partial<User>) => {
        try {
          const { token } = get()
          if (!token) {
            throw new Error('Not authenticated')
          }

          set({ isLoading: true, error: null })

          const response = await mockAuthAPI.updateProfile(token, data)

          set({
            user: response.user,
            isLoading: false,
            error: null,
          })
        } catch (error) {
          set({
            isLoading: false,
            error:
              error instanceof Error ? error.message : 'Profile update failed',
          })
          throw error
        }
      },
    }),
    {
      name: 'auth-storage',
      // Only persist certain fields
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
