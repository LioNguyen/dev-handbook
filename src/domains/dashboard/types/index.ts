export interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalRevenue: number
  monthlyGrowth: number
}

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string[]
    borderColor?: string
    fill?: boolean
  }[]
}

export interface RecentActivity {
  id: string
  type: 'user_created' | 'user_updated' | 'user_deleted' | 'login' | 'logout'
  userId: string
  userEmail: string
  description: string
  timestamp: string
}

export interface DashboardData {
  stats: DashboardStats
  userGrowthChart: ChartData
  revenueChart: ChartData
  recentActivities: RecentActivity[]
}

export interface TimeRange {
  start: string
  end: string
  label: string
}

export const TIME_RANGES: TimeRange[] = [
  { start: '7d', end: 'now', label: 'Last 7 days' },
  { start: '30d', end: 'now', label: 'Last 30 days' },
  { start: '90d', end: 'now', label: 'Last 3 months' },
  { start: '1y', end: 'now', label: 'Last year' },
]
