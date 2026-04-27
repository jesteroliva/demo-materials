import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const ENV_URLS = {
    dev:  process.env.dev_COMMPAY_URL!,
    staging: process.env.staging_COMMPAY_URL!,
    prod: process.env.prod_COMMPAY_URL!
};

export const getEnv = () => process.env.ENV || 'dev';
export const getBaseUrl = () => ENV_URLS[getEnv()];

export class getCredentials {
    env = getEnv().toUpperCase();
    username = process.env[`${this.env}_COMMPAY_USERNAME`];
    password = process.env[`${this.env}_COMMPAY_PASSWORD`];
}