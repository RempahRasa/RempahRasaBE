import { NextFunction, Request, Response } from 'express';
import { ResponseError } from '../error/response-error';
import { VerificationResponseError } from '../error/response-error-page';
import path from 'path';

const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (!error) {
    next();
    return;
  }
  if (error instanceof ResponseError) {
    res.status(error.status).json({ message: error.message }).end();
    return;
  } else if (error instanceof VerificationResponseError) {
    res.status(error.status).sendFile(path.join(__dirname, error.pathFile))
    return;
  } else {
    res.status(500).json({ message: error.message }).end();
    return;
  }
};



export { errorMiddleware };
