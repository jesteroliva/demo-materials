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


//export const usernameData = process.env.COMMPAY_USERNAME!;
//export const passwordData = process.env.COMMPAY_PASSWORD!;
export const usernameElement = 'Email';
export const passwordElement = 'Password';


export class buttonElements {
    loginButton = 'Log in';
}

//npm install cross-env
//$env:TEST_ENV="dev"; npx playwright test