import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ErrorBoundary } from '@/core/components/organisms'
import { useRoutePerformance } from '@/shared/hooks/usePerformance'
import {
  HomePage,
  NotFoundPage,
  StateManagementDemosPage,
  ContextDemoPage,
  ReduxDemoPage,
  ReduxSagaDemoPage,
  ZustandDemoPage,
} from './routes'

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

// Route wrapper with error boundary
interface RouteWrapperProps {
  children: React.ReactNode
  routeName: string
}

const RouteWrapper = ({ children, routeName }: RouteWrapperProps) => (
  <ErrorBoundary>
    <PerformantRoute routeName={routeName}>{children}</PerformantRoute>
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
          <RouteWrapper routeName="home">
            <HomePage />
          </RouteWrapper>
        }
      />

      {/* State Management Demos */}
      <Route
        path="/demos"
        element={
          <RouteWrapper routeName="state-management-demos">
            <StateManagementDemosPage />
          </RouteWrapper>
        }
      />

      <Route
        path="/demos/context"
        element={
          <RouteWrapper routeName="context-demo">
            <ContextDemoPage />
          </RouteWrapper>
        }
      />

      <Route
        path="/demos/redux"
        element={
          <RouteWrapper routeName="redux-demo">
            <ReduxDemoPage />
          </RouteWrapper>
        }
      />

      <Route
        path="/demos/redux-saga"
        element={
          <RouteWrapper routeName="redux-saga-demo">
            <ReduxSagaDemoPage />
          </RouteWrapper>
        }
      />

      <Route
        path="/demos/zustand"
        element={
          <RouteWrapper routeName="zustand-demo">
            <ZustandDemoPage />
          </RouteWrapper>
        }
      />

      {/* Redirect old routes */}
      <Route path="/home" element={<Navigate to="/" replace />} />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
