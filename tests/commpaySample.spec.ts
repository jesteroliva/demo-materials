import { test, expect } from '@playwright/test';

test.setTimeout(6000000); // Set timeout to 60 seconds
test('test', async ({ page }) => {
  await page.goto('https://commpay-dev.commtpa.com/login');
  const page1Promise = page.waitForEvent('popup');
  const addData = 'Test'+Date.now();
  const editData = 'Test Updated' +Date.now();


  //login
  await page.getByRole('link', { name: 'Logo Sign in with LTC Account' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('textbox', { name: 'Email' }).fill('joliva@objectbright.com');
  await page1.getByRole('textbox', { name: 'Password' }).fill('password');
  await page1.getByRole('button', { name: 'Log in' }).click();
  await page.goto('https://commpay-dev.commtpa.com/dashboard');
  await page.getByRole('link', { name: 'Manage PHS Client' }).click();
  await page.getByRole('link', { name: 'Beneficiaries' }).click();
  const page2Promise = page.waitForEvent('popup');
  const page2 = await page2Promise;
  await page2.waitForLoadState('domcontentloaded');

  //add
  await page2.getByRole('button', { name: 'New Beneficiary', exact: true }).click();
  await page2.getByRole('combobox', { name: 'Select producer...' }).click();
  //await page2.getByRole('option', { name: 'ADP, INC.' }).click();
  await page2.getByRole('option').first().click();
  await page2.getByRole('textbox', { name: 'Beneficiary Name' }).fill(addData);
  await page2.getByRole('textbox', { name: 'From Date' }).fill('04/11/2026');
  await page2.getByRole('textbox', { name: 'To Date' }).fill('04/12/2026');
  await page2.getByRole('textbox', { name: 'Tax ID' }).fill('123');
  await page2.getByRole('combobox', { name: 'Select payment mode...' }).click();
  //await page2.getByRole('option', { name: 'EFT' }).click();
  await page2.getByRole('option').first().click();
  await page2.getByRole('button', { name: 'Submit' }).click();

  //add assertion
  await expect(page2.getByText('The Beneficiary was')).toBeVisible();


  
  await page2.getByRole('searchbox', { name: 'Search here...' }).click();
  await page2.getByRole('searchbox', { name: 'Search here...' }).fill(addData);
  await page2.getByRole('searchbox', { name: 'Search here...' }).press('Enter');
  await expect(page2.getByText(addData)).toBeVisible();
  //await page2.getByRole('cell', { name: addData }).click();
  await page2.getByRole('row').nth(1).click(); 
  await page2.getByRole('button', { name: 'Edit' }).click();
  await page2.getByRole('textbox', { name: 'Beneficiary Name' }).fill(editData); //apply editdata variable start here
  await page2.getByRole('button', { name: 'Save Changes' }).click();


  //edit assertions
  await page2.getByRole('searchbox', { name: 'Search here...' }).click();
  await page2.getByRole('searchbox', { name: 'Search here...' }).fill(editData);
  await page2.getByRole('searchbox', { name: 'Search here...' }).press('Enter');
  await expect(page2.getByText(editData)).toBeVisible();
  await expect(page2.getByRole('row').nth(1)).toBeVisible();

  //delete
  await page2.getByRole('row').nth(1).click();
  await page2.getByRole('row').nth(1).click();
  
  //await page2.getByRole('cell', { name: 'test QA 04112026' }).click();
  //await page2.getByRole('cell', { name: 'test QA 04112026' }).click();


  
 
const deleteButton = page2.getByRole('button', { name: '' });
const isClickable = await deleteButton.isVisible().catch(() => false) && await deleteButton.isEnabled().catch(() => false);

if (isClickable) {
  await deleteButton.click();
} else {
  await page2.getByRole('row').nth(1).click();
  await deleteButton.click();
}

await page2.getByRole('button', { name: 'Delete' }).click();
await test.step('Verify deleted beneficiary is not visible', async () => {
await expect(page2.getByRole('row').nth(2)).not.toBeVisible();
});

});

//STEPS:
//codegen
//remove redundancies
//fix hardcoded fields


//use --debug when running for demonstration

//optimize
