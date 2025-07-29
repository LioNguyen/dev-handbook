import test from "@playwright/test";

test("Element", async ({ page }) => {
  await page.goto(
    "https://material.playwrightvn.com/01-xpath-register-page.html"
  );
  await page.locator("//input[@id='username']").fill("demo");
  await page.locator("//input[@id='email']").fill("demo@co.co");
  await page.locator("//input[@type='radio' and @id='male']").check();
  await page.locator("//input[@type='checkbox' and @id='reading']").check();

  await page.locator("//select[@id='country']").selectOption("uk");
  await page.getByRole("button", { name: "Register" }).click();
});

test("Click", async ({ page }) => {
  await page.goto("https://material.playwrightvn.com/018-mouse.html");
  await page.locator("//div[@id='topLeft']").click();
  await page.locator("//div[@id='topLeft']").dblclick();

  await page
    .locator("//div[@id='bottomRight']")
    .click({ clickCount: 5, modifiers: ["Shift"] });
});
