const { Pool } = require("pg");
// const chalk = require("chalk");
import logger from "../logger";

export const {
  environment,
  db_host,
  db_port,
  db_name,
  db_user,
  db_pass,
} = require("../config/db.config");

const pool = new Pool({
  host: `${db_host}`,
  port: `${db_port}`,
  database: `${db_name}`,
  user: `${db_user}`,
  password: `${db_pass}`,
  idleTimeoutMillis: 600000,
});

logger.info(
  `Connection pool: ${db_user}:${db_pass}@${db_host}:${db_port}/${db_name}`
  // `Connection pool: ${chalk.magenta(db_user)}:${chalk.magenta(
  //   db_pass
  // )}@${chalk.magenta(db_host)}:${chalk.magenta(db_port)}/${chalk.magenta(
  //   db_name
  // )}`
);

export default pool;
