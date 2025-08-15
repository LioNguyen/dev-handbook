import React from 'react'
import { LoadingSpinner } from './Loading'

// HOC for adding loading states
export const withLoading = <P extends object>(
  Component: React.ComponentType<P>,
  LoadingComponent: React.ComponentType = () => <LoadingSpinner />
) => {
  return ({ isLoading, ...props }: P & { isLoading?: boolean }) => {
    if (isLoading) {
      return <LoadingComponent />
    }
    return <Component {...(props as P)} />
  }
}
