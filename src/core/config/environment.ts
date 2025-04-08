// config/environment.ts

export const ENV = {
  // Environment type
  NODE_ENV: import.meta.env.NODE_ENV || "development",

  // API endpoints
  BASE_API_URL: import.meta.env.VITE_BASE_API_URL || "http://localhost:3000/api",
};
