import { Request, Response } from "express";
interface MulterRequest extends Request {
  file: any;
}
declare const postUsages: (
  req: MulterRequest,
  res: Response,
  next: any
) => Promise<void>;
export default postUsages;
