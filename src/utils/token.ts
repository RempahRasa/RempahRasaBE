import * as cr from 'crypto';
import { Request, Response } from 'express';
const generateToken = () => {
  return cr.randomBytes(64).toString('hex');
};

const getTokenFromHeader = (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res
      .status(401)
      .json({
        errors: 'Unauthorized'
      })
      .end();
    return;
  }
  const token = authHeader.split(' ')[1];
  return token;
};

export { generateToken, getTokenFromHeader };
