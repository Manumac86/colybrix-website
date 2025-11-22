import React from 'react'
import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/footer'

describe('Footer Component', () => {
  describe('Rendering', () => {
    it('should render footer element', () => {
      const { container } = render(<Footer />)
      const footer = container.querySelector('footer')
      expect(footer).toBeInTheDocument()
    })

    it('should render the logo', () => {
      render(<Footer />)
      expect(screen.getByText('Collybrix')).toBeInTheDocument()
    })

    it('should render company description', () => {
      render(<Footer />)
      expect(
        screen.getByText(/technical partner for startup accelerators/i)
      ).toBeInTheDocument()
    })

    it('should render copyright notice', () => {
      render(<Footer />)
      expect(
        screen.getByText(/© 2025 Collybrix. All rights reserved/i)
      ).toBeInTheDocument()
    })

    it('should display Madrid location', () => {
      render(<Footer />)
      expect(screen.getByText(/based in madrid, spain/i)).toBeInTheDocument()
    })
  })

  describe('Services Section', () => {
    it('should render Services heading', () => {
      render(<Footer />)
      expect(screen.getByRole('heading', { name: /services/i })).toBeInTheDocument()
    })

    it('should render all service links', () => {
      render(<Footer />)

      expect(screen.getByRole('link', { name: /prd generation/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /team building/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /xp mentorship/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /ai development/i })).toBeInTheDocument()
    })

    it('should have correct hrefs for service links', () => {
      render(<Footer />)

      const serviceLinks = [
        screen.getByRole('link', { name: /prd generation/i }),
        screen.getByRole('link', { name: /team building/i }),
        screen.getByRole('link', { name: /xp mentorship/i }),
        screen.getByRole('link', { name: /ai development/i }),
      ]

      serviceLinks.forEach(link => {
        expect(link).toHaveAttribute('href', '/#services')
      })
    })
  })

  describe('Company Section', () => {
    it('should render Company heading', () => {
      render(<Footer />)
      expect(screen.getByRole('heading', { name: /company/i })).toBeInTheDocument()
    })

    it('should render all company links', () => {
      render(<Footer />)

      expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /partners/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /case studies/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
    })

    it('should have correct href for Partners link', () => {
      render(<Footer />)
      const partnersLink = screen.getByRole('link', { name: /partners/i })
      expect(partnersLink).toHaveAttribute('href', '/#partners')
    })

    it('should have correct href for Contact link', () => {
      render(<Footer />)
      const contactLink = screen.getByRole('link', { name: /contact/i })
      expect(contactLink).toHaveAttribute('href', '/#contact')
    })
  })

  describe('Connect Section', () => {
    it('should render Connect heading', () => {
      render(<Footer />)
      expect(screen.getByRole('heading', { name: /connect/i })).toBeInTheDocument()
    })

    it('should render email link', () => {
      render(<Footer />)
      const emailLink = screen.getByRole('link', { name: /email us/i })
      expect(emailLink).toBeInTheDocument()
      expect(emailLink).toHaveAttribute('href', 'mailto:emartinez@collybrix.com')
    })

    it('should render LinkedIn link', () => {
      render(<Footer />)
      const linkedInLink = screen.getByRole('link', { name: /linkedin/i })
      expect(linkedInLink).toBeInTheDocument()
      expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/company/collybrix')
    })
  })

  describe('Styling', () => {
    it('should have border and background', () => {
      const { container } = render(<Footer />)
      const footer = container.querySelector('footer')
      expect(footer).toHaveClass('border-t', 'border-border', 'bg-card')
    })

    it('should have responsive grid layout', () => {
      const { container } = render(<Footer />)
      const grid = container.querySelector('.grid.md\\:grid-cols-4')
      expect(grid).toBeInTheDocument()
    })

    it('should have proper padding', () => {
      const { container } = render(<Footer />)
      const footerContainer = container.querySelector('.py-12')
      expect(footerContainer).toBeInTheDocument()
    })

    it('should have hover effects on links', () => {
      render(<Footer />)
      const links = screen.getAllByRole('link')

      // Check navigation links (excluding logo link)
      const navLinks = links.filter(link =>
        link.textContent !== 'Collybrix' &&
        link.closest('ul')
      )

      navLinks.forEach(link => {
        expect(link).toHaveClass('hover:text-foreground', 'transition-colors')
      })
    })
  })

  describe('Accessibility', () => {
    it('should have contentinfo landmark', () => {
      const { container } = render(<Footer />)
      const footer = container.querySelector('footer')
      expect(footer?.tagName).toBe('FOOTER')
    })

    it('should have all links keyboard accessible', () => {
      render(<Footer />)
      const links = screen.getAllByRole('link')

      links.forEach(link => {
        expect(link.tagName).toBe('A')
        expect(link).toHaveAttribute('href')
      })
    })

    it('should have proper heading hierarchy', () => {
      render(<Footer />)
      const headings = screen.getAllByRole('heading')

      headings.forEach(heading => {
        expect(heading.tagName).toBe('H4')
      })
    })

    it('should have descriptive link text', () => {
      render(<Footer />)
      const links = screen.getAllByRole('link')

      links.forEach(link => {
        expect(link.textContent).toBeTruthy()
        expect(link.textContent?.trim()).not.toBe('')
      })
    })
  })

  describe('Layout Structure', () => {
    it('should have proper container structure', () => {
      const { container } = render(<Footer />)
      const footerContainer = container.querySelector('.container.mx-auto')
      expect(footerContainer).toBeInTheDocument()
    })

    it('should have copyright section separated with border', () => {
      const { container } = render(<Footer />)
      const copyrightSection = container.querySelector('.border-t.border-border.text-center')
      expect(copyrightSection).toBeInTheDocument()
    })

    it('should maintain proper spacing between sections', () => {
      const { container } = render(<Footer />)
      const grid = container.querySelector('.gap-8')
      expect(grid).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    it('should have responsive padding', () => {
      const { container } = render(<Footer />)
      const footerContainer = container.querySelector('.px-4.sm\\:px-6.lg\\:px-8')
      expect(footerContainer).toBeInTheDocument()
    })

    it('should have responsive grid columns', () => {
      const { container } = render(<Footer />)
      const grid = container.querySelector('.md\\:grid-cols-4')
      expect(grid).toBeInTheDocument()
    })
  })

  describe('Logo Integration', () => {
    it('should render Logo component', () => {
      render(<Footer />)
      const logoLink = screen.getByText('Collybrix').closest('a')
      expect(logoLink).toHaveAttribute('href', '/')
    })

    it('should have logo in first column', () => {
      const { container } = render(<Footer />)
      const firstColumn = container.querySelector('.grid > div:first-child')
      expect(firstColumn).toContainElement(screen.getByText('Collybrix'))
    })
  })
})
