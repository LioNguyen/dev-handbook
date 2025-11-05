// Direct imports without lazy loading
export { HomePage } from '@/pages/HomePage'
export { StateManagementDemos as StateManagementDemosPage } from '@/pages/StateManagementDemos'
export { ContextDemoPage } from '@/modules/context-demo/components'
export { ReduxDemoPage } from '@/modules/redux-demo/components'
export { ZustandDemoPage } from '@/modules/zustand-demo/components'
export { ReduxSagaDemoPage } from '@/modules/redux-saga-demo/components'

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
