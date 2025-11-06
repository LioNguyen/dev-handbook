// hooks/useCounter.ts
import { useState } from 'react'

export function useCounter(initial = 0) {
  const [count, setCount] = useState(initial)

  const increment = () => setCount((c) => c + 1)
  const decrement = () => setCount((c) => c - 1)
  const reset = () => setCount(initial)

  return { count, increment, decrement, reset }
}
