// Core application infrastructure exports

// API exports
export * from './api'
export { apiClient, api } from './api'

// Configuration exports
export { config } from './config'

// Internationalization exports
export * from './i18n'
export { useI18n } from './i18n'

// Locale exports
export { locales, getLocaleData } from './locale'
export type { SupportedLocale } from './locale'

// Re-export commonly used items for convenience
export { API_ENDPOINTS } from './api/endpoints'
