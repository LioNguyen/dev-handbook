import { lazy } from 'react'
import type { ComponentType } from 'react'

// Enhanced lazy loading with preloading support
export const createLazyComponent = <T extends ComponentType<unknown>>(
  importFn: () => Promise<{ default: T }>,
  options: {
    preload?: boolean
    chunkName?: string
  } = {}
) => {
  const LazyComponent = lazy(importFn)

  // Add preload functionality
  const preload = () => {
    const componentImport = importFn()
    return componentImport
  }

  // Attach preload method to the component
  ;(
    LazyComponent as typeof LazyComponent & {
      preload: () => Promise<{ default: T }>
    }
  ).preload = preload

  // Auto-preload if requested
  if (options.preload) {
    preload()
  }

  return LazyComponent
}

// Simple lazy component creator with error boundary support
export const createLazyComponentWithErrorBoundary = <
  T extends ComponentType<unknown>,
>(
  importFn: () => Promise<{ default: T }>,
  options: {
    preload?: boolean
    chunkName?: string
    componentName?: string
  } = {}
) => {
  const LazyComponent = createLazyComponent(importFn, options)
  const componentName = options.componentName || 'Component'

  // Return the lazy component with display name for debugging
  const WrappedComponent = LazyComponent as typeof LazyComponent & {
    displayName?: string
    componentName?: string
  }

  WrappedComponent.displayName = `Lazy(${componentName})`
  WrappedComponent.componentName = componentName

  return WrappedComponent
}

// Preload multiple components
export const preloadComponents = (
  ...components: Array<{ preload?: () => void }>
) => {
  components.forEach((component) => {
    if (component.preload) {
      component.preload()
    }
  })
}

// Utility for creating optimized lazy components
export const createOptimizedLazyComponent = <T extends ComponentType<object>>(
  importFn: () => Promise<{ default: T }>,
  componentName: string
) => {
  const LazyComponent = lazy(importFn)

  // Add display name for debugging (this is safe as it's a common React pattern)
  ;(
    LazyComponent as typeof LazyComponent & { displayName?: string }
  ).displayName = `Lazy(${componentName})`

  return LazyComponent
}

// Performance monitoring utilities
export const performanceMetrics = {
  // Mark navigation start
  markNavigationStart: (routeName: string) => {
    if (typeof performance !== 'undefined') {
      performance.mark(`navigation-start-${routeName}`)
    }
  },

  // Mark navigation end
  markNavigationEnd: (routeName: string) => {
    if (typeof performance !== 'undefined') {
      performance.mark(`navigation-end-${routeName}`)
      performance.measure(
        `navigation-${routeName}`,
        `navigation-start-${routeName}`,
        `navigation-end-${routeName}`
      )
    }
  },

  // Get navigation metrics
  getNavigationMetrics: (routeName: string) => {
    if (typeof performance !== 'undefined') {
      const entries = performance.getEntriesByName(`navigation-${routeName}`)
      return entries.length > 0 ? entries[0] : null
    }
    return null
  },

  // Clear performance marks
  clearMarks: (routeName?: string) => {
    if (typeof performance !== 'undefined') {
      if (routeName) {
        performance.clearMarks(`navigation-start-${routeName}`)
        performance.clearMarks(`navigation-end-${routeName}`)
        performance.clearMeasures(`navigation-${routeName}`)
      } else {
        performance.clearMarks()
        performance.clearMeasures()
      }
    }
  },
}

// Resource preloading utilities
export const resourcePreloader = {
  // Preload images
  preloadImage: (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = reject
      img.src = src
    })
  },

  // Preload multiple images
  preloadImages: (srcs: string[]): Promise<void[]> => {
    return Promise.all(srcs.map((src) => resourcePreloader.preloadImage(src)))
  },

  // Preload CSS
  preloadCSS: (href: string): void => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'style'
    link.href = href
    document.head.appendChild(link)
  },

  // Preload JavaScript
  preloadJS: (href: string): void => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'script'
    link.href = href
    document.head.appendChild(link)
  },
}

// Memory management utilities
export const memoryUtils = {
  // Clean up unused refs and listeners
  cleanup: () => {
    // Force garbage collection if available (Chrome DevTools)
    if (typeof window !== 'undefined' && (window as { gc?: () => void }).gc) {
      ;(window as { gc: () => void }).gc()
    }
  },

  // Get memory usage info
  getMemoryInfo: () => {
    interface MemoryInfo {
      usedJSHeapSize: number
      totalJSHeapSize: number
      jsHeapSizeLimit: number
    }

    if (typeof performance !== 'undefined') {
      const perfWithMemory = performance as Performance & {
        memory?: MemoryInfo
      }
      return perfWithMemory.memory || null
    }
    return null
  },

  // Monitor memory usage
  monitorMemory: (interval = 5000) => {
    const monitor = () => {
      const memInfo = memoryUtils.getMemoryInfo()
      if (memInfo) {
        console.log('Memory Usage:', {
          used: Math.round(memInfo.usedJSHeapSize / 1048576) + ' MB',
          total: Math.round(memInfo.totalJSHeapSize / 1048576) + ' MB',
          limit: Math.round(memInfo.jsHeapSizeLimit / 1048576) + ' MB',
        })
      }
    }

    monitor()
    return setInterval(monitor, interval)
  },
}

// Performance budget utilities
export const performanceBudget = {
  // Define performance budgets
  budgets: {
    firstContentfulPaint: 1500, // 1.5s
    largestContentfulPaint: 2500, // 2.5s
    cumulativeLayoutShift: 0.1,
    firstInputDelay: 100, // 100ms
    totalBlockingTime: 200, // 200ms
  },

  // Check if performance meets budget
  checkBudget: () => {
    if (typeof performance === 'undefined') return null

    const paintEntries = performance.getEntriesByType('paint')

    const fcp =
      paintEntries.find((entry) => entry.name === 'first-contentful-paint')
        ?.startTime || 0
    const lcp =
      performance.getEntriesByType('largest-contentful-paint')[0]?.startTime ||
      0

    return {
      firstContentfulPaint: {
        value: fcp,
        budget: performanceBudget.budgets.firstContentfulPaint,
        passes: fcp <= performanceBudget.budgets.firstContentfulPaint,
      },
      largestContentfulPaint: {
        value: lcp,
        budget: performanceBudget.budgets.largestContentfulPaint,
        passes: lcp <= performanceBudget.budgets.largestContentfulPaint,
      },
    }
  },
}

// Advanced lazy loading utilities
export const advancedLazyLoading = {
  // Preload route on link hover
  preloadOnHover: (routeImport: () => Promise<unknown>) => {
    let isPreloaded = false

    return {
      onMouseEnter: () => {
        if (!isPreloaded) {
          routeImport()
          isPreloaded = true
        }
      },
    }
  },

  // Preload critical routes on idle
  preloadOnIdle: (imports: Array<() => Promise<unknown>>) => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        imports.forEach((importFn) => importFn())
      })
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        imports.forEach((importFn) => importFn())
      }, 2000)
    }
  },
}
