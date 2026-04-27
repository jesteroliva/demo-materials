import { test } from '@playwright/test';
import { loginSucess } from './reader';

 

 
test('test', async ({ page }) => {
    test.setTimeout(0);
    await loginSucess(page);
});