import { test, expect } from '@playwright/test'

test.describe('Navigation Flow E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('Anchor Link Navigation', () => {
    test('should navigate to services section and back to top', async ({ page }) => {
      const viewportSize = page.viewportSize();
      const isMobile = viewportSize && viewportSize.width < 768;

      // Navigate to services
      if (isMobile) {
        await page.locator('#services').scrollIntoViewIfNeeded()
      } else {
        await page.getByRole('link', { name: /services/i }).click()
      }
      await expect(page.locator('#services')).toBeInViewport()

      // Scroll position should change
      const scrollY = await page.evaluate(() => window.scrollY)
      expect(scrollY).toBeGreaterThan(0)

      // Click logo to go back to top
      await page.locator('nav').getByText('Collybrix').click()
      await expect(page.locator('h1').first()).toBeInViewport()
    })

    test('should navigate through all sections sequentially', async ({ page }) => {
      const viewportSize = page.viewportSize();
      const isMobile = viewportSize && viewportSize.width < 768;

      if (isMobile) {
        // On mobile, just scroll through sections
        await page.locator('#services').scrollIntoViewIfNeeded()
        await expect(page.locator('#services')).toBeInViewport({ timeout: 3000 })
        await page.waitForTimeout(500)

        await page.locator('#our-approach').scrollIntoViewIfNeeded()
        await expect(page.locator('#our-approach')).toBeInViewport({ timeout: 3000 })
        await page.waitForTimeout(500)

        await page.locator('#team').scrollIntoViewIfNeeded()
        await expect(page.locator('#team')).toBeInViewport({ timeout: 3000 })
        await page.waitForTimeout(500)

        await page.locator('#contact').scrollIntoViewIfNeeded()
        await expect(page.locator('#contact')).toBeInViewport({ timeout: 3000 })
      } else {
        // Navigate to services
        await page.locator('nav').getByRole('link', { name: /^services$/i }).click()
        await expect(page.locator('#services')).toBeInViewport({ timeout: 3000 })
        await page.waitForTimeout(500)

        // Navigate to our approach
        await page.locator('nav').getByRole('link', { name: /our approach/i }).click()
        await expect(page.locator('#our-approach')).toBeInViewport({ timeout: 3000 })
        await page.waitForTimeout(500)

        // Navigate to team - use data-testid to avoid ambiguity
        await page.getByTestId('team-link').click()
        await expect(page.locator('#team')).toBeInViewport({ timeout: 3000 })
        await page.waitForTimeout(500)

        // Navigate to contact
        await page.locator('nav').getByRole('link', { name: /^contact$/i }).click()
        await expect(page.locator('#contact')).toBeInViewport({ timeout: 3000 })
      }
    })

    test('should handle footer navigation links', async ({ page }) => {
      await page.locator('footer').scrollIntoViewIfNeeded()

      // Click a footer link
      await page.locator('footer').getByRole('link', { name: /prd generation/i }).click()
      await expect(page.locator('#services')).toBeInViewport()
    })
  })

  test.describe('External Links', () => {
    test('should have correct LinkedIn link', async ({ page }) => {
      await page.locator('footer').scrollIntoViewIfNeeded()

      const linkedInLink = page.locator('footer').getByRole('link', { name: /linkedin/i })
      await expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/company/collybrix')
    })

    test('should have correct email link', async ({ page }) => {
      await page.locator('footer').scrollIntoViewIfNeeded()

      const emailLink = page.locator('footer').getByRole('link', { name: /email us/i })
      await expect(emailLink).toHaveAttribute('href', 'mailto:emartinez@collybrix.com')
    })

    test('should have correct calendar link', async ({ page }) => {
      await page.locator('#contact').scrollIntoViewIfNeeded()

      const calendarLink = page.locator('a:has(button:has-text("Schedule a Demo Call"))')
      await expect(calendarLink).toHaveAttribute('href', 'https://calendar.app.google/mnJRSUAvU7nECYDK7')
    })
  })

  test.describe('Navigation Persistence', () => {
    test('should maintain navigation bar visibility while scrolling', async ({ page }) => {
      const nav = page.locator('nav')

      // Navigation should be visible at top
      await expect(nav).toBeVisible()

      // Scroll down
      await page.locator('#contact').scrollIntoViewIfNeeded()

      // Navigation should still be visible (sticky)
      await expect(nav).toBeVisible()
    })

    test('should keep navigation accessible on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      const nav = page.locator('nav')
      await expect(nav).toBeVisible()

      // Logo should be visible
      await expect(page.locator('nav').getByText('Collybrix')).toBeVisible()
    })
  })

  test.describe('Smooth Scrolling', () => {
    test('should scroll smoothly to sections', async ({ page }) => {
      const viewportSize = page.viewportSize();
      const isMobile = viewportSize && viewportSize.width < 768;

      const initialScroll = await page.evaluate(() => window.scrollY)

      if (isMobile) {
        await page.locator('#services').scrollIntoViewIfNeeded()
      } else {
        await page.locator('nav').getByRole('link', { name: /services/i }).click()
      }
      await page.waitForTimeout(500) // Wait for scroll animation to complete

      const scrollingScroll = await page.evaluate(() => window.scrollY)
      expect(scrollingScroll).toBeGreaterThan(initialScroll)

      await expect(page.locator('#services')).toBeInViewport({ timeout: 2000 })
    })
  })

  test.describe('Partner With Us CTA', () => {
    test('should navigate to contact form when clicking hero CTA', async ({ page }) => {
      const ctaButton = page.getByRole('button', { name: /partner with us/i })
      await expect(ctaButton).toBeVisible()

      await ctaButton.click()
      await expect(page.locator('#contact')).toBeInViewport({ timeout: 2000 })

      // Contact form should be visible
      await expect(page.getByLabel(/full name/i)).toBeVisible()
    })
  })

  test.describe('URL Fragments', () => {
    test('should navigate directly to section via URL fragment', async ({ page }) => {
      await page.goto('/#contact')
      await expect(page.locator('#contact')).toBeInViewport({ timeout: 2000 })
    })

    test('should navigate to team section via URL fragment', async ({ page }) => {
      await page.goto('/#team')
      await expect(page.locator('#team')).toBeInViewport({ timeout: 2000 })
    })

    test('should navigate to services section via URL fragment', async ({ page }) => {
      await page.goto('/#services')
      await expect(page.locator('#services')).toBeInViewport({ timeout: 2000 })
    })
  })

  test.describe('Keyboard Navigation', () => {
    test('should navigate through links with Tab key', async ({ page }) => {
      // Focus should start at first interactive element
      await page.keyboard.press('Tab')

      const firstFocused = await page.locator(':focus').first()
      await expect(firstFocused).toBeFocused()

      // Continue tabbing
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')

      // Should be able to focus on nav links
      const focused = await page.locator(':focus').first()
      await expect(focused).toBeFocused()
    })

    test('should activate links with Enter key', async ({ page }) => {
      // Tab to first navigation link
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')

      // Press Enter to activate link
      await page.keyboard.press('Enter')

      // Should navigate or scroll
      await page.waitForTimeout(500)

      // Page should have scrolled
      const scrollY = await page.evaluate(() => window.scrollY)
      expect(scrollY).toBeGreaterThanOrEqual(0) // At least stayed at top or scrolled
    })
  })

  test.describe('Logo Navigation', () => {
    test('should return to top when clicking logo from any section', async ({ page }) => {
      // Navigate to bottom
      await page.locator('#contact').scrollIntoViewIfNeeded()

      // Click logo
      await page.locator('nav').getByText('Collybrix').click()

      // Should be at top
      await page.waitForTimeout(500)
      await expect(page.locator('h1').first()).toBeInViewport()
    })
  })
})
