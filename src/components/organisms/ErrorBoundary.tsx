import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/atoms'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  showReload?: boolean
  showDetails?: boolean
}

/**
 * Error Boundary component that catches JavaScript errors anywhere in the child component tree
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    })

    // Call the onError callback if provided
    this.props.onError?.(error, errorInfo)

    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('Error Boundary caught an error:', error, errorInfo)
    }

    // In production, you might want to log to an error reporting service
    // Example: Sentry.captureException(error, { extra: errorInfo })
  }

  handleReload = (): void => {
    window.location.reload()
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="mb-6">
              <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Something went wrong
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                We apologize for the inconvenience. An unexpected error has
                occurred.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex gap-3 justify-center">
                <Button onClick={this.handleReset} variant="outline" size="sm">
                  Try Again
                </Button>
                {this.props.showReload && (
                  <Button
                    onClick={this.handleReload}
                    variant="default"
                    size="sm"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reload Page
                  </Button>
                )}
              </div>

              {this.props.showDetails && import.meta.env.DEV && (
                <details className="mt-4 text-left">
                  <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                    Error Details (Development)
                  </summary>
                  <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono overflow-auto max-h-40">
                    <div className="text-red-600 dark:text-red-400 mb-2">
                      {this.state.error?.toString()}
                    </div>
                    {this.state.errorInfo?.componentStack && (
                      <div className="text-gray-600 dark:text-gray-400">
                        {this.state.errorInfo.componentStack}
                      </div>
                    )}
                  </div>
                </details>
              )}
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// HOC for wrapping components with error boundary
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  )

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`

  return WrappedComponent
}

// Hook for error boundary (React 18+)
export const useErrorBoundary = () => {
  const throwError = (error: Error) => {
    throw error
  }

  return throwError
}
