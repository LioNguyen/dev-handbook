import { describe, expect, it } from 'vitest'
import { act, renderHook, waitFor } from '@testing-library/react'
import { useCounter } from './useCounter'

describe('Counter', () => {
  it('should render initial', () => {
    const { result } = renderHook(() => useCounter(1))

    expect(result.current.count).toBe(1)
  })

  it('should increment correctly', async () => {
    const { result } = renderHook(() => useCounter(1))

    act(() => {
      result.current.increment()
    })
    await waitFor(() => {
      expect(result.current.count).toBe(2)
    })
  })

  it('should decrement correctly', async () => {
    const { result } = renderHook(() => useCounter(5))

    act(() => {
      result.current.decrement()
    })
    await waitFor(() => {
      expect(result.current.count).toBe(4)
    })
  })

  it('should reset correctly', async () => {
    const { result } = renderHook(() => useCounter(5))
    act(() => {
      result.current.increment()
      result.current.increment()
    })
    await waitFor(() => {
      expect(result.current.count).toBe(7)
    })

    result.current.reset()
    await waitFor(() => {
      expect(result.current.count).toBe(5)
    })
  })
})
