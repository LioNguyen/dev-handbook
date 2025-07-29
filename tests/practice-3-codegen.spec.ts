import { test, expect } from "@playwright/test";

test("record", async ({ page }) => {
  await page.goto("https://material.playwrightvn.com/");
  await page.getByRole("link", { name: "Bài học 2: Product page" }).click();
  await page.getByRole("button", { name: "Add to Cart" }).first().click();
  await page.getByRole("button", { name: "Add to Cart" }).nth(1).click();
  await page.getByRole("button", { name: "Add to Cart" }).nth(2).click();
  await page
    .getByRole("row", { name: "Product 2 $20.00 1 $20.00" })
    .getByRole("button")
    .click();
  await page.getByRole("link", { name: "Trở về trang chủ" }).click();
});

// Using npx playwright codegen {url}
test("codegen", async ({ page }) => {
  await page.goto("https://material.playwrightvn.com/03-xpath-todo-list.html");
  await page.getByRole("textbox", { name: "Enter a new task" }).click();
  await page.getByRole("textbox", { name: "Enter a new task" }).fill("task 1");
  await page.getByRole("button", { name: "Add Task" }).click();
  await page.getByRole("textbox", { name: "Enter a new task" }).click();
  await page.getByRole("textbox", { name: "Enter a new task" }).fill("task 3");
  await page.getByRole("textbox", { name: "Enter a new task" }).press("Enter");
  await page.getByRole("button", { name: "Add Task" }).click();
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("button", { name: "Edit" }).nth(1).click();
  await page.getByRole("textbox", { name: "Enter a new task" }).click();
  await page.getByRole("textbox", { name: "Enter a new task" }).fill("task 5");
  await page.getByRole("button", { name: "Add Task" }).click();
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator("#task-5-delete").click();
  await page.getByRole("link", { name: "Trở về trang chủ" }).click();
});
