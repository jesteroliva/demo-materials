import { editAssertion, deleteAssertion,elements,field,otherElements } from './agencies.elements';
import { test, expect, Page, Locator } from '@playwright/test';


const other = new otherElements();

export class agenciesCRUD{
    readonly page: Page; 
    readonly confirmEditButton: Locator;
    readonly confirmDeleteButton: Locator;
    addButton? : Locator;
    addrecord?: Locator;
    searchBox?: Locator;
    popupPage?: Page;
    
    constructor(page: Page) {
        this.page = page;
        this.confirmEditButton = page.getByRole('button', { name: other.updateButton });
        this.confirmDeleteButton = page.getByRole('button', { name: other.confirmDelete });

    }

    async clickAddButton() {
         const popupPromise = this.page.waitForEvent('popup');
        await this.page.getByRole('link', { name: other.agencies, exact: true }).click();
        const popup = await popupPromise;
        this.popupPage = popup;
        this.addrecord = this.popupPage.getByRole('button', { name: other.addData });
        this.searchBox = this.popupPage.getByRole('searchbox', { name: other.search });
        this.addButton = this.popupPage.getByRole('button', { name: other.addButton });
        await this.popupPage.waitForLoadState('domcontentloaded');
    
    }

    async addNewRecord() {
    await this.addrecord?.first().click();
    for (const fieldLocator of elements) {

    switch (fieldLocator.type) {
      case 'textbox':
       await this.popupPage.getByRole('textbox', { name: fieldLocator.name }).fill(field.textboxData);
        break;

      case 'combobox':
        console.log(`Handle dropdown: ${fieldLocator.name}`);
        await this.popupPage.getByRole('combobox', { name: fieldLocator.name }).click();

        try 
        {
          const firstOption = this.popupPage.getByRole('option').first();
          await firstOption.waitFor({ state: 'visible', timeout: 10000 });
          await firstOption.click();
        }
        catch {}
        
        break;

      case 'checkbox':
        console.log(`Handle checkbox: ${fieldLocator.name}`);
        break;

      default:
        console.log(`Unknown type: ${fieldLocator.type}`);
    }
  }
   await this.addButton?.click();

    }
  }


/*
export async function CRUD(page: Page) {



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
    await page2.getByRole('row').nth(1).click();
    await page2.getByRole('button', { name: other.deleteButton }).click();
    await page2.getByRole('button', { name: other.confirmDelete }).click();
    await deleteAssertion(page2, searchBox, other);
  });
});

}*/