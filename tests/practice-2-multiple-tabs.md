# Playwright Code Summary: Multiple Tabs

## Syntax

### Open a new tab

```typescript
const page2 = await page.context().newPage();
```

### Navigate to a URL

```typescript
await page.goto("<URL>");
```

### Click an element using XPath

```typescript
await page.locator("<XPath>").click();
```

### Click an element multiple times

```typescript
await page.locator("<XPath>").click({ clickCount: <number> });
```

### Switch between tabs

```typescript
await page.bringToFront();
```

## Examples

### Example 1: Interacting with multiple tabs

```typescript
import test from "@playwright/test";

test("Multiple tabs 1", async ({ page }) => {
  const xpathClickArea = "//div[@id='clickArea']";

  await page.goto("https://material.playwrightvn.com/018-mouse.html");
  await page.locator(xpathClickArea).click();

  const page2 = await page.context().newPage();
  await page2.goto("https://material.playwrightvn.com/018-mouse.html");
  await page2.locator(xpathClickArea).click({ clickCount: 2 });
});
```

### Example 2: Navigating and clicking elements in new tabs

```typescript
import test from "@playwright/test";

test("Multiple tabs 2", async ({ page }) => {
  await page.goto("https://material.playwrightvn.com/06-new-tab.html");
  await page
    .locator("//a[contains(text(), 'trang chủ') and @class='home-button']")
    .click();

  const page2 = await page.context().newPage();
  await page2.goto("https://material.playwrightvn.com/06-new-tab.html");
  await page2.locator("//a[contains(text(), 'Truy')]").click();
});
```

### Example 3: Switching between tabs

```typescript
import test from "@playwright/test";

test("Switch tabs", async ({ page }) => {
  const page2 = await page.context().newPage();

  await page.goto("https://example.com");
  await page2.goto("https://example.org");

  // Switch to the first tab
  await page.bringToFront();

  // Switch to the second tab
  await page2.bringToFront();
});
```
