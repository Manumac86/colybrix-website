import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '@/app/page'
import { toast } from 'sonner'

// Mock the toast function
jest.mock('sonner', () => ({
  toast: jest.fn(),
  Toaster: () => null,
}))

describe('Home Page Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock) = jest.fn()
  })

  describe('Page Rendering', () => {
    it('should render the complete home page', () => {
      render(<Home />)

      // Check for main sections
      expect(screen.getByText(/your technical partner/i)).toBeInTheDocument()
      expect(screen.getByText(/ai-powered technical excellence/i)).toBeInTheDocument()
      expect(screen.getByText(/from mvp to market leader/i)).toBeInTheDocument()
    })

    it('should render navigation', () => {
      render(<Home />)
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('should render footer', () => {
      const { container } = render(<Home />)
      const footer = container.querySelector('footer')
      expect(footer).toBeInTheDocument()
    })
  })

  describe('Hero Section', () => {
    it('should display hero headline', () => {
      render(<Home />)
      expect(
        screen.getByText(/your technical partner for startup acceleration/i)
      ).toBeInTheDocument()
    })

    it('should display location badge', () => {
      render(<Home />)
      expect(screen.getAllByText(/based in madrid, spain/i).length).toBeGreaterThan(0)
    })

    it('should render CTA buttons', () => {
      render(<Home />)
      expect(screen.getByRole('button', { name: /partner with us/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /see how it works/i })).toBeInTheDocument()
    })

    it('should have working CTA links', () => {
      render(<Home />)
      const partnerButton = screen.getByRole('button', { name: /partner with us/i })
      const link = partnerButton.closest('a')
      expect(link).toHaveAttribute('href', '/#contact')
    })

    it('should display hero image', () => {
      render(<Home />)
      const heroImage = screen.getByAltText(/collybrix ai-powered development/i)
      expect(heroImage).toBeInTheDocument()
    })
  })

  describe('Stats Section', () => {
    it('should display all statistics', () => {
      render(<Home />)

      expect(screen.getByText('60%')).toBeInTheDocument()
      expect(screen.getByText(/faster time to market/i)).toBeInTheDocument()

      expect(screen.getByText('100+')).toBeInTheDocument()
      expect(screen.getByText(/teams mentored/i)).toBeInTheDocument()

      expect(screen.getByText('95%')).toBeInTheDocument()
      expect(screen.getByText(/code quality score/i)).toBeInTheDocument()

      expect(screen.getByText('MVP→v1.0')).toBeInTheDocument()
      expect(screen.getAllByText(/solid foundation/i).length).toBeGreaterThan(0)
    })
  })

  describe('Services Section', () => {
    it('should display services section heading', () => {
      render(<Home />)
      expect(screen.getByText(/ai-powered technical excellence/i)).toBeInTheDocument()
    })

    it('should display all service cards', () => {
      render(<Home />)

      expect(screen.getByText(/premier prd generation/i)).toBeInTheDocument()
      expect(screen.getByText(/tech team building/i)).toBeInTheDocument()
      expect(screen.getAllByText(/xtreme programming/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/ai-accelerated development/i).length).toBeGreaterThan(0)
      expect(screen.getByText(/testing & quality assurance/i)).toBeInTheDocument()
      expect(screen.getAllByText(/solid tech foundation/i).length).toBeGreaterThan(0)
    })

    it('should have section anchor for navigation', () => {
      const { container } = render(<Home />)
      const servicesSection = container.querySelector('#services')
      expect(servicesSection).toBeInTheDocument()
    })
  })

  describe('How It Works Section', () => {
    it('should display section heading', () => {
      render(<Home />)
      expect(screen.getByText(/from mvp to market leader/i)).toBeInTheDocument()
    })

    it('should display all benefits', () => {
      render(<Home />)

      expect(screen.getByText(/shorter time to market/i)).toBeInTheDocument()
      expect(screen.getByText(/best practices built-in/i)).toBeInTheDocument()
      expect(screen.getByText(/scale with confidence/i)).toBeInTheDocument()
    })

    it('should display descriptive content', () => {
      render(<Home />)

      expect(
        screen.getByText(/ai-accelerated development reduces your go-to-market timeline by 60%/i)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/xp methodologies ensure quality, testing, and maintainability/i)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/solid technical foundation supports growth from mvp/i)
      ).toBeInTheDocument()
    })

    it('should have section anchor', () => {
      const { container } = render(<Home />)
      const section = container.querySelector('#how-it-works')
      expect(section).toBeInTheDocument()
    })
  })

  describe('Team Section', () => {
    it('should display team section heading', () => {
      render(<Home />)
      expect(
        screen.getByText(/meet the experts behind collybrix/i)
      ).toBeInTheDocument()
    })

    it('should display all team members', () => {
      render(<Home />)

      expect(screen.getByText('Emmanuel Martinez')).toBeInTheDocument()
      expect(screen.getByText('Marina Martin Hernandez')).toBeInTheDocument()
      expect(screen.getByText('Iñigo Rodriguez Sanz')).toBeInTheDocument()
    })

    it('should display team member roles', () => {
      render(<Home />)

      expect(screen.getByText(/co-founder & ceo/i)).toBeInTheDocument()
      expect(screen.getByText(/co-founder & cto/i)).toBeInTheDocument()
      expect(screen.getByText(/co-founder & coo/i)).toBeInTheDocument()
    })

    it('should have section anchor', () => {
      const { container } = render(<Home />)
      const section = container.querySelector('#team')
      expect(section).toBeInTheDocument()
    })
  })

  describe('Contact Form Section', () => {
    it('should display contact section heading', () => {
      render(<Home />)
      expect(
        screen.getByText(/ready to accelerate your technical journey/i)
      ).toBeInTheDocument()
    })

    it('should render all form fields', () => {
      render(<Home />)

      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/company\/organization/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/i am a/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/current stage/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/tell us about your needs/i)).toBeInTheDocument()
    })

    it('should have required fields marked', () => {
      render(<Home />)

      const nameInput = screen.getByLabelText(/full name/i)
      const emailInput = screen.getByLabelText(/email address/i)
      const companyInput = screen.getByLabelText(/company\/organization/i)
      const typeSelect = screen.getByLabelText(/i am a/i)
      const messageTextarea = screen.getByLabelText(/tell us about your needs/i)

      expect(nameInput).toBeRequired()
      expect(emailInput).toBeRequired()
      expect(companyInput).toBeRequired()
      expect(typeSelect).toBeRequired()
      expect(messageTextarea).toBeRequired()
    })

    it('should render submit button', () => {
      render(<Home />)
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
    })

    it('should render schedule demo button', () => {
      render(<Home />)
      const scheduleButton = screen.getByRole('button', { name: /schedule a demo call/i })
      expect(scheduleButton).toBeInTheDocument()

      const link = scheduleButton.closest('a')
      expect(link).toHaveAttribute('href', 'https://calendar.app.google/mnJRSUAvU7nECYDK7')
    })

    it('should have section anchor', () => {
      const { container } = render(<Home />)
      const section = container.querySelector('#contact')
      expect(section).toBeInTheDocument()
    })
  })

  describe('Contact Form Submission', () => {
    it('should submit form with valid data', async () => {
      const user = userEvent.setup()
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
      })

      render(<Home />)

      // Fill out the form
      await user.type(screen.getByLabelText(/full name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email address/i), 'john@example.com')
      await user.type(screen.getByLabelText(/company\/organization/i), 'Test Company')
      await user.selectOptions(screen.getByLabelText(/i am a/i), 'startup')
      await user.type(
        screen.getByLabelText(/tell us about your needs/i),
        'We need help building our MVP'
      )

      // Submit the form
      await user.click(screen.getByRole('button', { name: /send message/i }))

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          'https://api.web3forms.com/submit',
          expect.objectContaining({
            method: 'POST',
          })
        )
      })

      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith('Message sent successfully')
      })
    })

    it('should handle form submission error', async () => {
      const user = userEvent.setup()
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      })

      render(<Home />)

      // Fill out the form with minimum required fields
      await user.type(screen.getByLabelText(/full name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email address/i), 'john@example.com')
      await user.type(screen.getByLabelText(/company\/organization/i), 'Test Company')
      await user.selectOptions(screen.getByLabelText(/i am a/i), 'startup')
      await user.type(
        screen.getByLabelText(/tell us about your needs/i),
        'Test message'
      )

      // Submit the form
      await user.click(screen.getByRole('button', { name: /send message/i }))

      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith(
          'Error sending message',
          expect.objectContaining({
            description: 'Please try again later',
          })
        )
      })
    })

    it('should include access key in form data', async () => {
      const user = userEvent.setup()
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
      })

      render(<Home />)

      await user.type(screen.getByLabelText(/full name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email address/i), 'john@example.com')
      await user.type(screen.getByLabelText(/company\/organization/i), 'Test Company')
      await user.selectOptions(screen.getByLabelText(/i am a/i), 'startup')
      await user.type(screen.getByLabelText(/tell us about your needs/i), 'Test')

      await user.click(screen.getByRole('button', { name: /send message/i }))

      await waitFor(() => {
        const formData = (global.fetch as jest.Mock).mock.calls[0][1].body
        expect(formData.get('access_key')).toBe('897b207e-9ae8-4514-80f9-5f50446e4915')
      })
    })
  })

  describe('Responsive Layout', () => {
    it('should have responsive container classes', () => {
      const { container } = render(<Home />)
      const containers = container.querySelectorAll('.container.mx-auto')
      expect(containers.length).toBeGreaterThan(0)
    })

    it('should have responsive grid layouts', () => {
      const { container } = render(<Home />)
      const grids = container.querySelectorAll('[class*="grid"]')
      expect(grids.length).toBeGreaterThan(0)
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<Home />)
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(0)

      // Check that main headings exist
      const h1s = headings.filter(h => h.tagName === 'H1')
      expect(h1s.length).toBeGreaterThan(0)
    })

    it('should have alt text for all images', () => {
      render(<Home />)
      const images = screen.getAllByRole('img')

      images.forEach(img => {
        expect(img).toHaveAttribute('alt')
        expect(img.getAttribute('alt')).toBeTruthy()
      })
    })

    it('should have form labels', () => {
      render(<Home />)

      // Check for specific form labels
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/tell us about your needs/i)).toBeInTheDocument()
    })
  })

  describe('SEO Elements', () => {
    it('should have meaningful text content', () => {
      const { container } = render(<Home />)
      const textContent = container.textContent || ''

      expect(textContent).toContain('Collybrix')
      expect(textContent).toContain('Madrid')
      expect(textContent).toContain('AI')
      expect(textContent).toContain('startup')
      expect(textContent).toContain('accelerator')
    })
  })
})
