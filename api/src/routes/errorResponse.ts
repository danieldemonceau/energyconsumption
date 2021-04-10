import { Request, Response } from 'express';
// import logger from '../../logger';
import isAPIKeyValid from '../middleware/isAPIKeyValid';

const errorResponse = async (req: Request, res: Response): Promise<void> => {
  const apiKeyClient = String(req.query.apikey);
  try {
    await isAPIKeyValid(apiKeyClient);
    res.status(404).json({
      error: {
        type: 'ERROR',
        title: 'API endpoint does not exist',
        status: 404,
        detail: `/${req.params[0]} endpoint does not exist`,
        instance: req.originalUrl,
      },
    });
    // logger.info(req.method + ' ' + req.originalUrl + ' → ' + 'HTTP 200');
  } catch (error) {
    // logger.error('API key is not valid');
    res.status(400).json({ error: error.message });
  } finally {
    // pool.end(() => {});
  }
};

export default errorResponse;
