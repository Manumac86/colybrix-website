import { cn } from '@/lib/utils'

describe('lib/utils', () => {
  describe('cn (className merger)', () => {
    it('should merge class names correctly', () => {
      const result = cn('px-2 py-1', 'px-4')
      expect(result).toBe('py-1 px-4')
    })

    it('should handle conditional classes', () => {
      const isActive = true
      const result = cn('base-class', isActive && 'active-class')
      expect(result).toBe('base-class active-class')
    })

    it('should handle falsy values', () => {
      const result = cn('class1', false, null, undefined, 'class2')
      expect(result).toBe('class1 class2')
    })

    it('should handle empty input', () => {
      const result = cn()
      expect(result).toBe('')
    })

    it('should merge Tailwind classes correctly', () => {
      const result = cn('text-red-500', 'text-blue-500')
      expect(result).toBe('text-blue-500')
    })

    it('should handle array of classes', () => {
      const result = cn(['class1', 'class2'], 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    it('should handle object syntax', () => {
      const result = cn({
        'class1': true,
        'class2': false,
        'class3': true,
      })
      expect(result).toBe('class1 class3')
    })
  })
})
