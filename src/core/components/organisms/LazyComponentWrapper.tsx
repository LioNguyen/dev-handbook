import { Suspense } from 'react'
import type { ComponentType, ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { LazyErrorFallback } from '@/core/components/molecules'

interface LazyComponentWrapperProps {
  component: ComponentType<unknown>
  componentName?: string
  loadingFallback?: ReactNode
  errorFallback?: ComponentType<{
    error?: Error
    resetError?: () => void
    componentName?: string
  }>
  componentProps?: Record<string, unknown>
}

/**
 * Wrapper component that provides error boundary and suspense for lazy-loaded components
 */
export function LazyComponentWrapper({
  component: Component,
  componentName = 'Component',
  loadingFallback,
  errorFallback: CustomErrorFallback,
  componentProps = {},
}: LazyComponentWrapperProps) {
  const ErrorComponent = CustomErrorFallback || LazyErrorFallback

  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => (
        <ErrorComponent
          error={error}
          resetError={resetErrorBoundary}
          componentName={componentName}
        />
      )}
      onReset={() => {
        // Additional reset logic can be added here
        console.log(`Resetting error boundary for ${componentName}`)
      }}
    >
      <Suspense
        fallback={
          loadingFallback || (
            <div className="flex items-center justify-center p-4 animate-pulse text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                Loading {componentName}...
              </div>
            </div>
          )
        }
      >
        <Component {...componentProps} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default LazyComponentWrapper
