import * as React from 'react'
import {
  Menu,
  Bell,
  LogOut,
  Settings,
  User,
  Sun,
  Moon,
  Monitor,
} from 'lucide-react'
import { Button } from '@/core/components/atoms/Button'
import { UserAvatar } from '@/core/components/molecules/UserAvatar'
import { useTheme } from '@/shared/hooks/useTheme'
import { cn } from '@/shared/utils/utils'

// Theme toggle component for navigation bar
const ThemeToggleButton = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const handleThemeChange = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const getIcon = () => {
    if (theme === 'system') {
      return <Monitor className="h-4 w-4" />
    }
    if (resolvedTheme === 'dark') {
      return <Moon className="h-4 w-4" />
    }
    return <Sun className="h-4 w-4" />
  }

  const getTitle = () => {
    if (theme === 'system') return 'System theme'
    if (theme === 'dark') return 'Dark theme'
    return 'Light theme'
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeChange}
      title={getTitle()}
    >
      {getIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export interface NavigationItem {
  id: string
  label: string
  href?: string
  icon?: React.ReactNode
  children?: NavigationItem[]
  badge?: string | number
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role?: string
}

export interface NavigationBarProps {
  logo?: React.ReactNode
  menuItems?: NavigationItem[]
  user?: User
  onLogout?: () => void
  onMenuToggle?: () => void
  showNotifications?: boolean
  notificationCount?: number
  onNotificationClick?: () => void
  className?: string
  'data-testid'?: string
}

const NavigationBar = React.forwardRef<HTMLElement, NavigationBarProps>(
  (
    {
      logo,
      menuItems = [],
      user,
      onLogout,
      onMenuToggle,
      showNotifications = false,
      notificationCount = 0,
      onNotificationClick,
      className,
      'data-testid': testId,
      ...props
    },
    ref
  ) => {
    const [showUserMenu, setShowUserMenu] = React.useState(false)

    const handleUserMenuToggle = () => {
      setShowUserMenu(!showUserMenu)
    }

    const handleUserMenuClose = () => {
      setShowUserMenu(false)
    }

    const handleLogout = () => {
      handleUserMenuClose()
      onLogout?.()
    }

    return (
      <nav
        ref={ref}
        className={cn(
          'flex items-center justify-between h-16 px-4 bg-background border-b border-border',
          className
        )}
        data-testid={testId}
        {...props}
      >
        {/* Left section */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuToggle}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          {/* Logo */}
          {logo && <div className="flex items-center space-x-2">{logo}</div>}

          {/* Desktop navigation items */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="flex items-center space-x-2"
                asChild={!!item.href}
              >
                {item.href ? (
                  <a href={item.href}>
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </a>
                ) : (
                  <>
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          {/* Theme toggle */}
          <ThemeToggleButton />

          {/* Notifications */}
          {showNotifications && (
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onNotificationClick}
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {notificationCount > 99 ? '99+' : notificationCount}
                </span>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          )}

          {/* User menu */}
          {user && (
            <div className="relative">
              <Button
                variant="ghost"
                className="flex items-center space-x-2 p-2"
                onClick={handleUserMenuToggle}
              >
                <UserAvatar src={user.avatar} fallback={user.name} size="sm" />
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium">{user.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {user.role}
                  </div>
                </div>
              </Button>

              {/* User dropdown menu */}
              {showUserMenu && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={handleUserMenuClose}
                  />

                  {/* Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-lg z-20">
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-border">
                        <div className="text-sm font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {user.email}
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        className="w-full justify-start px-4 py-2"
                        onClick={handleUserMenuClose}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Button>

                      <Button
                        variant="ghost"
                        className="w-full justify-start px-4 py-2"
                        onClick={handleUserMenuClose}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>

                      <div className="border-t border-border">
                        <Button
                          variant="ghost"
                          className="w-full justify-start px-4 py-2 text-destructive hover:text-destructive"
                          onClick={handleLogout}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign out
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    )
  }
)

NavigationBar.displayName = 'NavigationBar'

export { NavigationBar }
