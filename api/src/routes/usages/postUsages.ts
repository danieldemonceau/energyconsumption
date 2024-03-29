import csv2pg from '../../middleware/csv2pg';
// import logger from '../../logger';
import isAPIKeyValid from '../../middleware/isAPIKeyValid';
import httpResponse from '../../httpMessages';

// eslint-disable-next-line
const postUsages = async (response: any): Promise<any> => {
  const { res } = response;
  const { req } = response.res;
  const { body, file } = response;

  const apiKeyClient = String(body.apikey);
  isAPIKeyValid(apiKeyClient).catch((err) => {
    // logger.error('API key is not valid');
    httpResponse(req, res, 'error', 400, 'Cannot post usages', err.message);
  });
  csv2pg(req)
    .then(() => {
      // logger.info(req.method + ' ' + req.originalUrl + ' → ' + 'HTTP 200');

      httpResponse(
        req,
        res,
        'success',
        200,
        'File uploaded successfully!',
        JSON.stringify({
          file: {
            filename: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
          },
        })
      );
    })
    .catch((err: Error) => {
      // logger.error(err);
      httpResponse(req, res, 'error', 500, 'Cannot post usages', err.message);
    });
};

export default postUsages;
