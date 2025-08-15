/**
 * Lazy loading utilities for dashboard-specific components
 * This demonstrates how to use the new lazy loading system for domain-specific components
 */

import { lazyLoaders } from '@/core/routing/lazyLoader'

// Dashboard page components with optimized loading
export const DashboardOverview = lazyLoaders.dashboard(
  () =>
    import('@/domains/dashboard/components/templates/DashboardOverview').then(
      (m) => ({ default: m.DashboardOverview })
    ),
  'DashboardOverview'
)

export const StatsCards = lazyLoaders.dashboard(
  () =>
    import('@/domains/dashboard/components/organisms/StatsCards').then((m) => ({
      default: m.StatsCards,
    })),
  'StatsCards'
)

export const ChartCard = lazyLoaders.dashboard(
  () =>
    import('@/domains/dashboard/components/molecules/ChartCard').then((m) => ({
      default: m.ChartCard,
    })),
  'ChartCard'
)

// Example usage: These would be used in your routes or parent components
// <Suspense fallback={<LoadingPage />}>
//   <DashboardOverview />
// </Suspense>
//
// Or with error boundaries:
// import { withLazyWrapper } from '@/shared/utils'
// const SafeDashboardOverview = withLazyWrapper(DashboardOverview, {
//   componentName: 'DashboardOverview'
// })
