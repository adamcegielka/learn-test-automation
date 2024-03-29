import { test, expect } from '@playwright/test';

// ASSERTIONS: test.only(), test.skip(), test.fail(), test.fixme(), test.slow()
test.skip('simple basic test', async ({ page }) => {
  await page.goto('https://www.example.com/');
  const pageTitle = await page.locator('h1');
  await expect(pageTitle).toContainText('Example Domain');
});

// CLICKIN ON ELEMENTS
test('clickin on elements', async ({ page }) => {
  const url = 'http://zero.webappsecurity.com/';
  await page.goto(url);
  await page.click('#signin_button');
  await page.click('text=Sign in');

  const errorMessage = await page.locator('.alert-error');
  await expect(errorMessage).toContainText('Login and/or password are wrong.');
});