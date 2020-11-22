import logger from '../logger';

let env: string;
switch (require('current-git-branch')()) {
  case 'develop':
    env = 'dev';
    break;
  case 'staging':
    env = 'sta';
    break;
  case 'master':
    env = 'pro';
    break;
  default:
    env = '';
}
logger.info(`${env} environment`);
const customEnv = require('custom-env');
customEnv.env('dev');
customEnv.config();

export const dbConfig = {
  environment: process.env.NODE_ENV,
  db_host: process.env.DB_HOST,
  db_port: process.env.DB_PORT,
  db_name: process.env.DB_NAME,
  db_user: process.env.DB_USER,
  db_pass: process.env.DB_PASS,
};
