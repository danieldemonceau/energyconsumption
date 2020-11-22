const fs = require('fs');
const csv = require('fast-csv');
import pool from '../db/pool';
const appRoot = require('app-root-path');
import { Request /*, Response*/ } from 'express';
interface MulterRequest extends Request {
  file: any;
}
import logger from '../logger';

const csv2pg = (req: MulterRequest, next: any): any => {
  return new Promise((resolve: any, reject: any) => {
    let provider_id = req.body.provider_id;

    const filePath = appRoot + '/reports/' + req.file.filename;

    const stream = fs.createReadStream(filePath);
    const csvData: any[] = [];

    const csvStream = csv
      .parse()
      .on('data', (data: any) => {
        csvData.push(data);
      })
      .on('error', (err: any) => {
        // reject(err.message);
        throw err.message;
      })
      .on('end', () => {
        if (
          !provider_id ||
          csvData[0][0].includes('Date and Time') ||
          csvData[0][1].includes('Read Value - kWh (kilowatt hours)') ||
          csvData[0][2].includes('Reading quality')
        ) {
          provider_id = 1;
        }
        csvData.shift();

        for (const row of csvData) {
          // const promisesArray = csvData.map((row) => {
          //   return new Promise((resolve, reject) =>
          pool.query(
            `INSERT INTO usage (date_and_time, consumption, reading_quality, provider_id)
              VALUES ((TO_TIMESTAMP($1, 'DD/MM/YYYY HH24:MI') AT TIME ZONE 'Australia/Melbourne')::TIMESTAMP WITH TIME ZONE, $2, $3, ${provider_id})`,
            row,
            (err: any) => {
              if (err) {
                logger.error(
                  'Query failed:',
                  `INSERT INTO usage (date_and_time, consumption, reading_quality, provider_id)
                    VALUES ((TO_TIMESTAMP($1, 'DD/MM/YYYY HH24:MI') AT TIME ZONE 'Australia/Melbourne')::TIMESTAMP WITH TIME ZONE, ${row[1]}, ${row[2]}, ${provider_id})`
                );
                // reject(new Error(err));
                next(new Error(err));
              }
              // else {
              //   resolve();
              // }
            }
          );
          //   );
          // });

          // Promise.all(promisesArray).then(() => {
          fs.unlinkSync(filePath);
          //   resolve();
          // });
        }
      });
    stream.pipe(csvStream);
  });
};

export default csv2pg;
