# Enhanced Lazy Loading System

This document describes the new enhanced lazy loading system that replaces the old `LazyComponents.ts` approach.

## Overview

The new lazy loading system provides:

- **Retry mechanism** with configurable attempts and delays
- **Better error handling** with detailed error messages
- **Type safety** while maintaining flexibility
- **Performance optimizations** for different component types
- **Centralized configuration** for lazy loading behavior

## Architecture

### Core Components

1. **`lazyLoader.ts`** - Core lazy loading utilities with retry mechanism
2. **`routes.tsx`** - Pre-configured lazy-loaded page components
3. **`AppRoutes.tsx`** - Route configuration with enhanced error boundaries
4. **`LazyDashboardComponents.ts`** - Example domain-specific lazy loading

### Key Features

- **Automatic retry**: Failed imports are retried with exponential backoff
- **Jitter**: Random delay added to prevent thundering herd problems
- **Component-specific settings**: Different retry strategies for pages, modals, etc.
- **Development feedback**: Detailed error logging in development mode

## Usage

### Basic Lazy Loading

```tsx
import { createLazyComponent } from '@/core/routing/lazyLoader'

const MyComponent = createLazyComponent(() => import('./MyComponent'), {
  componentName: 'MyComponent',
  retryAttempts: 3,
  retryDelay: 1000,
})
```

### Pre-configured Loaders

```tsx
import { lazyLoaders } from '@/core/routing/lazyLoader'

// Page components (3 retries, 1s delay)
const HomePage = lazyLoaders.page(() => import('@/pages/HomePage'), 'HomePage')

// Dashboard components (2 retries, 500ms delay)
const DashboardWidget = lazyLoaders.dashboard(
  () => import('@/components/DashboardWidget'),
  'DashboardWidget'
)

// Modal components (1 retry, no delay)
const ConfirmDialog = lazyLoaders.modal(
  () => import('@/components/ConfirmDialog'),
  'ConfirmDialog'
)
```

### Using Pre-configured Components

```tsx
import { HomePage, DashboardPage } from '@/core/routing'

// In your router
<Route path="/" element={<HomePage />} />
<Route path="/dashboard" element={<DashboardPage />} />
```

### Enhanced Error Boundaries

```tsx
import { withLazyWrapper } from '@/shared/utils'
import { HomePage } from '@/core/routing'

const SafeHomePage = withLazyWrapper(HomePage, {
  componentName: 'HomePage',
  // Custom loading/error fallbacks can be added here
})
```

## Migration Guide

### From Old LazyComponents.ts

**Before:**

```tsx
import { HomePage, DashboardPage } from '@/components/LazyComponents'
```

**After:**

```tsx
import { HomePage, DashboardPage } from '@/core/routing'
```

### Custom Components

**Before:**

```tsx
const MyComponent = lazy(() => import('./MyComponent'))
```

**After:**

```tsx
import { lazyLoaders } from '@/core/routing'

const MyComponent = lazyLoaders.page(
  () => import('./MyComponent'),
  'MyComponent'
)
```

## Best Practices

### 1. Choose the Right Loader Type

- **`page`**: For route-level components (3 retries, longer delay)
- **`dashboard`**: For dashboard widgets (2 retries, medium delay)
- **`modal`**: For dialogs and modals (1 retry, immediate)

### 2. Provide Component Names

Always provide a descriptive component name for better debugging:

```tsx
const UserProfile = lazyLoaders.dashboard(
  () => import('./UserProfile'),
  'UserProfile' // This helps with debugging
)
```

### 3. Error Boundaries

Wrap lazy components in error boundaries, especially at route level:

```tsx
<ErrorBoundary>
  <Suspense fallback={<LoadingSpinner />}>
    <LazyComponent />
  </Suspense>
</ErrorBoundary>
```

### 4. Domain-Specific Files

Create domain-specific lazy loading files for better organization:

```
src/
  domains/
    dashboard/
      components/
        LazyDashboardComponents.ts
    user/
      components/
        LazyUserComponents.ts
```

## Configuration Options

### LazyLoadOptions

```tsx
interface LazyLoadOptions {
  /** Custom component name for debugging and error messages */
  componentName?: string
  /** Retry attempts on load failure (default: 3) */
  retryAttempts?: number
  /** Delay between retry attempts in ms (default: 1000) */
  retryDelay?: number
}
```

### Predefined Configurations

| Loader Type | Retry Attempts | Retry Delay | Use Case               |
| ----------- | -------------- | ----------- | ---------------------- |
| `page`      | 3              | 1000ms      | Route-level components |
| `dashboard` | 2              | 500ms       | Dashboard widgets      |
| `modal`     | 1              | 0ms         | Dialogs and modals     |

## Error Handling

The system provides comprehensive error handling:

1. **Retry Logic**: Automatic retries with exponential backoff
2. **Jitter**: Random delays to prevent simultaneous retries
3. **Error Messages**: Detailed error information including component name
4. **Development Logging**: Console warnings during development
5. **Fallback Components**: Integration with error boundaries

## Performance Benefits

1. **Code Splitting**: Automatic chunk creation for lazy components
2. **Retry Optimization**: Smart retry logic prevents unnecessary network requests
3. **Bundle Analysis**: Better chunk organization for optimal loading
4. **Caching**: Browser caching of lazy-loaded chunks
5. **Preloading**: Can be extended with route-based preloading

## Troubleshooting

### Common Issues

1. **Import Errors**: Check module paths and export names
2. **Type Errors**: Ensure components are properly typed
3. **Loading Failures**: Check network connectivity and retry settings
4. **Missing Fallbacks**: Always provide loading and error fallbacks

### Debug Mode

Enable detailed logging in development:

```tsx
// Automatic in development mode
if (process.env.NODE_ENV === 'development') {
  // Retry attempts are logged automatically
}
```

## Future Enhancements

Planned improvements:

- **Route-based preloading**: Preload likely next routes
- **Bundle analysis integration**: Automatic optimal chunk sizing
- **Service worker integration**: Offline lazy loading support
- **Metrics collection**: Performance monitoring for lazy loads
