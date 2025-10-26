import { lazy } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'

/**
 * Configuration options for lazy loading components
 */
export interface LazyLoadOptions {
  /** Custom component name for debugging and error messages */
  componentName?: string
  /** Retry attempts on load failure */
  retryAttempts?: number
  /** Delay between retry attempts (ms) */
  retryDelay?: number
}

/**
 * Enhanced lazy loading utility with retry mechanism and better error handling
 */
export function createLazyComponent(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  importFn: () => Promise<any>,
  options: LazyLoadOptions = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): LazyExoticComponent<ComponentType<any>> {
  const { componentName, retryAttempts = 3, retryDelay = 1000 } = options

  const enhancedImportFn = async (): Promise<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: ComponentType<any>
  }> => {
    let lastError: Error | null = null

    for (let attempt = 1; attempt <= retryAttempts; attempt++) {
      try {
        const module = await importFn()

        // Handle both default exports and named exports
        if (module && typeof module === 'object' && 'default' in module) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return module as { default: ComponentType<any> }
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return { default: module as ComponentType<any> }
        }
      } catch (error) {
        lastError = error as Error

        if (attempt < retryAttempts) {
          // Add jitter to prevent thundering herd
          const jitter = Math.random() * 500
          await new Promise((resolve) =>
            setTimeout(resolve, retryDelay + jitter)
          )

          if (process.env.NODE_ENV === 'development') {
            console.warn(
              `Failed to load ${componentName || 'component'} (attempt ${attempt}/${retryAttempts}):`,
              error
            )
          }
        }
      }
    }

    // All attempts failed
    const errorMessage = componentName
      ? `Failed to load component "${componentName}" after ${retryAttempts} attempts`
      : `Failed to load component after ${retryAttempts} attempts`

    throw new Error(errorMessage, { cause: lastError })
  }

  const LazyComponent = lazy(enhancedImportFn)

  // Note: displayName is not directly settable on LazyExoticComponent
  // but it will be derived from the component name during development

  return LazyComponent
}

/**
 * Convenience function for creating lazy components from module paths
 */
export function lazyImport(
  modulePath: string,
  exportName: string = 'default',
  options: LazyLoadOptions = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): LazyExoticComponent<ComponentType<any>> {
  const importFn = () =>
    import(/* @vite-ignore */ modulePath).then((module) =>
      exportName === 'default' ? module : { default: module[exportName] }
    )

  return createLazyComponent(importFn, {
    componentName: options.componentName || exportName,
    ...options,
  })
}

/**
 * Pre-configured lazy loaders for common component types
 */
export const lazyLoaders = {
  /** Load page components with optimized settings */
  page: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    importFn: () => Promise<any>,
    componentName?: string
  ) =>
    createLazyComponent(importFn, {
      componentName: componentName || 'Page',
      retryAttempts: 3,
      retryDelay: 1000,
    }),

  /** Load dashboard components with faster retry */
  dashboard: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    importFn: () => Promise<any>,
    componentName?: string
  ) =>
    createLazyComponent(importFn, {
      componentName: componentName || 'Dashboard Component',
      retryAttempts: 2,
      retryDelay: 500,
    }),

  /** Load modal/dialog components with immediate retry */
  modal: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    importFn: () => Promise<any>,
    componentName?: string
  ) =>
    createLazyComponent(importFn, {
      componentName: componentName || 'Modal',
      retryAttempts: 1,
      retryDelay: 0,
    }),
}
