import { Request, Response } from 'express';
import error from './error';
// import logger from '../../logger';

const httpMessage = async (
  req: Request,
  res: Response,
  type: string,
  status: number,
  title: string,
  detail: string
): Promise<void> => {
  try {
    res.status(status).json({
      response: {
        type: `${type}`,
        status: `${status}`,
        title: `${title}`,
        detail: `${detail}`,
        route: req.originalUrl,
      },
    });
  } catch (err) {
    error(req, res, 'Internal error', 'Internal Server Error');
  }
};

export default httpMessage;
