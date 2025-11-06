import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useFetch } from './useFetch'

interface User {
  id: number
  name: string
}

describe('useFetch', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should init correctly', async () => {
    const mockData: User = { id: 1, name: 'Alice' }
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    })

    const { result } = renderHook(() => useFetch('/api'))

    expect(result.current.loading).toBe(true)
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.data).toEqual(mockData)
    })
  })
})
