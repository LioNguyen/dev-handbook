# Development Scripts

This document describes all the available npm/bun scripts for development workflow.

## Development Scripts

### `bun run dev`

Start the development server with hot module replacement.

- Runs on `http://localhost:3000`
- Watches for file changes and auto-reloads

### `bun run dev:host`

Start the development server accessible from network.

- Useful for testing on mobile devices or other machines
- Binds to all network interfaces

## Build Scripts

### `bun run build`

Build the application for production.

- Runs TypeScript compilation
- Bundles and optimizes all assets
- Output goes to `dist/` directory

### `bun run build:analyze`

Build with bundle analysis (if configured).

- Analyzes bundle size and dependencies
- Useful for optimizing build performance

### `bun run preview`

Preview the production build locally.

- Serves the built application from `dist/`
- Good for testing the production build

### `bun run preview:host`

Preview the production build accessible from network.

## Code Quality Scripts

### `bun run lint`

Run ESLint to check for code issues.

- Checks TypeScript and JavaScript files
- Reports errors and warnings

### `bun run lint:fix`

Run ESLint and automatically fix issues.

- Fixes auto-fixable problems
- Formats code according to rules

### `bun run format`

Format code using Prettier.

- Formats TypeScript, JavaScript, JSON, CSS, and Markdown files
- Enforces consistent code style

### `bun run format:check`

Check if code is properly formatted.

- Useful in CI/CD pipelines
- Does not modify files

### `bun run type-check`

Run TypeScript compiler without emitting files.

- Checks for type errors
- Fast way to validate types

## Testing Scripts

### `bun run test`

Run unit tests in watch mode.

- Uses Vitest
- Re-runs tests when files change

### `bun run test:run`

Run unit tests once and exit.

- Good for CI/CD pipelines
- Returns exit code based on test results

### `bun run test:ui`

Run tests with UI interface.

- Visual test runner
- Great for debugging tests

### `bun run test:watch`

Run tests in watch mode (explicit).

- Same as `bun run test`
- Watches for file changes

### `bun run test:coverage`

Run tests with coverage reporting.

- Generates code coverage reports
- Shows which code is tested

### `bun run test:e2e`

Run end-to-end tests using Playwright.

- Tests the full application flow
- Runs in headless mode

### `bun run test:e2e:ui`

Run E2E tests with Playwright UI.

- Visual test runner for E2E tests
- Great for debugging E2E tests

### `bun run test:e2e:debug`

Run E2E tests in debug mode.

- Pauses execution for debugging
- Allows step-by-step test execution

### `bun run test:e2e:headed`

Run E2E tests in headed mode.

- Shows browser window during tests
- Useful for visual debugging

## Utility Scripts

### `bun run clean`

Clean build artifacts and cache.

- Removes `dist/`, `coverage/`, `.tmp/`, `node_modules/.cache/`
- Useful when having build issues

### `bun run clean:all`

Complete clean and reinstall.

- Removes all generated files and dependencies
- Reinstalls all packages fresh
- Use when having dependency issues

## CI/CD Scripts

### `bun run ci`

Run the standard CI pipeline.

- Type checking → Linting → Testing → Building
- Quick validation for pull requests

### `bun run ci:full`

Run the complete CI pipeline.

- Clean → Install → CI → E2E tests
- Full validation including E2E tests

## Git Hooks

The following hooks are automatically configured:

### Pre-commit Hook

- Runs `lint-staged` on staged files
- Automatically fixes and formats code
- Prevents commits with linting errors

### Commit Message Hook

- Enforces conventional commit format
- Validates commit message structure
- Helps maintain clean git history

## Development Workflow

### Starting Development

\`\`\`bash
bun install # Install dependencies
bun run dev # Start development server
\`\`\`

### Before Committing

\`\`\`bash
bun run lint:fix # Fix linting issues
bun run test:run # Run unit tests
bun run type-check # Check TypeScript
\`\`\`

### Before Pull Request

\`\`\`bash
bun run ci # Run full CI pipeline
bun run test:e2e # Run E2E tests
\`\`\`

### Production Build

\`\`\`bash
bun run build # Build for production
bun run preview # Test production build
\`\`\`

## Troubleshooting

### Build Issues

\`\`\`bash
bun run clean # Clean build artifacts
bun run build # Try building again
\`\`\`

### Dependency Issues

\`\`\`bash
bun run clean:all # Complete clean and reinstall
\`\`\`

### Test Issues

\`\`\`bash
bun run test:ui # Debug tests visually
bun run test:coverage # Check test coverage
\`\`\`
