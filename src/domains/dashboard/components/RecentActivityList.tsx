import { User, UserPlus, Settings, LogIn, LogOut, Clock } from 'lucide-react'
import { Card } from '@/components/ui'
import type { RecentActivity } from '../types'

// Simple time formatting function
const formatTimeAgo = (date: string): string => {
  const now = new Date()
  const past = new Date(date)
  const diffInMs = now.getTime() - past.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInMinutes < 1) return 'just now'
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  if (diffInHours < 24) return `${diffInHours}h ago`
  if (diffInDays < 7) return `${diffInDays}d ago`
  return past.toLocaleDateString()
}

export interface RecentActivityListProps {
  activities: RecentActivity[]
  isLoading?: boolean
  className?: string
}

export const RecentActivityList = ({
  activities,
  isLoading = false,
  className,
}: RecentActivityListProps) => {
  if (isLoading) {
    return (
      <Card className={`p-6 ${className || ''}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    )
  }

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'user_created':
        return UserPlus
      case 'user_updated':
        return User
      case 'login':
        return LogIn
      case 'logout':
        return LogOut
      case 'settings_change':
        return Settings
      default:
        return User
    }
  }

  const getActivityColor = (type: RecentActivity['type']) => {
    switch (type) {
      case 'user_created':
        return 'text-green-600 bg-green-100'
      case 'user_updated':
        return 'text-blue-600 bg-blue-100'
      case 'login':
        return 'text-emerald-600 bg-emerald-100'
      case 'logout':
        return 'text-gray-600 bg-gray-100'
      case 'settings_change':
        return 'text-orange-600 bg-orange-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <Card className={`p-6 ${className || ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h3>
        <Clock className="h-5 w-5 text-gray-400" />
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No recent activity</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.type)
            const colorClasses = getActivityColor(activity.type)
            const timeAgo = formatTimeAgo(activity.timestamp)

            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${colorClasses}`}>
                  <Icon className="h-4 w-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900 dark:text-white truncate">
                      {activity.userName}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.description.toLowerCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                    {activity.userEmail}
                  </p>
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {timeAgo}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {activities.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View all activity
          </button>
        </div>
      )}
    </Card>
  )
}
