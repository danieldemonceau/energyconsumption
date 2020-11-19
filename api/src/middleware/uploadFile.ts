const multer = require("multer");
// import { Request } from "express";

const csvFilter = (_req: Request, file: any, cb: any) => {
  if (!(file.originalname.endsWith("csv") || file.mimetype.includes("csv"))) {
    cb("Please upload only csv files", false);
  }
  cb(null, "./reports");
};

let storage = multer.diskStorage({
  destination: (_req: any, _file: any, cb: any) => {
    cb(null, "./reports");
  },
  filename: (_req: any, file: any, cb: any) => {
    cb(null, file.originalname + "-" + Date.now());
  },
});

const uploadFile = multer({ storage, fileFilter: csvFilter });

export default uploadFile;
