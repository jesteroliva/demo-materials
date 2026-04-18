import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test('test', async ({ page }) => {
  test.setTimeout(0);
  await page.goto('https://uigreports-dev.uiginc.com/login');
  await page.getByRole('textbox', { name: 'E-Mail Address' }).fill('qateam@objectbright.com');

  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.goto('https://uigreports-dev.uiginc.com/production-commission');

 const buttonElements = [
  
  'Summary - District Sales',
  'District Detail',
  'Summary - Carriers/Product',
  'Monthly Recognition',
  'Top 20',
  'Top 10 DSMs',
  'Agent Comparison',
  'Monthly Comparison',
  'Agent Last Application',
  'Payment Report',
  'Ring Tradition',
  'Package Selling Weekly',
  'Package Selling Quarterly',
  'Package Selling Yearly',
  'UIG Issued Annual',
  'Division Issued Annual',
  'Agent Issued Annual',
  'Recruiting Bonus',
  'Retention Bonus',
  'North/East WTD Data',
  'South/West WTD Data',
  'Net Growth',
  
  'Net Growth - Product Type',
  'DSM Bonus – New Production – Summary',
  'DSM Bonus – New Production – Downline Per District',
  'DSM Bonus – Agent Success & Retention – Summary',
  'DSM Bonus – Agent Success & Retention – Downline Per District',
  'DSM Bonus – Ancillary Sales – Summary',
  'DSM Bonus – Ancillary Sales – Downline Per District',
  'DSM Bonus - Growth - Summary',
  'DSM Bonus - Growth – Downline',
  'DSM Bonus – Prior Production – Summary',
  'DSM Bonus – Prior Production – Downline Per District',
  
]



  for (const button of buttonElements){
    await test.step(`Testing ${button} Report`, async () => {
     await fillFields(page);
      const summaryPopupPromise = page
      .waitForEvent('popup', { timeout: 10000 })
      .then((popup) => ({ kind: 'popup', popup }))
      .catch(() => null);
      const directDownloadPromise = page
      .waitForEvent('download', { timeout: 10000 })
      .then((download) => ({ kind: 'download', download }))
      .catch(() => null);
     await page.getByRole('link', { name: button}).first().click();

      const eventResult = await Promise.race([directDownloadPromise, summaryPopupPromise]);
      if (!eventResult) {
      return;
      }

      if (eventResult.kind === 'download') {
      await saveDownloadToDirectory(eventResult.download);
    return;
    }

      await initiateDownload(eventResult.popup);
    });
  }
  async function fillFields(page){
  await page.getByRole('textbox', { name: 'Period Start Week:' }).fill('2026011');
  await page.getByRole('textbox', { name: 'Period End Week:' }).fill('2026011');
  await page.locator('#period_end_week').nth(1).fill('2026011');

 }

 async function initiateDownload(reportPage){
  const downloadDir = path.join(__dirname, 'downloads');
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
  }

  try {
    const [pdfPopup, download] = await Promise.all([
      reportPage.waitForEvent('popup'),
      reportPage.waitForEvent('download'),
      reportPage.getByRole('link', { name: 'PDF' }).first().click()
    ]);
    await download.saveAs(path.join(downloadDir, download.suggestedFilename()));
    if (!pdfPopup.isClosed()) {
      await pdfPopup.close();
    }

    const [excelPopup, download1] = await Promise.all([
      reportPage.waitForEvent('popup'),
      reportPage.waitForEvent('download'),
      reportPage.getByRole('link', { name: 'Excel' }).click()
    ]);
    await download1.saveAs(path.join(downloadDir, download1.suggestedFilename()));
    if (!excelPopup.isClosed()) {
      await excelPopup.close();
    }
  } finally {
    if (!reportPage.isClosed()) {
      await reportPage.close();
    }
  }

  /*
  const [, download2] = await Promise.all([
    reportPage.waitForEvent('popup'),
    reportPage.waitForEvent('download'),
    reportPage.getByRole('link', { name: 'Change Report' }).click()
  ]);
  await download2.saveAs(path.join(downloadDir, download2.suggestedFilename()));
  */
}

 async function saveDownloadToDirectory(download){
  const downloadDir = path.join(__dirname, 'downloads');
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
  }

  await download.saveAs(path.join(downloadDir, download.suggestedFilename()));
 }
  

});