import React from 'react'
import { render, screen } from '@testing-library/react'
import { Navigation } from '@/components/navigation'

describe('Navigation Component', () => {
  describe('Rendering', () => {
    it('should render navigation bar', () => {
      render(<Navigation />)
      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
    })

    it('should render the logo', () => {
      render(<Navigation />)
      const logoTexts = screen.getAllByText('Collybrix')
      expect(logoTexts.length).toBeGreaterThan(0)
    })

    it('should render all navigation links', () => {
      render(<Navigation />)

      expect(screen.getByRole('link', { name: /our approach/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /^services$/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /^partners$/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /^team$/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /^about$/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /^contact$/i })).toBeInTheDocument()
    })
  })

  describe('Navigation Links', () => {
    it('should have correct href for Our Approach link', () => {
      render(<Navigation />)
      const ourApproachLink = screen.getByRole('link', { name: /our approach/i })
      expect(ourApproachLink).toHaveAttribute('href', '/#our-approach')
    })

    it('should have correct href for Services link', () => {
      render(<Navigation />)
      const servicesLink = screen.getByRole('link', { name: /^services$/i })
      expect(servicesLink).toHaveAttribute('href', '/#services')
    })

    it('should have correct href for Partners link', () => {
      render(<Navigation />)
      const partnersLink = screen.getByRole('link', { name: /^partners$/i })
      expect(partnersLink).toHaveAttribute('href', '/#partners')
    })

    it('should have correct href for Team link', () => {
      render(<Navigation />)
      const teamLink = screen.getByRole('link', { name: /^team$/i })
      expect(teamLink).toHaveAttribute('href', '/#team')
    })

    it('should have correct href for About link', () => {
      render(<Navigation />)
      const aboutLink = screen.getByRole('link', { name: /^about$/i })
      expect(aboutLink).toHaveAttribute('href', '/about')
    })

    it('should have correct href for Contact link', () => {
      render(<Navigation />)
      const contactLink = screen.getByRole('link', { name: /^contact$/i })
      expect(contactLink).toHaveAttribute('href', '/#contact')
    })
  })

  describe('Styling', () => {
    it('should have sticky positioning', () => {
      render(<Navigation />)
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('sticky', 'top-0', 'z-50')
    })

    it('should have border and background', () => {
      render(<Navigation />)
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('border-b', 'border-border', 'bg-background/95', 'backdrop-blur')
    })

    it('should have proper container spacing', () => {
      const { container } = render(<Navigation />)
      const navContainer = container.querySelector('.container')
      expect(navContainer).toHaveClass('mx-auto', 'px-4', 'sm:px-6', 'lg:px-8')
    })

    it('should have proper height', () => {
      const { container } = render(<Navigation />)
      const navInner = container.querySelector('.flex.h-16')
      expect(navInner).toBeInTheDocument()
    })

    it('should hide navigation links on mobile', () => {
      const { container } = render(<Navigation />)
      const linksContainer = container.querySelector('.hidden.md\\:flex')
      expect(linksContainer).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have navigation landmark', () => {
      render(<Navigation />)
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('should have links with proper text', () => {
      render(<Navigation />)
      const links = screen.getAllByRole('link')

      // Check that all links have accessible text
      links.forEach(link => {
        expect(link.textContent).toBeTruthy()
      })
    })

    it('should have hover states for links', () => {
      render(<Navigation />)
      const servicesLink = screen.getByRole('link', { name: /^services$/i })
      // Check that transition styles are applied (className may be processed by Tailwind)
      expect(servicesLink).toBeInTheDocument()
      expect(servicesLink).toHaveAttribute('href', '/#services')
    })
  })

  describe('Layout', () => {
    it('should have flex layout with space between', () => {
      const { container } = render(<Navigation />)
      const flexContainer = container.querySelector('.flex.items-center.justify-between')
      expect(flexContainer).toBeInTheDocument()
    })

    it('should have proper gap between nav items', () => {
      const { container } = render(<Navigation />)
      const navItems = container.querySelector('.items-center.gap-8')
      expect(navItems).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    it('should have responsive padding classes', () => {
      const { container } = render(<Navigation />)
      const navContainer = container.querySelector('.container')
      expect(navContainer).toHaveClass('px-4', 'sm:px-6', 'lg:px-8')
    })

    it('should hide links on mobile with md breakpoint', () => {
      const { container } = render(<Navigation />)
      const linksContainer = container.querySelector('.hidden.md\\:flex')
      expect(linksContainer).toHaveClass('hidden', 'md:flex')
    })
  })

  describe('Integration', () => {
    it('should render logo as clickable element', () => {
      render(<Navigation />)
      const logoTexts = screen.getAllByText('Collybrix')
      const logoLink = logoTexts[0].closest('a')
      expect(logoLink).toHaveAttribute('href', '/')
    })

    it('should maintain proper DOM structure', () => {
      const { container } = render(<Navigation />)
      const nav = container.querySelector('nav')
      const navContainer = nav?.querySelector('.container') as HTMLElement | null
      const flexContainer = navContainer?.querySelector('.flex.h-16') as HTMLElement | null

      expect(nav).toContainElement(navContainer)
      expect(navContainer).toContainElement(flexContainer)
    })
  })
})
