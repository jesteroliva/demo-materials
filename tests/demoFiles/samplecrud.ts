import { text } from "node:stream/consumers";

export const elements = [
  {
    type: 'textbox',
    name: 'First Name',
    //locator: 'input[name="firstName"]',
  },
  {
    type: 'textbox',
    name: 'Last Name',
    //locator: 'input[name="lastName"]',
  },
  {
    type: 'textbox',
    name: 'name@example.com',
    //locator: 'input[name="name@example.com"]',
  },
  {
    type: 'textbox',
    name: 'Mobile Number',
    //locator: 'input[name="mobile"]',
  },
   {
    type: 'textbox',
    name: 'Current Address',
    //locator: 'input[name="currentAddress"]',
  },
  {
    type: 'combobox',
    name: 'country',
    locator: 'select[name="country"]'
  },
  {
    type: 'checkbox',
    name: 'terms',
    locator: 'input[name="terms"]'
  }
];

export class fieldData{
    textboxData = "test"+Date.now();
}
export class urls{
 baseUrl = "https://demoqa.com/automation-practice-form/"
}

export class assertionElements{}