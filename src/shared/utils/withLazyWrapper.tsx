import type { ComponentType, ReactNode } from 'react'
import { LazyComponentWrapper } from '@/components/organisms'

/**
 * Higher-order component to wrap lazy components with error boundary and suspense
 */
export function withLazyWrapper<P = Record<string, unknown>>(
  LazyComponent: ComponentType<P>,
  options: {
    componentName?: string
    loadingFallback?: ReactNode
    errorFallback?: ComponentType<{
      error?: Error
      resetError?: () => void
      componentName?: string
    }>
  } = {}
) {
  const WrappedComponent = (props: P) => (
    <LazyComponentWrapper
      component={LazyComponent as ComponentType<unknown>}
      componentName={options.componentName}
      loadingFallback={options.loadingFallback}
      errorFallback={options.errorFallback}
      componentProps={props as Record<string, unknown>}
    />
  )

  WrappedComponent.displayName = `withLazyWrapper(${
    options.componentName || LazyComponent.displayName || LazyComponent.name
  })`

  return WrappedComponent
}

export default withLazyWrapper
