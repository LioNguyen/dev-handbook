// Shared utilities and constants
export * from './utils'
export * from './types'
export * from './hooks'

// Store exports (avoiding conflicts)
export { useThemeStore, useUIStore } from './store'
export type { Theme } from './store'

// Re-export commonly used items
export { cn } from './utils/utils'
export { useLocalStorage, useTheme } from './hooks'
