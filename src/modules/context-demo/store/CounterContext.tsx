/**
 * Counter Context - Example of Context API State Management
 *
 * This demonstrates React Context API for global state management.
 * Context API is built into React and is ideal for simple to moderate state sharing.
 */

import { createContext, useReducer, type ReactNode } from 'react'

// Define state shape
interface CounterState {
  count: number
  history: number[]
}

// Define action types
type CounterAction =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET'; payload: number }

// Define context value type
interface CounterContextValue {
  state: CounterState
  dispatch: React.Dispatch<CounterAction>
  // Convenience methods
  increment: () => void
  decrement: () => void
  reset: () => void
  setValue: (value: number) => void
}

// Initial state
const initialState: CounterState = {
  count: 0,
  history: [0],
}

// Reducer function
function counterReducer(
  state: CounterState,
  action: CounterAction
): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
        history: [...state.history, state.count + 1],
      }
    case 'DECREMENT':
      return {
        count: state.count - 1,
        history: [...state.history, state.count - 1],
      }
    case 'RESET':
      return {
        count: 0,
        history: [...state.history, 0],
      }
    case 'SET':
      return {
        count: action.payload,
        history: [...state.history, action.payload],
      }
    default:
      return state
  }
}

// Create context
export const CounterContext = createContext<CounterContextValue | undefined>(
  undefined
)

// Provider component
export function CounterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(counterReducer, initialState)

  // Convenience methods
  const increment = () => dispatch({ type: 'INCREMENT' })
  const decrement = () => dispatch({ type: 'DECREMENT' })
  const reset = () => dispatch({ type: 'RESET' })
  const setValue = (value: number) => dispatch({ type: 'SET', payload: value })

  const value: CounterContextValue = {
    state,
    dispatch,
    increment,
    decrement,
    reset,
    setValue,
  }

  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  )
}
