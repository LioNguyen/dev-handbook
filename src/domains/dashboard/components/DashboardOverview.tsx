import { useAuth } from '@/shared/hooks'
import {
  useDashboardStats,
  useRecentActivities,
  useSystemHealth,
  useTopUsers,
} from '../hooks'
import {
  StatsCards,
  ChartCard,
  RecentActivityList,
  SystemHealthCard,
  TopUsersList,
} from './'

export interface DashboardOverviewProps {
  className?: string
}

export const DashboardOverview = ({ className }: DashboardOverviewProps) => {
  const { user } = useAuth()

  // Fetch dashboard data using our custom hooks
  const { data: stats, isLoading: statsLoading } = useDashboardStats()
  const { data: activities, isLoading: activitiesLoading } =
    useRecentActivities()
  const { data: systemHealth, isLoading: healthLoading } = useSystemHealth()
  const { data: topUsers, isLoading: usersLoading } = useTopUsers()

  // Mock chart data - in a real app, this would come from an API
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Users',
        data: [120, 190, 300, 500, 200, 300],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
      },
      {
        label: 'Revenue',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
      },
    ],
  }

  const userGrowthData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'New Users',
        data: [45, 52, 38, 67],
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
      },
    ],
  }

  const revenueData = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D'],
    datasets: [
      {
        label: 'Revenue Distribution',
        data: [300, 150, 100, 80],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
      },
    ],
  }

  return (
    <div className={`space-y-6 ${className || ''}`}>
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Welcome back, {user?.name || 'User'}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Stats Overview */}
      {stats?.data && (
        <StatsCards
          stats={stats.data}
          isLoading={statsLoading}
          className="mb-6"
        />
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="User Growth & Revenue"
          description="Monthly trends for users and revenue"
          data={chartData}
          type="line"
          height={300}
          isLoading={statsLoading}
        />

        <ChartCard
          title="Weekly User Acquisition"
          description="New user registrations by week"
          data={userGrowthData}
          type="area"
          height={300}
          isLoading={statsLoading}
        />
      </div>

      {/* Revenue Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard
            title="Revenue Distribution"
            description="Revenue breakdown by product category"
            data={revenueData}
            type="doughnut"
            height={350}
            isLoading={statsLoading}
          />
        </div>

        {/* System Health */}
        <div>
          {systemHealth?.data && (
            <SystemHealthCard
              health={systemHealth.data}
              isLoading={healthLoading}
            />
          )}
        </div>
      </div>

      {/* Activity and Users Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div>
          {activities?.data && (
            <RecentActivityList
              activities={activities.data}
              isLoading={activitiesLoading}
            />
          )}
        </div>

        {/* Top Users */}
        <div>
          {topUsers?.data && (
            <TopUsersList users={topUsers.data} isLoading={usersLoading} />
          )}
        </div>
      </div>

      {/* Additional Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Performance Metrics"
          description="System performance over time"
          data={{
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [
              {
                label: 'CPU Usage (%)',
                data: [25, 20, 45, 70, 55, 30],
                borderColor: 'rgb(239, 68, 68)',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
              },
              {
                label: 'Memory Usage (%)',
                data: [40, 35, 50, 60, 65, 45],
                borderColor: 'rgb(251, 191, 36)',
                backgroundColor: 'rgba(251, 191, 36, 0.1)',
              },
            ],
          }}
          type="line"
          height={300}
          isLoading={healthLoading}
        />

        <ChartCard
          title="Traffic Sources"
          description="User acquisition by traffic source"
          data={{
            labels: [
              'Direct',
              'Social Media',
              'Search Engine',
              'Referral',
              'Email',
            ],
            datasets: [
              {
                label: 'Traffic Sources',
                data: [30, 25, 20, 15, 10],
                backgroundColor: [
                  'rgba(59, 130, 246, 0.8)',
                  'rgba(34, 197, 94, 0.8)',
                  'rgba(251, 191, 36, 0.8)',
                  'rgba(168, 85, 247, 0.8)',
                  'rgba(239, 68, 68, 0.8)',
                ],
              },
            ],
          }}
          type="bar"
          height={300}
          isLoading={statsLoading}
        />
      </div>
    </div>
  )
}
