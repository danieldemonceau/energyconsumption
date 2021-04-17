import { Request, Response, NextFunction } from 'express';
import csv2pg from '../../middleware/csv2pg';
// import logger from '../../logger';
import isAPIKeyValid from '../../middleware/isAPIKeyValid';
import httpResponse from '../../httpMessages';

interface MulterRequest extends Request {
  file: any;
}

const postUsages = async (req: MulterRequest, res: Response, next: NextFunction): Promise<any> => {
  const apiKeyClient = String(req.body.apikey);
  isAPIKeyValid(apiKeyClient).catch((error) => {
    // logger.error('API key is not valid');
    httpResponse(req, res, 'error', 400, 'Cannot post usages', error.message);
  });
  csv2pg(req, next)
    .then(() => {
      // logger.info(req.method + ' ' + req.originalUrl + ' → ' + 'HTTP 200');
      res.status(200).json({
        msg: 'File uploaded/import successfully!',
        file: req.file,
      });
    })
    .catch((err: any) => {
      // logger.error(err);
      httpResponse(req, res, 'error', 500, 'Cannot post usages', err.message);
    });
};

export default postUsages;
