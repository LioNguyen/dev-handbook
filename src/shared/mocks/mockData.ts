// Mock user type
export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'moderator'
  avatar?: string
  createdAt: string
  updatedAt: string
  isActive: boolean
  lastLoginAt?: string
}

// Mock user data
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    isActive: true,
    lastLoginAt: '2024-01-20T10:30:00.000Z',
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-01-02T00:00:00.000Z',
    updatedAt: '2024-01-02T00:00:00.000Z',
    isActive: true,
    lastLoginAt: '2024-01-19T14:15:00.000Z',
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612d1bb?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-01-03T00:00:00.000Z',
    updatedAt: '2024-01-03T00:00:00.000Z',
    isActive: true,
    lastLoginAt: '2024-01-18T09:45:00.000Z',
  },
  {
    id: '4',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: 'user',
    createdAt: '2024-01-04T00:00:00.000Z',
    updatedAt: '2024-01-04T00:00:00.000Z',
    isActive: false,
  },
  {
    id: '5',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'user',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    createdAt: '2024-01-05T00:00:00.000Z',
    updatedAt: '2024-01-05T00:00:00.000Z',
    isActive: true,
    lastLoginAt: '2024-01-17T16:20:00.000Z',
  },
]

// Mock posts data
export interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  authorId: string
  author: {
    name: string
    avatar?: string
  }
  publishedAt: string
  createdAt: string
  updatedAt: string
  status: 'draft' | 'published' | 'archived'
  tags: string[]
  featured: boolean
}

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with React 19',
    content: 'React 19 introduces many exciting features...',
    excerpt:
      'Learn about the latest features in React 19 and how to get started.',
    authorId: '2',
    author: {
      name: 'John Doe',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    },
    publishedAt: '2024-01-10T00:00:00.000Z',
    createdAt: '2024-01-09T00:00:00.000Z',
    updatedAt: '2024-01-10T00:00:00.000Z',
    status: 'published',
    tags: ['react', 'javascript', 'frontend'],
    featured: true,
  },
  {
    id: '2',
    title: 'Building Modern UIs with Tailwind CSS',
    content: 'Tailwind CSS has revolutionized how we style web applications...',
    excerpt:
      'Discover how to create beautiful, responsive designs with Tailwind CSS.',
    authorId: '3',
    author: {
      name: 'Jane Smith',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612d1bb?w=100&h=100&fit=crop&crop=face',
    },
    publishedAt: '2024-01-08T00:00:00.000Z',
    createdAt: '2024-01-07T00:00:00.000Z',
    updatedAt: '2024-01-08T00:00:00.000Z',
    status: 'published',
    tags: ['css', 'tailwind', 'design'],
    featured: false,
  },
  {
    id: '3',
    title: 'State Management with Zustand',
    content: 'Zustand provides a simple and efficient way to manage state...',
    excerpt: 'Learn how to implement global state management using Zustand.',
    authorId: '4',
    author: {
      name: 'Bob Wilson',
    },
    publishedAt: '2024-01-06T00:00:00.000Z',
    createdAt: '2024-01-05T00:00:00.000Z',
    updatedAt: '2024-01-06T00:00:00.000Z',
    status: 'published',
    tags: ['react', 'state-management', 'zustand'],
    featured: false,
  },
  {
    id: '4',
    title: 'TypeScript Best Practices in 2024',
    content: 'TypeScript continues to evolve with new features and patterns...',
    excerpt:
      'Explore the latest TypeScript best practices for modern development.',
    authorId: '5',
    author: {
      name: 'Alice Johnson',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    },
    publishedAt: '2024-01-04T00:00:00.000Z',
    createdAt: '2024-01-03T00:00:00.000Z',
    updatedAt: '2024-01-04T00:00:00.000Z',
    status: 'published',
    tags: ['typescript', 'javascript', 'best-practices'],
    featured: true,
  },
  {
    id: '5',
    title: 'Draft: Upcoming Features',
    content: 'This is a draft post about upcoming features...',
    excerpt: 'A preview of exciting features coming soon.',
    authorId: '1',
    author: {
      name: 'Admin User',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    },
    publishedAt: '',
    createdAt: '2024-01-11T00:00:00.000Z',
    updatedAt: '2024-01-11T00:00:00.000Z',
    status: 'draft',
    tags: ['news', 'updates'],
    featured: false,
  },
]

// Mock dashboard statistics
export interface DashboardStats {
  users: {
    total: number
    active: number
    new: number
    growth: number
  }
  posts: {
    total: number
    published: number
    draft: number
    growth: number
  }
  engagement: {
    views: number
    comments: number
    likes: number
    growth: number
  }
  revenue: {
    total: number
    monthly: number
    growth: number
  }
}

