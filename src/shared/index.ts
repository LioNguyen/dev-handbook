// Shared utilities and constants
export * from './lib'
export * from './types'
export * from './hooks'
export * from './components'

// Store exports (avoiding conflicts)
export { useThemeStore, useUIStore, useAuthStore } from './store'
export type { Theme, User } from './store'

// Re-export commonly used items
export { cn } from './lib/utils'
export { useLocalStorage, useTheme } from './hooks'
export { ThemeProvider, ThemeToggle } from './components'
