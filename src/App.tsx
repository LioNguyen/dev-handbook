import { BrowserRouter } from 'react-router-dom'
import { QueryProvider } from '@/core/api/QueryProvider'
import { ThemeProvider } from '@/core/components/organisms'
import { ErrorBoundary } from '@/core/components/organisms'
import { AppRoutes } from '@/core/routing'
import { usePerformanceBudget } from '@/shared/hooks/usePerformance'
import { useEffect } from 'react'
import './App.scss'
import { Provider } from 'react-redux'
import { store } from '@/modules/redux-demo/store'

function App() {
  const budgetResults = usePerformanceBudget()

  useEffect(() => {
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
            <Provider store={store}>
              <AppRoutes />
            </Provider>
          </ThemeProvider>
        </QueryProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
