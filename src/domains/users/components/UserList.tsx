import { useState } from 'react'
import { Plus, Grid, List } from 'lucide-react'
import { Button } from '@/components/ui'
import { SearchInput } from '@/components/molecules'
import { useUsers, useUserMutations } from '../hooks'
import { UserCard } from './UserCard'
import type { User, UserFilters } from '../types'

export interface UserListProps {
  onCreateUser?: () => void
  onEditUser?: (user: User) => void
  className?: string
}

export const UserList = ({
  onCreateUser,
  onEditUser,
  className,
}: UserListProps) => {
  const [filters, setFilters] = useState<UserFilters>({
    search: '',
    role: 'all',
    sortBy: 'name',
    sortOrder: 'asc',
  })
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [page, setPage] = useState(1)

  const { data, isLoading, error } = useUsers({
    ...filters,
    page,
    limit: 12,
  })

  const { deleteUser } = useUserMutations()

  const handleDeleteUser = async (user: User) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        await deleteUser.mutateAsync(user.id)
      } catch (error) {
        console.error('Failed to delete user:', error)
      }
    }
  }

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }))
    setPage(1) // Reset to first page when filtering
  }

  const handleRoleChange = (role: string) => {
    setFilters((prev) => ({ ...prev, role: role as UserFilters['role'] }))
    setPage(1)
  }

  const handleSortChange = (sortBy: string) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: sortBy as UserFilters['sortBy'],
      sortOrder:
        prev.sortBy === sortBy && prev.sortOrder === 'asc' ? 'desc' : 'asc',
    }))
    setPage(1)
  }

  if (error) {
    return (
      <div className={`text-center py-12 ${className || ''}`}>
        <p className="text-red-600 mb-4">Failed to load users</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    )
  }

  const users = data?.data?.users || []
  const pagination = data?.data?.pagination

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Users
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage user accounts and permissions
          </p>
        </div>
        {onCreateUser && (
          <Button onClick={onCreateUser} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchInput
              value={filters.search}
              onSearch={handleSearchChange}
              placeholder="Search users by name or email..."
              className="w-full"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={filters.role}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Roles</option>
              <option value="user">Users</option>
              <option value="admin">Admins</option>
            </select>

            <select
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="name">Sort by Name</option>
              <option value="email">Sort by Email</option>
              <option value="createdAt">Sort by Date Created</option>
              <option value="updatedAt">Sort by Last Updated</option>
            </select>

            <div className="flex border border-gray-300 dark:border-gray-600 rounded-md">
              <button
                onClick={() => setView('grid')}
                className={`p-2 ${
                  view === 'grid'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 ${
                  view === 'list'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div
          className={
            view === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
              : 'space-y-4'
          }
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-32"
            ></div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && users.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {filters.search || filters.role !== 'all'
              ? 'No users found matching your criteria'
              : 'No users found'}
          </p>
          {onCreateUser && (
            <Button onClick={onCreateUser}>Create your first user</Button>
          )}
        </div>
      )}

      {/* User List */}
      {!isLoading && users.length > 0 && (
        <>
          <div
            className={
              view === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                : 'space-y-4'
            }
          >
            {users.map((user: User) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={onEditUser}
                onDelete={handleDeleteUser}
                className={view === 'list' ? 'w-full' : ''}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
                {Math.min(pagination.page * pagination.limit, pagination.total)}{' '}
                of {pagination.total} users
              </p>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  disabled={pagination.page <= 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Button>

                <span className="flex items-center px-3 py-2 text-sm">
                  Page {pagination.page} of {pagination.totalPages}
                </span>

                <Button
                  variant="outline"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
