const fs = require("fs");
const csv = require("fast-csv");
import pool from "../db/pool";
var appRoot = require("app-root-path");
import { Request /*, Response*/ } from "express";
interface MulterRequest extends Request {
  file: any;
}
import logger from "../logger";

const csv2pg = (req: MulterRequest, /*res: Response, */ next: any): any => {
  let provider_id = req.body!.provider_id;

  let filePath = appRoot + "/reports/" + req.file.filename;

  let stream = fs.createReadStream(filePath);
  let csvData: any[] = [];

  let csvStream = csv
    .parse()
    .on("data", (data: any) => {
      csvData.push(data);
    })
    .on("error", (err: any) => {
      throw err.message;
    })
    .on("end", () => {
      if (
        !provider_id ||
        csvData[0][0].includes("Date and Time") ||
        csvData[0][1].includes("Read Value - kWh (kilowatt hours)") ||
        csvData[0][2].includes("Reading quality")
      ) {
        provider_id = 1;
      }
      // Remove Header ROW
      csvData.shift();

      // Insert into pg
      pool.connect((err: any, client: any, done: any) => {
        if (err) throw err;

        csvData.forEach((row) => {
          client.query(
            // `INSERT INTO test (name) VALUES ($1)`,
            `INSERT INTO usage (date_and_time, consumption, reading_quality, provider_id)
            VALUES ((TO_TIMESTAMP($1, 'DD/MM/YYYY HH24:MI') AT TIME ZONE 'Australia/Melbourne')::TIMESTAMP WITH TIME ZONE, $2, $3, ${provider_id})`,
            row,
            (err: any) => {
              if (err) {
                logger.error(
                  "Query failed:",
                  `INSERT INTO usage (date_and_time, consumption, reading_quality, provider_id)
                  VALUES ((TO_TIMESTAMP($1, 'DD/MM/YYYY HH24:MI') AT TIME ZONE 'Australia/Melbourne')::TIMESTAMP WITH TIME ZONE, ${row[1]}, ${row[2]}, ${provider_id})`
                )
                next(new Error(err));
              }
            }
          );
        });
        fs.unlinkSync(filePath);
        done();
      });
    });
  stream.pipe(csvStream);
};

export default csv2pg;
