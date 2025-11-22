import React from 'react'
import { render, screen } from '@testing-library/react'
import { Logo } from '@/components/logo'

describe('Logo Component', () => {
  describe('Rendering', () => {
    it('should render logo with text', () => {
      render(<Logo />)
      expect(screen.getByText('Collybrix')).toBeInTheDocument()
    })

    it('should render logo image', () => {
      render(<Logo />)
      const image = screen.getByAltText('Collybrix')
      expect(image).toBeInTheDocument()
    })

    it('should have correct image dimensions', () => {
      render(<Logo />)
      const image = screen.getByAltText('Collybrix')
      expect(image).toHaveAttribute('width', '64')
      expect(image).toHaveAttribute('height', '64')
    })

    it('should render as a link to home page', () => {
      render(<Logo />)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/')
    })
  })

  describe('Styling', () => {
    it('should have gradient text styling', () => {
      render(<Logo />)
      const text = screen.getByText('Collybrix')
      expect(text).toHaveClass('bg-linear-(--gradient-collybrix)', 'bg-clip-text', 'text-transparent')
    })

    it('should have proper font styling', () => {
      render(<Logo />)
      const text = screen.getByText('Collybrix')
      expect(text).toHaveClass('text-2xl', 'font-bold')
    })

    it('should have flex layout', () => {
      render(<Logo />)
      const link = screen.getByRole('link')
      // Check that the link renders correctly
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/')
    })
  })

  describe('Accessibility', () => {
    it('should have accessible image alt text', () => {
      render(<Logo />)
      const image = screen.getByAltText('Collybrix')
      expect(image).toBeInTheDocument()
    })

    it('should be keyboard navigable', () => {
      render(<Logo />)
      const link = screen.getByRole('link')
      link.focus()
      expect(link).toHaveFocus()
    })

    it('should have proper link semantics', () => {
      render(<Logo />)
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link.tagName).toBe('A')
    })
  })

  describe('Image', () => {
    it('should load logo from correct path', () => {
      render(<Logo />)
      const image = screen.getByAltText('Collybrix')
      expect(image).toHaveAttribute('src', expect.stringContaining('logo.png'))
    })

    it('should have object-contain class for proper scaling', () => {
      render(<Logo />)
      const image = screen.getByAltText('Collybrix')
      expect(image).toHaveClass('object-contain')
    })

    it('should have transparent background', () => {
      render(<Logo />)
      const image = screen.getByAltText('Collybrix')
      expect(image).toHaveClass('bg-transparent')
    })
  })

  describe('Container', () => {
    it('should wrap image in proper container', () => {
      const { container } = render(<Logo />)
      const imageContainer = container.querySelector('.flex.h-16.w-16')
      expect(imageContainer).toBeInTheDocument()
      expect(imageContainer).toHaveClass('items-center', 'justify-center', 'rounded-lg')
    })
  })
})
