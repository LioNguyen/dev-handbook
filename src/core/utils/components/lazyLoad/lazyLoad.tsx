/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ComponentProps, ComponentType, lazy, ReactNode, Suspense } from "react";

import DefaultFallback, { FallbackProps } from "./DefaultFallback";

// Error boundary for lazy components
class ErrorBoundary extends Component<
  { children: ReactNode; fallback: ComponentType<FallbackProps> },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode; fallback: ComponentType<FallbackProps> }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  retry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { hasError, error } = this.state;
    if (hasError) {
      return <this.props.fallback error={error} retry={this.retry} />;
    }
    return this.props.children;
  }
}

/**
 * Creates a lazily loaded component with fallback
 */
export function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  Fallback: ComponentType<FallbackProps> = DefaultFallback,
): ComponentType<ComponentProps<T>> {
  const LazyComponent = lazy(importFunc);

  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={<Fallback />}>
      <ErrorBoundary fallback={Fallback}>
        <LazyComponent {...(props as any)} />
      </ErrorBoundary>
    </Suspense>
  );
}
