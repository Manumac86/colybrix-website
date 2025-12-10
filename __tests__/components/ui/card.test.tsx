import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'

describe('Card Components', () => {
  describe('Card', () => {
    it('should render card with content', () => {
      render(<Card>Card content</Card>)
      expect(screen.getByText('Card content')).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      render(<Card className="custom-card">Content</Card>)
      const card = screen.getByText('Content').closest('div')
      expect(card).toHaveClass('custom-card')
    })

    it('should have default card styles', () => {
      render(<Card>Content</Card>)
      const card = screen.getByText('Content').closest('div')
      expect(card).toHaveClass('rounded-xl', 'border', 'bg-card')
    })

    it('should forward ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<Card ref={ref}>Content</Card>)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('CardHeader', () => {
    it('should render header content', () => {
      render(<CardHeader>Header content</CardHeader>)
      expect(screen.getByText('Header content')).toBeInTheDocument()
    })

    it('should apply proper spacing', () => {
      render(<CardHeader>Header</CardHeader>)
      const header = screen.getByText('Header').closest('div')
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6')
    })
  })

  describe('CardTitle', () => {
    it('should render title', () => {
      render(<CardTitle>Card Title</CardTitle>)
      expect(screen.getByText('Card Title')).toBeInTheDocument()
    })

    it('should have proper typography styles', () => {
      render(<CardTitle>Title</CardTitle>)
      const title = screen.getByText('Title').closest('div')
      expect(title).toHaveClass('font-semibold', 'leading-none', 'tracking-tight')
    })
  })

  describe('CardDescription', () => {
    it('should render description', () => {
      render(<CardDescription>Description text</CardDescription>)
      expect(screen.getByText('Description text')).toBeInTheDocument()
    })

    it('should have muted text style', () => {
      render(<CardDescription>Description</CardDescription>)
      const description = screen.getByText('Description').closest('div')
      expect(description).toHaveClass('text-sm', 'text-muted-foreground')
    })
  })

  describe('CardContent', () => {
    it('should render content', () => {
      render(<CardContent>Main content</CardContent>)
      expect(screen.getByText('Main content')).toBeInTheDocument()
    })

    it('should have proper padding', () => {
      render(<CardContent>Content</CardContent>)
      const content = screen.getByText('Content').closest('div')
      expect(content).toHaveClass('p-6', 'pt-0')
    })
  })

  describe('CardFooter', () => {
    it('should render footer', () => {
      render(<CardFooter>Footer content</CardFooter>)
      expect(screen.getByText('Footer content')).toBeInTheDocument()
    })

    it('should have flex layout', () => {
      render(<CardFooter>Footer</CardFooter>)
      const footer = screen.getByText('Footer').closest('div')
      expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0')
    })
  })

  describe('Complete Card Structure', () => {
    it('should render complete card with all components', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
          <CardContent>Test Content</CardContent>
          <CardFooter>Test Footer</CardFooter>
        </Card>
      )

      expect(screen.getByText('Test Title')).toBeInTheDocument()
      expect(screen.getByText('Test Description')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
      expect(screen.getByText('Test Footer')).toBeInTheDocument()
    })

    it('should maintain proper DOM structure', () => {
      const { container } = render(
        <Card data-testid="card">
          <CardHeader data-testid="header">
            <CardTitle>Title</CardTitle>
          </CardHeader>
          <CardContent data-testid="content">Content</CardContent>
        </Card>
      )

      const card = container.querySelector('[data-testid="card"]') as HTMLElement
      const header = container.querySelector('[data-testid="header"]') as HTMLElement
      const content = container.querySelector('[data-testid="content"]') as HTMLElement

      expect(card).toContainElement(header)
      expect(card).toContainElement(content)
    })
  })

  describe('Customization', () => {
    it('should support custom props on all components', () => {
      render(
        <Card data-testid="card">
          <CardHeader data-testid="header">Header</CardHeader>
          <CardTitle data-testid="title">Title</CardTitle>
          <CardDescription data-testid="description">Description</CardDescription>
          <CardContent data-testid="content">Content</CardContent>
          <CardFooter data-testid="footer">Footer</CardFooter>
        </Card>
      )

      expect(screen.getByTestId('card')).toBeInTheDocument()
      expect(screen.getByTestId('header')).toBeInTheDocument()
      expect(screen.getByTestId('title')).toBeInTheDocument()
      expect(screen.getByTestId('description')).toBeInTheDocument()
      expect(screen.getByTestId('content')).toBeInTheDocument()
      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })

    it('should merge custom classNames with defaults', () => {
      render(
        <Card className="custom-bg">
          <CardHeader className="custom-header">Header</CardHeader>
        </Card>
      )

      const card = screen.getByText('Header').closest('div')?.parentElement
      expect(card).toHaveClass('custom-bg', 'rounded-xl', 'border')

      const header = screen.getByText('Header').closest('div')
      expect(header).toHaveClass('custom-header', 'flex', 'flex-col')
    })
  })
})
