const { test, expect } = require("@playwright/test");

// Same code as lesson but test failed -> just reference
test.describe("Multiple tab", async () => {
  test("Handle multiple tab showed randomly", async ({ page }) => {
    // Go to the initial webpage
    await page.goto(
      "https://material.playwrightvn.com/021-page-random-open-new-page.html"
    );

    // Wait for the popup to appear
    const newPage = await page.waitForEvent("popup");
    await newPage.click('button[text()="Đăng Kí"]'); // Click button on the new page
  });

  test("Handle multiple tab showed when click button", async ({ page }) => {
    await test.step("Open main tab", async () => {
      // Navigate to a target page
      await page.goto("https://material.playwrightvn.com/023-target-page.html");

      // Wait for a new page to open
      const [newPage] = await Promise.all([
        page.waitForEvent("popup"),
        page.click('//button[text()="Go to register page"]'),
      ]);

      // Wait for the new page to load
      await newPage.waitForTimeout(1000);
      await newPage.click('//button[text()="Đăng Kí"]'); // Click button on the new page
    });
  });
});
