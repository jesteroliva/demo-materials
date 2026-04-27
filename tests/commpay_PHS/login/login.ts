import  {Page} from 'playwright';
import { manageInstances, urls, elements, buttonElements } from '../login/loginElements';



const instance = new manageInstances();
const url = new urls();
const buttons = new buttonElements();


export async function submitLogin(page: Page) {
    await page.goto(url.devsite);
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Logo Sign in with LTC Account' }).click();
    const page1 = await page1Promise;

    for (const fieldLocator of elements) { 
      await page1.getByRole('textbox', { name: fieldLocator.name }).fill(fieldLocator.textboxData);
    }

    await page1.getByRole('button', { name: buttons.loginButton }).click();
    await page.goto(url.devsite);
    await page.getByRole('link', { name: instance.phs }).click();
}