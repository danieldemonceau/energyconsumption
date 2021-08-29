import { Request, Response, Application, NextFunction } from 'express';
import pool from '../db/pool';
import usages from './usages';
import noRouteErrorResponse from './noRouteErrorResponse';
import httpResponse from '../httpMessages';
// import logger from '../logger';
import isAPIKeyValid from '../middleware/isAPIKeyValid';

const routes = (app: Application): void => {
  const getRoot = async (req: Request, res: Response, next: NextFunction) => {
    // logger.info(req.originalUrl);
    const apiKeyClient = String(req.query.apikey);
    try {
      await isAPIKeyValid(apiKeyClient);
      const query = 'SELECT NOW()';
      // eslint-disable-next-line
      pool.query(query, (err: Error, results: any) => {
        if (err) {
          // logger.info(req.method + ' ' + req.originalUrl + ' → ' + 'HTTP 400');
          httpResponse(req, res, 'error', 400, `Error with query: ${query}`, err.message);
          next(err);
        }
        // logger.info(req.method + ' ' + req.originalUrl + ' → ' + 'HTTP 200');
        httpResponse(req, res, 'success', 200, `Success`, JSON.stringify(results.rows));
      });
    } catch (err) {
      // logger.error('API key is not valid');
      httpResponse(req, res, 'error', 400, 'Cannot get /', err.message);
    } finally {
      // pool.end(() => {});
    }
  };
  app.get('/', getRoot);
  app.use('/usages', usages);
  app.get('/*', noRouteErrorResponse);
};

export default routes;
