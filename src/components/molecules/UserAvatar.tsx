import * as React from 'react'
import { User } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

export interface UserAvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showBadge?: boolean
  badgeColor?: 'green' | 'red' | 'yellow' | 'blue'
  className?: string
  'data-testid'?: string
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
}

const badgeColorClasses = {
  green: 'bg-green-500',
  red: 'bg-red-500',
  yellow: 'bg-yellow-500',
  blue: 'bg-blue-500',
}

const UserAvatar = React.forwardRef<HTMLDivElement, UserAvatarProps>(
  (
    {
      src,
      alt = 'User avatar',
      fallback,
      size = 'md',
      showBadge = false,
      badgeColor = 'green',
      className,
      'data-testid': testId,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false)
    const [imageLoaded, setImageLoaded] = React.useState(false)

    const handleImageLoad = () => {
      setImageLoaded(true)
      setImageError(false)
    }

    const handleImageError = () => {
      setImageError(true)
      setImageLoaded(false)
    }

    // Generate initials from fallback text
    const getInitials = (text?: string) => {
      if (!text) return ''
      return text
        .split(' ')
        .map((word) => word.charAt(0))
        .join('')
        .substring(0, 2)
        .toUpperCase()
    }

    const shouldShowImage = src && !imageError
    const initials = getInitials(fallback)

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center rounded-full bg-muted overflow-hidden',
          sizeClasses[size],
          className
        )}
        data-testid={testId}
        {...props}
      >
        {shouldShowImage ? (
          <img
            src={src}
            alt={alt}
            className={cn(
              'h-full w-full object-cover transition-opacity',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : initials ? (
          <span className="font-medium text-muted-foreground select-none">
            {initials}
          </span>
        ) : (
          <User className="h-1/2 w-1/2 text-muted-foreground" />
        )}

        {showBadge && (
          <div
            className={cn(
              'absolute -bottom-0 -right-0 h-3 w-3 rounded-full border-2 border-background',
              badgeColorClasses[badgeColor]
            )}
          />
        )}
      </div>
    )
  }
)

UserAvatar.displayName = 'UserAvatar'

export { UserAvatar }
