import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button, Card } from '@/components/ui'
import { useAuth } from '@/shared/hooks'
import { useFormValidation } from '@/shared/hooks/useValidatedForm'
import { ValidatedInput } from '@/shared/components/ValidatedInput'
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
  const { login, clearError } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<LoginFormData>({
    resolver: zodResolver(authSchemas.login),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onTouched',
  })

  const validation = useFormValidation<LoginFormData>({
    onSubmit: async (data) => {
      clearError()
      await login(data.email, data.password)
      validation.setSuccessMessage('Successfully logged in!')
      setTimeout(() => {
        onSuccess?.()
      }, 1000)
    },
    onError: (errors) => {
      console.error('Login errors:', errors)
    },
  })

  const { formState, handleFormSubmit, getFieldError } = validation

  const onFormSubmit = async (data: LoginFormData) => {
    await handleFormSubmit(data)
  }

  const emailError = getFieldError('email', errors, touchedFields)
  const passwordError = getFieldError('password', errors, touchedFields)

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

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email address
            </label>
            <ValidatedInput
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email')}
              error={errors.email?.message}
              touched={emailError.touched}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <div className="relative">
              <ValidatedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                {...register('password')}
                className="pr-10"
                error={errors.password?.message}
                touched={passwordError.touched}
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

          {Object.keys(formState.serverErrors).length > 0 && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-sm text-red-600 dark:text-red-400">
                {Object.values(formState.serverErrors)[0]}
              </p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            )}
            {formState.isSubmitting ? 'Signing in...' : 'Sign in'}
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
