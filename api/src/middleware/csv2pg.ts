import fs from 'fs';
import { Request, NextFunction } from 'express';
import * as csv from 'fast-csv';
import appRoot from 'app-root-path';
import pool from '../db/pool';

// import appRoot from 'app-root-path';

interface MulterRequest extends Request {
  file: any;
}
// import logger from '../logger';

const csv2pg = (req: MulterRequest, _next: NextFunction): any =>
  new Promise((csv2pgResolve, csv2pgReject) => {
    let { providerID } = req.body;

    const csvFile = `${appRoot}/reports/${req.file.filename}`;

    const stream = fs.createReadStream(csvFile);
    const csvData: any[] = [];

    const csvStream = csv
      .parse()
      .on('data', (data: any) => {
        csvData.push(data);
      })
      .on('error', (err: any) => {
        csv2pgReject(new Error('Cannot process uploaded csv!'));
        throw err.message;
      })
      .on('end', () => {
        if (
          !providerID ||
          csvData[0][0].includes('Date and Time') ||
          csvData[0][1].includes('Read Value - kWh (kilowatt hours)') ||
          csvData[0][2].includes('Reading quality')
        ) {
          providerID = 1;
        }
        csvData.shift();

        // for (const row of csvData) {
        const promisesArray: any = csvData.map(
          (row) =>
            new Promise((resolve, _reject) => {
              pool.query(
                `INSERT INTO usage (date_and_time, consumption, reading_quality, provider_id)
                VALUES ((TO_TIMESTAMP($1, 'DD/MM/YYYY HH24:MI') AT TIME ZONE 'Australia/Melbourne')::TIMESTAMP WITH TIME ZONE, $2, $3, ${providerID})`,
                row,
                (err: any) => {
                  if (err) {
                    /*                   logger.error(
                                         `Query failed:
                     INSERT INTO usage (date_and_time, consumption, reading_quality, provider_id)
                     VALUES ((TO_TIMESTAMP('${row[0]}', 'DD/MM/YYYY HH24:MI') AT TIME ZONE 'Australia/Melbourne')::TIMESTAMP WITH TIME ZONE, ${row[1]}, '${row[2]}', ${providerID})`
                                       ); */
                    // next(new Error(`Error Message: '${err.message}', line ${err.line}`));
                    csv2pgReject(new Error(`Error Message: '${err.message}', line ${err.line}`));
                    // reject('not happy');
                    fs.unlinkSync(csvFile);
                  } else {
                    resolve('WORKS');
                  }
                },
              );
            }),
        );

        /* const a = await promisesArray();
           console.log('a', a); */
        Promise.all(promisesArray).then(() => {
          fs.unlinkSync(csvFile);
          csv2pgResolve('success!');
        });
      });

    stream.pipe(csvStream);
    /* fs.unlinkSync(csvFile);
       setTimeout(function () {
         resolve('success!');
       }, 3000); */
  });

export default csv2pg;
