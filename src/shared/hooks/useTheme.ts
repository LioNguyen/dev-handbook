import { useEffect } from 'react'
import { useThemeStore } from '@/shared/store/themeStore'

export function useTheme() {
  const {
    theme,
    resolvedTheme,
    systemTheme,
    setTheme,
    toggleTheme,
    setSystemTheme,
  } = useThemeStore()

  // Set up system theme monitoring
  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    // Set initial system theme
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light')

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [setSystemTheme])

  return {
    /** Current theme preference ('light' | 'dark' | 'system') */
    theme,
    /** Resolved theme ('light' | 'dark') - actual theme being used */
    resolvedTheme,
    /** System theme preference ('light' | 'dark') */
    systemTheme,
    /** Set theme preference */
    setTheme,
    /** Toggle between light and dark themes */
    toggleTheme,
    /** Whether the current resolved theme is dark */
    isDark: resolvedTheme === 'dark',
    /** Whether the current resolved theme is light */
    isLight: resolvedTheme === 'light',
  }
}
