import { Users, Shield, Activity, Clock } from 'lucide-react'
import { Card } from '@/components/ui'
import { useUserStats } from '../hooks'

export interface UserStatsCardProps {
  className?: string
}

export const UserStatsCard = ({ className }: UserStatsCardProps) => {
  const { data: stats, isLoading, error } = useUserStats()

  if (isLoading) {
    return (
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className || ''}`}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (error || !stats?.data) {
    return (
      <div className={className}>
        <Card className="p-6 text-center">
          <p className="text-red-600">Failed to load user statistics</p>
        </Card>
      </div>
    )
  }

  const statsData = stats.data

  const statItems = [
    {
      label: 'Total Users',
      value: statsData.total,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Administrators',
      value: statsData.admins,
      icon: Shield,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      label: 'Active Users',
      value: statsData.active,
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Recent Signups',
      value: statsData.recent,
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ]

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className || ''}`}
    >
      {statItems.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
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
