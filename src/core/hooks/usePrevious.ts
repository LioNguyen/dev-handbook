import { useEffect, useRef } from 'react'

/**
 * Hook that returns the previous value of a state or prop
 * @param value - The current value
 * @returns The previous value
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)

  useEffect(() => {
    ref.current = value
  })

  return ref.current
}

export default usePrevious
