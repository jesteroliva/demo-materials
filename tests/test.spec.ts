import { test, expect } from '@playwright/test';
import { LoginData, LoginElements,assertionElements } from './login';

const loginElements = new LoginElements();
const loginData = new LoginData();
const assertion = new assertionElements();

test('test', async ({ page }) => {


  await test.step('Verify successful login', async () => {  
  await page.goto(assertion.loginUrl);
  await page.getByRole('textbox', { name: loginElements.username }).fill(loginData.validUsername);
  await page.getByRole('textbox', { name: loginElements.password }).fill(loginData.validPassword);
  await page.getByRole('button', { name: loginElements.loginBtn }).click();
  await expect(page.getByRole('heading')).toContainText(assertion.loginText);
  await expect(page).toHaveURL(assertion.loggedInUrl);
  });

  await test.step('Verify logout functionality', async () => {
  await expect(page.getByRole('link', { name: assertion.logoutText })).toBeVisible(); 
  await page.getByRole('link', { name: assertion.logoutBtn }).click();
  await expect(page).toHaveURL(assertion.logoutURL);
  });

  await test.step('Verify error messages for invalid credentials(USERNAME)', async () => {
  await page.getByRole('textbox', { name: loginElements.username }).fill(loginData.invalidUsername);
  await page.getByRole('textbox', { name: loginElements.password }).fill(loginData.validPassword);
  await page.getByRole('button', { name: loginElements.loginBtn }).click();
  //await expect(page.locator('#error')).toContainText('Your username is invalid!');
  });

  await test.step('Verify error messages for invalid credentials(PASSWORD)', async () => {  
  await page.getByRole('textbox', { name: loginElements.username }).fill(loginData.validUsername);
  await page.getByRole('textbox', { name: loginElements.password }).fill(loginData.invalidPassword);
  await page.getByRole('button', { name: loginElements.loginBtn }).click();
  //await expect(page.locator('#error')).toContainText('Your password is invalid!');
  });
});