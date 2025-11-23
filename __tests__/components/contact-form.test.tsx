import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '@/components/contact-form'
import { toast } from 'sonner'

// Mock the toast function
jest.mock('sonner', () => ({
  toast: jest.fn(),
  Toaster: () => null,
}))

// Mock Radix UI Select to work in jsdom environment
// This simplified mock avoids pointer capture issues in jsdom
jest.mock('@/components/ui/select', () => {
  const React = require('react')

  return {
    Select: ({ children, onValueChange }: any) => {
      // Recursively clone children and pass down onValueChange
      const cloneWithProps = (child: any): any => {
        if (!React.isValidElement(child)) return child

        const props: any = { onValueChange }

        if (child.props.children) {
          props.children = React.Children.map(child.props.children, cloneWithProps)
        }

        return React.cloneElement(child, props)
      }

      return <div data-testid="select-mock">{React.Children.map(children, cloneWithProps)}</div>
    },
    SelectTrigger: React.forwardRef(({ children, className, ...props }: any, ref: any) => (
      // Use a button to make it accessible and support aria-labelledby
      <button
        ref={ref}
        type="button"
        data-testid="select-trigger"
        className={className}
        {...props}
      >
        {children}
      </button>
    )),
    SelectValue: ({ placeholder }: any) => <span>{placeholder}</span>,
    SelectContent: ({ children, onValueChange }: any) => {
      // Always render options (no open/close state needed for tests)
      return (
        <div data-testid="select-content">
          {React.Children.map(children, (child: any) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { onValueChange })
            }
            return child
          })}
        </div>
      )
    },
    SelectItem: ({ value, children, onValueChange }: any) => (
      <button
        role="option"
        data-value={value}
        onClick={() => onValueChange?.(value)}
        type="button"
      >
        {children}
      </button>
    ),
  }
})

