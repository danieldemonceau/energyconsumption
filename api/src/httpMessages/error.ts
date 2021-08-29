import { Request, Response } from 'express';
// import logger from '../../logger';

const error = async (req: Request, res: Response, title: string, detail: string): Promise<void> => {
  try {
    res.status(404).json({
      error: {
        type: 'error',
        title: `${title}`,
        status: 404,
        detail: `${detail}`,
        instance: req.originalUrl,
      },
    });
    // logger.info(req.method + ' ' + req.originalUrl + ' → ' + 'HTTP 200');
    // eslint-disable-next-line
  } catch (err: any) {
    // logger.error('API key is not valid');
    res.status(400).json({ error: err.message });
  } finally {
    // pool.end(() => {});
  }
};

export default error;
