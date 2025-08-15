import { LogOut, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui'
import { useAuth } from '@/shared/hooks'
import { cn } from '@/lib/utils'

interface LogoutButtonProps {
  onLogout?: () => void
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  showIcon?: boolean
  showText?: boolean
  className?: string
}

export const LogoutButton = ({
  onLogout,
  variant = 'ghost',
  size = 'default',
  showIcon = true,
  showText = true,
  className,
}: LogoutButtonProps) => {
  const { logout, isLoading } = useAuth()

  const handleLogout = async () => {
    try {
      logout()
      onLogout?.()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <Button
      onClick={handleLogout}
      variant={variant}
      size={size}
      disabled={isLoading}
      className={cn('flex items-center gap-2', !showText && 'px-2', className)}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        showIcon && <LogOut className="h-4 w-4" />
      )}
      {showText && (isLoading ? 'Signing out...' : 'Sign out')}
    </Button>
  )
}
