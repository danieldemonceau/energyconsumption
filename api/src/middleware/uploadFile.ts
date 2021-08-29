import multer from 'multer';
import { Request } from 'express';

// eslint-disable-next-line
const csvFilter = (_req: Request, file: any, cb: any) => {
  if (!(file.originalname.endsWith('csv') || file.mimetype.includes('csv'))) {
    cb('Please upload only csv files', false);
  }
  cb(null, './reports');
};

const storage = multer.diskStorage({
  // eslint-disable-next-line
  destination: (_req: Request, _file: any, cb: any) => {
    cb(null, './reports');
  },
  // eslint-disable-next-line
  filename: (_req: Request, file: any, cb: any) => {
    cb(null, `${file.originalname}-${Date.now()}`);
  },
});

const uploadFile = multer({ dest: 'reports/', storage, fileFilter: csvFilter });

export default uploadFile;
