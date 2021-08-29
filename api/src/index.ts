import https from 'https';
// import http from 'http';
import fs from 'fs';
import app from './app';
import { APP_ENV, APP_PORT } from './config';
import pool from './db/pool';

// import logger from './logger';

const options = {
  key: fs.readFileSync(`${__dirname}/../key.pem`),
  cert: fs.readFileSync(`${__dirname}/../cert.pem`),
};

/* app.listen(APP_PORT);
   http.createServer(app).listen(APP_PORT); */
const server = https.createServer(options, app).listen(APP_PORT);
// .on('listening', () => logger.info(`Server running in ${APP_ENV} on port ${APP_PORT}`))

const shutDown = () => {
  console.log('Received kill signal, shutting down gracefully');
  server.close(() => {
    pool.end();
    console.log('Closed out remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

console.log(`Server running in ${APP_ENV} on port ${APP_PORT}`);
