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
    console.log(err);
    // logger.error('API key is not valid');
    res.status(400).json({ error: 'API key is not valid' });
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
      console.log(err);
      res.status(400).json({
        msg: 'File uploaded/import failed!',
        file: req.file,
      });
    });
};

export default postUsages;
