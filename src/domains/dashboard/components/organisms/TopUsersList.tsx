import { Crown, Users, Shield, Activity } from 'lucide-react'
import { Card } from '@/components/atoms'
import { UserAvatar } from '@/components/molecules'
import type { TopUser } from '../../types'

export interface TopUsersListProps {
  users: TopUser[]
  isLoading?: boolean
  className?: string
}

export const TopUsersList = ({
  users,
  isLoading = false,
  className,
}: TopUsersListProps) => {
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
                <div className="h-4 bg-gray-200 rounded w-12"></div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    )
  }

  const formatLastActive = (timestamp: string): string => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return 'Yesterday'
    if (diffInDays < 7) return `${diffInDays} days ago`
    return date.toLocaleDateString()
  }

  return (
    <Card className={`p-6 ${className || ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Most Active Users
        </h3>
        <Crown className="h-5 w-5 text-yellow-500" />
      </div>

      {users.length === 0 ? (
        <div className="text-center py-8">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 dark:text-gray-400">
            No user data available
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {users.map((user, index) => (
            <div key={user.id} className="flex items-center gap-3">
              <div className="relative">
                <UserAvatar
                  src={user.avatar}
                  alt={user.name}
                  fallback={user.name.charAt(0).toUpperCase()}
                  size="md"
                />
                {index === 0 && (
                  <div className="absolute -top-1 -right-1 bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                    <span className="text-xs font-bold">1</span>
                  </div>
                )}
                {user.role === 'admin' && (
                  <div className="absolute -bottom-1 -right-1 bg-orange-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                    <Shield className="h-2 w-2" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900 dark:text-white truncate">
                    {user.name}
                  </span>
                  {user.role === 'admin' && (
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    <span>{user.sessionsCount} sessions</span>
                  </div>
                  <span>•</span>
                  <span>Active {formatLastActive(user.lastActive)}</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  #{index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {users.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View all users
          </button>
        </div>
      )}
    </Card>
  )
}