export const mockDashboardStats: DashboardStats = {
  users: {
    total: 1250,
    active: 892,
    new: 45,
    growth: 12.5,
  },
  posts: {
    total: 89,
    published: 76,
    draft: 13,
    growth: 8.3,
  },
  engagement: {
    views: 15420,
    comments: 342,
    likes: 1205,
    growth: 15.7,
  },
  revenue: {
    total: 24580,
    monthly: 4200,
    growth: 18.2,
  },
}

// Mock chart data
export interface ChartData {
  label: string
  value: number
  date?: string
}

export const mockChartData = {
  userGrowth: [
    { label: 'Jan', value: 1000, date: '2024-01' },
    { label: 'Feb', value: 1100, date: '2024-02' },
    { label: 'Mar', value: 1180, date: '2024-03' },
    { label: 'Apr', value: 1250, date: '2024-04' },
  ],

  postsByCategory: [
    { label: 'Technology', value: 35 },
    { label: 'Design', value: 25 },
    { label: 'Business', value: 20 },
    { label: 'Lifestyle', value: 15 },
    { label: 'Other', value: 5 },
  ],

  monthlyRevenue: [
    { label: 'Jan', value: 3200, date: '2024-01' },
    { label: 'Feb', value: 3800, date: '2024-02' },
    { label: 'Mar', value: 4100, date: '2024-03' },
    { label: 'Apr', value: 4200, date: '2024-04' },
  ],

  trafficSources: [
    { label: 'Organic Search', value: 45 },
    { label: 'Direct', value: 25 },
    { label: 'Social Media', value: 15 },
    { label: 'Referral', value: 10 },
    { label: 'Email', value: 5 },
  ],
}

// Mock notifications
export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: string
  actionUrl?: string
}

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New User Registration',
    message: 'Alice Johnson has joined the platform',
    type: 'info',
    read: false,
    createdAt: '2024-01-11T10:30:00.000Z',
    actionUrl: '/users/5',
  },
  {
    id: '2',
    title: 'Post Published',
    message: 'Your post "TypeScript Best Practices" has been published',
    type: 'success',
    read: true,
    createdAt: '2024-01-11T09:15:00.000Z',
    actionUrl: '/posts/4',
  },
  {
    id: '3',
    title: 'System Maintenance',
    message: 'Scheduled maintenance tonight from 2-4 AM EST',
    type: 'warning',
    read: false,
    createdAt: '2024-01-11T08:00:00.000Z',
  },
  {
    id: '4',
    title: 'Payment Failed',
    message: 'Monthly subscription payment could not be processed',
    type: 'error',
    read: false,
    createdAt: '2024-01-10T16:45:00.000Z',
    actionUrl: '/billing',
  },
]

// Mock API helper functions
export const mockApi = {
  // Simulate API delay
  delay: (ms: number = 1000) =>
    new Promise((resolve) => setTimeout(resolve, ms)),

  // Paginate array
  paginate: <T>(items: T[], page: number = 1, limit: number = 10) => {
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedItems = items.slice(start, end)

    return {
      data: paginatedItems,
      total: items.length,
      page,
      limit,
      totalPages: Math.ceil(items.length / limit),
      hasNextPage: end < items.length,
      hasPrevPage: page > 1,
    }
  },

  // Filter array by search term
  search: <T extends Record<string, unknown>>(
    items: T[],
    searchTerm: string,
    fields: (keyof T)[]
  ) => {
    if (!searchTerm) return items

    const lowerSearch = searchTerm.toLowerCase()
    return items.filter((item) =>
      fields.some((field) =>
        String(item[field]).toLowerCase().includes(lowerSearch)
      )
    )
  },

  // Sort array
  sort: <T>(items: T[], field: keyof T, order: 'asc' | 'desc' = 'desc') => {
    return [...items].sort((a, b) => {
      const aVal = a[field]
      const bVal = b[field]

      if (aVal < bVal) return order === 'asc' ? -1 : 1
      if (aVal > bVal) return order === 'asc' ? 1 : -1
      return 0
    })
  },

  // Generate random ID
  generateId: () => Math.random().toString(36).substring(2),

  // Get current timestamp
  timestamp: () => new Date().toISOString(),
}

// Mock localStorage for SSR environments
export const mockStorage = {
  getItem: (key: string) => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(key)
  },

  setItem: (key: string, value: string) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, value)
  },

  removeItem: (key: string) => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
  },

  clear: () => {
    if (typeof window === 'undefined') return
    localStorage.clear()
  },
}

export default {
  users: mockUsers,
  posts: mockPosts,
  dashboardStats: mockDashboardStats,
  chartData: mockChartData,
  notifications: mockNotifications,
  api: mockApi,
  storage: mockStorage,
}
