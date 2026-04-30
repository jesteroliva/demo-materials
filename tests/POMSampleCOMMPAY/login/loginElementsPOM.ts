import { Page } from '@playwright/test';

export class ManageInstance {
  phs = 'Manage PHS Client';
}



//export const usernameData = process.env.COMMPAY_USERNAME!;
//export const passwordData = process.env.COMMPAY_PASSWORD!;
export const usernameElement = 'Email';
export const passwordElement = 'Password';


export class ButtonElements {
    loginButton = 'Log in';
}

//npm install cross-env
//$env:TEST_ENV="dev"; npx playwright test