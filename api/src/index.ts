import app from './app';
const port = 9000;
import logger from './logger';

app
  .listen(port)
  .on('listening', () => logger.info(`Server running on port ${port}`));
