import { elements,field,OtherElements } from './agencies.elements';
import { Page, Locator } from '@playwright/test';
import { ManageInstance } from '../../login/loginElementsPOM';

const other = new OtherElements();
const manageInstance = new ManageInstance();
export class agenciesCRUD{
    readonly page: Page; 
    confirmEditButton?: Locator;
    confirmDeleteButton?: Locator;
    confirmAddButton?: Locator;
    addrecord?: Locator;
    searchBox?: Locator;
    popupPage?: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

     async openManageClient(){
      await this.page.getByRole('link', { name: manageInstance.phs }).click();
    }

    async initAdd(){
     await this.addrecord?.first().click();
    }

     async addAgency() {
      await this.clickAgenciesButton();
      await this.initAdd();
      await this.fillAgencyLogic(field.addData);
      await this.clickAddButton();
    }

    async clickAddButton() {
      await this.confirmAddButton?.click();
    }

    async clickEditButton(){
      await this.confirmEditButton?.click();

    }

    async clickDeleteButton(){
      await this.confirmDeleteButton?.click();
    }

    private async clickAgenciesButton() {
        const popupPromise = this.page.waitForEvent('popup');
        await this.page.getByRole('link', { name: other.agencies, exact: true }).click();
        const popup = await popupPromise;
        this.popupPage = popup;
        this.addrecord = this.popupPage.getByRole('button', { name: other.addData });
        this.searchBox = this.popupPage.getByRole('searchbox', { name: other.search });
        this.confirmAddButton = this.popupPage.getByRole('button', { name: other.addButton });
        this.confirmEditButton = this.popupPage.getByRole('button', { name: other.updateButton });
        this.confirmDeleteButton = this.popupPage.getByRole('button', { name: other.confirmDelete });
        await this.popupPage.waitForLoadState('domcontentloaded');
    
    }

   private async fillAgencyLogic(data: string) {
    for (const fieldLocator of elements) {

    switch (fieldLocator.type) {
      case 'textbox':
       await this.popupPage.getByRole('textbox', { name: fieldLocator.name }).fill(data);
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
   

    }

    async initEdit(){
      await this.searchBox.fill(field.editSearch);
      await this.searchBox.press('Enter');
      await this.popupPage.getByRole('row').nth(1).click();
      await this.popupPage.getByRole('button', { name: other.editButton }).click();
    }

    async editAgency() {
      await this.initEdit();
      await this.fillAgencyLogic(field.editData);
      await this.clickEditButton();
    }

    async initDelete(){
    await this.searchBox.fill(field.editData);
    await this.searchBox.press('Enter');
    await this.popupPage.getByRole('row').nth(1).click();
    await this.popupPage.getByRole('button', { name: other.deleteButton }).click();
    }

    async deleteAgency() {
      await this.initDelete();
      await this.clickDeleteButton();
    }
}


