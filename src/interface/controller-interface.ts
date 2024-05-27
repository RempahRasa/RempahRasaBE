import { NextFunction, Request, Response } from 'express';
import { MulterRequest } from './request-interface';

export interface MiddlewareRequest {
  req: Request;
  res: Response;
  next: NextFunction;
}

export interface MultipartRequest {
  req: MulterRequest;
  res: Response;
  next: NextFunction;
}
