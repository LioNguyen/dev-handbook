/**
 * useTodo Hook
 *
 * Hook to access Todo context.
 */

import { useContext } from 'react'
import { TodoContext } from '../store/TodoContext'

export function useTodo() {
  const context = useContext(TodoContext)
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider')
  }
  return context
}
