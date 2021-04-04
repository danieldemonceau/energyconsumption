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
    appPort = 9000;
    logLevelConsole = 'info';
    dbHost = 'localhost';
    dbPort = 5432;
    dbName = 'energyconsumption';
    dbUser = 'daniel';
    dbPass = 'daniel';
    apiKeyClientAuth = 'i4#0R2brAF9q0E$swOjtS0mBNY3lM8w3YUJQSSd';
    break;
  case 'staging':
    appEnv = 'staging';
    appPort = 9000;
    logLevelConsole = 'debug';
    dbHost = 'localhost';
    dbPort = 5432;
    dbName = 'energyconsumption';
    dbUser = 'daniel';
    dbPass = 'daniel';
    apiKeyClientAuth = 'i4#0R2brAF9q0E$swOjtS0mBNY3lM8w3YUJQSSd';
    break;
  case 'develop':
    appEnv = 'develop';
    appPort = 9000;
    logLevelConsole = 'debug';
    dbHost = 'localhost';
    dbPort = 5432;
    dbName = 'energyconsumption';
    dbUser = 'daniel';
    dbPass = 'daniel';
    apiKeyClientAuth = 'i4#0R2brAF9q0E$swOjtS0mBNY3lM8w3YUJQSSd';
    break;
  default:
    appEnv = 'develop';
    appPort = 9000;
    logLevelConsole = 'debug';
    dbHost = 'localhost';
    dbPort = 5432;
    dbName = 'energyconsumption';
    dbUser = 'daniel';
    dbPass = 'daniel';
    apiKeyClientAuth = 'i4#0R2brAF9q0E$swOjtS0mBNY3lM8w3YUJQSSd';
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
