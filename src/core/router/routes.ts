export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  USERS: {
    LIST: "/users",
    DETAIL: "/users/:id",
    CREATE: "/users/create",
    EDIT: "/users/:id/edit",
  },
  // Add more routes here
};

// Type-safe route generator
export function createRoute(route: string, params?: Record<string, string | number>): string {
  if (!params) return route;

  return Object.entries(params).reduce((path, [key, value]) => path.replace(`:${key}`, String(value)), route);
}

// Usage: createRoute(ROUTES.USERS.DETAIL, { id: '123' }) => '/users/123'
