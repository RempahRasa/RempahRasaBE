import { NextFunction, Request, Response } from 'express';
import { ResponseError } from '../error/response-error';

const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (!error) {
    next();
    return;
  }
  if (error instanceof ResponseError) {
    res.status(error.status).json({ message: error.message }).end();
    return;
  } else {
    res.status(500).json({ message: error.message }).end();
    return;
  }
};

export { errorMiddleware };
