export interface DashboardStats {
  totalUsers: number
  activeUsers: number
  newUsersThisMonth: number
  adminUsers: number
  userGrowthRate: number
  totalSessions: number
  averageSessionTime: number
  bounceRate: number
}

export interface ChartDataPoint {
  label: string
  value: number
  date?: string
  category?: string
}

export interface ChartDataset {
  label: string
  data: number[]
  backgroundColor?: string | string[]
  borderColor?: string
  borderWidth?: number
  fill?: boolean
  tension?: number
}

export interface ChartData {
  labels: string[]
  datasets: ChartDataset[]
}

export interface RecentActivity {
  id: string
  type:
    | 'user_created'
    | 'user_updated'
    | 'user_deleted'
    | 'login'
    | 'logout'
    | 'data_export'
    | 'settings_change'
  userId: string
  userName: string
  userEmail: string
  description: string
  timestamp: string
  metadata?: Record<string, unknown>
}

export interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical'
  uptime: number
  responseTime: number
  errorRate: number
  lastCheck: string
}

export interface TopUser {
  id: string
  name: string
  email: string
  avatar?: string
  sessionsCount: number
  lastActive: string
  role: 'admin' | 'user' | 'moderator'
}

export interface DashboardData {
  stats: DashboardStats
  userGrowthChart: ChartData
  usersByRoleChart: ChartData
  activityChart: ChartData
  recentActivities: RecentActivity[]
  systemHealth: SystemHealth
  topUsers: TopUser[]
}

export interface TimeRange {
  start: string
  end: string
  label: string
  value: string
}

export const TIME_RANGES: TimeRange[] = [
  { start: '7d', end: 'now', label: 'Last 7 days', value: '7d' },
  { start: '30d', end: 'now', label: 'Last 30 days', value: '30d' },
  { start: '90d', end: 'now', label: 'Last 3 months', value: '90d' },
  { start: '1y', end: 'now', label: 'Last year', value: '1y' },
]

export interface DashboardFilters {
  timeRange: string
  userRole?: 'all' | 'admin' | 'user'
  activityType?: 'all' | 'user_actions' | 'system_events'
}
