import { Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { LoadingPage } from '@/core/components/atoms'
import { ErrorBoundary } from '@/core/components/organisms'
import { useRoutePerformance } from '@/shared/hooks/usePerformance'
import { HomePage, NotFoundPage } from './routes'

// Route wrapper with performance monitoring
interface PerformantRouteProps {
  children: React.ReactNode
  routeName: string
}

const PerformantRoute = ({ children, routeName }: PerformantRouteProps) => {
  const { getMetrics } = useRoutePerformance(routeName)

  // Log metrics in development
  if (process.env.NODE_ENV === 'development') {
    const metrics = getMetrics()
    if (metrics) {
      console.log(`Route ${routeName} performance:`, metrics.duration + 'ms')
    }
  }

  return <>{children}</>
}

// Route wrapper with suspense and error boundary
interface LazyRouteProps {
  children: React.ReactNode
  routeName: string
}

const LazyRoute = ({ children, routeName }: LazyRouteProps) => (
  <ErrorBoundary>
    <Suspense fallback={<LoadingPage />}>
      <PerformantRoute routeName={routeName}>{children}</PerformantRoute>
    </Suspense>
  </ErrorBoundary>
)

export const AppRoutes = () => {
  const location = useLocation()

  return (
    <Routes key={location.pathname}>
      {/* Public routes */}
      <Route
        path="/"
        element={
          <LazyRoute routeName="home">
            <HomePage />
          </LazyRoute>
        }
      />

      {/* Redirect old routes */}
      <Route path="/home" element={<Navigate to="/" replace />} />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
