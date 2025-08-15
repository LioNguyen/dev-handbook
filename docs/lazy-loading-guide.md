# Enhanced Lazy Loading Guide

This guide covers the enhanced lazy loading system implemented in the React boilerplate.

## Components

### LazyErrorFallback

A comprehensive error fallback component for lazy-loaded components that fail to load.

**Features:**

- User-friendly error message
- Retry functionality
- Page reload option
- Development mode error details
- Responsive design

**Usage:**

```tsx
import { LazyErrorFallback } from '@/components/molecules'

// Can be used standalone or with error boundaries
;<LazyErrorFallback
  error={error}
  resetError={resetErrorBoundary}
  componentName="MyComponent"
/>
```

### LazyComponentWrapper

A wrapper component that provides error boundary and suspense for lazy-loaded components.

**Features:**

- Built-in error boundary with custom fallback
- Suspense with loading indicator
- Configurable loading and error states
- Component name for debugging

**Usage:**

```tsx
import { LazyComponentWrapper } from '@/shared/components'
;<LazyComponentWrapper
  component={MyLazyComponent}
  componentName="MyComponent"
  loadingFallback={<CustomLoader />}
  errorFallback={CustomErrorComponent}
  componentProps={componentProps}
/>
```

## Utilities

### withLazyWrapper HOC

Higher-order component to enhance lazy components with error boundary and suspense.

**Usage:**

```tsx
import { withLazyWrapper } from '@/shared/lib'

const MyLazyComponent = lazy(() => import('./MyComponent'))

const EnhancedComponent = withLazyWrapper(MyLazyComponent, {
  componentName: 'MyComponent',
  loadingFallback: <CustomLoader />,
  errorFallback: CustomErrorComponent,
})
```

### Performance Utilities

Enhanced lazy loading utilities for advanced use cases:

```tsx
import {
  createLazyComponent,
  createLazyComponentWithErrorBoundary,
  preloadComponents,
  advancedLazyLoading,
} from '@/shared/lib/performance'

// Basic lazy component with preloading
const LazyComponent = createLazyComponent(() => import('./Component'), {
  preload: true,
  componentName: 'Component',
})

// Preload on hover
const preloadProps = advancedLazyLoading.preloadOnHover(
  () => import('./Component')
)

// Preload on idle
advancedLazyLoading.preloadOnIdle([
  () => import('./Component1'),
  () => import('./Component2'),
])
```

## Enhanced Lazy Loading System

The new lazy loading system in `@/core/routing` provides enhanced capabilities:

```tsx
// Pre-configured lazy components with retry mechanism
import { HomePage, DashboardPage } from '@/core/routing'

// Custom lazy components with different strategies
export const HomePageWithErrorBoundary = withLazyWrapper(HomePage, {
  componentName: 'HomePage',
})
```

## Best Practices

### 1. Component Naming

Always provide a `componentName` for better debugging and user experience.

### 2. Error Boundaries

Use the enhanced loading system with automatic retry and better error handling.

### 3. Type Safety

The new system maintains type safety while being flexible with component props.

### 4. Performance

The system includes automatic retry mechanisms and performance optimizations:

- Configurable retry attempts and delays
- Jitter to prevent thundering herd problems
- Component-specific loading strategies
- After critical content loads

### 5. Loading States

Provide meaningful loading indicators that match your app's design system.

## Error Handling Flow

1. Component fails to load
2. Error boundary catches the error
3. LazyErrorFallback is displayed
4. User can retry or reload
5. Error details shown in development mode

## Integration Examples

### Route-based Lazy Loading

```tsx
import { Routes, Route } from 'react-router-dom'
import { HomePage, DashboardPage } from '@/core/routing'
;<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/dashboard" element={<DashboardPage />} />
</Routes>
```

### Component-level Enhancement

```tsx
// For components with specific props
const EnhancedStatsCards = withLazyWrapper(StatsCards, {
  componentName: 'StatsCards',
  loadingFallback: <StatsCardsSkeleton />
})

// Usage with proper typing
<EnhancedStatsCards
  stats={statsData}
  isLoading={isLoading}
/>
```

## Performance Monitoring

The system includes performance monitoring hooks:

```tsx
import { useRoutePerformance, useMemoryMonitor } from '@/shared/hooks'

// Monitor route performance
const { getMetrics } = useRoutePerformance('HomePage')

// Monitor memory usage
const memoryInfo = useMemoryMonitor()
```

This enhanced lazy loading system provides a robust foundation for code splitting with comprehensive error handling and performance monitoring.
