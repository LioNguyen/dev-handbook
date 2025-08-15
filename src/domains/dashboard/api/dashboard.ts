import type {
  DashboardData,
  DashboardStats,
  ChartData,
  RecentActivity,
  SystemHealth,
  TopUser,
  DashboardFilters,
} from '../types'
import type { ApiResponse } from '@/shared/types'
import { mockUsers } from '@/shared/mocks/mockData'

export interface DashboardApiInterface {
  getDashboardData: (
    filters?: DashboardFilters
  ) => Promise<ApiResponse<DashboardData>>
  getDashboardStats: () => Promise<ApiResponse<DashboardStats>>
  getRecentActivities: (
    limit?: number
  ) => Promise<ApiResponse<RecentActivity[]>>
  getSystemHealth: () => Promise<ApiResponse<SystemHealth>>
  getTopUsers: (limit?: number) => Promise<ApiResponse<TopUser[]>>
}

// Helper function to generate random data
const generateRandomData = (
  length: number,
  min: number,
  max: number
): number[] => {
  return Array.from(
    { length },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  )
}

// Helper function to get date labels
const getDateLabels = (days: number): string[] => {
  const labels: string[] = []
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    labels.push(
      date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    )
  }

  return labels
}

// Mock data generators
const generateMockStats = (): DashboardStats => {
  const baseUsers = mockUsers.length

  return {
    totalUsers: baseUsers,
    activeUsers: Math.floor(baseUsers * 0.8),
    newUsersThisMonth: Math.floor(Math.random() * 20) + 5,
    adminUsers: mockUsers.filter((u) => u.role === 'admin').length,
    userGrowthRate: Math.floor(Math.random() * 30) + 5, // 5-35%
    totalSessions: Math.floor(Math.random() * 1000) + 500,
    averageSessionTime: Math.floor(Math.random() * 300) + 120, // 2-7 minutes in seconds
    bounceRate: Math.floor(Math.random() * 40) + 20, // 20-60%
  }
}

const generateUserGrowthChart = (timeRange: string): ChartData => {
  const days =
    timeRange === '7d'
      ? 7
      : timeRange === '30d'
        ? 30
        : timeRange === '90d'
          ? 90
          : 365
  const labels = getDateLabels(days)

  return {
    labels,
    datasets: [
      {
        label: 'New Users',
        data: generateRandomData(days, 1, 8),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Active Users',
        data: generateRandomData(days, 10, 25),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  }
}

const generateUsersByRoleChart = (): ChartData => {
  const adminCount = mockUsers.filter((u) => u.role === 'admin').length
  const userCount = mockUsers.filter((u) => u.role === 'user').length

  return {
    labels: ['Administrators', 'Users'],
    datasets: [
      {
        label: 'Users by Role',
        data: [adminCount, userCount],
        backgroundColor: ['rgba(249, 115, 22, 0.8)', 'rgba(59, 130, 246, 0.8)'],
        borderColor: 'rgb(249, 115, 22)',
        borderWidth: 2,
      },
    ],
  }
}

const generateActivityChart = (timeRange: string): ChartData => {
  const days =
    timeRange === '7d'
      ? 7
      : timeRange === '30d'
        ? 30
        : timeRange === '90d'
          ? 90
          : 365
  const labels = getDateLabels(days)

  return {
    labels,
    datasets: [
      {
        label: 'Logins',
        data: generateRandomData(days, 5, 20),
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: false,
        tension: 0.3,
      },
      {
        label: 'User Actions',
        data: generateRandomData(days, 2, 15),
        borderColor: 'rgb(236, 72, 153)',
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        fill: false,
        tension: 0.3,
      },
    ],
  }
}

const generateRecentActivities = (limit: number = 10): RecentActivity[] => {
  const activities: RecentActivity[] = []
  const activityTypes = [
    'user_created',
    'user_updated',
    'login',
    'logout',
    'settings_change',
  ] as const

  for (let i = 0; i < limit; i++) {
    const user = mockUsers[Math.floor(Math.random() * mockUsers.length)]
    const type = activityTypes[Math.floor(Math.random() * activityTypes.length)]
    const date = new Date()
    date.setHours(date.getHours() - Math.floor(Math.random() * 24))

    const descriptions: Record<typeof type, string> = {
      user_created: `New user account created`,
      user_updated: `Profile information updated`,
      login: `Signed in to the application`,
      logout: `Signed out of the application`,
      settings_change: `Account settings modified`,
    }

    activities.push({
      id: `activity-${i + 1}`,
      type,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      description: descriptions[type],
      timestamp: date.toISOString(),
      metadata: {
        userAgent: 'Mozilla/5.0...',
        ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
      },
    })
  }

  return activities.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
}

const generateSystemHealth = (): SystemHealth => {
  const weights = [0.8, 0.15, 0.05] // 80% healthy, 15% warning, 5% critical

  const random = Math.random()
  let status: SystemHealth['status'] = 'healthy'

  if (random < weights[2]) {
    status = 'critical'
  } else if (random < weights[1] + weights[2]) {
    status = 'warning'
  }

  return {
    status,
    uptime: Math.floor(Math.random() * 100) + 95, // 95-99.9%
    responseTime: Math.floor(Math.random() * 200) + 50, // 50-250ms
    errorRate: parseFloat((Math.random() * 2).toFixed(2)), // 0-2%
    lastCheck: new Date().toISOString(),
  }
}

const generateTopUsers = (limit: number = 5): TopUser[] => {
  return mockUsers
    .slice(0, limit)
    .map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      sessionsCount: Math.floor(Math.random() * 50) + 10,
      lastActive: new Date(
        Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
      role: user.role,
    }))
    .sort((a, b) => b.sessionsCount - a.sessionsCount)
}

// Mock API implementation
export const dashboardApi: DashboardApiInterface = {
  getDashboardData: async (filters = { timeRange: '30d' }) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const stats = generateMockStats()
    const userGrowthChart = generateUserGrowthChart(filters.timeRange)
    const usersByRoleChart = generateUsersByRoleChart()
    const activityChart = generateActivityChart(filters.timeRange)
    const recentActivities = generateRecentActivities(10)
    const systemHealth = generateSystemHealth()
    const topUsers = generateTopUsers(5)

    return {
      data: {
        stats,
        userGrowthChart,
        usersByRoleChart,
        activityChart,
        recentActivities,
        systemHealth,
        topUsers,
      },
      success: true,
      message: 'Dashboard data retrieved successfully',
    }
  },

  getDashboardStats: async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const stats = generateMockStats()

    return {
      data: stats,
      success: true,
      message: 'Dashboard stats retrieved successfully',
    }
  },

  getRecentActivities: async (limit = 10) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400))

    const activities = generateRecentActivities(limit)

    return {
      data: activities,
      success: true,
      message: 'Recent activities retrieved successfully',
    }
  },

  getSystemHealth: async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    const health = generateSystemHealth()

    return {
      data: health,
      success: true,
      message: 'System health retrieved successfully',
    }
  },

  getTopUsers: async (limit = 5) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 350))

    const topUsers = generateTopUsers(limit)

    return {
      data: topUsers,
      success: true,
      message: 'Top users retrieved successfully',
    }
  },
}
