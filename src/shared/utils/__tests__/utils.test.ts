import { describe, it, expect } from 'vitest'
import { cn } from '../utils'

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1')
  })

  it('should handle conditional classes', () => {
    const condition = true
    const falseCondition = false
    expect(cn('base', condition && 'conditional')).toBe('base conditional')
    expect(cn('base', falseCondition && 'conditional')).toBe('base')
  })

  it('should merge conflicting Tailwind classes', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  // it('should handle undefined and null values', () => {
  //   expect(cn('base', undefined, null, 'other')).toBe('base other')
  // })
})
