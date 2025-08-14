import { Routes, Route } from 'react-router-dom'
import { Home, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import './App.css'

// Temporary placeholder components for routing
function HomePage() {
  return (
    <div
      className={cn(
        'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800'
      )}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Home className="h-16 w-16 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            React Boilerplate
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            A production-ready React boilerplate with atomic design system
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="bg-white dark:bg-gray-700 px-3 py-1 rounded-full">
              React 19
            </span>
            <span className="bg-white dark:bg-gray-700 px-3 py-1 rounded-full">
              TypeScript
            </span>
            <span className="bg-white dark:bg-gray-700 px-3 py-1 rounded-full">
              Tailwind CSS
            </span>
            <span className="bg-white dark:bg-gray-700 px-3 py-1 rounded-full">
              Vite
            </span>
            <span className="bg-white dark:bg-gray-700 px-3 py-1 rounded-full">
              Zustand
            </span>
            <span className="bg-white dark:bg-gray-700 px-3 py-1 rounded-full">
              React Query
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>
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
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
