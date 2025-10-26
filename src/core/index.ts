// Core application infrastructure exports

// API exports
export * from './api'
export { apiClient, api } from './api'

// Configuration exports
export { config } from './config'

// Routing exports
export * from './routing'

// Hooks exports
export * from './hooks'

// Internationalization exports
export * from './i18n'
export { useI18n } from './i18n'

// Locale exports
export { locales, getLocaleData } from './i18n'
export type { SupportedLocale } from './i18n'

// Components exports
export * from './components'

// Re-export commonly used items for convenience
export { API_ENDPOINTS } from './api/endpoints'
