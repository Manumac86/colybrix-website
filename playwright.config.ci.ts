import { defineConfig, devices } from '@playwright/test'

/**
 * Full cross-browser testing configuration for CI/CD
 * Use this config in CI: npx playwright test --config=playwright.config.ci.ts
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: true,
  retries: 2,
  workers: 2, // Limit workers in CI for stability
  timeout: 30 * 1000,
  globalTimeout: 15 * 60 * 1000, // 15 minutes for full suite
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/e2e-results.json' }],
    ['junit', { outputFile: 'test-results/e2e-results.xml' }],
    ['github'], // GitHub Actions annotations
  ],
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    navigationTimeout: 10 * 1000,
    actionTimeout: 10 * 1000,
  },

  /* Full cross-browser testing for CI/CD */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  webServer: {
    command: 'npm run build && npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: false,
    timeout: 120 * 1000,
  },
})