describe('ContactForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock) = jest.fn()
  })

  describe('Form Rendering', () => {
    it('should render all form fields', () => {
      render(<ContactForm />)

      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/company\/organization/i)).toBeInTheDocument()
      // For Select fields with mocked components, check for the label text instead
      expect(screen.getByText(/i am a\.\.\. \*/i)).toBeInTheDocument()
      expect(screen.getByText(/current stage/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/tell us about your needs/i)).toBeInTheDocument()
    })

    it('should render submit button', () => {
      render(<ContactForm />)
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
    })

    it('should render schedule demo button', () => {
      render(<ContactForm />)
      const scheduleButton = screen.getByRole('button', { name: /schedule a demo call/i })
      expect(scheduleButton).toBeInTheDocument()

      const link = scheduleButton.closest('a')
      expect(link).toHaveAttribute('href', 'https://calendar.app.google/mnJRSUAvU7nECYDK7')
    })

    it('should render newsletter checkbox', () => {
      render(<ContactForm />)
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeInTheDocument()
    })

    it('should render privacy policy text', () => {
      render(<ContactForm />)
      expect(
        screen.getByText(/by submitting this form, you agree to our privacy policy/i)
      ).toBeInTheDocument()
    })
  })

  describe('Form Validation', () => {
    it('should show validation error for empty name', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)

      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      await waitFor(() => {
        // Use exact match to avoid matching "Company name must be at least 2 characters"
        expect(screen.getByText('Name must be at least 2 characters.')).toBeInTheDocument()
      })
    })

    it('should display all validation errors at once', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)

      // Submit form without filling any fields
      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      // Multiple validation errors should appear
      await waitFor(() => {
        expect(screen.getByText('Name must be at least 2 characters.')).toBeInTheDocument()
        expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument()
        expect(screen.getByText('Company name must be at least 2 characters.')).toBeInTheDocument()
        expect(screen.getByText('Please select an option.')).toBeInTheDocument()
        expect(screen.getByText('Message must be at least 10 characters.')).toBeInTheDocument()
      })

      // Verify form was not submitted
      expect(global.fetch).not.toHaveBeenCalled()
    })

    it('should show validation error for short company name', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)

      const companyInput = screen.getByLabelText(/company\/organization/i)
      await user.type(companyInput, 'A')

      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(
          screen.getByText(/company name must be at least 2 characters/i)
        ).toBeInTheDocument()
      })
    })

    it('should show validation error for short message', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)

      const nameInput = screen.getByLabelText(/full name/i)
      const emailInput = screen.getByLabelText(/email address/i)
      const companyInput = screen.getByLabelText(/company\/organization/i)
      const messageInput = screen.getByLabelText(/tell us about your needs/i)

      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(companyInput, 'Test Company')
      await user.type(messageInput, 'Short')

      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(
          screen.getByText(/message must be at least 10 characters/i)
        ).toBeInTheDocument()
      })
    })

    it('should require type selection', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)

      const nameInput = screen.getByLabelText(/full name/i)
      const emailInput = screen.getByLabelText(/email address/i)
      const companyInput = screen.getByLabelText(/company\/organization/i)
      const messageInput = screen.getByLabelText(/tell us about your needs/i)

      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(companyInput, 'Test Company')
      await user.type(messageInput, 'This is a test message')

      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/please select an option/i)).toBeInTheDocument()
      })
    })
  })

  describe('Form Submission', () => {
    it('should submit form with valid data', async () => {
      const user = userEvent.setup()
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
      })

      render(<ContactForm />)

      // Fill out the form
      const nameInput = screen.getByLabelText(/full name/i)
      const emailInput = screen.getByLabelText(/email address/i)
      const companyInput = screen.getByLabelText(/company\/organization/i)
      const messageInput = screen.getByLabelText(/tell us about your needs/i)

      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(companyInput, 'Test Company')
      await user.type(messageInput, 'We need help building our MVP')

      // Select type - with mocked Select, options are always visible
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

      render(<ContactForm />)

      const nameInput = screen.getByLabelText(/full name/i)
      const emailInput = screen.getByLabelText(/email address/i)
      const companyInput = screen.getByLabelText(/company\/organization/i)
      const messageInput = screen.getByLabelText(/tell us about your needs/i)

      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(companyInput, 'Test Company')
      await user.type(messageInput, 'Test message for error')

      // Select type - with mocked Select, options are always visible
      const investorOption = screen.getByRole('option', { name: /investor/i })
      await user.click(investorOption)

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

      render(<ContactForm />)

      const nameInput = screen.getByLabelText(/full name/i)
      const emailInput = screen.getByLabelText(/email address/i)
      const companyInput = screen.getByLabelText(/company\/organization/i)
      const messageInput = screen.getByLabelText(/tell us about your needs/i)

      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(companyInput, 'Test Company')
      await user.type(messageInput, 'Test message content')

      // Select type - with mocked Select, options are always visible
      const otherOption = screen.getByRole('option', { name: /other/i })
      await user.click(otherOption)

      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      await waitFor(() => {
        const formData = (global.fetch as jest.Mock).mock.calls[0][1].body
        expect(formData.get('access_key')).toBe('897b207e-9ae8-4514-80f9-5f50446e4915')
      })
    })

    it('should disable submit button while submitting', async () => {
      const user = userEvent.setup()
      ;(global.fetch as jest.Mock).mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ ok: true, status: 200 }), 100)
          )
      )

      render(<ContactForm />)

      const nameInput = screen.getByLabelText(/full name/i)
      const emailInput = screen.getByLabelText(/email address/i)
      const companyInput = screen.getByLabelText(/company\/organization/i)
      const messageInput = screen.getByLabelText(/tell us about your needs/i)

      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(companyInput, 'Test Company')
      await user.type(messageInput, 'Test message for loading state')

      // Select type - with mocked Select, options are always visible
      const startupOption = screen.getByRole('option', { name: /startup founder/i })
      await user.click(startupOption)

      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      // Check that button shows "Sending..." and is disabled
      await waitFor(() => {
        const sendingButton = screen.getByRole('button', { name: /sending/i })
        expect(sendingButton).toBeInTheDocument()
        expect(sendingButton).toBeDisabled()
      })

      // Wait for submission to complete
      await waitFor(
        () => {
          expect(toast).toHaveBeenCalledWith('Message sent successfully')
        },
        { timeout: 2000 }
      )
    })

    it('should reset form after successful submission', async () => {
      const user = userEvent.setup()
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
      })

      render(<ContactForm />)

      const nameInput = screen.getByLabelText(/full name/i) as HTMLInputElement
      const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement
      const companyInput = screen.getByLabelText(/company\/organization/i) as HTMLInputElement
      const messageInput = screen.getByLabelText(/tell us about your needs/i) as HTMLTextAreaElement

      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(companyInput, 'Test Company')
      await user.type(messageInput, 'Test message content')

      // Select type - with mocked Select, options are always visible
      const startupOption = screen.getByRole('option', { name: /startup founder/i })
      await user.click(startupOption)

      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith('Message sent successfully')
      })

      // Check that form fields are cleared
      await waitFor(() => {
        expect(nameInput.value).toBe('')
        expect(emailInput.value).toBe('')
        expect(companyInput.value).toBe('')
        expect(messageInput.value).toBe('')
      })
    })

    it('should handle optional stage field', async () => {
      const user = userEvent.setup()
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
      })

      render(<ContactForm />)

      const nameInput = screen.getByLabelText(/full name/i)
      const emailInput = screen.getByLabelText(/email address/i)
      const companyInput = screen.getByLabelText(/company\/organization/i)
      const messageInput = screen.getByLabelText(/tell us about your needs/i)

      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(companyInput, 'Test Company')
      await user.type(messageInput, 'Test message with stage')

      // Select type - with mocked Select, options are always visible
      const startupOption = screen.getByRole('option', { name: /startup founder/i })
      await user.click(startupOption)

      // Select stage (optional field) - with mocked Select, options are always visible
      const mvpOption = screen.getByRole('option', { name: /building mvp/i })
      await user.click(mvpOption)

      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      await waitFor(() => {
        const formData = (global.fetch as jest.Mock).mock.calls[0][1].body
        expect(formData.get('stage')).toBe('mvp')
      })
    })

    it('should handle newsletter checkbox', async () => {
      const user = userEvent.setup()
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
      })

      render(<ContactForm />)

      const nameInput = screen.getByLabelText(/full name/i)
      const emailInput = screen.getByLabelText(/email address/i)
      const companyInput = screen.getByLabelText(/company\/organization/i)
      const messageInput = screen.getByLabelText(/tell us about your needs/i)
      const newsletterCheckbox = screen.getByRole('checkbox')

      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(companyInput, 'Test Company')
      await user.type(messageInput, 'Test message with newsletter')
      await user.click(newsletterCheckbox)

      // Select type - with mocked Select, options are always visible
      const startupOption = screen.getByRole('option', { name: /startup founder/i })
      await user.click(startupOption)

      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      await waitFor(() => {
        const formData = (global.fetch as jest.Mock).mock.calls[0][1].body
        expect(formData.get('newsletter')).toBe('yes')
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper form labels', () => {
      render(<ContactForm />)

      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/company\/organization/i)).toBeInTheDocument()
      // For Select fields with mocked components, check for the label text instead
      expect(screen.getByText(/i am a\.\.\. \*/i)).toBeInTheDocument()
      expect(screen.getByText(/current stage/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/tell us about your needs/i)).toBeInTheDocument()
    })

    it('should have required indicators in labels', () => {
      render(<ContactForm />)

      expect(screen.getByText(/full name \*/i)).toBeInTheDocument()
      expect(screen.getByText(/email address \*/i)).toBeInTheDocument()
      expect(screen.getByText(/company\/organization \*/i)).toBeInTheDocument()
      expect(screen.getByText(/i am a\.\.\. \*/i)).toBeInTheDocument()
      expect(screen.getByText(/tell us about your needs \*/i)).toBeInTheDocument()
    })
  })
})
