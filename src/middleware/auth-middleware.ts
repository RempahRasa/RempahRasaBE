import { NextFunction, Request, Response } from 'express';
import { getUserByToken } from '../utils/getUserByToken';
import { db } from '../app/firestore';
import { FieldValue } from '@google-cloud/firestore';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.get('Authorization');
  if (!bearerToken) {
    res
      .status(401)
      .json({
        errors: 'Unauthorized'
      })
      .end();
      return;
  }
  const accessToken = bearerToken.split(' ')[1];
  if (!accessToken) {
    res
      .status(401)
      .json({
        errors: 'Unauthorized'
      })
      .end();
      return;
  } else {
    const { user, result } = await getUserByToken(accessToken);
    if (result.length < 1) {
      res
        .status(401)
        .json({
          errors: 'Unauthorized'
        })
        .end();
    } else {
      const accessTokenExpires = result[0].accessToken;
      const currentDate = new Date();
      if (accessTokenExpires < currentDate) {
        const userCollection = db.collection('users');
        await userCollection.doc(result[0].id).update({
          accessTokenExpires: FieldValue.delete(),
          accessToken: FieldValue.delete()
        });
        res
          .status(401)
          .json({
            errors: 'Unauthorized'
          })
          .end();
          return
      }
      next();
    }
  }
};

export { authMiddleware };