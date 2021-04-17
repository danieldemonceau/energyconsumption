import https from 'https';
// import http from 'http';
import fs from 'fs';
import app from './app';
import { APP_ENV, APP_PORT } from './config';

// import logger from './logger';

const options = {
  key: fs.readFileSync(`${__dirname} /../key.pem`),
  cert: fs.readFileSync(`${__dirname} /../cert.pem`),
};

/* app.listen(APP_PORT);
   http.createServer(app).listen(APP_PORT); */
https.createServer(options, app).listen(APP_PORT);
// .on('listening', () => logger.info(`Server running in ${APP_ENV} on port ${APP_PORT}`))

console.log(`Server running in ${APP_ENV} on port ${APP_PORT}`);
