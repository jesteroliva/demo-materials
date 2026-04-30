import  {Locator, Page} from 'playwright';
import { ManageInstance, usernameElement, passwordElement, ButtonElements } from './loginElementsPOM';
import { getBaseUrl } from '../config/env';




const instance = new ManageInstance();
const buttons = new ButtonElements();

export class login{
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator
    readonly loginButton: Locator;
    popupPage?: Page;
    
    constructor(page: Page) {
       this.page = page;
       this.username = page.getByRole('textbox', { name: usernameElement });
       this.password = page.getByRole('textbox', { name: passwordElement });
       this.loginButton = page.getByRole('button', { name: buttons.loginButton });
       this.popupPage = undefined;

    }

 async goto(){
    await this.page.goto(getBaseUrl());
}

async waitForPopup(){
    const page1Promise = this.page.waitForEvent('popup');
    await this.page.getByRole('link', { name: 'Logo Sign in with LTC Account' }).click();
    const popup = await page1Promise;
    this.popupPage = popup;
}

async fillLogin(username: string, password: string){
      await this.popupPage.getByRole('textbox', { name: usernameElement }).fill(username);
      await this.popupPage.getByRole('textbox', { name: passwordElement }).fill(password);
      await this.popupPage.getByRole('button', { name: buttons.loginButton }).click();
}

async saveStorageState(){
    await this.page.context().storageState({ path: 'commpaySession.json' });
}
async loginIfNeeded(username: string, password: string){
    await this.goto();
    if (this.page.url().includes('login')) {
        await this.waitForPopup();
        await this.fillLogin(username, password);
        await this.saveStorageState();
        console.log('Storage state saved successfully.');
    }
    else{

    }
}     
}
