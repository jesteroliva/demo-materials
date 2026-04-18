import { elements,urls,assertionElements,fieldData } from './samplecrud';
import { test, expect, Page} from '@playwright/test';


const url = new urls();
const assertion = new assertionElements();
const field = new fieldData();


export class Form1Submission {
  async submitForm(page: Page) {
    await page.goto(url.baseUrl);
    for (const fieldLocator of elements) {
     // const element = page.locator(fieldLocator.name);

    switch (fieldLocator.type) {
      case 'textbox':
       await page.getByRole('textbox', { name: fieldLocator.name }).fill(field.textboxData);
        break;

      case 'combobox':
        console.log(`Handle dropdown: ${fieldLocator.name}`);
        await page.getByRole('combobox', { name: fieldLocator.name }).click();

        try 
        { await page.getByRole('option').first().click(); 
        }catch { await page.waitForTimeout(2000); }
        
        break;

      case 'checkbox':
        console.log(`Handle checkbox: ${fieldLocator.name}`);
        break;

      default:
        console.log(`Unknown type: ${fieldLocator.type}`);
    }
  }
  }}