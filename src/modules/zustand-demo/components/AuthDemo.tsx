/**
 * Zustand Auth Demo Component
 * Demonstrates usage of Zustand for authentication state
 */

import { useState } from 'react'
import { useAuthStore } from '../store/authStore'

export function AuthDemo() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Select specific state values
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isLoading = useAuthStore((state) => state.isLoading)
  const error = useAuthStore((state) => state.error)

  // Select actions
  const login = useAuthStore((state) => state.login)
  const logout = useAuthStore((state) => state.logout)
  const clearError = useAuthStore((state) => state.clearError)
  const fetchProfile = useAuthStore((state) => state.fetchProfile)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      setEmail('')
      setPassword('')
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  const handleLogout = () => {
    logout()
    setEmail('')
    setPassword('')
  }

  const handleFetchProfile = async () => {
    try {
      await fetchProfile()
    } catch (err) {
      console.error('Fetch profile failed:', err)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Zustand Auth Demo</h1>

      {/* Fetch Profile Button (when authenticated) */}
      {isAuthenticated && (
        <div className="mb-4">
          <button
            onClick={handleFetchProfile}
            disabled={isLoading}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-300 transition"
          >
            {isLoading ? 'Loading...' : 'Refresh Profile from API'}
          </button>
        </div>
      )}

      {/* Authentication Status */}
      <div
        className={`mb-6 p-6 rounded-lg ${
          isAuthenticated
            ? 'bg-green-50 border border-green-200'
            : 'bg-gray-50 border border-gray-200'
        }`}
      >
        <h2 className="text-lg font-semibold mb-2">Status:</h2>
        {isAuthenticated && user ? (
          <div>
            <p className="text-green-700 mb-2">✓ Logged in</p>
            <div className="text-sm space-y-1">
              <p>
                <span className="font-medium">Name:</span> {user.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-medium">Role:</span>{' '}
                <span className="capitalize">{user.role}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-gray-600">Not logged in</p>
        )}
      </div>

      {/* Login Form */}
      {!isAuthenticated && (
        <form onSubmit={handleLogin} className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Login</h2>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center justify-between">
                <p className="text-red-700 text-sm">{error}</p>
                <button
                  onClick={clearError}
                  className="text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      )}

      {/* Demo Credentials */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
        <h3 className="font-semibold mb-2 text-yellow-800">
          Demo Credentials:
        </h3>
        <div className="text-sm space-y-1 text-yellow-700">
          <p>
            <span className="font-medium">Admin:</span> admin@example.com /
            admin123
          </p>
          <p>
            <span className="font-medium">User:</span> user@example.com /
            user123
          </p>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 bg-gray-50 border rounded-lg">
        <h3 className="font-semibold mb-2">How Zustand works:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>No Provider needed - use anywhere</li>
          <li>Select specific state with selectors</li>
          <li>Actions are part of the store</li>
          <li>Automatic shallow equality checks</li>
          <li>Persistent state with middleware</li>
          <li>Minimal boilerplate, maximum flexibility</li>
        </ul>
      </div>
    </div>
  )
}
