export const API_PATHS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
  },
  USERS: {
    BASE: "/users",
    DETAIL: "/users/:id",
    PROFILE: "/users/profile",
  },
  // Add more API endpoints
};

// Helper to create parameterized API paths
export function createApiPath(
  path: string,
  params?: Record<string, string | number>,
  queryParams?: Record<string, string | number | boolean>,
): string {
  // Replace path parameters
  let url = params
    ? Object.entries(params).reduce((p, [key, value]) => p.replace(`:${key}`, String(value)), path)
    : path;

  // Add query parameters
  if (queryParams) {
    const query = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined) query.append(key, String(value));
    });
    const queryString = query.toString();
    if (queryString) url += `?${queryString}`;
  }

  return url;
}

// Usage: createApiPath(API_PATHS.USERS.DETAIL, { id: '123' }, { include: 'posts' })
// => '/users/123?include=posts'
