[Udemy Course](https://endava.udemy.com/course/automation-test-voi-playwright-typescript-khoa-6)

## How to Initialize and Set Up Playwright

### Installation

1. Install Playwright using npm:
   ```bash
   npm init playwright@latest
   ```
   - Choose between TypeScript or JavaScript (default is TypeScript).
   - Name your tests folder (default is `tests`, or `e2e` if `tests` already exists).
   - Optionally add a GitHub Actions workflow for CI.
   - Install Playwright browsers (default is true).

### Running Example Tests

2. Run the example test:
   ```bash
   npx playwright test
   ```
   - By default, tests run on Chromium, Firefox, and WebKit in headless mode.
   - Results and logs are displayed in the terminal.

### Viewing HTML Test Reports

3. View the HTML test report:
   ```bash
   npx playwright show-report
   ```
   - The report provides details on passed, failed, skipped, and flaky tests.

### Updating Playwright

4. Update Playwright to the latest version:
   ```bash
   npm install -D @playwright/test@latest
   ```

### Additional Commands

5. Install new browser binaries and dependencies:

   ```bash
   npx playwright install --with-deps
   ```

6. Check the installed Playwright version:
   ```bash
   npx playwright --version
   ```
