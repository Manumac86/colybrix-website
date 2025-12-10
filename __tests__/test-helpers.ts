import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

/**
 * Custom render function with common providers
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { ...options })
}

/**
 * Wait for a condition to be true
 */
export async function waitForCondition(
  condition: () => boolean | Promise<boolean>,
  timeout = 5000,
  interval = 100
): Promise<void> {
  const startTime = Date.now()

  while (Date.now() - startTime < timeout) {
    if (await condition()) {
      return
    }
    await new Promise((resolve) => setTimeout(resolve, interval))
  }

  throw new Error('Condition not met within timeout')
}

/**
 * Mock fetch responses
 */
export function mockFetch(response: any, status = 200) {
  ;(global.fetch as jest.Mock) = jest.fn(() =>
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      json: async () => response,
      text: async () => JSON.stringify(response),
    })
  )
}

/**
 * Create mock form data
 */
export function createMockFormData(data: Record<string, string>): FormData {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value)
  })
  return formData
}

/**
 * Test data factories
 */
export const factories = {
  contactForm: (overrides = {}) => ({
    name: 'John Doe',
    email: 'john@example.com',
    company: 'Test Company',
    type: 'startup',
    stage: 'mvp',
    message: 'We need help building our MVP',
    ...overrides,
  }),
}

/**
 * Accessibility testing helpers
 */
export const a11y = {
  /**
   * Check if element has accessible name
   */
  hasAccessibleName: (element: HTMLElement): boolean => {
    const ariaLabel = element.getAttribute('aria-label')
    const ariaLabelledBy = element.getAttribute('aria-labelledby')
    const textContent = element.textContent?.trim()

    return !!(ariaLabel || ariaLabelledBy || textContent)
  },

  /**
   * Check if element is keyboard accessible
   */
  isKeyboardAccessible: (element: HTMLElement): boolean => {
    const tabIndex = element.getAttribute('tabindex')
    const isInteractive = [
      'BUTTON',
      'A',
      'INPUT',
      'SELECT',
      'TEXTAREA',
    ].includes(element.tagName)

    return isInteractive || (tabIndex !== null && parseInt(tabIndex) >= 0)
  },
}

/**
 * DOM query helpers
 */
export const queries = {
  /**
   * Get all headings in hierarchical order
   */
  getHeadingHierarchy: (container: HTMLElement) => {
    return Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'))
      .map((heading) => ({
        level: parseInt(heading.tagName[1]),
        text: heading.textContent?.trim(),
      }))
  },

  /**
   * Get all links with their href
   */
  getLinks: (container: HTMLElement) => {
    return Array.from(container.querySelectorAll('a')).map((link) => ({
      text: link.textContent?.trim(),
      href: link.getAttribute('href'),
    }))
  },
}

/**
 * Performance testing helpers
 */
export const performanceHelpers = {
  /**
   * Measure component render time
   */
  measureRenderTime: async (renderFn: () => void): Promise<number> => {
    const start = globalThis.performance.now()
    renderFn()
    const end = globalThis.performance.now()
    return end - start
  },

  /**
   * Check if render time is within acceptable threshold
   */
  isRenderPerformant: (renderTime: number, threshold = 100): boolean => {
    return renderTime < threshold
  },
}

/**
 * Mock intersection observer for lazy loading tests
 */
export function mockIntersectionObserver() {
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    takeRecords() {
      return []
    }
    unobserve() {}
  } as any
}

/**
 * Mock ResizeObserver for responsive tests
 */
export function mockResizeObserver() {
  global.ResizeObserver = class ResizeObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  } as any
}

/**
 * Wait for element to be removed from DOM
 */
export async function waitForElementToBeRemoved(
  element: HTMLElement | null,
  timeout = 5000
): Promise<void> {
  const startTime = Date.now()

  while (element && document.body.contains(element)) {
    if (Date.now() - startTime > timeout) {
      throw new Error('Element was not removed within timeout')
    }
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
}

/**
 * Simulate user typing with delay
 */
export async function typeWithDelay(
  input: HTMLInputElement,
  text: string,
  delay = 50
): Promise<void> {
  for (const char of text) {
    input.value += char
    input.dispatchEvent(new Event('input', { bubbles: true }))
    await new Promise((resolve) => setTimeout(resolve, delay))
  }
}

/**
 * Check if element is visible in viewport
 */
export function isElementInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

export default {
  renderWithProviders,
  waitForCondition,
  mockFetch,
  createMockFormData,
  factories,
  a11y,
  queries,
  performance,
  mockIntersectionObserver,
  mockResizeObserver,
  waitForElementToBeRemoved,
  typeWithDelay,
  isElementInViewport,
}
