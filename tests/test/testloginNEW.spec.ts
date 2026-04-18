import { test, expect } from '@playwright/test';



const usernameCorrect = 'qa@objectbright.com';
let passwordCorrect = 'secret';
let usernameIncorrect = 'qateam@objectbright.com';
let passwordIncorrect = 'incorrectPassword';
const correctEmail = 'qa@objectbright.com';
const incorrectEmail = 'qateam@objectbright.com';

const urlLogin = 'https://rtsdev.uiginc.com/login';
const successUrl = 'https://rtsdev.uiginc.com/files';

const loginElements =[
    {
   type: 'textBox',
   name: 'Email'
},
{
    type: 'textBox',
    name: 'Password'

}]

const userNameElement = 'Email';
const passwordElement = 'Password';

const submitButton = "Log In"

test('Incorrect Username', async ({ page }) => {
 // test.setTimeout(0);
  await page.goto(urlLogin);
 
  
  await expect(page.getByRole('heading')).toContainText('Log into Account');
   /*
  await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
  await page.getByRole('link', { name: 'Log out' }).click();
  await expect(page).toHaveURL(urlLogin);
  */
 
  await test.step('Login with Incorrect Username', async () => {
  await page.getByRole('textbox', { name: userNameElement }).fill(usernameIncorrect);
  await page.getByRole('textbox', { name: passwordElement }).fill(passwordCorrect);
  await page.getByRole('button', { name: submitButton }).click();
  await page.close();
  });
});
  //await expect(page.locator('#error')).toContainText('Your username is invalid!');
  test('Incorrect Password', async ({ page }) => {
  await page.goto(urlLogin);
  await test.step('Login with Incorrect Password', async () => {
  await page.getByRole('textbox', { name: userNameElement }).fill(usernameCorrect);
  await page.getByRole('textbox', { name: passwordElement }).fill(passwordIncorrect);
  await page.getByRole('button', { name: submitButton }).click();
    await page.close();
 // await expect(page.locator('#error')).toContainText('Your password is invalid!');
  });
});
 test('Successful Login', async ({ page }) => {
  await page.goto(urlLogin);
  await test.step('Login with Correct Credentials', async () => {
  await loginSucess(page);
  await page.close();
  });
});

test('Logout', async ({ page }) => {
    await page.goto(urlLogin);
  await test.step('Verify Logout', async () => {
  await loginSucess(page);
  await logOut(page);
  await page.close();
  });
});

test('Forgot Password', async ({ page }) => {
  await page.goto(urlLogin);
  await test.step('Verify Forgot Password', async () => {
  await forgotPassword(page);
  await page.close();
  });
});



export async function logOut(page) {
 await page.waitForLoadState('domcontentloaded');
  //await page.locator('#kt_quick_user_toggle').waitFor({ state: 'visible' });
 await page.locator('#kt_quick_user_toggle').first().click();
 await page.getByRole('link', { name: 'Sign out' }).click();
}

export async function forgotPassword(page) {
 // await page.goto('https://rtsdev.uiginc.com/login');
 //Incorrect
  await page.getByRole('link', { name: 'Forgot password?' }).click();
  
  await page.getByRole('textbox', { name: 'E-Mail Address' }).fill(incorrectEmail);
  await page.getByRole('button', { name: 'Send Password Reset Link' }).click();
  //await expect(page.getByRole('strong')).toContainText('We can\'t find a user with that email address.');
  await expect(page.getByRole('alert')).toContainText('We can\'t find a user with that email address.');
  await page.waitForTimeout(10000);

  //Correct 
  //
  await page.getByRole('textbox', { name: 'E-Mail Address' }).click();
  await page.getByRole('textbox', { name: 'E-Mail Address' }).fill(correctEmail);
  await page.getByRole('button', { name: 'Send Password Reset Link' }).click();
  await expect(page.getByRole('alert')).toContainText('We have emailed your password reset link!');
}

export async function loginSucess(page) {
  await page.getByRole('textbox', { name: userNameElement }).fill(usernameCorrect);
  await page.getByRole('textbox', { name: passwordElement }).fill(passwordCorrect);
  await page.getByRole('button', { name: submitButton }).click();
  await expect(page).toHaveURL(successUrl);

}

