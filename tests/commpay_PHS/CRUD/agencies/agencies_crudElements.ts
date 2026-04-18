// elements are placed here and extra steps that cannot be reused in other projects
//change page2 to page in this file and the _crud file if no popups are involved in the test case

import { Locator, Page, expect } from "@playwright/test";
import { submitLogin } from "../../login/login";


export const elements = [
  {
    type: 'textbox',
    name: 'Agency Name *',
  }

];

export class fieldData{
    textboxData = "testQA"+Date.now();
    editSearch = this.textboxData;
    editData = "TEST QA AGENCY "+Date.now();
    
    
}

export const field = new fieldData();


export async function initAddContext(page: Page, other: otherElements): Promise<{ page2: Page; searchBox: Locator }> {
  await submitLogin(page);
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: other.agencies, exact: true }).click();
  const page2 = await page2Promise;
  await page2.waitForLoadState('domcontentloaded');
  const searchBox = page2.getByRole('searchbox', { name: other.search });

  return { page2, searchBox };
}

export async function initEditContext(page2: Page, searchBox: Locator, other: otherElements) {
  
  await searchBox.fill(field.editSearch);
  await searchBox.press('Enter');
  await page2.getByRole('row').nth(1).click();
  await page2.getByRole('button', { name: other.editButton }).click();

}


export async function editAssertion(page2: Page, searchBox: Locator, other: otherElements) {
  
  await searchBox.fill(field.editData);
  await searchBox.press('Enter');
  await page2.getByRole('row').nth(1).click();
}

export async function deleteAssertion(page2: Page, searchBox: Locator, other: otherElements) {
  await searchBox.fill(field.editData);
  await searchBox.press('Enter');
  await page2.getByRole('row').nth(1).click();
  await expect(page2.getByRole('row').nth(2)).not.toBeVisible();
  

}


export class otherElements{
 agencies = 'Agencies';
 addData = 'New Agency';
 addButton = 'Submit';
 editButton = 'Edit';
 updateButton = 'Update';
 //tableRow = 'row';
 search = 'Search here...';
 deleteButton = '';
confirmDelete =  'Delete';

}




