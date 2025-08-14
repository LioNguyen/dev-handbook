import { test, expect } from '@playwright/test'

test('homepage should display correctly', async ({ page }) => {
  await page.goto('/')

  // Check that the page title contains "React Boilerplate"
  await expect(page.locator('h1')).toContainText('React Boilerplate')

  // Check that the description is visible
  await expect(
    page.locator('text=A production-ready React boilerplate')
  ).toBeVisible()

  // Check that technology badges are displayed
  await expect(page.locator('text=React 19')).toBeVisible()
  await expect(page.locator('text=TypeScript')).toBeVisible()
  await expect(page.locator('text=Tailwind CSS')).toBeVisible()
})

test('404 page should display correctly', async ({ page }) => {
  await page.goto('/non-existent-page')

  // Check that 404 page is displayed
  await expect(page.locator('h1')).toContainText('404')
  await expect(page.locator('text=Page Not Found')).toBeVisible()
})
