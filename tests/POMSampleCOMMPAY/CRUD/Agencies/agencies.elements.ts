import { Locator, Page, expect } from "@playwright/test";

export const elements = [
  {
    type: 'textbox',
    name: 'Agency Name *',
  }

];


export class fieldData{
   addData = `testQA${Math.random().toString(36).slice(2, 8)}`;
    
    editSearch = this.addData;
    //editData = `TEST QA AGENCY ${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    //editData = "TEST QA AGENCY " + Math.floor(Math.random() * 1000000);
    editData = `TEST QA AGENCY ${Math.random().toString(36).slice(2, 8)}`;
}

export const field = new fieldData();


export async function initEditContext(page2: Page, searchBox: Locator, other: OtherElements) {
  await searchBox.fill(field.editSearch);
  await searchBox.press('Enter');
  await page2.getByRole('row').nth(1).click();
  await page2.getByRole('button', { name: other.editButton }).click();

}


export async function editAssertion(page2: Page, searchBox: Locator, other: OtherElements) {
  
  await searchBox.fill(field.editData);
  await searchBox.press('Enter');
  await page2.getByRole('row').nth(1).click();
}

export async function deleteAssertion(page2: Page, searchBox: Locator, other: OtherElements) {
  await searchBox.fill(field.editData);
  await searchBox.press('Enter');
  await page2.getByRole('row').nth(1).click();
  await expect(page2.getByRole('row').nth(2)).not.toBeVisible();
  

}


export class OtherElements{
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