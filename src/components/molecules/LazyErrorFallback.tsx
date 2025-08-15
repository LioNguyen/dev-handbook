import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/atoms'

interface LazyErrorFallbackProps {
  error?: Error
  resetError?: () => void
  componentName?: string
}

export const LazyErrorFallback: React.FC<LazyErrorFallbackProps> = ({
  error,
  resetError,
  componentName = 'Component',
}) => {
  const handleRetry = () => {
    if (resetError) {
      resetError()
    } else {
      // Fallback to page reload if no reset function
      window.location.reload()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[200px] bg-muted/20 rounded-lg border border-border">
      <div className="flex items-center gap-3 mb-4">
        <AlertTriangle className="h-8 w-8 text-destructive" />
        <h3 className="text-lg font-semibold text-foreground">
          Failed to load {componentName}
        </h3>
      </div>

      <p className="text-sm text-muted-foreground text-center mb-6 max-w-md">
        {error?.message ||
          'There was an error loading this component. This might be due to a network issue or the component file is missing.'}
      </p>

      <div className="flex gap-3">
        <Button
          onClick={handleRetry}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>

        <Button
          onClick={() => window.location.reload()}
          variant="default"
          size="sm"
        >
          Reload Page
        </Button>
      </div>

      {process.env.NODE_ENV === 'development' && error?.stack && (
        <details className="mt-6 w-full">
          <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
            Show Error Details
          </summary>
          <pre className="mt-2 p-3 bg-muted rounded text-xs overflow-auto text-muted-foreground">
            {error.stack}
          </pre>
        </details>
      )}
    </div>
  )
}

export default LazyErrorFallback
