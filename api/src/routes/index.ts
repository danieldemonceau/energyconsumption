import pool from "../db/pool";
import usages from "./usages";
import { Request, Response } from "express";
import logger from "../logger";

module.exports = (app: any) => {
  const getRoot = (req: Request, res: Response, next: any) => {
    logger.info(req.originalUrl);
    pool.query("SELECT NOW()", (error: any, results: any) => {
      if (error) {
        next(error);
      }
      res.status(200).json(results.rows);
    });
  };
  app.get("/", getRoot);
  app.use("/usages", usages);
};
