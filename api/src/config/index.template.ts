import currentGitBranch from 'current-git-branch';

const gitBranch = currentGitBranch();

const os: string = process.platform;

let appEnv: string;
let appPort: number;
let logLevelConsole: string;
let dbHost: string;
let dbPort: number;
let dbName: string;
let dbUser: string;
let dbPass: string;
let apiKeyClientAuth: string;

switch (gitBranch) {
  case 'master':
    appEnv = 'production';
    appPort = 0;
    logLevelConsole = '';
    dbHost = '';
    dbPort = 0;
    dbName = '';
    dbUser = '';
    dbPass = '';
    apiKeyClientAuth = '';
    break;
  case 'staging':
    appEnv = 'staging';
    appPort = 0;
    logLevelConsole = '';
    dbHost = '';
    dbPort = 0;
    dbName = '';
    dbUser = '';
    dbPass = '';
    apiKeyClientAuth = '';
    break;
  default:
    appEnv = 'develop';
    appPort = 0;
    logLevelConsole = '';
    dbHost = '';
    dbPort = 0;
    dbName = '';
    dbUser = '';
    dbPass = '';
    apiKeyClientAuth = '';
    break;
}

const APP_ENV: string = appEnv;
const APP_PORT: number = appPort;
const LOG_LEVEL_CONSOLE: string = logLevelConsole;
const DB_HOST: string = dbHost;
const DB_PORT: number = dbPort;
const DB_NAME: string = dbName;
const DB_USER: string = dbUser;
const DB_PASS: string = dbPass;
const API_KEY_CLIENT_AUTH: string = apiKeyClientAuth;

export { APP_ENV, APP_PORT, LOG_LEVEL_CONSOLE, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS, API_KEY_CLIENT_AUTH, os };
