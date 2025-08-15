import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button, Input, Card } from '@/components/ui'
import { useAuth } from '@/shared/hooks'
import {
  authSchemas,
  type LoginForm as LoginFormData,
} from '@/shared/lib/validations'
import { cn } from '@/lib/utils'

interface LoginFormProps {
  onSuccess?: () => void
  onSwitchToRegister?: () => void
  className?: string
}

export const LoginForm = ({
  onSuccess,
  onSwitchToRegister,
  className,
}: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading, error, clearError } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(authSchemas.login),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      clearError()
      await login(data.email, data.password)
      onSuccess?.()
    } catch (error) {
      if (error instanceof Error) {
        setError('root', { message: error.message })
      }
    }
  }

  return (
    <Card className={cn('w-full max-w-md p-6', className)}>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Welcome back
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email')}
              className={cn(errors.email && 'border-red-500')}
            />
            {errors.email && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                {...register('password')}
                className={cn('pr-10', errors.password && 'border-red-500')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                {...register('rememberMe')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm text-gray-700 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>

            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Forgot password?
            </button>
          </div>

          {(error || errors.root) && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-sm text-red-600 dark:text-red-400">
                {error || errors.root?.message}
              </p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || isSubmitting}
          >
            {(isLoading || isSubmitting) && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            )}
            {isLoading || isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>

        {/* Demo credentials */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">
            Demo Credentials:
          </p>
          <div className="space-y-1 text-xs text-gray-500 dark:text-gray-500">
            <p>
              <strong>Admin:</strong> admin@example.com / admin123
            </p>
            <p>
              <strong>User:</strong> user@example.com / user123
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
