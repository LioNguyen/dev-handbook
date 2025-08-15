import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  systemTheme: 'light' | 'dark'
  setSystemTheme: (theme: 'light' | 'dark') => void
}

// Function to get system theme preference
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

// Function to apply theme to DOM
const applyTheme = (theme: 'light' | 'dark') => {
  if (typeof window === 'undefined') return

  const root = window.document.documentElement

  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }

  // Set color-scheme for better browser integration
  root.style.colorScheme = theme
}

// Function to resolve the actual theme based on preference
const resolveTheme = (
  theme: Theme,
  systemTheme: 'light' | 'dark'
): 'light' | 'dark' => {
  return theme === 'system' ? systemTheme : theme
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      systemTheme: getSystemTheme(),
      resolvedTheme: resolveTheme('system', getSystemTheme()),

      setTheme: (theme) => {
        const { systemTheme } = get()
        const resolvedTheme = resolveTheme(theme, systemTheme)
        applyTheme(resolvedTheme)
        set({ theme, resolvedTheme })
      },

      toggleTheme: () => {
        const { theme } = get()
        if (theme === 'system') {
          get().setTheme('light')
        } else if (theme === 'light') {
          get().setTheme('dark')
        } else {
          get().setTheme('light')
        }
      },

      setSystemTheme: (systemTheme) => {
        const { theme } = get()
        const resolvedTheme = resolveTheme(theme, systemTheme)
        if (theme === 'system') {
          applyTheme(resolvedTheme)
        }
        set({ systemTheme, resolvedTheme })
      },
    }),
    {
      name: 'theme-preference',
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Apply theme on hydration
          applyTheme(state.resolvedTheme)

          // Set up system theme listener
          if (typeof window !== 'undefined') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
            const handleChange = (e: MediaQueryListEvent) => {
              state.setSystemTheme(e.matches ? 'dark' : 'light')
            }
            mediaQuery.addEventListener('change', handleChange)

            // Cleanup function would be needed in a real implementation
            // This is handled by the useTheme hook
          }
        }
      },
    }
  )
)
