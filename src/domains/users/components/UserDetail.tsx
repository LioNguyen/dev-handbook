import { Mail, Calendar, Shield, Edit, Trash2, ArrowLeft } from 'lucide-react'
import { Button, Card } from '@/components/ui'
import { UserAvatar } from '@/components/molecules'
import { useUser } from '../hooks'
import { formatDate } from '@/shared/lib/formatters'
import type { User } from '../types'

export interface UserDetailProps {
  userId: string
  onEdit?: (user: User) => void
  onDelete?: (user: User) => void
  onBack?: () => void
  className?: string
}

export const UserDetail = ({
  userId,
  onEdit,
  onDelete,
  onBack,
  className,
}: UserDetailProps) => {
  const { data: response, isLoading, error } = useUser(userId)

  if (isLoading) {
    return (
      <div className={`space-y-6 ${className || ''}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-32"></div>
                <div className="h-4 bg-gray-200 rounded w-48"></div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (error || !response?.data) {
    return (
      <div className={`text-center py-12 ${className || ''}`}>
        <p className="text-red-600 mb-4">Failed to load user details</p>
        <div className="flex gap-2 justify-center">
          {onBack && (
            <Button variant="outline" onClick={onBack}>
              Go Back
            </Button>
          )}
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    )
  }

  const user = response.data
  const isAdmin = user.role === 'admin'

  const handleDelete = () => {
    if (
      onDelete &&
      window.confirm(`Are you sure you want to delete ${user.name}?`)
    ) {
      onDelete(user)
    }
  }

  return (
    <div className={`space-y-6 ${className || ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <Button variant="outline" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              User Details
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              View and manage user information
            </p>
          </div>
        </div>

        {(onEdit || onDelete) && (
          <div className="flex gap-2">
            {onEdit && (
              <Button
                onClick={() => onEdit(user)}
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit User
              </Button>
            )}
            {onDelete && (
              <Button
                variant="outline"
                onClick={handleDelete}
                className="flex items-center gap-2 text-red-600 border-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                Delete User
              </Button>
            )}
          </div>
        )}
      </div>

      {/* User Information */}
      <Card className="p-6">
        <div className="flex items-start gap-6">
          <UserAvatar
            src={user.avatar}
            alt={user.name}
            fallback={user.name.charAt(0).toUpperCase()}
            size="xl"
          />

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {user.name}
              </h2>
              {isAdmin && (
                <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                  <Shield className="h-3 w-3" />
                  Admin
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Calendar className="h-4 w-4" />
                <span>Joined {formatDate(user.createdAt)}</span>
              </div>

              {user.updatedAt !== user.createdAt && (
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>Last updated {formatDate(user.updatedAt)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Account Information</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                User ID
              </label>
              <p className="text-gray-900 dark:text-white font-mono text-sm">
                {user.id}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Role
              </label>
              <p className="text-gray-900 dark:text-white capitalize">
                {user.role}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Status
              </label>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-900 dark:text-white">Active</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Activity</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Created
              </label>
              <p className="text-gray-900 dark:text-white">
                {new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Last Updated
              </label>
              <p className="text-gray-900 dark:text-white">
                {new Date(user.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Last Login
              </label>
              <p className="text-gray-500 dark:text-gray-400 italic">
                Not available
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
