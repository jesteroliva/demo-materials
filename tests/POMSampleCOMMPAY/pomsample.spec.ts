import { test, expect } from '@playwright/test';
import { login } from '../POMSampleCOMMPAY/login/login';
import fs from 'fs';
import { getCredentials } from './config/env';
import { agenciesCRUD } from '../POMSampleCOMMPAY/CRUD/Agencies/agencies';

if (fs.existsSync('commpaySession.json')) {
 test.use({ storageState: 'commpaySession.json' });
}

test('test', async ({ page }) => {
 const creds = new getCredentials();
 const loginPage = new login(page);
 const agenciesCRUDPage = new agenciesCRUD(page);


 await loginPage.goto();
 await loginPage.loginIfNeeded(creds.username, creds.password);
 await page.getByRole('link', { name: 'Manage PHS Client' }).click();
 await agenciesCRUDPage.clickAddButton();
 await agenciesCRUDPage.addNewRecord();
});