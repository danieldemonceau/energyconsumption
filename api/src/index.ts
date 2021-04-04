import app from './app';
import { APP_ENV, APP_PORT } from './config';
// import logger from './logger';

app.listen(APP_PORT);
// .on('listening', () => logger.info(`Server running in ${APP_ENV} on port ${APP_PORT}`))

console.log(`Server running in ${APP_ENV} on port ${APP_PORT}`);
