//import testData from './test.json';
import path from 'path';
import fs from 'fs';

const authFile = path.join(__dirname, '../.auth/user.json');
export let expires: number | undefined;

export async function loginSucess(page) {
    if (fs.existsSync(authFile)) {
        const raw = fs.readFileSync(authFile, 'utf-8');
        const user = JSON.parse(raw);
        const targetCookie = user.cookies?.find((cookie) => cookie.name === 'XSRF-TOKEN');
        expires = targetCookie?.expires;

        console.log('expires:', expires);
        const test = Date.now() / 1000;

        if (test > expires) {
            console.log('Cookie has expired');
            await fillFields(page);
        } else {
            console.log('Cookie is still valid');
            await page.context().addCookies(user.cookies);
            await page.goto('https://rtsdev.uiginc.com');
        }
    } else {
        await fillFields(page);
    }
}


export async function fillFields(page) {
    await page.goto('https://rtsdev.uiginc.com/login');
    await page.getByRole('textbox', { name: 'Email' }).fill(process.env.RTS_USERNAME!);
    await page.getByRole('textbox', { name: 'Password' }).fill(process.env.RTS_PASSWORD!);
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.context().storageState({ path: authFile });
};

