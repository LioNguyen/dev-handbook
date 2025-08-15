# Performance Optimization Guide

This React boilerplate includes comprehensive performance optimization features to ensure your application loads quickly and runs smoothly.

## Code Splitting and Lazy Loading

### Automatic Route-Based Code Splitting

All pages are automatically code-split using React's `lazy()` function:

```tsx
const HomePage = lazy(() => import('@/pages/HomePage'))
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
```

### Component-Level Lazy Loading

Domain-specific components can be lazily loaded using the enhanced loader system:

```tsx
import { lazyLoaders } from '@/core/routing'

// Create lazy-loaded components with optimized retry strategies
const UserList = lazyLoaders.dashboard(
  () => import('@/domains/user/components/UserList'),
  'UserList'
)

// UserList will only be loaded when actually needed
```

### Advanced Lazy Loading Utilities

```tsx
import {
  createLazyComponent,
  preloadComponents,
} from '@/shared/lib/performance'

// Create a lazy component with preloading support
const MyComponent = createLazyComponent(() => import('./MyComponent'), {
  preload: true,
})

// Preload multiple components
preloadComponents(HomePage, DashboardPage)
```

## Performance Monitoring

### Route Performance Tracking

Each route automatically tracks navigation performance:

```tsx
import { useRoutePerformance } from '@/shared/hooks/usePerformance'

function MyPage() {
  const { getMetrics } = useRoutePerformance('my-page')

  // Get performance metrics
  const metrics = getMetrics()
  console.log(`Route loaded in ${metrics?.duration}ms`)
}
```

### Performance Budget Monitoring

The app automatically checks if performance meets defined budgets:

```tsx
import { usePerformanceBudget } from '@/shared/hooks/usePerformance'

function App() {
  const budgetResults = usePerformanceBudget()

  if (budgetResults) {
    console.log(
      'FCP:',
      budgetResults.firstContentfulPaint.passes ? 'PASS' : 'FAIL'
    )
    console.log(
      'LCP:',
      budgetResults.largestContentfulPaint.passes ? 'PASS' : 'FAIL'
    )
  }
}
```

### Performance Budgets

Default performance budgets are configured:

- First Contentful Paint: 1.5s
- Largest Contentful Paint: 2.5s
- Cumulative Layout Shift: 0.1
- First Input Delay: 100ms
- Total Blocking Time: 200ms

## Memory Management

### Memory Monitoring

Monitor memory usage in development:

```tsx
import { useMemoryMonitor } from '@/shared/hooks/usePerformance'

function DebugPanel() {
  const memoryInfo = useMemoryMonitor(5000) // Check every 5 seconds

  return (
    <div>
      <p>Used: {memoryInfo?.used}</p>
      <p>Total: {memoryInfo?.total}</p>
      <p>Limit: {memoryInfo?.limit}</p>
    </div>
  )
}
```

### Memory Cleanup

```tsx
import { memoryUtils } from '@/shared/lib/performance'

// Force garbage collection (Chrome DevTools only)
memoryUtils.cleanup()

// Start memory monitoring
const intervalId = memoryUtils.monitorMemory(5000)
```

## Resource Preloading

### Intersection Observer for Visible Content

Load content only when it becomes visible:

```tsx
import { useIntersectionObserver } from '@/shared/hooks/usePerformance'

function LazyContent() {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true,
  })

  return <div ref={ref}>{isVisible && <ExpensiveComponent />}</div>
}
```

### Resource Preloading Hook

Preload images, scripts, and styles:

```tsx
import { usePreloadResources } from '@/shared/hooks/usePerformance'

function MyComponent() {
  const loadingState = usePreloadResources({
    images: ['/hero-image.jpg', '/background.png'],
    scripts: ['/analytics.js'],
    styles: ['/critical.css'],
  })

  return <div>{loadingState.images === 'loaded' && <HeroSection />}</div>
}
```

### Strategic Preloading

```tsx
import { advancedLazyLoading } from '@/shared/lib/performance'

// Preload on hover
const hoverProps = advancedLazyLoading.preloadOnHover(
  () => import('./ExpensivePage')
)

<Link {...hoverProps} to="/expensive-page">Go to Page</Link>

// Preload critical routes when idle
advancedLazyLoading.preloadOnIdle([
  () => import('./Dashboard'),
  () => import('./UserProfile')
])
```

## Bundle Analysis

### Analyzing Bundle Size

```bash
# Analyze bundle with source-map-explorer
bun run build
bunx source-map-explorer dist/assets/*.js
```

### Bundle Optimization Tips

1. **Import only what you need**:

   ```tsx
   // Good
   import { Button } from '@/components/atoms'

   // Avoid
   import * as UI from '@/components/atoms'
   ```

2. **Use dynamic imports for conditional code**:

   ```tsx
   // Load heavy library only when needed
   const loadChartLibrary = async () => {
     const { Chart } = await import('chart.js')
     return Chart
   }
   ```

3. **Tree-shake unused code**:
   - Use ESM imports/exports
   - Avoid importing entire libraries
   - Use build tools that support tree-shaking

## Development vs Production

### Development Mode

- Performance metrics are logged to console
- Memory monitoring is available
- Bundle analysis tools are included

### Production Mode

- Metrics logging is disabled
- Only critical performance monitoring remains
- Optimized builds with tree-shaking and minification

## Performance Best Practices

1. **Lazy load non-critical routes and components**
2. **Use Intersection Observer for below-the-fold content**
3. **Preload critical resources strategically**
4. **Monitor performance budgets regularly**
5. **Analyze bundle size and eliminate unused code**
6. **Use React.memo for expensive components**
7. **Implement proper error boundaries for code splitting**
8. **Use Suspense with meaningful loading states**

## Monitoring in Production

Consider integrating with performance monitoring tools:

- Google Analytics Core Web Vitals
- Sentry Performance Monitoring
- LogRocket
- New Relic Browser

The performance utilities in this boilerplate provide the foundation for collecting and analyzing performance data that can be sent to these services.
