import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useToggle } from './useToggle'

describe('useToggle', () => {
  it('should render initial correctly', () => {
    const { result } = renderHook(() => useToggle(true))

    expect(result.current.value).toBe(true)
  })
  it('should render toggle correctly', async () => {
    const { result } = renderHook(() => useToggle(true))

    act(() => {
      result.current.toggle()
    })
    await waitFor(() => {
      expect(result.current.value).toBe(false)
    })

    result.current.toggle()
    await waitFor(() => {
      expect(result.current.value).toBe(true)
    })
  })
  it('should render setTrue correctly', async () => {
    const { result } = renderHook(() => useToggle(false))

    act(() => {
      result.current.setTrue()
    })
    await waitFor(() => {
      expect(result.current.value).toBe(true)
    })
  })
  it('should render setFalse correctly', async () => {
    const { result } = renderHook(() => useToggle(true))

    act(() => {
      result.current.setFalse()
    })
    await waitFor(() => {
      expect(result.current.value).toBe(false)
    })
  })
})
