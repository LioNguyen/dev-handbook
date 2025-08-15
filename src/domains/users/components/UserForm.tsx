import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Input, Card } from '@/components/ui'
import type { User, CreateUserData, UpdateUserData } from '../types'

const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  avatar: z.string().url().optional().or(z.literal('')),
  role: z.enum(['user', 'admin']),
})

const updateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  avatar: z.string().url().optional().or(z.literal('')),
  role: z.enum(['user', 'admin']),
})

type CreateUserForm = z.infer<typeof createUserSchema>
type UpdateUserForm = z.infer<typeof updateUserSchema>

export interface UserFormProps {
  user?: User
  onSubmit: (data: CreateUserData | UpdateUserData) => void
  onCancel: () => void
  isLoading?: boolean
  className?: string
}

export const UserForm = ({
  user,
  onSubmit,
  onCancel,
  isLoading = false,
  className,
}: UserFormProps) => {
  const isEdit = !!user

  if (isEdit) {
    return (
      <UserEditForm
        user={user}
        onSubmit={onSubmit}
        onCancel={onCancel}
        isLoading={isLoading}
        className={className}
      />
    )
  }

  return (
    <UserCreateForm
      onSubmit={onSubmit}
      onCancel={onCancel}
      isLoading={isLoading}
      className={className}
    />
  )
}

interface UserCreateFormProps {
  onSubmit: (data: CreateUserData) => void
  onCancel: () => void
  isLoading?: boolean
  className?: string
}

const UserCreateForm = ({
  onSubmit,
  onCancel,
  isLoading = false,
  className,
}: UserCreateFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      email: '',
      avatar: '',
      role: 'user',
    },
  })

  return (
    <Card className={`p-6 ${className || ''}`}>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Create New User</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Fill in the details to create a new user
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name *
          </label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Enter user name"
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email *
          </label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="Enter email address"
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="avatar" className="block text-sm font-medium mb-1">
            Avatar URL
          </label>
          <Input
            id="avatar"
            {...register('avatar')}
            placeholder="Enter avatar image URL"
            className={errors.avatar ? 'border-red-500' : ''}
          />
          {errors.avatar && (
            <p className="mt-1 text-sm text-red-600">{errors.avatar.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium mb-1">
            Role *
          </label>
          <select
            id="role"
            {...register('role')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
              errors.role ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="user">User</option>
            <option value="admin">Administrator</option>
          </select>
          {errors.role && (
            <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={isLoading || !isValid}
            className="flex-1"
          >
            {isLoading ? 'Creating...' : 'Create User'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}

interface UserEditFormProps {
  user: User
  onSubmit: (data: UpdateUserData) => void
  onCancel: () => void
  isLoading?: boolean
  className?: string
}

const UserEditForm = ({
  user,
  onSubmit,
  onCancel,
  isLoading = false,
  className,
}: UserEditFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UpdateUserForm>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user.name,
      avatar: user.avatar || '',
      role: user.role,
    },
  })

  const handleFormSubmit = (data: UpdateUserForm) => {
    // Only send changed fields
    const updateData: UpdateUserData = {}
    if (data.name !== user.name) updateData.name = data.name
    if (data.avatar !== user.avatar)
      updateData.avatar = data.avatar || undefined
    if (data.role !== user.role) updateData.role = data.role

    onSubmit(updateData)
  }

  return (
    <Card className={`p-6 ${className || ''}`}>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Edit User</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Update user information below
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name *
          </label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Enter user name"
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="avatar" className="block text-sm font-medium mb-1">
            Avatar URL
          </label>
          <Input
            id="avatar"
            {...register('avatar')}
            placeholder="Enter avatar image URL"
            className={errors.avatar ? 'border-red-500' : ''}
          />
          {errors.avatar && (
            <p className="mt-1 text-sm text-red-600">{errors.avatar.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium mb-1">
            Role *
          </label>
          <select
            id="role"
            {...register('role')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
              errors.role ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="user">User</option>
            <option value="admin">Administrator</option>
          </select>
          {errors.role && (
            <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={isLoading || !isValid}
            className="flex-1"
          >
            {isLoading ? 'Updating...' : 'Update User'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
