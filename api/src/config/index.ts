const gitBranch = require('current-git-branch')();

const os: string = process.platform;

let APP_ENV: string, APP_PORT: number, LOG_LEVEL_CONSOLE: string, DB_HOST: string, DB_PORT: number, DB_NAME: string, DB_USER: string, DB_PASS: string, API_KEY_CLIENT_AUTH: string

switch (gitBranch) {
  case 'master':
    APP_ENV = 'production'
    APP_PORT = 9000
    LOG_LEVEL_CONSOLE = 'info'
    DB_HOST = 'localhost'
    DB_PORT = 5432
    DB_NAME = 'energyconsumption'
    DB_USER = 'daniel'
    DB_PASS = 'daniel'
    API_KEY_CLIENT_AUTH = 'i4#0R2brAF9q0E$swOjtS0mBNY3lM8w3YUJQSSd'
    break;
  case 'staging':
    APP_ENV = 'staging'
    APP_PORT = 9000
    LOG_LEVEL_CONSOLE = 'debug'
    DB_HOST = 'localhost'
    DB_PORT = 5432
    DB_NAME = 'energyconsumption'
    DB_USER = 'daniel'
    DB_PASS = 'daniel'
    API_KEY_CLIENT_AUTH = 'i4#0R2brAF9q0E$swOjtS0mBNY3lM8w3YUJQSSd'
    break;
  case 'develop':
    APP_ENV = 'develop'
    APP_PORT = 9000
    LOG_LEVEL_CONSOLE = 'debug'
    DB_HOST = 'localhost'
    DB_PORT = 5432
    DB_NAME = 'energyconsumption'
    DB_USER = 'daniel'
    DB_PASS = 'daniel'
    API_KEY_CLIENT_AUTH = 'i4#0R2brAF9q0E$swOjtS0mBNY3lM8w3YUJQSSd'
    break;
  default:
    APP_ENV = 'develop'
    APP_PORT = 9000
    LOG_LEVEL_CONSOLE = 'debug'
    DB_HOST = 'localhost'
    DB_PORT = 5432
    DB_NAME = 'energyconsumption'
    DB_USER = 'daniel'
    DB_PASS = 'daniel'
    API_KEY_CLIENT_AUTH = 'i4#0R2brAF9q0E$swOjtS0mBNY3lM8w3YUJQSSd'
    break;
}

export {
  APP_ENV,
  APP_PORT,
  LOG_LEVEL_CONSOLE,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASS,
  API_KEY_CLIENT_AUTH,
  os
};
