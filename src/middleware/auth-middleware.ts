import { NextFunction, Request, Response } from 'express';
import { getUserByToken } from '../utils/user/getUserByToken';
import { userCollection } from '../app/firestore';
import { FieldValue } from '@google-cloud/firestore';
import { getTokenFromHeader } from '../utils/token';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = getTokenFromHeader(req, res);
  const { userData } = await getUserByToken(bearerToken);
  if (!userData) {
    res
      .status(401)
      .json({
        errors: 'Unauthorized'
      })
      .end();
    return;
  } else {
    const accessTokenExpires = userData.accessToken;
    const currentDate = new Date();
    if (accessTokenExpires < currentDate) {
      await userCollection.doc(userData.id).update({
        accessTokenExpires: FieldValue.delete(),
        accessToken: FieldValue.delete()
      });
      res
        .status(401)
        .json({
          errors: 'Unauthorized'
        })
        .end();
      return;
    }
    next();
  }
};

export { authMiddleware };
