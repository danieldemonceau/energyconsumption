import fs from 'fs';
const csv = require('fast-csv');
import pool from '../db/pool';
const appRoot = require('app-root-path');
// import appRoot from 'app-root-path';
import { Request, NextFunction } from 'express';
interface MulterRequest extends Request {
  file: any;
}
import logger from '../logger';

const csv2pg = (req: MulterRequest, next: NextFunction): any => {
  return new Promise((resolve, reject) => {
    let provider_id = req.body.provider_id;

    const csvFile = appRoot + '/reports/' + req.file.filename;

    const stream = fs.createReadStream(csvFile);
    const csvData: any[] = [];

    const csvStream = csv
      .parse()
      .on('data', (data: any) => {
        csvData.push(data);
      })
      .on('error', (err: any) => {
        reject(new Error('Cannot process uploaded csv!'));
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

        // for (const row of csvData) {
        const promisesArray: any = csvData.map((row) => {
          return new Promise((resolve, reject) => {
            pool.query(
              `INSERT INTO usage (date_and_time, consumption, reading_quality, provider_id)
                VALUES ((TO_TIMESTAMP($1, 'DD/MM/YYYY HH24:MI') AT TIME ZONE 'Australia/Melbourne')::TIMESTAMP WITH TIME ZONE, $2, $3, ${provider_id})`,
              row,
              (err: any) => {
                if (err) {
                  logger.error(
                    `Query failed:
INSERT INTO usage (date_and_time, consumption, reading_quality, provider_id)
VALUES ((TO_TIMESTAMP('${row[0]}', 'DD/MM/YYYY HH24:MI') AT TIME ZONE 'Australia/Melbourne')::TIMESTAMP WITH TIME ZONE, ${row[1]}, '${row[2]}', ${provider_id})`
                  );
                  next(new Error('Cannot process uploaded csv!'));
                  reject(new Error('Cannot process uploaded csv!'));
                  // reject('not happy');
                  fs.unlinkSync(csvFile);
                } else {
                  resolve('WORKS');
                }
              }
            );
          });
        });

        // const a = await promisesArray();
        // console.log('a', a);
        Promise.all(promisesArray).then(() => {
          fs.unlinkSync(csvFile);
          resolve('success!');
        });
      });

    stream.pipe(csvStream);
    // fs.unlinkSync(csvFile);
    // setTimeout(function () {
    //   resolve('success!');
    // }, 3000);
  });
};

export default csv2pg;
