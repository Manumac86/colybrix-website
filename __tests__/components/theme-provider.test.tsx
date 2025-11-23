import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@/components/theme-provider'

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}))

describe('ThemeProvider Component', () => {
  it('should render children', () => {
    render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should wrap children with NextThemesProvider', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div>Test Content</div>
      </ThemeProvider>
    )

    expect(screen.getByTestId('theme-provider')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should pass through props to NextThemesProvider', () => {
    const { container } = render(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div>Test Content</div>
      </ThemeProvider>
    )

    expect(container.querySelector('[data-testid="theme-provider"]')).toBeInTheDocument()
  })
})
