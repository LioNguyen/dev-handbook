import { Mail, Shield, Clock } from 'lucide-react'
import type { User } from '../types'
import { Card } from '@/components/ui'
import { UserAvatar } from '@/components/molecules'
import { formatDate } from '@/shared/lib/formatters'

export interface UserCardProps {
  user: User
  onEdit?: (user: User) => void
  onDelete?: (user: User) => void
  className?: string
}

export const UserCard = ({
  user,
  onEdit,
  onDelete,
  className,
}: UserCardProps) => {
  const isAdmin = user.role === 'admin'

  return (
    <Card
      className={`p-6 hover:shadow-md transition-shadow ${className || ''}`}
    >
      <div className="flex items-start gap-4">
        <UserAvatar
          src={user.avatar}
          alt={user.name}
          fallback={user.name.charAt(0).toUpperCase()}
          size="lg"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-lg truncate">{user.name}</h3>
            {isAdmin && (
              <div className="flex items-center" title="Admin">
                <Shield className="h-4 w-4 text-orange-500" />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
            <Mail className="h-4 w-4" />
            <span className="text-sm truncate">{user.email}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
            <Clock className="h-4 w-4" />
            <span>Joined {formatDate(user.createdAt)}</span>
          </div>
        </div>

        {(onEdit || onDelete) && (
          <div className="flex gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(user)}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(user)}
                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
