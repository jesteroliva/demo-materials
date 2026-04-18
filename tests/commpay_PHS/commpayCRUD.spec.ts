import { test, expect } from '@playwright/test';
import { CRUD } from '../commpay_PHS/CRUD/beneficiary/beneficiary_crud';
//import { CRUD } from '../commpay_PHS/CRUD/agencies/agencies_crud';


test.setTimeout(6000000); // Set timeout to 60 seconds
test('CRUD', async ({ page }) => {
  await CRUD(page);
});