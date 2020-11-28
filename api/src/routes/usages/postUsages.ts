import csv2pg from '../../middleware/csv2pg';
import { Request, Response, NextFunction } from 'express';
import logger from '../../logger';
import isAPIKeyValid from '../../middleware/isAPIKeyValid';

interface MulterRequest extends Request {
  file: any;
}

const postUsages = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const apiKeyClient = String(req.body.apikey);
    if (!isAPIKeyValid(apiKeyClient)) {
      logger.error('API key is not valid');
      res.status(400).json({ error: 'API key is not valid' });
    } else {
      const name = await csv2pg(req, next);
      if (!name.stack) {
        logger.info(req.method + ' ' + req.originalUrl + ' → ' + 'HTTP 200');
        res.status(200).json({
          msg: 'File uploaded/import successfully!',
          file: req.file,
        });
      }
    }
  } catch (err) {
    logger.error(err);
    res.status(400).json({
      msg: 'File uploaded/import failed!',
      file: req.file,
    });
  }
};

export default postUsages;
