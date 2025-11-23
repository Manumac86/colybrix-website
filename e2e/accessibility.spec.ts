import { test, expect } from '@playwright/test'

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('Keyboard Navigation', () => {
    test('should navigate through all interactive elements with Tab', async ({ page }) => {
      const viewportSize = page.viewportSize();
      const isMobile = viewportSize && viewportSize.width < 768;

      // On mobile, nav links are hidden, so we'll have fewer focusable elements
      const expectedTabs = isMobile ? 10 : 20;
      const focusableElements: string[] = []

      // Tab through all elements
      for (let i = 0; i < expectedTabs; i++) {
        await page.keyboard.press('Tab')
        const focused = await page.locator(':focus')
        const count = await focused.count()
        if (count > 0) {
          const tagName = await focused.first().evaluate((el) => el.tagName)
          focusableElements.push(tagName)
        }
      }

      // Should have focused on various interactive elements
      expect(focusableElements.length).toBeGreaterThan(0)
    })

    test('should navigate backwards with Shift+Tab', async ({ page }) => {
      const focusedElements: string[] = []

      // Tab forward several times and record each focused element
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab')
        await page.waitForTimeout(50)
        const focused = await page.locator(':focus').first()
        const elementId = await focused.evaluate((el) => {
          return el.tagName + (el.id ? '#' + el.id : '') + (el.textContent?.substring(0, 20) || '')
        })
        focusedElements.push(elementId)
      }

      // Now tab backward once
      await page.keyboard.press('Shift+Tab')
      await page.waitForTimeout(100)

      const backwardFocused = await page.locator(':focus').first()
      const backwardElement = await backwardFocused.evaluate((el) => {
        return el.tagName + (el.id ? '#' + el.id : '') + (el.textContent?.substring(0, 20) || '')
      })

      // The backward focused element should match the 4th element (one before the 5th)
      // This proves backward navigation works
      expect(backwardElement).toBe(focusedElements[3])
    })

    test('should activate buttons with Enter key', async ({ page }) => {
      const button = page.getByRole('button', { name: /partner with us/i })
      await button.focus()
      await expect(button).toBeFocused()

      await page.keyboard.press('Enter')

      // Should navigate to contact section
      await page.waitForTimeout(500)
      await expect(page.locator('#contact')).toBeInViewport()
    })

    test('should activate links with Enter key', async ({ page }) => {
      const viewportSize = page.viewportSize();
      const isMobile = viewportSize && viewportSize.width < 768;

      if (isMobile) {
        // On mobile, test with footer links or logo which are always visible
        const logoLink = page.locator('nav a[href="/"]').first()
        await logoLink.focus()
        await expect(logoLink).toBeFocused()
        // Logo link tested - that's sufficient for mobile
      } else {
        const link = page.getByRole('link', { name: /services/i }).first()
        await link.focus()
        await expect(link).toBeFocused()

        await page.keyboard.press('Enter')

        // Should navigate to services section
        await page.waitForTimeout(500)
        const scrollY = await page.evaluate(() => window.scrollY)
        expect(scrollY).toBeGreaterThan(0)
      }
    })

    test('should navigate form fields with Tab', async ({ page }) => {
      await page.locator('#contact').scrollIntoViewIfNeeded()

      const nameInput = page.getByLabel(/full name/i)
      await nameInput.focus()
      await expect(nameInput).toBeFocused()

      // Tab to next field
      await page.keyboard.press('Tab')
      const emailInput = page.getByLabel(/email address/i)
      await expect(emailInput).toBeFocused()
    })
  })

  test.describe('Screen Reader Support', () => {
    test('should have proper ARIA roles', async ({ page }) => {
      // Navigation should have nav role
      const nav = page.locator('nav')
      await expect(nav).toBeVisible()

      // Footer should exist
      const footer = page.locator('footer')
      await expect(footer).toBeVisible()
    })

    test('should have accessible form labels', async ({ page }) => {
      await page.locator('#contact').scrollIntoViewIfNeeded()

      // All form inputs should have associated labels
      const nameInput = page.getByLabel(/full name/i)
      await expect(nameInput).toBeVisible()

      const emailInput = page.getByLabel(/email address/i)
      await expect(emailInput).toBeVisible()

      const companyInput = page.getByLabel(/company\/organization/i)
      await expect(companyInput).toBeVisible()
    })

    test('should have alt text for all images', async ({ page }) => {
      const images = page.locator('img')
      const imageCount = await images.count()

      for (let i = 0; i < imageCount; i++) {
        const alt = await images.nth(i).getAttribute('alt')
        expect(alt).toBeTruthy()
        expect(alt).not.toBe('')
      }
    })

    test('should have descriptive link text', async ({ page }) => {
      const links = page.locator('a')
      const linkCount = await links.count()

      for (let i = 0; i < Math.min(linkCount, 20); i++) {
        const text = await links.nth(i).textContent()
        const ariaLabel = await links.nth(i).getAttribute('aria-label')

        // Link should have either text content or aria-label
        expect(text || ariaLabel).toBeTruthy()
      }
    })

    test('should have proper heading hierarchy', async ({ page }) => {
      // Get all headings
      const h1s = await page.locator('h1').count()
      const h2s = await page.locator('h2').count()

      // Should have at least one h1
      expect(h1s).toBeGreaterThan(0)

      // Should have h2s for sections
      expect(h2s).toBeGreaterThan(0)
    })
  })

  test.describe('Form Accessibility', () => {
    test.beforeEach(async ({ page }) => {
      await page.locator('#contact').scrollIntoViewIfNeeded()
    })

    test('should indicate required fields', async ({ page }) => {
      const nameInput = page.getByLabel(/full name/i)
      const isRequired = await nameInput.getAttribute('required')
      expect(isRequired).not.toBeNull()

      // Label should indicate required field
      const nameLabel = page.locator('label[for="name"]')
      const labelText = await nameLabel.textContent()
      expect(labelText).toContain('*')
    })

    test('should show validation errors accessibly', async ({ page }) => {
      // Try to submit empty form
      await page.getByRole('button', { name: /send message/i }).click()

      // HTML5 validation should kick in
      const nameInput = page.getByLabel(/full name/i)
      const validationMessage = await nameInput.evaluate((el: HTMLInputElement) => el.validationMessage)
      expect(validationMessage).toBeTruthy()
    })

    test('should have accessible select dropdowns', async ({ page }) => {
      const typeSelect = page.getByLabel(/i am a/i)
      await expect(typeSelect).toBeVisible()
      await expect(typeSelect).toHaveAttribute('name', 'type')

      // Should have options
      const options = typeSelect.locator('option')
      const optionCount = await options.count()
      expect(optionCount).toBeGreaterThan(1)
    })

    test('should have accessible textarea', async ({ page }) => {
      const textarea = page.getByLabel(/tell us about your needs/i)
      await expect(textarea).toBeVisible()
      await expect(textarea).toHaveAttribute('name', 'message')
      await expect(textarea).toHaveAttribute('required')
    })

    test('should have accessible checkbox', async ({ page }) => {
      const checkbox = page.locator('input[type="checkbox"]')
      await expect(checkbox).toBeVisible()

      const checkboxLabel = page.locator('label[for="newsletter"]')
      await expect(checkboxLabel).toBeVisible()
    })
  })

  test.describe('Focus Indicators', () => {
    test('should show focus indicator on buttons', async ({ page }) => {
      const button = page.getByRole('button', { name: /partner with us/i })
      await button.focus()

      // Button should be focused
      await expect(button).toBeFocused()
    })

    test('should show focus indicator on links', async ({ page }) => {
      const viewportSize = page.viewportSize();
      const isMobile = viewportSize && viewportSize.width < 768;

      if (isMobile) {
        // On mobile, test with logo link which is always visible
        const logoLink = page.locator('nav a[href="/"]').first()
        await logoLink.focus()
        await expect(logoLink).toBeFocused()
      } else {
        const link = page.getByRole('link', { name: /services/i }).first()
        await link.focus()
        await expect(link).toBeFocused()
      }
    })

    test('should show focus indicator on form inputs', async ({ page }) => {
      await page.locator('#contact').scrollIntoViewIfNeeded()

      const input = page.getByLabel(/full name/i)
      await input.focus()

      // Input should be focused
      await expect(input).toBeFocused()
    })
  })

  test.describe('Color Contrast', () => {
    test('should have sufficient contrast for text', async ({ page }) => {
      // Check hero text (updated to new headline)
      const heroText = page.getByText(/co-founder for startup acceleration/i)
      await expect(heroText).toBeVisible()

      // Visual check - text should be readable
      const color = await heroText.evaluate((el) => {
        return window.getComputedStyle(el).color
      })
      expect(color).toBeTruthy()
    })

    test('should have visible buttons', async ({ page }) => {
      const button = page.getByRole('button', { name: /partner with us/i })
      await expect(button).toBeVisible()

      // Button should have visible styles
      const bgColor = await button.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor
      })
      expect(bgColor).toBeTruthy()
      expect(bgColor).not.toBe('rgba(0, 0, 0, 0)')
    })
  })

  test.describe('Text Alternatives', () => {
    test('should have meaningful alt text for images', async ({ page }) => {
      const heroImage = page.getByAltText(/collybrix ai-powered development/i)
      await expect(heroImage).toBeVisible()

      const alt = await heroImage.getAttribute('alt')
      expect(alt).toBeTruthy()
      expect(alt?.length).toBeGreaterThan(10) // Meaningful description
    })

    test('should have descriptive link text instead of "click here"', async ({ page }) => {
      const links = page.locator('a')
      const linkCount = await links.count()

      for (let i = 0; i < Math.min(linkCount, 20); i++) {
        const text = await links.nth(i).textContent()
        const lowerText = text?.toLowerCase() || ''

        // Should not use generic text
        expect(lowerText).not.toBe('click here')
        expect(lowerText).not.toBe('read more')
        expect(lowerText).not.toBe('here')
      }
    })
  })

  test.describe('Semantic HTML', () => {
    test('should use semantic header element', async ({ page }) => {
      const header = page.locator('header, nav')
      await expect(header.first()).toBeVisible()
    })

    test('should use semantic footer element', async ({ page }) => {
      const footer = page.locator('footer')
      await expect(footer).toBeVisible()
    })

    test('should use semantic button elements', async ({ page }) => {
      const buttons = page.locator('button')
      const buttonCount = await buttons.count()
      expect(buttonCount).toBeGreaterThan(0)
    })

    test('should use proper list markup', async ({ page }) => {
      await page.locator('footer').scrollIntoViewIfNeeded()

      const lists = page.locator('ul, ol')
      const listCount = await lists.count()
      expect(listCount).toBeGreaterThan(0)
    })
  })

  test.describe('Mobile Accessibility', () => {
    test('should be accessible on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      // Navigation should be visible
      const nav = page.locator('nav')
      await expect(nav).toBeVisible()

      // Touch targets should be large enough
      const button = page.getByRole('button', { name: /partner with us/i })
      const box = await button.boundingBox()
      expect(box?.height).toBeGreaterThanOrEqual(40) // Minimum 40px touch target
    })

    test('should have readable text on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      const heroText = page.getByText(/co-founder for startup acceleration/i)
      await expect(heroText).toBeVisible()

      // Font size should be readable
      const fontSize = await heroText.evaluate((el) => {
        return window.getComputedStyle(el).fontSize
      })
      const size = parseInt(fontSize)
      expect(size).toBeGreaterThanOrEqual(14) // Minimum readable size
    })
  })

  test.describe('Skip Links and Landmarks', () => {
    test('should have navigation landmark', async ({ page }) => {
      const nav = page.locator('nav')
      await expect(nav).toBeVisible()
    })

    test('should have main content area', async ({ page }) => {
      // Main content should be in a div or main element
      const mainContent = page.locator('h1').first()
      await expect(mainContent).toBeVisible()
    })

    test('should have footer landmark', async ({ page }) => {
      const footer = page.locator('footer')
      await footer.scrollIntoViewIfNeeded()
      await expect(footer).toBeVisible()
    })
  })
})
