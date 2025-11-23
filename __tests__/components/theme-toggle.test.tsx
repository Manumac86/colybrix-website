import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeToggle } from '@/components/theme-toggle'
import { useTheme } from 'next-themes'

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}))

describe('ThemeToggle Component', () => {
  const mockSetTheme = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
    })
  })

  describe('Rendering', () => {
    it('should render theme toggle button', () => {
      render(<ThemeToggle />)
      const button = screen.getByRole('button', { name: /toggle theme/i })
      expect(button).toBeInTheDocument()
    })

    it('should have sun and moon icons', () => {
      const { container } = render(<ThemeToggle />)
      const svg = container.querySelectorAll('svg')
      expect(svg.length).toBeGreaterThanOrEqual(2) // Sun and Moon icons
    })
  })

  describe('Theme Switching', () => {
    it('should open dropdown menu on click', async () => {
      const user = userEvent.setup()
      render(<ThemeToggle />)

      const button = screen.getByRole('button', { name: /toggle theme/i })
      await user.click(button)

      await waitFor(() => {
        expect(screen.getByText('Light')).toBeInTheDocument()
        expect(screen.getByText('Dark')).toBeInTheDocument()
        expect(screen.getByText('System')).toBeInTheDocument()
      })
    })

    it('should call setTheme with light when Light is clicked', async () => {
      const user = userEvent.setup()
      render(<ThemeToggle />)

      const button = screen.getByRole('button', { name: /toggle theme/i })
      await user.click(button)

      await waitFor(() => {
        expect(screen.getByText('Light')).toBeInTheDocument()
      })

      const lightOption = screen.getByText('Light')
      await user.click(lightOption)

      expect(mockSetTheme).toHaveBeenCalledWith('light')
    })

    it('should call setTheme with dark when Dark is clicked', async () => {
      const user = userEvent.setup()
      render(<ThemeToggle />)

      const button = screen.getByRole('button', { name: /toggle theme/i })
      await user.click(button)

      await waitFor(() => {
        expect(screen.getByText('Dark')).toBeInTheDocument()
      })

      const darkOption = screen.getByText('Dark')
      await user.click(darkOption)

      expect(mockSetTheme).toHaveBeenCalledWith('dark')
    })

    it('should call setTheme with system when System is clicked', async () => {
      const user = userEvent.setup()
      render(<ThemeToggle />)

      const button = screen.getByRole('button', { name: /toggle theme/i })
      await user.click(button)

      await waitFor(() => {
        expect(screen.getByText('System')).toBeInTheDocument()
      })

      const systemOption = screen.getByText('System')
      await user.click(systemOption)

      expect(mockSetTheme).toHaveBeenCalledWith('system')
    })
  })

  describe('Accessibility', () => {
    it('should have screen reader text', () => {
      render(<ThemeToggle />)
      expect(screen.getByText(/toggle theme/i)).toBeInTheDocument()
    })

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup()
      render(<ThemeToggle />)

      const button = screen.getByRole('button', { name: /toggle theme/i })

      // Focus the button
      await user.tab()

      // Open dropdown with Enter
      await user.keyboard('{Enter}')

      await waitFor(() => {
        expect(screen.getByText('Light')).toBeInTheDocument()
      })
    })
  })

  describe('Button Styling', () => {
    it('should have outline variant', () => {
      render(<ThemeToggle />)
      const button = screen.getByRole('button', { name: /toggle theme/i })
      expect(button).toHaveClass('border-input')
    })

    it('should have icon size', () => {
      render(<ThemeToggle />)
      const button = screen.getByRole('button', { name: /toggle theme/i })
      expect(button).toHaveClass('h-9', 'w-9')
    })
  })
})
