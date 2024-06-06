import * as cr from 'crypto';
import { Request, Response } from 'express';
import { ResponseError } from '../error/response-error';
const generateToken = () => {
  return cr.randomBytes(64).toString('hex');
};

const getTokenFromHeader = (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new ResponseError(401, 'Unauthorized');
  }
  const token = authHeader.split(' ')[1];
  return token;
};

export { generateToken, getTokenFromHeader };
