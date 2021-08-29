import { Request, Response } from 'express';
// import logger from '../../logger';
import isAPIKeyValid from '../middleware/isAPIKeyValid';
import httpResponse from '../httpMessages';

const errorResponse = async (req: Request, res: Response): Promise<void> => {
  const apiKeyClient = String(req.query.apikey);
  try {
    await isAPIKeyValid(apiKeyClient);
    httpResponse(req, res, 'error', 404, 'API endpoint not found', `/${req.params[0]} endpoint does not exist`);
    // logger.info(req.method + ' ' + req.originalUrl + ' → ' + 'HTTP 200');
    // eslint-disable-next-line
  } catch (err: any) {
    // logger.error('API key is not valid');
    httpResponse(req, res, 'error', 400, err.message, '');
  } finally {
    // pool.end(() => {});
  }
};

export default errorResponse;
