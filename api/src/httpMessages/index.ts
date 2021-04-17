import { Request, Response } from 'express';
// import logger from '../../logger';

const httpMessage = async (
  req: Request,
  res: Response,
  type: string,
  status: number,
  title: string,
  detail: string,
): Promise<void> => {
  res.status(status).json({
    error: {
      type: `${type}`,
      status: `${status}`,
      title: `${title}`,
      detail: `${detail}`,
      route: req.originalUrl,
    },
  });
};

export default httpMessage;
