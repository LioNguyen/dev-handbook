import { type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/shared/hooks'
import { LoadingPage } from '@/components/atoms'

interface ProtectedRouteProps {
  children: ReactNode
  requireAuth?: boolean
  requireRole?: 'admin' | 'user'
  redirectTo?: string
  fallback?: ReactNode
}

/**
 * Protected Route component that handles authentication and authorization
 */
export const ProtectedRoute = ({
  children,
  requireAuth = true,
  requireRole,
  redirectTo,
  fallback,
}: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth()
  const location = useLocation()

  // Show loading while auth state is being determined
  if (isLoading) {
    return fallback || <LoadingPage message="Checking authentication..." />
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    const redirectPath = redirectTo || '/login'
    return (
      <Navigate to={redirectPath} state={{ from: location.pathname }} replace />
    )
  }

  // If authentication is not required but user is authenticated (e.g., login page)
  if (!requireAuth && isAuthenticated) {
    const redirectPath = redirectTo || '/dashboard'
    return <Navigate to={redirectPath} replace />
  }

  // If specific role is required
  if (requireRole && user?.role !== requireRole) {
    return (
      <Navigate
        to="/unauthorized"
        state={{ requiredRole: requireRole, userRole: user?.role }}
        replace
      />
    )
  }

  return <>{children}</>
}

// Convenience components for common patterns
export const AuthenticatedRoute = ({
  children,
  ...props
}: Omit<ProtectedRouteProps, 'requireAuth'>) => (
  <ProtectedRoute requireAuth={true} {...props}>
    {children}
  </ProtectedRoute>
)

export const UnauthenticatedRoute = ({
  children,
  ...props
}: Omit<ProtectedRouteProps, 'requireAuth'>) => (
  <ProtectedRoute requireAuth={false} {...props}>
    {children}
  </ProtectedRoute>
)

export const AdminRoute = ({
  children,
  ...props
}: Omit<ProtectedRouteProps, 'requireAuth' | 'requireRole'>) => (
  <ProtectedRoute requireAuth={true} requireRole="admin" {...props}>
    {children}
  </ProtectedRoute>
)

export const UserRoute = ({
  children,
  ...props
}: Omit<ProtectedRouteProps, 'requireAuth' | 'requireRole'>) => (
  <ProtectedRoute requireAuth={true} requireRole="user" {...props}>
    {children}
  </ProtectedRoute>
)
