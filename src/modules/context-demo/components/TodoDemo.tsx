/**
 * Context API Todo Demo Component
 * Demonstrates usage of Context API with useReducer
 */

import { useState } from 'react'
import { useTodo } from '../hooks/useTodo'

export function TodoDemo() {
  const { state, addTodo, toggleTodo, deleteTodo, setFilter, fetchTodos } =
    useTodo()
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      addTodo(inputValue.trim())
      setInputValue('')
    }
  }

  const handleFetchTodos = async () => {
    await fetchTodos()
  }

  const filteredTodos = state.todos.filter((todo) => {
    if (state.filter === 'active') return !todo.completed
    if (state.filter === 'completed') return todo.completed
    return true
  })

  const stats = {
    total: state.todos.length,
    active: state.todos.filter((t) => !t.completed).length,
    completed: state.todos.filter((t) => t.completed).length,
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Context API Todo Demo</h1>

      {/* Fetch Todos Button */}
      <div className="mb-4">
        <button
          onClick={handleFetchTodos}
          disabled={state.isLoading}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 transition"
        >
          {state.isLoading ? 'Loading...' : 'Fetch Mock Todos'}
        </button>
      </div>

      {/* Error Display */}
      {state.error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{state.error}</p>
        </div>
      )}

      {/* Add Todo Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={state.isLoading}
          />
          <button
            type="submit"
            disabled={state.isLoading}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition"
          >
            Add
          </button>
        </div>
      </form>

      {/* Stats */}
      <div className="flex gap-4 mb-4 text-sm">
        <span>Total: {stats.total}</span>
        <span>Active: {stats.active}</span>
        <span>Completed: {stats.completed}</span>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {(['all', 'active', 'completed'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setFilter(filter)}
            className={`px-4 py-2 rounded-lg capitalize transition ${
              state.filter === filter
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Todo List */}
      <div className="space-y-2">
        {filteredTodos.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            {state.filter === 'all'
              ? 'No todos yet. Add one above!'
              : `No ${state.filter} todos`}
          </p>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-4 bg-white border rounded-lg hover:shadow-md transition"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 cursor-pointer"
              />
              <span
                className={`flex-1 cursor-pointer ${
                  todo.completed ? 'line-through text-gray-400' : ''
                }`}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
