const { Pool } = require('pg');
import { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } from '../config';
import logger from '../logger';

const pool = new Pool({
  host: `${DB_HOST}`,
  port: `${DB_PORT}`,
  database: `${DB_NAME}`,
  user: `${DB_USER}`,
  password: `${DB_PASS}`,
  idleTimeoutMillis: 600000
});

logger.debug(`Connection pool: ${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);

export default pool;
