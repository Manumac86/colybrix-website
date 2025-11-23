import React from 'react'
import { render } from '@testing-library/react'
import { Toaster } from '@/components/ui/sonner'
import { useTheme } from 'next-themes'

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}))

// Mock sonner
jest.mock('sonner', () => ({
  Toaster: ({ theme, className, toastOptions, ...props }: any) => (
    <div
      data-testid="sonner-toaster"
      data-theme={theme}
      data-classname={className}
      {...props}
    />
  ),
}))

describe('Sonner Toaster Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render toaster', () => {
    ;(useTheme as jest.Mock).mockReturnValue({ theme: 'light' })

    const { getByTestId } = render(<Toaster />)
    expect(getByTestId('sonner-toaster')).toBeInTheDocument()
  })

  it('should use light theme from useTheme', () => {
    ;(useTheme as jest.Mock).mockReturnValue({ theme: 'light' })

    const { getByTestId } = render(<Toaster />)
    const toaster = getByTestId('sonner-toaster')
    expect(toaster).toHaveAttribute('data-theme', 'light')
  })

  it('should use dark theme from useTheme', () => {
    ;(useTheme as jest.Mock).mockReturnValue({ theme: 'dark' })

    const { getByTestId } = render(<Toaster />)
    const toaster = getByTestId('sonner-toaster')
    expect(toaster).toHaveAttribute('data-theme', 'dark')
  })

  it('should default to system theme when theme is undefined', () => {
    ;(useTheme as jest.Mock).mockReturnValue({})

    const { getByTestId } = render(<Toaster />)
    const toaster = getByTestId('sonner-toaster')
    expect(toaster).toHaveAttribute('data-theme', 'system')
  })

  it('should apply toaster group className', () => {
    ;(useTheme as jest.Mock).mockReturnValue({ theme: 'light' })

    const { getByTestId } = render(<Toaster />)
    const toaster = getByTestId('sonner-toaster')
    expect(toaster).toHaveAttribute('data-classname', 'toaster group')
  })

  it('should pass through additional props', () => {
    ;(useTheme as jest.Mock).mockReturnValue({ theme: 'light' })

    const { getByTestId } = render(<Toaster data-custom="test" />)
    const toaster = getByTestId('sonner-toaster')
    expect(toaster).toHaveAttribute('data-custom', 'test')
  })
})
