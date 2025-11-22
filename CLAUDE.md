# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Collybrix is a Next.js 15 website for a Madrid-based technical accelerator for early-stage startups. The site is built with React 19, TypeScript, and Tailwind CSS 4, featuring a modern dark-themed UI with shadcn/ui components.

## Development Commands

### Core Development
- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Testing Commands

**Unit & Integration Tests:**
- `npm test` - Run tests in watch mode
- `npm run test:ci` - Run all tests once with coverage (CI mode, max 2 workers)
- `npm run test:unit` - Run unit tests only with coverage
- `npm run test:integration` - Run integration tests only
- `npm run test:coverage` - Generate coverage report
- `npm run test:watch` - Run tests in watch mode

**E2E Tests (Playwright):**
- `npm run playwright:install` - Install Playwright browsers with dependencies
- `npm run test:e2e` - Run E2E tests headless
- `npm run test:e2e:ci` - Run E2E tests with CI config
- `npm run test:e2e:ui` - Run E2E tests with UI mode (interactive)
- `npm run test:e2e:debug` - Run E2E tests in debug mode
- `npm run test:e2e:headed` - Run E2E tests in headed mode
- `npm run test:e2e:chromium` - Run E2E tests on Chromium only
- `npm run test:e2e:report` - Show Playwright test report

**Single Test Execution:**
```bash
# Run specific test file
npx jest path/to/test.test.tsx

# Run specific test file with Playwright
npx playwright test path/to/test.spec.ts

# Run specific test by name
npx jest -t "test name pattern"
```

## Architecture

### Tech Stack
- **Framework:** Next.js 15 (App Router)
- **React:** Version 19
- **TypeScript:** Strict mode enabled
- **Styling:** Tailwind CSS 4 with custom theme
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Forms:** React Hook Form with Zod validation
- **Icons:** Lucide React
- **Analytics:** Vercel Analytics
- **Fonts:** Geist Sans & Geist Mono

### Project Structure
```
collybrix-website/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (dark mode, fonts, analytics)
│   ├── page.tsx            # Homepage (main landing page)
│   ├── about/page.tsx      # About page
│   └── globals.css         # Global styles & Tailwind config
├── components/
│   ├── ui/                 # shadcn/ui components (Button, Card, etc.)
│   ├── navigation.tsx      # Site navigation component
│   ├── footer.tsx          # Site footer component
│   └── logo.tsx            # Collybrix logo component
├── lib/
│   └── utils.ts            # Utility functions (cn for class merging)
├── __tests__/              # Unit & integration tests (Jest + RTL)
│   ├── app/                # Page-level integration tests
│   ├── components/         # Component tests
│   ├── lib/                # Utility function tests
│   └── utils/              # Test helpers
├── e2e/                    # End-to-end tests (Playwright)
│   ├── homepage.spec.ts
│   ├── navigation.spec.ts
│   └── accessibility.spec.ts
└── public/                 # Static assets
```

### Key Patterns

**Path Aliases:**
- `@/*` maps to project root (configured in tsconfig.json)
- Example: `import { Button } from "@/components/ui/button"`

**Component Pattern:**
- UI components use shadcn/ui with Radix UI primitives
- Class merging via `cn()` utility (clsx + tailwind-merge)
- Client components marked with `"use client"` directive

**Styling:**
- Tailwind CSS 4 with custom CSS variables
- Dark mode by default (`.dark` class on `<html>`)
- Custom gradient: `--gradient-collybrix`
- Geist font family applied via CSS variables

**Form Handling:**
- React Hook Form for form state management
- Web3Forms API for contact form submissions
- Toast notifications via Sonner

## Testing Strategy

### Test Organization
- **Unit tests** (70%): Individual components and utilities in `__tests__/`
- **Integration tests** (20%): Component interactions in `__tests__/app/`
- **E2E tests** (10%): Critical user flows in `e2e/`

### Coverage Thresholds
```javascript
{
  branches: 70%,
  functions: 66%,
  lines: 70%,
  statements: 70%
}
```

### Testing Best Practices
1. Use React Testing Library query priority: `getByRole` > `getByLabelText` > `getByText`
2. Use `userEvent` for user interactions (not `fireEvent`)
3. Use `waitFor` or `findBy*` queries for async operations
4. Mock external dependencies (API calls, Next.js modules)
5. Test accessibility (keyboard navigation, ARIA labels)

### Playwright Configuration
- **Base URL:** http://localhost:3000
- **Projects:** Chromium (desktop), Mobile (iPhone 12)
- **Timeouts:** 30s per test, 10min global
- **CI mode:** 2 retries, 1 worker, runs on Ubuntu
- **Dev server:** Auto-starts with `npm run dev`

## CI/CD Pipeline

### GitHub Actions Workflow (`.github/workflows/test.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main`

**Jobs:**
1. **Unit Tests** (Node 18.x & 20.x matrix)
   - Type checking
   - Linting
   - Unit & integration tests with coverage
   - Upload coverage to Codecov
   - Comment coverage on PRs

2. **E2E Tests**
   - Build application
   - Run Playwright tests
   - Upload test reports & results

3. **Accessibility Tests**
   - Run dedicated accessibility test suite
   - Upload accessibility reports

4. **Test Summary**
   - Aggregate all test results
   - Fail build if any suite fails

## Common Tasks

### Adding New Pages
1. Create page in `app/[route]/page.tsx`
2. Update navigation in `components/navigation.tsx`
3. Add integration tests in `__tests__/app/`
4. Add E2E tests in `e2e/`

### Adding UI Components
1. Use shadcn/ui CLI or copy from components/ui/
2. Ensure TypeScript types are properly defined
3. Use `cn()` for conditional class merging
4. Write unit tests with React Testing Library
5. Test keyboard accessibility

### Working with Forms
- Use React Hook Form for state management
- Validate with Zod schemas
- Use Sonner for toast notifications
- Test form submission with mocked fetch

### Styling Guidelines
- Use Tailwind utility classes
- Prefer CSS variables for theming
- Dark mode is default (ensure all components support it)
- Use custom variants: `@custom-variant dark (&:is(.dark *))`

## Environment & Configuration

**Node Version:** 18+ (tested on 18.x and 20.x)

**Package Manager:** npm (CI uses `npm ci`)

**TypeScript:** Strict mode enabled, target ES2017

**Module Resolution:** Bundler mode (Next.js 15)

**Important Config Files:**
- `next.config.mjs` - Next.js configuration
- `tsconfig.json` - TypeScript paths and compiler options
- `jest.config.ts` - Jest test configuration
- `playwright.config.ts` - Playwright E2E configuration
- `postcss.config.mjs` - PostCSS with Tailwind

## Notes

- The site uses Web3Forms API for contact form (access key in code)
- Vercel Analytics is integrated via `@vercel/analytics/next`
- All pages render in dark mode by default
- Form validation uses Zod schemas with `@hookform/resolvers`
- Testing documentation is comprehensive in `TESTING.md`
- Coverage reports available in `coverage/lcov-report/index.html`
