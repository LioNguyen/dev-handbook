import * as React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/core/components/atoms/Card'
import { cn } from '@/shared/utils/utils'

export interface AuthLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  showLogo?: boolean
  className?: string
  'data-testid'?: string
}

const AuthLayout = React.forwardRef<HTMLDivElement, AuthLayoutProps>(
  (
    {
      children,
      title = 'Welcome',
      subtitle = 'Sign in to your account to continue',
      showLogo = true,
      className,
      'data-testid': testId,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4',
          className
        )}
        data-testid={testId}
        {...props}
      >
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            {showLogo && (
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xl">
                    RB
                  </span>
                </div>
              </div>
            )}
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            {subtitle && (
              <CardDescription className="text-muted-foreground">
                {subtitle}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>

        {/* Background decoration */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        </div>
      </div>
    )
  }
)

AuthLayout.displayName = 'AuthLayout'

export { AuthLayout }
