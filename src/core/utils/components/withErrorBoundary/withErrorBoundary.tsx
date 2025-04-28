import { ComponentType, JSX } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import DefaultFallback from "../DefaultFallback";

interface WithErrorBoundaryOpts {
  /**
   * Custom fallback component for error handling
   * When not provided, DefaultFallback will be used
   */
  errorFallback?: ComponentType<FallbackProps> | null;
}

/**
 * @description Wraps a component with an ErrorBoundary for graceful error handling
 * @param Component The component to wrap with error boundary
 * @param opts Options for customizing the error boundary behavior
 * @returns A new component wrapped with error boundary protection
 */
export const withErrorBoundary = <P extends object>(Component: ComponentType<P>, opts: WithErrorBoundaryOpts = {}) => {
  // Create the wrapper component
  const WrappedComponent = (props: P): JSX.Element => {
    const ErrorFallback =
      opts?.errorFallback ||
      (({ error, resetErrorBoundary }: FallbackProps) => <DefaultFallback error={error} retry={resetErrorBoundary} />);

    return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };

  // Set display name for debugging
  const displayName = Component.displayName || Component.name || "Component";
  WrappedComponent.displayName = `withErrorBoundary(${displayName})`;

  return WrappedComponent;
};
