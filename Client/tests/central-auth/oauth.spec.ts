import { test, expect } from "playwright/test";
import { centralAuthTestConfig } from "./test-config";

test.describe('Generic Oauth', () => {
  
  test('should show an empty page when client key and contact id are selected', async ({ page }) => {
    await page.goto(`${centralAuthTestConfig.serveUrl}/?client_key=test&contact_id=123`)
    expect(page.locator('.customer-select')).toHaveCount(0)
  })
  
})

test.describe('Client with one contact record', () => {

  test('should redirect straight to a MangoSPA after selecting the client', async ({ page }) => {
    await page.goto(`${centralAuthTestConfig.serveUrl}/?redirect_uri=http://mangospa.dev.corp.virtualpremise.com:30080/auth/validate?redirect_uri=%2F`)
    await page.locator('dx-select-box').click()
    await page.getByRole('option', { name: `_ ${centralAuthTestConfig.singleContactClientKey}`, exact: true }).click()
    await page.waitForSelector('.wordmark')
    expect(page.url()).toContain('http://mangospa.dev.corp.virtualpremise.com:30080')
  })

  test('should redirect straight to a MangoSPA when client key is present in the url', async ({ page }) => {
    await page.goto(`${centralAuthTestConfig.serveUrl}/?client_key=${centralAuthTestConfig.singleContactClientKey}&redirect_uri=http://mangospa.dev.corp.virtualpremise.com:30080/auth/validate?redirect_uri=%2F`)
    await page.waitForSelector('.wordmark')
    expect(page.url()).toContain('http://mangospa.dev.corp.virtualpremise.com:30080')
  })

})
test.describe('Client with more then one contact record', () => {
  const clientKey = centralAuthTestConfig.multiContactClientKey
  const contactId = centralAuthTestConfig.contactId

    test('should open contact record popup automatically when client key is present in the URL', async ({ page }) => {
      await page.goto(`${centralAuthTestConfig.serveUrl}/?client_key=${clientKey}&redirect_uri=http://mangospa.dev.corp.virtualpremise.com:30080/auth/validate?redirect_uri=%2F`)
      await expect(page.locator('.dx-overlay-wrapper.dx-popup-wrapper')).toBeDefined()
      await expect(page.locator('h4.client-key')).toHaveText(clientKey)
    })
  
    test('should redirect to MangoSPA after selecting the contact record', async ({ page }) => {
      await page.goto(`${centralAuthTestConfig.serveUrl}/?redirect_uri=http://mangospa.dev.corp.virtualpremise.com:30080/auth/validate?redirect_uri=%2F`)
      await page.locator('dx-select-box').click()
      await page.getByRole('option', { name: `_ ${clientKey}`, exact: true }).click()
      await page.getByRole('row', { name: 'SuperUser' }).click()
      await page.getByRole('button', { name: 'Submit' }).click()
      await page.waitForSelector('.wordmark')
      expect(page.url()).toContain('http://mangospa.dev.corp.virtualpremise.com:30080')
    })
  
    test('should redirect straight to MangoSPA when client key and contact id is present in the URL', async ({ page }) => {
      await page.goto(`${centralAuthTestConfig.serveUrl}/?client_key=${clientKey}&contact_id=${contactId}&redirect_uri=http://mangospa.dev.corp.virtualpremise.com:30080/auth/validate?redirect_uri=%2F`)
      await page.waitForSelector('.wordmark')
      expect(page.url()).toContain('http://mangospa.dev.corp.virtualpremise.com:30080')
    }) 
})