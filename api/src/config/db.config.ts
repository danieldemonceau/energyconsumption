// const dotenv = require('dotenv');
// const dotenv = require("custom-env").env();
import logger from "../logger";

let dotenv: any;
switch (require("current-git-branch")()) {
  case "develop":
    dotenv = require("custom-env").env("dev");
    dotenv.config();
    break;
  case "staging":
    dotenv = require("custom-env").env("sta");
    dotenv.config();
    break;
  case "master":
    dotenv = require("custom-env").env("pro");
    dotenv.config();
    break;
  default:
    dotenv = require("custom-env").env("");
    dotenv.config();
    logger.info(`Default env`);
}
dotenv.config();

module.exports = {
  environment: process.env.NODE_ENV,
  db_host: process.env.DB_HOST,
  db_port: process.env.DB_PORT,
  db_name: process.env.DB_NAME,
  db_user: process.env.DB_USER,
  db_pass: process.env.DB_PASS,
};

export {};
