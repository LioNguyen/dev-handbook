/* eslint-disable @typescript-eslint/no-explicit-any */
import DefaultFallback from "../DefaultFallback";

import React, { ComponentType, JSX, lazy, Suspense } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

/**
 * Creates a lazily loaded component with separate fallbacks for errors and loading
 */
interface Opts {
  /**
   * Fallback component to show during loading
   */
  suspenseFallback?: React.ReactNode;

  /**
   * Custom fallback component for error handling
   * When not provided, DefaultFallback will be used
   */
  errorFallback?: ComponentType<FallbackProps> | null;
}

type UnPromisify<T> = T extends Promise<infer P> ? P : never;

/**
 * @description create a lazyLoad for React component with separate error and loading states
 */
export const lazyLoad = <T extends Promise<any>, U extends React.ComponentType<any>>(
  importFunc: () => T,
  selectorFunc?: (s: UnPromisify<T>) => U,
  opts: Opts = { suspenseFallback: null },
) => {
  let lazyFactory: () => Promise<{ default: U }> = importFunc;

  if (selectorFunc) {
    lazyFactory = () => importFunc().then((module) => ({ default: selectorFunc(module) }));
  }

  const LazyComponent = lazy(lazyFactory);

  return function Component(props: React.ComponentProps<U>): JSX.Element {
    const ErrorFallback =
      opts?.errorFallback ||
      (({ error, resetErrorBoundary }: FallbackProps) => <DefaultFallback error={error} retry={resetErrorBoundary} />);

    return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={opts?.suspenseFallback}>
          <LazyComponent {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };
};

// Example:
// const Home = lazyLoad(
//   () => import("@/components/Home"),
//   (module) => module.default,
//   { fallback: <div>Retry</div> },
// );
