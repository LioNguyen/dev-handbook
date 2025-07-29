import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  // await page.goto('https://playwright.dev/');

  // // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);

  await page.goto("https://material.playwrightvn.com/");
  await expect(page).toHaveTitle(/Tài liệu học automation test/);
});

test("get started link", async ({ page }) => {
  // await page.goto("https://playwright.dev/");

  // // Click the get started link.
  // await page.getByRole("link", { name: "Get started" }).click();

  // // Expects page to have a heading with the name of Installation.
  // await expect(
  //   page.getByRole("heading", { name: "Installation" })
  // ).toBeVisible();

  await page.goto("https://material.playwrightvn.com/");
  await page
    .getByRole("link", { name: "Bài học 1: Register Page (có đủ các element)" })
    .click();
  await expect(page).toHaveTitle(/User Registration/);
});
