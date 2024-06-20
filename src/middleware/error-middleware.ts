import { NextFunction, Request, Response } from 'express';
import { ResponseError } from '../error/response-error';
import { VerificationResponseError } from '../error/response-error-page';
import path from 'path';

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (!error) {
    next();
    return;
  }
  if (error instanceof ResponseError) {
    return res.status(error.status).json({ message: error.message }).end();
  } else if (error instanceof VerificationResponseError) {
    return res.status(error.status).sendFile(path.join(__dirname, error.pathFile));
  } else {
    return res.status(500).json({ message: error.message }).end();
  }
};

export { errorMiddleware };
