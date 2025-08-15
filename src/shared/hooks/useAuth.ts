import { useAuthStore } from '@/shared/store/authStore'
import { useCallback } from 'react'

/**
 * Custom hook for authentication
 * Provides access to auth state and actions with optimized selectors
 */
export const useAuth = () => {
  // Selectors for specific state slices to prevent unnecessary re-renders
  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isLoading = useAuthStore((state) => state.isLoading)
  const error = useAuthStore((state) => state.error)

  // Actions
  const login = useAuthStore((state) => state.login)
  const register = useAuthStore((state) => state.register)
  const logout = useAuthStore((state) => state.logout)
  const setUser = useAuthStore((state) => state.setUser)
  const setToken = useAuthStore((state) => state.setToken)
  const setLoading = useAuthStore((state) => state.setLoading)
  const setError = useAuthStore((state) => state.setError)
  const clearError = useAuthStore((state) => state.clearError)
  const refreshToken = useAuthStore((state) => state.refreshToken)
  const updateProfile = useAuthStore((state) => state.updateProfile)

  // Memoized helper functions
  const hasRole = useCallback(
    (role: string) => {
      return user?.role === role
    },
    [user?.role]
  )

  const isAdmin = useCallback(() => {
    return user?.role === 'admin'
  }, [user?.role])

  const isUser = useCallback(() => {
    return user?.role === 'user'
  }, [user?.role])

  const hasPermission = useCallback(
    (permission: string) => {
      // Mock permission system - in real app, this would check user permissions
      if (!user) return false

      // Admin has all permissions
      if (user.role === 'admin') return true

      // Basic user permissions
      const userPermissions = [
        'read:profile',
        'update:profile',
        'read:dashboard',
      ]

      return userPermissions.includes(permission)
    },
    [user]
  )

  const getInitials = useCallback(() => {
    if (!user?.name) return 'U'

    return user.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }, [user?.name])

  const getAvatarUrl = useCallback(() => {
    if (user?.avatar) return user.avatar

    // Generate a placeholder avatar URL based on user initials
    const initials = getInitials()
    const colors = ['blue', 'green', 'red', 'yellow', 'purple', 'pink']
    const colorIndex = user?.id ? parseInt(user.id, 36) % colors.length : 0
    const color = colors[colorIndex]

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      initials
    )}&background=${color}&color=white&size=40`
  }, [user?.avatar, user?.id, getInitials])

  // Auto-refresh token when it's about to expire
  const scheduleTokenRefresh = useCallback(() => {
    if (!token) return

    // In a real app, you'd decode the JWT to get the expiration time
    // For now, we'll refresh every 50 minutes (assuming 1-hour tokens)
    const refreshInterval = 50 * 60 * 1000 // 50 minutes

    const timeoutId = setTimeout(() => {
      refreshToken().catch(() => {
        // If refresh fails, log out the user
        logout()
      })
    }, refreshInterval)

    return () => clearTimeout(timeoutId)
  }, [token, refreshToken, logout])

  // Check if user session is still valid
  const validateSession = useCallback(async () => {
    if (!token) return false

    try {
      await refreshToken()
      return true
    } catch {
      logout()
      return false
    }
  }, [token, refreshToken, logout])

  return {
    // State
    user,
    token,
    isAuthenticated,
    isLoading,
    error,

    // Actions
    login,
    register,
    logout,
    setUser,
    setToken,
    setLoading,
    setError,
    clearError,
    refreshToken,
    updateProfile,

    // Helper functions
    hasRole,
    isAdmin,
    isUser,
    hasPermission,
    getInitials,
    getAvatarUrl,
    scheduleTokenRefresh,
    validateSession,
  }
}

// Convenience hooks for specific use cases
export const useAuthUser = () => {
  return useAuthStore((state) => state.user)
}

export const useAuthLoading = () => {
  return useAuthStore((state) => state.isLoading)
}

export const useAuthError = () => {
  return useAuthStore((state) => state.error)
}

export const useIsAuthenticated = () => {
  return useAuthStore((state) => state.isAuthenticated)
}

export const useAuthActions = () => {
  return useAuthStore((state) => ({
    login: state.login,
    register: state.register,
    logout: state.logout,
    clearError: state.clearError,
  }))
}
