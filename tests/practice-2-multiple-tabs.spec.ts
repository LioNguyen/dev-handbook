import test from "@playwright/test";

test("Multiple tabs 1", async ({ page }) => {
  const xpathClickArea = "//div[@id='clickArea']";

  await page.goto("https://material.playwrightvn.com/018-mouse.html");
  await page.locator(xpathClickArea).click();

  const page2 = await page.context().newPage();
  await page2.goto("https://material.playwrightvn.com/018-mouse.html");
  await page2.locator(xpathClickArea).click({ clickCount: 2 });
});

test("Multiple tabs 2", async ({ page }) => {
  await page.goto("https://material.playwrightvn.com/06-new-tab.html");
  await page
    .locator("//a[contains(text(), 'trang chủ') and @class='home-button']")
    .click();

  const page2 = await page.context().newPage();
  await page2.goto("https://material.playwrightvn.com/06-new-tab.html");
  await page2.locator("//a[contains(text(), 'Truy')]").click();
});
