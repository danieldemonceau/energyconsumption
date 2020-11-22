import express, { Response } from 'express';
import bodyParser from 'body-parser';
const app = express();
import logger from './logger';

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

import routes from './routes';
routes(app);

process.on('unhandledRejection', (error, promise) => {
  logger.error(
    ` Oh Lord! We forgot to handle a promise rejection here: `,
    promise
  );
  logger.error(` The error was: `, error);
});

app.use((err: any, res: Response) => {
  if (err.stack) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  }
});

export default app;
