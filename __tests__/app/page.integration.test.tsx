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

// Mock Radix UI Select to work in jsdom environment
const SelectContext = React.createContext<{onValueChange?: (value: string) => void}>({})

jest.mock('@/components/ui/select', () => ({
  Select: ({ children, onValueChange }: any) => {
    return (
      <SelectContext.Provider value={{ onValueChange }}>
        <div data-testid="select-root">{children}</div>
      </SelectContext.Provider>
    )
  },
  SelectTrigger: React.forwardRef(({ children, className, ...props }: any, ref: any) => (
    <button ref={ref} className={className} type="button" {...props}>
      {children}
    </button>
  )),
  SelectValue: ({ placeholder }: any) => <span>{placeholder}</span>,
  SelectContent: ({ children }: any) => <div>{children}</div>,
  SelectItem: ({ children, value }: any) => {
    const context = React.useContext(SelectContext)
    return (
      <button
        role="option"
        onClick={() => {
          if (context.onValueChange) {
            context.onValueChange(value)
          }
        }}
      >
        {children}
      </button>
    )
  },
}))

describe('Home Page Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock) = jest.fn()
  })

  describe('Page Rendering', () => {
    it('should render the complete home page', () => {
      render(<Home />)

      // Check for main sections (Co-Founder text is split across lines in the code)
      expect(screen.getByText(/co-founder for startup acceleration/i)).toBeInTheDocument()
      expect(screen.getByText(/ai-powered technical excellence/i)).toBeInTheDocument()
      expect(screen.getByText(/from mvp to market leader/i)).toBeInTheDocument()
    })

    it('should render hero section', () => {
      render(<Home />)
      expect(screen.getByText(/partner with us/i)).toBeInTheDocument()
    })

    it('should render services section', () => {
      const { container } = render(<Home />)
      const servicesSection = container.querySelector('#services')
      expect(servicesSection).toBeInTheDocument()
    })
  })

  describe('Hero Section', () => {
    it('should display hero headline', () => {
      render(<Home />)
      expect(
        screen.getByText(/your technical.*co-founder for startup acceleration/i)
      ).toBeInTheDocument()
    })

    it('should render hero video', () => {
      const { container } = render(<Home />)
      // Check for video element
      const video = container.querySelector('video')
      expect(video).toBeInTheDocument()
    })

    it('should render CTA buttons', () => {
      render(<Home />)
      expect(screen.getByRole('button', { name: /partner with us/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /our approach/i })).toBeInTheDocument()
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

      expect(screen.getByText('10+')).toBeInTheDocument()
      expect(screen.getByText(/methodologies adapted/i)).toBeInTheDocument()

      expect(screen.getByText('100%')).toBeInTheDocument()
      expect(screen.getByText(/code quality guaranteed/i)).toBeInTheDocument()

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
      expect(screen.getAllByText(/our own proven methodologies/i).length).toBeGreaterThan(0)
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

  describe('Our Approach Section', () => {
    it('should display section heading', () => {
      render(<Home />)
      expect(screen.getByText(/from mvp to market leader/i)).toBeInTheDocument()
    })

    it('should display all benefits', () => {
      render(<Home />)

      expect(screen.getByText(/shorter time to market/i)).toBeInTheDocument()
      expect(screen.getAllByText(/proven methodologies/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/solid foundation to scale/i).length).toBeGreaterThan(0)
    })

    it('should display descriptive content', () => {
      render(<Home />)

      expect(
        screen.getByText(/ai-accelerated development reduces your go-to-market timeline by 60%/i)
      ).toBeInTheDocument()
      expect(
        screen.getAllByText(/our own proven methodologies.*ensure quality, testing, and maintainability/i).length
      ).toBeGreaterThan(0)
      expect(
        screen.getByText(/solid technical foundation supports growth from mvp/i)
      ).toBeInTheDocument()
    })

    it('should have section anchor', () => {
      const { container } = render(<Home />)
      const section = container.querySelector('#our-approach')
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

    it('should render contact form component', () => {
      render(<Home />)

      // Verify form fields are rendered (from ContactForm component)
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/company\/organization/i)).toBeInTheDocument()
      // Check for Select labels by text (Select uses custom components, not standard form controls)
      expect(screen.getByText(/i am a\.\.\. \*/i)).toBeInTheDocument()
      expect(screen.getByText(/current stage/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/tell us about your needs/i)).toBeInTheDocument()
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

  describe('Contact Form Submission Integration', () => {
    it('should submit form with valid data', async () => {
      const user = userEvent.setup()
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
      })

      render(<Home />)

      // Fill out the form
      const nameInput = screen.getByLabelText(/full name/i)
      const emailInput = screen.getByLabelText(/email address/i)
      const companyInput = screen.getByLabelText(/company\/organization/i)
      const messageInput = screen.getByLabelText(/tell us about your needs/i)

      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(companyInput, 'Test Company')
      await user.type(messageInput, 'We need help building our MVP')

      // Select type - with mock, options are always visible
      const startupOption = screen.getByRole('option', { name: /startup founder/i })
      await user.click(startupOption)

      // Submit the form
      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

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
      const nameInput = screen.getByLabelText(/full name/i)
      const emailInput = screen.getByLabelText(/email address/i)
      const companyInput = screen.getByLabelText(/company\/organization/i)
      const messageInput = screen.getByLabelText(/tell us about your needs/i)

      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(companyInput, 'Test Company')
      await user.type(messageInput, 'Test message content')

      // Select type - with mock, options are always visible
      const startupOption = screen.getByRole('option', { name: /startup founder/i })
      await user.click(startupOption)

      // Submit the form
      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

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

      const nameInput = screen.getByLabelText(/full name/i)
      const emailInput = screen.getByLabelText(/email address/i)
      const companyInput = screen.getByLabelText(/company\/organization/i)
      const messageInput = screen.getByLabelText(/tell us about your needs/i)

      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(companyInput, 'Test Company')
      await user.type(messageInput, 'Test message content')

      // Select type - with mock, options are always visible
      const startupOption = screen.getByRole('option', { name: /startup founder/i })
      await user.click(startupOption)

      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      await waitFor(() => {
        const formData = (global.fetch as jest.Mock).mock.calls[0][1].body
        expect(formData.get('access_key')).toBe('897b207e-9ae8-4514-80f9-5f50446e4915')
      })
    })

    it('should validate form fields before submission', async () => {
      const user = userEvent.setup()
      render(<Home />)

      // Try to submit empty form
      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      // Should show validation errors (React Hook Form shows errors for all required fields)
      await waitFor(() => {
        // Check for any validation error message
        expect(screen.getByText("Name must be at least 2 characters.")).toBeInTheDocument()
      })

      // Fetch should not be called
      expect(global.fetch).not.toHaveBeenCalled()
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
      // Madrid appears in the footer
      expect(textContent).toContain('AI')
      expect(textContent).toContain('startup')
      expect(textContent).toContain('accelerat')  // matches "accelerate", "accelerator", "acceleration"
    })
  })
})
