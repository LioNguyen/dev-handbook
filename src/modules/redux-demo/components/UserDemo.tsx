/**
 * Redux Toolkit User Demo Component
 * Demonstrates usage of Redux Toolkit with typed hooks
 */

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppState, AppDispatch } from '../store/store'
import { add, remove, fetchUser } from '../store/userSlice'

export function UserDemo() {
  const dispatch = useDispatch<AppDispatch>()
  const { userName, email, isLoading, error } = useSelector(
    (state: AppState) => state.user
  )
  const [inputName, setInputName] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputName.trim()) {
      dispatch(add({ name: inputName.trim() }))
      setInputName('')
    }
  }

  const handleRemove = () => {
    dispatch(remove())
  }

  const handleFetchUser = () => {
    dispatch(fetchUser())
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Redux Toolkit User Demo</h1>

      {/* Fetch User Button */}
      <div className="mb-4">
        <button
          onClick={handleFetchUser}
          disabled={isLoading}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 transition"
        >
          {isLoading ? 'Loading...' : 'Fetch Mock User'}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Current User Display */}
      <div className="mb-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Current User:</h2>
        {userName ? (
          <div>
            <div className="mb-3">
              <p className="text-xl text-blue-700">{userName}</p>
              {email && <p className="text-sm text-gray-600">{email}</p>}
            </div>
            <button
              onClick={handleRemove}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Remove User
            </button>
          </div>
        ) : (
          <p className="text-gray-500 italic">No user set</p>
        )}
      </div>

      {/* Add User Form */}
      <form onSubmit={handleAdd} className="mb-6">
        <label className="block text-sm font-medium mb-2">Set User Name:</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Enter user name"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition"
          >
            Set User
          </button>
        </div>
      </form>

      {/* Info Section */}
      <div className="p-4 bg-gray-50 border rounded-lg">
        <h3 className="font-semibold mb-2">How it works:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>State is managed by Redux Toolkit</li>
          <li>Uses `useSelector` to read state</li>
          <li>Uses `useDispatch` to dispatch actions</li>
          <li>Async thunks handle API calls</li>
          <li>Actions are automatically generated from slice</li>
          <li>State updates are immutable (powered by Immer)</li>
        </ul>
      </div>
    </div>
  )
}
