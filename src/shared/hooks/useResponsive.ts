import { useState, useEffect } from 'react'
import { breakpoints } from '@/shared/lib/responsive'

type Breakpoint = keyof typeof breakpoints

interface UseResponsiveReturn {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isLarge: boolean
  breakpoint: Breakpoint
  width: number
  height: number
}

export function useResponsive(): UseResponsiveReturn {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    // Set initial size
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getCurrentBreakpoint = (): Breakpoint => {
    const { width } = windowSize

    if (width >= parseInt(breakpoints['3xl'])) return '3xl'
    if (width >= parseInt(breakpoints['2xl'])) return '2xl'
    if (width >= parseInt(breakpoints.xl)) return 'xl'
    if (width >= parseInt(breakpoints.lg)) return 'lg'
    if (width >= parseInt(breakpoints.md)) return 'md'
    if (width >= parseInt(breakpoints.sm)) return 'sm'
    return 'xs'
  }

  const breakpoint = getCurrentBreakpoint()
  const { width, height } = windowSize

  return {
    isMobile: width < parseInt(breakpoints.md),
    isTablet:
      width >= parseInt(breakpoints.md) && width < parseInt(breakpoints.lg),
    isDesktop: width >= parseInt(breakpoints.lg),
    isLarge: width >= parseInt(breakpoints.xl),
    breakpoint,
    width,
    height,
  }
}

// Hook for specific breakpoint matching
export function useBreakpoint(breakpoint: Breakpoint): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const query = window.matchMedia(`(min-width: ${breakpoints[breakpoint]})`)

    const handleChange = () => setMatches(query.matches)

    // Set initial value
    setMatches(query.matches)

    // Listen for changes
    query.addEventListener('change', handleChange)

    return () => query.removeEventListener('change', handleChange)
  }, [breakpoint])

  return matches
}

// Hook for media queries
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)

    const handleChange = () => setMatches(mediaQuery.matches)

    // Set initial value
    setMatches(mediaQuery.matches)

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [query])

  return matches
}
