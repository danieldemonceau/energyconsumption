import { Request, Response } from 'express';
import pool from '../db/pool';
import usages from './usages';
// import logger from '../logger';

const routes = (app: any): void => {
  const getRoot = (_req: Request, res: Response, next: any) => {
    // logger.info(req.originalUrl);
    pool.query('SELECT NOW()', (error: any, results: any) => {
      if (error) {
        // logger.info(req.method + ' ' + req.originalUrl + ' → ' + 'HTTP 400');
        res.status(400).json(error);
        next(error);
      }
      // logger.info(req.method + ' ' + req.originalUrl + ' → ' + 'HTTP 200');
      res.status(200).json(results.rows);
    });
  };
  app.get('/', getRoot);
  app.use('/usages', usages);
};

export default routes;
