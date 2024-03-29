import { test, expect } from '@playwright/test';
import { loginRegistrationData } from '../e2e-data/e2e-login.data';

test.describe('New Payment', () => {
  // Login
  test.beforeEach(async ({ page }) => {
    const url = 'http://zero.webappsecurity.com/';
    const userLogin = loginRegistrationData.userLogin;
    const userPassword = loginRegistrationData.userPassword;
    const goBack = 'http://zero.webappsecurity.com/index.html';

    await page.goto(url);
    await page.click('#signin_button');
    await page.type('#user_login', userLogin);
    await page.type('#user_password', userPassword);
    await page.click('text=Sign in');
    await page.goto(goBack);
    await page.click('#account_activity_link');
    await page.click('#transfer_funds_tab');
  });

  // selection by value: <option value="apple">Apple</option>
  test('Should send new payment', async ({ page }) => {
    await page.click('#pay_bills_tab');
    await page.selectOption('#sp_payee', 'apple');
    await page.click('#sp_get_payee_details');
    await page.waitForSelector('#sp_payee_details');
    
    const verifyAppleAccountMessage = await page.locator('#sp_payee_details');
    await expect(verifyAppleAccountMessage).toContainText('For 48944145651315 Apple account');

    await page.selectOption('#sp_account', '6');
    await page.type('#sp_amount', '4050');                  // amount
    await page.type('#sp_date', '2023-06-01');              // date
    await page.type('#sp_description', 'Money for holidays');
    await page.click('#pay_saved_payees');

    const verifyPaymentMessage = await page.locator('#alert_content > span');
    await expect(verifyPaymentMessage).toBeVisible;
    await expect(verifyPaymentMessage).toContainText('The payment was successfully submitted.');
  });
});
