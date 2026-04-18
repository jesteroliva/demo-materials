import { test, expect } from '@playwright/test';
import { Form1Submission } from './samplecrudForm1';

const form1 = new Form1Submission();

test.setTimeout(6000000); // Set timeout to 60 seconds
test('form1 submit', async ({ page }) => {
  await form1.submitForm(page);
});