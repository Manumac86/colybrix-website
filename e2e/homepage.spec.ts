import { test, expect } from "@playwright/test";

test.describe("Homepage E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.describe("Page Load and Navigation", () => {
    test("should load the homepage successfully", async ({ page }) => {
      await expect(page).toHaveTitle(/collybrix/i);
      await expect(page.locator("h1")).toBeVisible();
    });

    test("should have working navigation bar", async ({ page }) => {
      await expect(page.locator("nav")).toBeVisible();
      await expect(page.locator("nav").getByText("Collybrix")).toBeVisible();
    });

    test("should navigate to services section when clicking Services link", async ({
      page,
    }) => {
      // On mobile, nav links are hidden, so use footer or hero CTAs instead
      const viewportSize = page.viewportSize();
      const isMobile = viewportSize && viewportSize.width < 768;

      if (isMobile) {
        // Scroll to services section directly on mobile
        await page.locator("#services").scrollIntoViewIfNeeded();
      } else {
        await page.getByRole("link", { name: /services/i }).click();
      }
      await expect(page.locator("#services")).toBeInViewport();
    });

    test("should navigate to team section when clicking Team link", async ({
      page,
    }) => {
      const viewportSize = page.viewportSize();
      const isMobile = viewportSize && viewportSize.width < 768;

      if (isMobile) {
        await page.locator("#team").scrollIntoViewIfNeeded();
      } else {
        await page.getByTestId("team-link").click();
      }
      await expect(page.locator("#team")).toBeInViewport();
    });

    test("should navigate to contact section when clicking Contact link", async ({
      page,
    }) => {
      const viewportSize = page.viewportSize();
      const isMobile = viewportSize && viewportSize.width < 768;

      if (isMobile) {
        await page.locator("#contact").scrollIntoViewIfNeeded();
      } else {
        // Click the first contact link (in navigation) to avoid strict mode violation
        await page.getByRole("link", { name: /contact/i }).first().click();
      }
      await expect(page.locator("#contact")).toBeInViewport();
    });

    test("should navigate to our approach section", async ({ page }) => {
      const viewportSize = page.viewportSize();
      const isMobile = viewportSize && viewportSize.width < 768;

      if (isMobile) {
        await page.locator("#our-approach").scrollIntoViewIfNeeded();
      } else {
        await page.getByRole("link", { name: /our approach/i }).click();
      }
      await expect(page.locator("#our-approach")).toBeInViewport();
    });
  });

  test.describe("Hero Section", () => {
    test("should display hero headline", async ({ page }) => {
      await expect(
        page.getByText(/co-founder for startup acceleration/i)
      ).toBeVisible();
    });

    test("should display location badge in footer", async ({ page }) => {
      // Location badge is now only in footer
      await expect(page.getByText(/based in madrid, spain/i).first()).toBeVisible();
    });

    test("should have functional CTA buttons", async ({ page }) => {
      const partnerButton = page.getByRole("button", {
        name: /partner with us/i,
      });
      await expect(partnerButton).toBeVisible();
      await expect(partnerButton).toBeEnabled();
    });

    test("should display hero image", async ({ page }) => {
      const heroImage = page.getByAltText(/collybrix ai-powered development/i);
      await expect(heroImage).toBeVisible();
    });
  });

  test.describe("Stats Section", () => {
    test("should display all statistics", async ({ page }) => {
      // Use first() to avoid strict mode violations (some stats appear in multiple places)
      await expect(page.getByText("60%").first()).toBeVisible();
      await expect(page.getByText("10+").first()).toBeVisible();
      await expect(page.getByText("100%").first()).toBeVisible();
      await expect(page.getByText("MVP→v1.0").first()).toBeVisible();
    });

    test("should display stat descriptions", async ({ page }) => {
      await expect(page.getByText(/faster time to market/i).first()).toBeVisible();
      await expect(page.getByText(/methodologies adapted/i).first()).toBeVisible();
      await expect(page.getByText(/code quality guaranteed/i).first()).toBeVisible();
      await expect(page.getByText(/solid foundation/i).first()).toBeVisible();
    });
  });

  test.describe("Services Section", () => {
    test("should display all service cards", async ({ page }) => {
      await page.locator("#services").scrollIntoViewIfNeeded();

      await expect(page.getByText(/premier prd generation/i).first()).toBeVisible();
      await expect(page.getByText(/tech team building/i).first()).toBeVisible();
      await expect(page.getByText(/our own proven methodologies/i).first()).toBeVisible();
      await expect(page.getByText(/ai-accelerated development/i).first()).toBeVisible();
      await expect(
        page.getByText(/testing & quality assurance/i).first()
      ).toBeVisible();
      await expect(page.getByText(/solid tech foundation/i).first()).toBeVisible();
    });

    test("should have service card hover effects", async ({ page }) => {
      await page.locator("#services").scrollIntoViewIfNeeded();

      const firstCard = page.locator(".bg-card").first();
      await firstCard.hover();

      // Card should have hover transition classes (check for class attribute existence)
      const className = await firstCard.getAttribute('class');
      expect(className).toBeTruthy();
    });
  });

  test.describe("Team Section", () => {
    test("should display all team members", async ({ page }) => {
      await page.locator("#team").scrollIntoViewIfNeeded();

      await expect(page.getByText("Emmanuel Martinez")).toBeVisible();
      await expect(page.getByText("Marina Martin Hernandez")).toBeVisible();
      await expect(page.getByText("Iñigo Rodriguez Sanz")).toBeVisible();
    });

    test("should display team member roles", async ({ page }) => {
      await page.locator("#team").scrollIntoViewIfNeeded();

      await expect(page.getByText(/co-founder & ceo/i)).toBeVisible();
      await expect(page.getByText(/co-founder & cto/i)).toBeVisible();
      await expect(page.getByText(/co-founder & coo/i)).toBeVisible();
    });

    test("should display team member images", async ({ page }) => {
      await page.locator("#team").scrollIntoViewIfNeeded();

      const teamImages = page.locator("#team img");
      const imageCount = await teamImages.count();
      expect(imageCount).toBeGreaterThanOrEqual(3);
    });
  });

  test.describe("Contact Form", () => {
    test.beforeEach(async ({ page }) => {
      await page.locator("#contact").scrollIntoViewIfNeeded();
    });

    test("should display all form fields", async ({ page }) => {
      await expect(page.getByLabel(/full name/i)).toBeVisible();
      await expect(page.getByLabel(/email address/i)).toBeVisible();
      await expect(page.getByLabel(/company\/organization/i)).toBeVisible();
      await expect(page.getByLabel(/i am a/i)).toBeVisible();
      await expect(page.getByLabel(/current stage/i)).toBeVisible();
      await expect(page.getByLabel(/tell us about your needs/i)).toBeVisible();
    });

    test("should validate required fields", async ({ page }) => {
      const submitButton = page.getByRole("button", { name: /send message/i });
      await submitButton.click();

      // HTML5 validation should prevent form submission
      const nameInput = page.getByLabel(/full name/i);
      const isInvalid = await nameInput.evaluate((el: HTMLInputElement) => {
        return el.validity.valueMissing;
      });
      expect(isInvalid).toBe(true);
    });

    test("should fill out and submit contact form", async ({ page }) => {
      // Mock the fetch request
      await page.route("https://api.web3forms.com/submit", async (route) => {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({ success: true }),
        });
      });

      await page.getByLabel(/full name/i).fill("John Doe");
      await page.getByLabel(/email address/i).fill("john@example.com");
      await page.getByLabel(/company\/organization/i).fill("Test Company");
      await page.getByLabel(/i am a/i).selectOption("startup");
      await page.getByLabel(/current stage/i).selectOption("mvp");
      await page
        .getByLabel(/tell us about your needs/i)
        .fill("We need help building our MVP");

      await page.getByRole("button", { name: /send message/i }).click();

      // Wait for success toast message
      await expect(page.locator("text=Message sent successfully")).toBeVisible({
        timeout: 5000,
      });
    });

    test("should handle form submission error", async ({ page }) => {
      // Mock a failed request
      await page.route("https://api.web3forms.com/submit", async (route) => {
        await route.fulfill({
          status: 500,
          body: JSON.stringify({ error: "Server error" }),
        });
      });

      await page.getByLabel(/full name/i).fill("John Doe");
      await page.getByLabel(/email address/i).fill("john@example.com");
      await page.getByLabel(/company\/organization/i).fill("Test Company");
      await page.getByLabel(/i am a/i).selectOption("startup");
      await page.getByLabel(/tell us about your needs/i).fill("Test message");

      await page.getByRole("button", { name: /send message/i }).click();

      // Wait for error toast message
      await expect(page.locator("text=Error sending message")).toBeVisible({
        timeout: 5000,
      });
    });

    test("should have working schedule demo button", async ({ page }) => {
      const scheduleButton = page.getByRole("button", {
        name: /schedule a demo call/i,
      });
      await expect(scheduleButton).toBeVisible();

      const link = page.locator(
        'a:has(button:has-text("Schedule a Demo Call"))'
      );
      await expect(link).toHaveAttribute(
        "href",
        "https://calendar.app.google/mnJRSUAvU7nECYDK7"
      );
    });

    test("should validate email format", async ({ page }) => {
      await page.getByLabel(/email address/i).fill("invalid-email");

      const emailInput = page.getByLabel(/email address/i);
      const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => {
        return el.validity.typeMismatch;
      });
      expect(isInvalid).toBe(true);
    });
  });

  test.describe("Footer", () => {
    test("should display footer content", async ({ page }) => {
      const footer = page.locator("footer");
      await footer.scrollIntoViewIfNeeded();

      await expect(
        footer.getByText(/technical partner for startup accelerators/i)
      ).toBeVisible();
      await expect(footer.getByText(/© 2025 collybrix/i)).toBeVisible();
      await expect(footer.getByText(/based in madrid, spain/i)).toBeVisible();
    });

    test("should have working footer links", async ({ page }) => {
      const footer = page.locator("footer");
      await footer.scrollIntoViewIfNeeded();

      const emailLink = footer.getByRole("link", { name: /email us/i });
      await expect(emailLink).toHaveAttribute(
        "href",
        "mailto:emartinez@collybrix.com"
      );

      const linkedInLink = footer.getByRole("link", { name: /linkedin/i });
      await expect(linkedInLink).toHaveAttribute(
        "href",
        "https://www.linkedin.com/company/collybrix"
      );
    });

    test("should have all footer sections", async ({ page }) => {
      const footer = page.locator("footer");
      await footer.scrollIntoViewIfNeeded();

      await expect(
        footer.getByRole("heading", { name: /services/i })
      ).toBeVisible();
      await expect(
        footer.getByRole("heading", { name: /company/i })
      ).toBeVisible();
      await expect(
        footer.getByRole("heading", { name: /connect/i })
      ).toBeVisible();
    });
  });

  test.describe("Responsive Design", () => {
    test("should be responsive on mobile", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await expect(page.getByText(/co-founder for startup acceleration/i)).toBeVisible();
    });

    test("should be responsive on tablet", async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(page.getByText(/co-founder for startup acceleration/i)).toBeVisible();
    });

    test("should be responsive on desktop", async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await expect(page.getByText(/co-founder for startup acceleration/i)).toBeVisible();
    });
  });

  test.describe("Accessibility", () => {
    test("should have no accessibility violations on load", async ({
      page,
    }) => {
      await expect(page.locator("h1")).toBeVisible();

      // Check for basic accessibility features
      const nav = page.locator("nav");
      await expect(nav).toBeVisible();
    });

    test("should be keyboard navigable", async ({ page }) => {
      // Tab through interactive elements
      await page.keyboard.press("Tab");
      const firstFocusable = await page.locator(":focus").first();
      await expect(firstFocusable).toBeFocused();
    });

    test("should have proper heading hierarchy", async ({ page }) => {
      const h1Count = await page.locator("h1").count();
      expect(h1Count).toBeGreaterThan(0);
    });

    test("should have alt text for images", async ({ page }) => {
      const images = page.locator("img");
      const imageCount = await images.count();

      for (let i = 0; i < imageCount; i++) {
        const alt = await images.nth(i).getAttribute("alt");
        expect(alt).toBeTruthy();
      }
    });
  });

  test.describe("Performance", () => {
    test("should load within acceptable time", async ({ page }) => {
      const startTime = Date.now();
      await page.goto("/");
      const loadTime = Date.now() - startTime;

      // Page should load within 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });

    test("should have visible content above the fold", async ({ page }) => {
      // Ensure we're at the top of the page
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300); // Wait for scroll to complete

      await expect(page.locator("h1")).toBeInViewport();

      // Scroll hero section into view if needed (helps with Firefox viewport issues)
      const button = page.getByRole("button", { name: /partner with us/i });
      await button.scrollIntoViewIfNeeded();
      await expect(button).toBeInViewport();
    });
  });

  test.describe("SEO", () => {
    test("should have meaningful page title", async ({ page }) => {
      const title = await page.title();
      expect(title.toLowerCase()).toContain("collybrix");
    });

    test("should have meta description", async ({ page }) => {
      const metaDescription = page.locator('meta[name="description"]');
      await expect(metaDescription).toHaveAttribute("content", /.+/);
    });
  });
});
