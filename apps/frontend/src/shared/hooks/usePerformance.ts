import { useEffect, useRef, useState } from 'react'
import {
  performanceMetrics,
  memoryUtils,
  performanceBudget,
} from '@/shared/utils/performance'

// Hook for tracking route navigation performance
export const useRoutePerformance = (routeName: string) => {
  useEffect(() => {
    // Mark navigation start
    performanceMetrics.markNavigationStart(routeName)

    return () => {
      // Mark navigation end when component unmounts
      performanceMetrics.markNavigationEnd(routeName)
    }
  }, [routeName])

  const getMetrics = () => {
    return performanceMetrics.getNavigationMetrics(routeName)
  }

  return { getMetrics }
}

// Hook for intersection observer based lazy loading
export const useIntersectionObserver = (
  options: {
    threshold?: number
    rootMargin?: string
    triggerOnce?: boolean
  } = {}
) => {
  const { threshold = 0.1, rootMargin = '50px', triggerOnce = true } = options
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            setHasTriggered(true)
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce])

  const shouldRender = isVisible || hasTriggered

  return { ref: elementRef, isVisible: shouldRender }
}

// Hook for monitoring memory usage
export const useMemoryMonitor = (interval = 5000) => {
  const [memoryInfo, setMemoryInfo] = useState<{
    used: string
    total: string
    limit: string
  } | null>(null)

  useEffect(() => {
    const monitor = () => {
      const info = memoryUtils.getMemoryInfo()
      if (info) {
        setMemoryInfo({
          used: Math.round(info.usedJSHeapSize / 1048576) + ' MB',
          total: Math.round(info.totalJSHeapSize / 1048576) + ' MB',
          limit: Math.round(info.jsHeapSizeLimit / 1048576) + ' MB',
        })
      }
    }

    monitor()
    const intervalId = setInterval(monitor, interval)

    return () => clearInterval(intervalId)
  }, [interval])

  return memoryInfo
}

// Hook for performance budget monitoring
export const usePerformanceBudget = () => {
  const [budgetResults, setBudgetResults] =
    useState<ReturnType<typeof performanceBudget.checkBudget>>(null)

  useEffect(() => {
    // Check budget after page load
    const checkBudget = () => {
      const results = performanceBudget.checkBudget()
      setBudgetResults(results)
    }

    // Wait a bit for performance entries to be available
    const timer = setTimeout(checkBudget, 2000)

    return () => clearTimeout(timer)
  }, [])

  return budgetResults
}

// Hook for preloading resources
export const usePreloadResources = (resources: {
  images?: string[]
  scripts?: string[]
  styles?: string[]
}) => {
  const [loadingState, setLoadingState] = useState<{
    images: 'idle' | 'loading' | 'loaded' | 'error'
    scripts: 'idle' | 'loading' | 'loaded' | 'error'
    styles: 'idle' | 'loading' | 'loaded' | 'error'
  }>({
    images: 'idle',
    scripts: 'idle',
    styles: 'idle',
  })

  useEffect(() => {
    const preloadImages = async () => {
      if (!resources.images?.length) return

      setLoadingState((prev) => ({ ...prev, images: 'loading' }))

      try {
        await Promise.all(
          resources.images.map(
            (src) =>
              new Promise<void>((resolve, reject) => {
                const img = new Image()
                img.onload = () => resolve()
                img.onerror = reject
                img.src = src
              })
          )
        )
        setLoadingState((prev) => ({ ...prev, images: 'loaded' }))
      } catch {
        setLoadingState((prev) => ({ ...prev, images: 'error' }))
      }
    }

    const preloadScripts = () => {
      if (!resources.scripts?.length) return

      setLoadingState((prev) => ({ ...prev, scripts: 'loading' }))

      resources.scripts.forEach((href) => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'script'
        link.href = href
        document.head.appendChild(link)
      })

      setLoadingState((prev) => ({ ...prev, scripts: 'loaded' }))
    }

    const preloadStyles = () => {
      if (!resources.styles?.length) return

      setLoadingState((prev) => ({ ...prev, styles: 'loading' }))

      resources.styles.forEach((href) => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'style'
        link.href = href
        document.head.appendChild(link)
      })

      setLoadingState((prev) => ({ ...prev, styles: 'loaded' }))
    }

    preloadImages()
    preloadScripts()
    preloadStyles()
  }, [resources])

  return loadingState
}
