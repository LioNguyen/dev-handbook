/**
 * Zustand State Management Demo Module
 *
 * This module demonstrates Zustand for lightweight, fast state management.
 *
 * @example
 * ```tsx
 * import { useAuthStore, useThemeStore } from '@/modules/zustand-demo'
 *
 * function MyComponent() {
 *   const { user, login } = useAuthStore()
 *   const { theme, setTheme } = useThemeStore()
 *   // ...
 * }
 * ```
 */

export * from './store'
export * from './components'
