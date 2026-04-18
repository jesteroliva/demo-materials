import { Page } from '@playwright/test';

//import { text } from 'node:stream/consumers';

export class manageInstances {
  phs = 'Manage PHS Client';
}

export class urls {
    devsite = 'https://commpay-dev.commtpa.com/login';
    stagingsite = 'https://commpay-staging.commtpa.com/login';
    //prodsite = 'https://commpay.commtpa.com/login';
}
export const elements = [
  {
    type: 'textbox',
    name: 'Email',
    //locator: 'input[name="firstName"]',
    //textboxData: 'joliva@objectbright.com'
    textboxData: process.env.COMMPAY_USERNAME!
  },
  {
    type: 'textbox',
    name: 'Password',
    //locator: 'input[name="lastName"]',
    //textboxData: 'password'
    textboxData: process.env.COMMPAY_PASSWORD!
  }
];

export class buttonElements {
    loginButton = 'Log in';
}


