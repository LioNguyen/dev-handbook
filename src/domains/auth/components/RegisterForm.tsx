import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button, Input, Card } from '@/components/ui'
import { useAuth } from '@/shared/hooks'
import {
  authSchemas,
  type RegisterForm as RegisterFormData,
} from '@/shared/lib/validations'
import { cn } from '@/lib/utils'

interface RegisterFormProps {
  onSuccess?: () => void
  onSwitchToLogin?: () => void
  className?: string
}

export const RegisterForm = ({
  onSuccess,
  onSwitchToLogin,
  className,
}: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { register: registerUser, isLoading, error, clearError } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(authSchemas.register),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  })

  const password = watch('password')

  const onSubmit = async (data: RegisterFormData) => {
    try {
      clearError()
      await registerUser(data.email, data.password, data.name)
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
            Create your account
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Sign up to get started with your dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Full name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              {...register('name')}
              className={cn(errors.name && 'border-red-500')}
            />
            {errors.name && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>

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
                placeholder="Create a password"
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
            {password && (
              <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <p>Password requirements:</p>
                <ul className="ml-4 list-disc space-y-0.5">
                  <li className={password.length >= 8 ? 'text-green-600' : ''}>
                    At least 8 characters
                  </li>
                  <li
                    className={/[A-Z]/.test(password) ? 'text-green-600' : ''}
                  >
                    One uppercase letter
                  </li>
                  <li
                    className={/[a-z]/.test(password) ? 'text-green-600' : ''}
                  >
                    One lowercase letter
                  </li>
                  <li className={/\d/.test(password) ? 'text-green-600' : ''}>
                    One number
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirm password
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                {...register('confirmPassword')}
                className={cn(
                  'pr-10',
                  errors.confirmPassword && 'border-red-500'
                )}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex items-start">
            <input
              id="terms"
              type="checkbox"
              {...register('terms')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
            />
            <label
              htmlFor="terms"
              className="ml-2 text-sm text-gray-700 dark:text-gray-300"
            >
              I agree to the{' '}
              <button
                type="button"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Terms of Service
              </button>{' '}
              and{' '}
              <button
                type="button"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Privacy Policy
              </button>
            </label>
          </div>
          {errors.terms && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.terms.message}
            </p>
          )}

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
            {isLoading || isSubmitting
              ? 'Creating account...'
              : 'Create account'}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </Card>
  )
}
