import { test, expect } from "playwright/test";
import { centralAuthTestConfig } from "./test-config";

const customerSelectionUrl = `${centralAuthTestConfig.serveUrl}/customer-selection`

test.describe('Customer Selection', () => {
  test('load clients in the dropdown', async ({ page }) => {
    await page.goto(customerSelectionUrl)
    await expect(page.locator('dx-select-box')).toBeDefined()
    await page.locator('dx-select-box').click()
    await expect(page.locator('.dx-scrollview-content')).toBeDefined()
    await expect.poll(async () => page.locator('.dx-list-item').count()).toBeGreaterThan(0);
  })

  test('should handle opening same client site many times', async ({ page, context }) => {
    await page.goto(customerSelectionUrl)
    for (let i = 0; i < 5; i++) {
      const pagePromise = context.waitForEvent('page');
      await page.locator('dx-select-box').click()
      await page.getByRole('option', { name: `_ ${centralAuthTestConfig.multiContactClientKey}`, exact: true }).click()
      await page.getByRole('row', { name: 'SuperUser' }).click()
      page.getByRole('button', { name: 'Submit' }).click()
      const newPage = await pagePromise;
      await newPage.waitForLoadState();
      await expect(newPage.url()).toContain('http://blank.dev.corp.virtualpremise.com')
    }
  })

  test('should handle opening different clients sites many times', async ({ page, context }) => {
    let clientPagePromise = context.waitForEvent('page')
    await page.goto(customerSelectionUrl);
    await page.locator('dx-select-box').click()
    await page.getByRole('option', { name: `_ POLO`, exact: true }).click()
    let clientPage = await clientPagePromise;
    await clientPage.waitForLoadState()
    await expect(clientPage.url()).toContain('http://polo.dev.corp.virtualpremise.com')
    await page.locator('dx-select-box').click()
    await page.getByRole('option', { name: `_ WHIRLPOOL`, exact: true }).click()
    await clientPage.waitForLoadState()
    await expect(clientPage.url()).toContain('http://whirlpool.dev.corp.virtualpremise.com')
  })

})

test.describe('Contact Record', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(customerSelectionUrl)
    await page.locator('dx-select-box').click()
    await page.getByRole('option', { name: '_ BLANK', exact: true }).click()
  })

  test('should open contact record popup', async ({ page }) => {
    await expect(page.locator('.dx-overlay-wrapper.dx-popup-wrapper')).toBeDefined()
    await expect(page.locator('h4.client-key')).toHaveText('BLANK')
  })

  test('should set Submit button enabled when a contact record is selected', async ({ page }) => {
    await page.getByRole('row', { name: 'SuperUser' }).click()
    await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled()
  })

  test('open CREM when contact record selected from popup', async ({ page, context }) => {
    const pagePromise = context.waitForEvent('page');
    await page.getByRole('row', { name: 'SuperUser' }).click()
    page.getByRole('button', { name: 'Submit' }).click()
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain('http://blank.dev.corp.virtualpremise.com')
  })

  test('should close the popup when cancel button is clicked', async ({ page }) => {
    await page.getByRole('button', { name: 'Cancel' }).click()
    await expect(page.locator('.dx-overlay-wrapper.dx-popup-wrapper')).toBeHidden()
  })

})
/*test.describe('Tour of Heroes pages', () => {
    test('should load default route', async ({page}) => {
      await page.goto('http://localhost:4200');
  
      await expect(page).toHaveURL(/\/dashboard$/);
    });
  
    test('should allow edits', async ({page}) => {
      await page.goto('http://localhost:4200');
  
      await page.locator('[data-test="detail-link"]').first().click();
  
      await expect(page).toHaveURL(/\/detail\/\d+/);
  
      await page.locator('#hero-name').fill('lorem ipsum');
  
      await page.locator('[data-test="save-button"]').click();
  
      await expect(page.locator('[data-test="detail-link"]').first()).toContainText('lorem ipsum');
    });
  
    test('should search for heroes', async ({page}) => {
      await page.goto('http://localhost:4200');
  
      await page.locator('#search-box').fill('nice');
  
      await expect(page.locator('[data-test="search-result-link"]')).toHaveCount(1);
  
      await page.locator('[data-test="search-result-link"]').click();
  
      await expect(page).toHaveURL(/\/detail\/12/);
    });
  
    test('should delete heroes', async ({page}) => {
      await page.goto('http://localhost:4200/heroes');
  
      await expect(page.locator('.delete')).toHaveCount(9);
  
      await page.locator('.delete').first().click();
  
      await expect(page.locator('.delete')).toHaveCount(8);
    });
  
    test('should add heroes', async ({page}) => {
      await page.goto('http://localhost:4200/heroes');
  
      await page.locator('#new-hero').fill('Lorem Ipsum');
  
      await page.locator('.add-button').click();
  
      await expect(page.locator('.delete')).toHaveCount(10);
    });
  });*/