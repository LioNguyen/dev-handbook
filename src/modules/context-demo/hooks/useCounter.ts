/**
 * useCounter Hook
 *
 * Hook to access Counter context.
 */

import { useContext } from 'react'
import { CounterContext } from '../store/CounterContext'

export function useCounter() {
  const context = useContext(CounterContext)
  if (context === undefined) {
    throw new Error('useCounter must be used within a CounterProvider')
  }
  return context
}
