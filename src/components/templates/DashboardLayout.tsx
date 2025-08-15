import * as React from 'react'
import {
  NavigationBar,
  type NavigationItem,
  type User,
} from '@/components/organisms/NavigationBar'
import { cn } from '@/shared/utils/utils'

export interface DashboardLayoutProps {
  children: React.ReactNode
  user?: User
  navigationItems?: NavigationItem[]
  onLogout?: () => void
  showNotifications?: boolean
  notificationCount?: number
  onNotificationClick?: () => void
  loading?: boolean
  className?: string
  'data-testid'?: string
}

const DashboardLayout = React.forwardRef<HTMLDivElement, DashboardLayoutProps>(
  (
    {
      children,
      user,
      navigationItems = [],
      onLogout,
      showNotifications = false,
      notificationCount = 0,
      onNotificationClick,
      loading = false,
      className,
      'data-testid': testId,
      ...props
    },
    ref
  ) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(false)

    const handleMenuToggle = () => {
      setSidebarOpen(!sidebarOpen)
    }

    const defaultNavigationItems: NavigationItem[] = [
      {
        id: 'dashboard',
        label: 'Dashboard',
        href: '/dashboard',
      },
      {
        id: 'users',
        label: 'Users',
        href: '/users',
      },
      {
        id: 'settings',
        label: 'Settings',
        href: '/settings',
      },
    ]

    const navItems =
      navigationItems.length > 0 ? navigationItems : defaultNavigationItems

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn('min-h-screen bg-background', className)}
        data-testid={testId}
        {...props}
      >
        {/* Navigation */}
        <NavigationBar
          logo={
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  RB
                </span>
              </div>
              <span className="font-semibold text-lg">React Boilerplate</span>
            </div>
          }
          menuItems={navItems}
          user={user}
          onLogout={onLogout}
          onMenuToggle={handleMenuToggle}
          showNotifications={showNotifications}
          notificationCount={notificationCount}
          onNotificationClick={onNotificationClick}
        />

        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile sidebar */}
        <div
          className={cn(
            'fixed top-16 left-0 h-full w-64 bg-background border-r border-border z-50 transform transition-transform duration-300 ease-in-out md:hidden',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="p-4">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1">
          <div className="container mx-auto px-4 py-6">{children}</div>
        </main>
      </div>
    )
  }
)

DashboardLayout.displayName = 'DashboardLayout'

export { DashboardLayout }
