import { test } from '@playwright/test';

 
test('test', async ({ page }) => {
test.setTimeout(0);   
  await page.goto('https://newarc-dev.agentcareer.com/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('jsarmiento');
  await page.getByRole('textbox', { name: 'Password' }).fill('pass123$$');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.goto('https://newarc-dev.agentcareer.com/dsf');
  await fillFields(page);

});
const fields = [
    {name: 'Lead ID/Referral:', value: '1111'},
    {name: 'Last Name:', value: 'TEST'},
    {name: 'First Name:', value: 'QA'},
    {name: 'Date of Birth:', value: '01/01/2026'},
    {name: 'Phone Number:', value: '199999999999999999999'},
    {name: 'Street Address:', value: 'test address'},
    {name: 'City:', value: 'test city'},
    {name: 'State:', value: 'test state'},
    {name: 'ZIP Code:', value: '1900'},
    {name: 'Carrier (Please be specific):'},
    {name: 'Product (Please be specific):', value: 'LIFE'},
    {name: 'Modal Premium:', value: '0'},
    {name: 'Proposed Effective Date:', value: '12/12/2025'},
   ]


const carriers = [
    {name: 'Blue Cross Blue Shield of Texas'},
    {name: 'CICA Life of America'},
    {name: 'American Home Life Insurance Company'},
    {name: 'Securian - Legacy'},
]

async function fillFields(page) {
  for (const carrier of carriers) {   
    for (const field of fields){
           if (field.name === 'Carrier (Please be specific):') {
                    await page.getByRole('textbox', { name: 'Carrier (Please be specific):' }).fill(carrier.name);
            
      
    }  else{
        await page.getByRole('textbox', { name: field.name }).fill(field.value);
    }
        
     
    }
    await page.getByRole('button', { name: 'Submit Form' }).click();
    //await page.waitForTimeout(10000);
    await page.getByRole('button', { name: 'Close' }).click();
  }
};
 
 