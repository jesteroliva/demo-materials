import { editAssertion, deleteAssertion,elements,field,otherElements } from './beneficiary_crudElements';
import { test, expect, Page } from '@playwright/test';
import { initAddContext, initEditContext } from './beneficiary_crudElements';

const other = new otherElements();


export async function CRUD(page: Page) {

  await test.step('CRUD STEPS', async () => {
    const { page2, searchBox } = await initAddContext(page, other);

    await test.step('Add record', async () => {
    await page2.getByRole('button', { name: other.addData }).click();
    

    for (const fieldLocator of elements) {
      //const element = page2.locator(fieldLocator.name);

    switch (fieldLocator.type) {
      case 'textbox':
       await page2.getByRole('textbox', { name: fieldLocator.name }).fill(field.textboxData);
        break;
          
      case 'textboxDateFrom':
       await page2.getByRole('textbox', { name: 'From Date' }).fill('01/01/2026');
        break;

      case 'textboxDateTo':
       await page2.getByRole('textbox', { name: 'To Date' }).fill('01/31/2026');
        break;
       
      case 'spinbutton':
       await page2.getByRole('spinbutton', { name: fieldLocator.name }).fill(field.spinData);
        break;

      case 'combobox':
        console.log(`Handle dropdown: ${fieldLocator.name}`);
        await page2.getByRole('combobox', { name: fieldLocator.name }).click();
        try 
        { await page2.getByRole('option').first().click(); 
        }catch { await page2.waitForTimeout(2000); }
        
        break;

      case 'checkbox':
        console.log(`Handle checkbox: ${fieldLocator.name}`);
        break;


      default:
        console.log(`Unknown type: ${fieldLocator.type}`);
    }
  }
   await page2.getByRole('button', { name: other.addButton }).click()
});


  await test.step('Edit Record', async () => {
    await initEditContext(page2, searchBox, other);

    for (const fieldLocator of elements) {
     switch (fieldLocator.type) {
      case 'textbox':
       await page2.getByRole('textbox', { name: fieldLocator.name }).fill(field.editData);
        break;
      }
    }
    const [response] = await Promise.all([
      page2.waitForResponse(() => true),
      page2.getByRole('button', { name: other.updateButton }).click()
      ]);
    expect.soft(response.status()).not.toBe(500);
      await editAssertion(page2, searchBox, other);
  });


  await test.step('Delete Record', async () => {
    await searchBox.fill(field.editData);
    await searchBox.press('Enter');
    const deleteButton = page2.getByRole('button', { name: other.deleteButton });
    const isClickable = await deleteButton.isVisible().catch(() => false) && await deleteButton.isEnabled().catch(() => false);
    if (isClickable) {
    await deleteButton.click();
    } else {
    await page2.getByRole('row').nth(1).click();
    await deleteButton.click();
    }
    await page2.getByRole('button', { name: other.confirmDelete }).click();
    await deleteAssertion(page2, searchBox, other);
  });
});
}