import express, { Request, Response } from 'express';
// import bodyParser from 'body-parser';
import helmet from 'helmet';
import routes from './routes';
// import logger from './logger';
import httpResponse from './httpMessages';

const app = express();

routes(app);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(helmet());

/* process.on('unhandledRejection', (error, promise) => {
  logger.error(` Oh Lord! We forgot to handle a promise rejection here: `, promise);
  logger.error(` The error was: `, error);
});
 */

// eslint-disable-next-line
app.use((err: any, req: Request, res: Response) => {
  if (err.stack) {
    console.error(err.stack);
    httpResponse(req, res, 'error', 500, 'Internal Server Error', err.message);
  }
});

export default app;
