import { Request, Response, NextFunction } from 'express';
import csv2pg from '../../middleware/csv2pg';
// import logger from '../../logger';
import isAPIKeyValid from '../../middleware/isAPIKeyValid';

interface MulterRequest extends Request {
  file: any;
}

const postUsages = async (req: MulterRequest, res: Response, next: NextFunction): Promise<any> => {
  const apiKeyClient = String(req.body.apikey);
  isAPIKeyValid(apiKeyClient).catch((err) => {
    // logger.error('API key is not valid');
    res.status(400).json({ error: err.message });
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
      res.status(400).json({
        // msg: 'File uploaded/import failed!',
        msg: err.message,
        file: req.file,
      });
    });
};

export default postUsages;
