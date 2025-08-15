import {
  Users,
  UserCheck,
  UserPlus,
  Shield,
  TrendingUp,
  Clock,
  Activity,
  AlertCircle,
} from 'lucide-react'
import { Card } from '@/components/ui'
import type { DashboardStats } from '../types'

export interface StatsCardsProps {
  stats: DashboardStats
  isLoading?: boolean
  className?: string
}

export const StatsCards = ({
  stats,
  isLoading = false,
  className,
}: StatsCardsProps) => {
  if (isLoading) {
    return (
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className || ''}`}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  const statsData = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: null,
    },
    {
      title: 'Active Users',
      value: stats.activeUsers.toLocaleString(),
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: `${((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}% of total`,
    },
    {
      title: 'New This Month',
      value: stats.newUsersThisMonth.toLocaleString(),
      icon: UserPlus,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: `${stats.userGrowthRate}% growth`,
    },
    {
      title: 'Administrators',
      value: stats.adminUsers.toLocaleString(),
      icon: Shield,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: `${((stats.adminUsers / stats.totalUsers) * 100).toFixed(1)}% of total`,
    },
    {
      title: 'Total Sessions',
      value: stats.totalSessions.toLocaleString(),
      icon: Activity,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      change: null,
    },
    {
      title: 'Avg. Session Time',
      value: formatTime(stats.averageSessionTime),
      icon: Clock,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100',
      change: null,
    },
    {
      title: 'User Growth Rate',
      value: `${stats.userGrowthRate}%`,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      change: 'vs last month',
    },
    {
      title: 'Bounce Rate',
      value: `${stats.bounceRate}%`,
      icon: AlertCircle,
      color: stats.bounceRate > 50 ? 'text-red-600' : 'text-yellow-600',
      bgColor: stats.bounceRate > 50 ? 'bg-red-100' : 'bg-yellow-100',
      change: 'exit without interaction',
    },
  ]

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className || ''}`}
    >
      {statsData.map((stat) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.title}
            className="p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </p>
                {stat.change && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.change}
                  </p>
                )}
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
