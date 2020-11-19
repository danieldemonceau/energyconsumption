import csv2pg from '../../middleware/csv2pg';
import { Request, Response } from 'express';
import logger from '../../logger';

interface MulterRequest extends Request {
  file: any;
}

const postUsages = async (req: MulterRequest, res: Response, next: any) => {
  logger.info(req.originalUrl);
  try {
    csv2pg(req, /*res, */ next);
    //   .then((err: any) => {
    //   console.log("err", err);
    //   err
    //     ? res.status(404).json({
    //         msg: "File uploaded, but no INSERT INTO db",
    //       })
    res.status(200).json({
      msg: 'File uploaded/import successfully!',
      file: req.file,
    });
    // });
  } catch (err) {
    logger.error('the other err');
  }
};

export default postUsages;
