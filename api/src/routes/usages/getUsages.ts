import { Request, Response } from 'express';
import validator from 'validator';
import pool from '../../db/pool';
// import logger from '../../logger';
import isAPIKeyValid from '../../middleware/isAPIKeyValid';

const getUsages = async (req: Request, res: Response): Promise<void> => {
  const apiKeyClient = String(req.query.apikey);
  try {
    await isAPIKeyValid(apiKeyClient);
    const limit = req.query.limit ?? 20;
    const offset = req.query.offset ?? 0;
    const from = req.query.from && String(req.query.from).replace(/^'+|'+$/g, '');
    const to = req.query.to && String(req.query.to).replace(/^'+|'+$/g, '');

    const limitIsInt = validator.isInt(String(limit), { min: 0 });
    const offsetIsInt = validator.isInt(String(offset), { min: 0 });
    // const fromIsDate = validator.isISO8601(String(from));
    const fromIsDate = String(from).match(
      /^(19|20)\d\d[/](0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])[ ]([01][0-9]|2[0123])[:]([0-5][0-9])$/,
    );
    // const toIsDate = validator.isISO8601(String(to));
    const toIsDate = String(to).match(
      /^(19|20)\d\d[/](0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])[ ]([01][0-9]|2[0123])[:]([0-5][0-9])$/,
    );

    let errorMessage = '';

    if (limit !== null && !limitIsInt) {
      errorMessage = 'Parameter limit is not zero or a positive integer';
    } else if (offset !== null && !offsetIsInt) {
      errorMessage = 'Parameter offset is not zero a positive integer';
    } else if (from !== null && from !== 'undefined' && typeof from !== 'undefined' && !fromIsDate) {
      errorMessage = 'Parameter from is not in YYYY/MM/DD HH24:MI format';
    } else if (to !== null && to !== 'undefined' && typeof to !== 'undefined' && !toIsDate) {
      errorMessage = 'Parameter to is not in YYYY/MM/DD HH24:MI format';
    }

    if (!(errorMessage === '')) {
      // logger.info(req.method + ' ' + req.originalUrl + ' ' + 'HTTP 400');
      res.status(400).json({
        error: {
          type: 'ERROR',
          title: errorMessage,
          status: 400,
          detail: errorMessage,
          instance: req.originalUrl,
        },
      });
    } else {
      await pool.query(
        `SELECT u.id, u.date_and_time::TEXT, u.consumption, u.reading_quality
        FROM usage u
        WHERE 1 = 1
        ${
          from ?
            `AND date_and_time >= (TO_TIMESTAMP('${from}',
                'YYYY/MM/DD HH24:MI') AT TIME ZONE 'Australia/Melbourne')::TIMESTAMP WITH TIME ZONE` :
            ''
        }
        ${
          to ?
            `WHERE date_and_time <= (TO_TIMESTAMP('${to}',
                'YYYY/MM/DD HH24:MI') AT TIME ZONE 'Australia/Melbourne')::TIMESTAMP WITH TIME ZONE` :
            ''
        }
        ORDER BY date_and_time DESC
        ${limit ? `LIMIT ${limit}` : ''} ${offset ? `OFFSET ${offset}` : ''}`,
        (error: any, results: any) => {
          if (error) {
            /* logger.info(req.method + ' ' + req.originalUrl + ' → ' + 'HTTP 400');
               logger.info(error); */
            res.status(400).json(error.message);
          }
          // logger.info(req.method + ' ' + req.originalUrl + ' → ' + 'HTTP 200');
          res.status(200).json(results.rows);
        },
      );
    }
  } catch (error) {
    // logger.error('API key is not valid');
    res.status(400).json({ error: error.message });
  } finally {
    // pool.end(() => {});
  }
};

export default getUsages;
