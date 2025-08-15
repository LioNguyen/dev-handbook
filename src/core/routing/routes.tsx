import { lazyLoaders } from './lazyLoader'

// Lazy load page components with enhanced loading
export const HomePage = lazyLoaders.page(
  () => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })),
  'HomePage'
)

export const DashboardPage = lazyLoaders.page(
  () =>
    import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
  'DashboardPage'
)

// Not found page (keep this non-lazy for immediate feedback)
export const NotFoundPage = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        404
      </h1>
      <h2 className="text-xl text-gray-600 dark:text-gray-300 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-500 dark:text-gray-400">
        The page you're looking for doesn't exist.
      </p>
    </div>
  </div>
)
