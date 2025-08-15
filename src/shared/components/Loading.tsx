import { type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

// Base loading spinner component
interface LoadingSpinnerProps extends ComponentPropsWithoutRef<'div'> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'secondary' | 'white'
  speed?: 'slow' | 'normal' | 'fast'
}

export const LoadingSpinner = ({
  size = 'md',
  variant = 'primary',
  speed = 'normal',
  className,
  ...props
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  }

  const variantClasses = {
    primary: 'text-blue-600 dark:text-blue-400',
    secondary: 'text-gray-600 dark:text-gray-400',
    white: 'text-white',
  }

  const speedClasses = {
    slow: 'animate-spin-slow',
    normal: 'animate-spin',
    fast: 'animate-spin-fast',
  }

  return (
    <div
      className={cn(
        'inline-block border-2 border-current border-r-transparent rounded-full',
        sizeClasses[size],
        variantClasses[variant],
        speedClasses[speed],
        className
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

// Loading skeleton components
interface SkeletonProps extends ComponentPropsWithoutRef<'div'> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  lines?: number
}

export const Skeleton = ({
  variant = 'rectangular',
  width,
  height,
  lines = 1,
  className,
  ...props
}: SkeletonProps) => {
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded',
    rounded: 'rounded-lg',
  }

  const baseClasses = 'bg-gray-200 dark:bg-gray-700 animate-pulse'

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('space-y-2', className)} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              variantClasses.text,
              index === lines - 1 ? 'w-3/4' : 'w-full'
            )}
            style={{
              width: index === lines - 1 ? '75%' : width,
              height,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={{ width, height }}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

// Loading states for common patterns
export const LoadingCard = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) => (
  <div className={cn('p-6 space-y-4', className)} {...props}>
    <Skeleton variant="text" height={20} />
    <Skeleton variant="text" lines={3} />
    <div className="flex space-x-2">
      <Skeleton variant="rectangular" width={80} height={32} />
      <Skeleton variant="rectangular" width={80} height={32} />
    </div>
  </div>
)

export const LoadingTable = ({
  rows = 5,
  columns = 4,
  className,
  ...props
}: {
  rows?: number
  columns?: number
} & ComponentPropsWithoutRef<'div'>) => (
  <div className={cn('space-y-4', className)} {...props}>
    {/* Table header */}
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {Array.from({ length: columns }).map((_, index) => (
        <Skeleton key={`header-${index}`} variant="text" height={20} />
      ))}
    </div>

    {/* Table rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div
        key={`row-${rowIndex}`}
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton
            key={`cell-${rowIndex}-${colIndex}`}
            variant="text"
            height={16}
          />
        ))}
      </div>
    ))}
  </div>
)

export const LoadingAvatar = ({
  size = 'md',
  className,
  ...props
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl'
} & ComponentPropsWithoutRef<'div'>) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  }

  return (
    <Skeleton
      variant="circular"
      className={cn(sizeClasses[size], className)}
      {...props}
    />
  )
}

// Full page loading component
interface LoadingPageProps {
  message?: string
  showLogo?: boolean
}

export const LoadingPage = ({
  message = 'Loading...',
  showLogo = true,
}: LoadingPageProps) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="text-center space-y-4">
      {showLogo && (
        <div className="mb-8">
          <div className="h-12 w-12 mx-auto bg-blue-600 rounded-lg flex items-center justify-center">
            <div className="h-6 w-6 bg-white rounded" />
          </div>
        </div>
      )}

      <LoadingSpinner size="lg" />

      <p className="text-gray-600 dark:text-gray-400 text-lg">{message}</p>
    </div>
  </div>
)

// Loading overlay component
interface LoadingOverlayProps {
  show: boolean
  message?: string
  blur?: boolean
}

export const LoadingOverlay = ({
  show,
  message = 'Loading...',
  blur = true,
}: LoadingOverlayProps) => {
  if (!show) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        'bg-white/80 dark:bg-gray-900/80',
        blur && 'backdrop-blur-sm'
      )}
    >
      <div className="text-center space-y-4 p-8 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
        <LoadingSpinner size="lg" />
        <p className="text-gray-600 dark:text-gray-400">{message}</p>
      </div>
    </div>
  )
}

// Button loading state
interface LoadingButtonProps extends ComponentPropsWithoutRef<'button'> {
  loading?: boolean
  loadingText?: string
}

export const LoadingButton = ({
  loading = false,
  loadingText,
  disabled,
  children,
  className,
  ...props
}: LoadingButtonProps) => (
  <button
    disabled={disabled || loading}
    className={cn(
      'inline-flex items-center justify-center',
      loading && 'cursor-not-allowed opacity-70',
      className
    )}
    {...props}
  >
    {loading && <LoadingSpinner size="sm" className="mr-2" />}
    {loading && loadingText ? loadingText : children}
  </button>
)
