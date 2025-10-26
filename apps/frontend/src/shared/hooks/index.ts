// Re-export core hooks for convenience
export {
  useCrud,
  usePosts,
  useLocalStorage,
  useResponsive,
  useBreakpoint,
  useMediaQuery,
  usePrevious,
} from '@/core/hooks'

// Project-specific hooks
export { useAuth } from './useAuth'
export { useTheme } from './useTheme'
export { useFormValidation } from './useValidatedForm'
export {
  useRoutePerformance,
  useIntersectionObserver,
  useMemoryMonitor,
  usePerformanceBudget,
  usePreloadResources,
} from './usePerformance'
