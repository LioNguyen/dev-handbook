export const APP_SETTINGS = {
  // Application information
  APP_NAME: "My React App",
  APP_VERSION: "1.0.0",

  // Default configurations
  DEFAULT_LANGUAGE: "en",

  // App constants
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [5, 10, 25, 50],
  },

  // Timeout settings
  TIMEOUTS: {
    API_REQUEST: 30000, // 30 seconds
    SESSION: 1800000, // 30 minutes
  },

  // Local storage keys
  STORAGE_KEYS: {
    AUTH_TOKEN: "auth_token",
    USER_PREFERENCES: "user_preferences",
  },
};
