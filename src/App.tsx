import { BrowserRouter } from 'react-router-dom'
import { QueryProvider } from '@/core/api/QueryProvider'
import { ThemeProvider } from '@/components/organisms'
import { ErrorBoundary } from '@/components/organisms'
import { AppRoutes } from '@/core/routing'
import { usePerformanceBudget } from '@/shared/hooks/usePerformance'
import { advancedLazyLoading } from '@/shared/utils/performance'
import { useEffect } from 'react'
import './App.scss'

function App() {
  const budgetResults = usePerformanceBudget()

  useEffect(() => {
    // Preload critical routes on idle
    advancedLazyLoading.preloadOnIdle([() => import('@/pages/DashboardPage')])

    // Log performance budget results in development
    if (process.env.NODE_ENV === 'development' && budgetResults) {
      console.log('Performance Budget Results:', budgetResults)
    }
  }, [budgetResults])

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <QueryProvider>
          <ThemeProvider>
            <AppRoutes />
          </ThemeProvider>
        </QueryProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
