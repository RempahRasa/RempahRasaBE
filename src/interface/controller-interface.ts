import { NextFunction, Request, Response } from 'express';

export interface MiddlewareRequest {
  req: Request;
  res: Response;
  next: NextFunction;
}
