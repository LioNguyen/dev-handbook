// Application configuration
export const config = {
  // API configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10),
  },

  // Authentication configuration
  auth: {
    tokenKey: 'auth_token',
    refreshTokenKey: 'refresh_token',
    tokenExpiry: 60 * 60 * 1000, // 1 hour in milliseconds
  },

  // Application metadata
  app: {
    name: import.meta.env.VITE_APP_NAME || 'React Boilerplate',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    description:
      'A production-ready React boilerplate with atomic design system',
    environment: import.meta.env.MODE || 'development',
  },

  // Feature flags
  features: {
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    enableDevtools: import.meta.env.MODE === 'development',
    enableMockApi: import.meta.env.VITE_MOCK_API === 'true',
    enableI18n: import.meta.env.VITE_ENABLE_I18N === 'true',
  },

  // Pagination defaults
  pagination: {
    defaultPage: 1,
    defaultLimit: 10,
    maxLimit: 100,
  },

  // File upload configuration
  upload: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    maxFiles: 10,
  },

  // Theme configuration
  theme: {
    defaultTheme: 'system' as const,
    storageKey: 'theme-preference',
  },

  // Internationalization
  i18n: {
    defaultLocale: 'en',
    supportedLocales: ['en', 'vi'],
    fallbackLocale: 'en',
  },

  // Development configuration
  dev: {
    enableLogger: import.meta.env.MODE === 'development',
    enableReduxDevtools: import.meta.env.MODE === 'development',
    showBoundaries: import.meta.env.MODE === 'development',
  },
} as const

// Environment helpers
export const isDevelopment = config.app.environment === 'development'
export const isProduction = config.app.environment === 'production'
export const isTest = config.app.environment === 'test'

// Type exports
export type Config = typeof config
export type Environment = typeof config.app.environment
export type SupportedLocale = (typeof config.i18n.supportedLocales)[number]
