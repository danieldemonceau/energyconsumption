import { Request, Response, Application, NextFunction } from 'express';
import pool from '../db/pool';
import usages from './usages';
import noRouteErrorResponse from './noRouteErrorResponse';
import httpResponse from '../httpMessages';
// import logger from '../logger';

const routes = (app: Application): void => {
  const getRoot = (req: Request, res: Response, next: NextFunction) => {
    // logger.info(req.originalUrl);
    const query = 'SELECT NOW()';
    pool.query(query, (err: any, results: any) => {
      if (err) {
        // logger.info(req.method + ' ' + req.originalUrl + ' → ' + 'HTTP 400');
        httpResponse(req, res, 'error', 400, `Error with query: ${query}`, err.message);
        next(err);
      }
      // logger.info(req.method + ' ' + req.originalUrl + ' → ' + 'HTTP 200');
      httpResponse(req, res, 'success', 200, `Success`, JSON.stringify(results.rows));
    });
  };
  app.get('/', getRoot);
  app.use('/usages', usages);
  app.get('/*', noRouteErrorResponse);
};

export default routes;
