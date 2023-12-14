import { test } from '@playwright/test';
import { centralAuthTestConfig } from './test-config';

const authFile = 'playwright/.auth/ca-user.json'

test('Authentication', async ({ page }) => {
    await page.goto('http://localhost:4200')
    await page.getByRole('textbox', { name: 'email' }).fill(centralAuthTestConfig.userEmail)
    await page.getByRole('textbox', { name: 'password' }).fill(centralAuthTestConfig.userPassword)
    await page.getByRole('button', { name: 'Log In' }).click()

    await page.waitForURL('http://localhost:4200/customer-selection', { timeout: 10000 })

    await page.context().storageState({ path: authFile })
})