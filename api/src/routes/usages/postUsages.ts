import csv2pg from '../../middleware/csv2pg';
import { Request, Response } from 'express';
import logger from '../../logger';

interface MulterRequest extends Request {
  file: any;
}

const postUsages = async (req: MulterRequest, res: Response, next: any) => {
  logger.info(req.originalUrl);
  try {
    await csv2pg(req, next);

    logger.info(req.method + ' ' + req.originalUrl + ' → ' + 'HTTP 200');
    res.status(200).json({
      msg: 'File uploaded/import successfully!',
      file: req.file,
    });
    // });
  } catch (err) {
    logger.info(req.method + ' ' + req.originalUrl + ' → ' + 'HTTP 400');
    res.status(400).json({
      msg: 'File uploaded/import failed!',
      file: req.file,
    });
    logger.error(err);
    logger.error('the other err');
  }
};

export default postUsages;
