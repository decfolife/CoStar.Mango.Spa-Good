import { test, expect } from "playwright/test";
import { centralAuthTestConfig } from "./test-config";

test.describe('Logout', () => {

  test.beforeEach(async ({ page }) => {
    await page.context().storageState({ path: 'playwright/.auth/ca-user.json' })
  })

  test('should clear out the local storage', async ({ page }) => {
    await page.goto(`${centralAuthTestConfig.serveUrl}/customer-selection`)
    await page.locator('[aria-label="logout"]').click()
    await page.getByText('Logout').click()
    const storage = await page.context().storageState()
    await expect(storage.origins[0]).toBeUndefined()
  })

  test('should redirect to /', async ({ page }) => {
    await page.goto(`${centralAuthTestConfig.serveUrl}/customer-selection`)
    await page.locator('[aria-label="logout"]').click()
    await page.getByText('Logout').click()
    await expect(page.url()).toEqual(`${centralAuthTestConfig.serveUrl}/`)
  })

  test('should maintain query params after logout', async ({page}) => {
    await page.goto(`${centralAuthTestConfig.serveUrl}/customer-selection?client_key=client1&redirect_uri=https://url.com`)
    await page.locator('[aria-label="logout"]').click()
    await page.getByText('Logout').click()
    await expect(page.url()).toEqual(`${centralAuthTestConfig.serveUrl}/?client_key=client1&redirect_uri=https:%2F%2Furl.com`)
  })

  test('should logout when query param ?logout=true is present', async ({page}) => {
    await page.goto(`${centralAuthTestConfig.serveUrl}/?logout=true`)
    await expect(page.getByText('Secured Login')).toBeDefined()
    await expect(page.url()).toEqual(`${centralAuthTestConfig.serveUrl}/`)
  })

})