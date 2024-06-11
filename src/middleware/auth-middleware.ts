import {  Request, Response } from 'express';
import { getUserByToken } from '../utils/user/getUserByToken';
import { userCollection } from '../app/firestore';
import { FieldValue } from '@google-cloud/firestore';
import { getTokenFromHeader } from '../utils/token';

const authMiddleware = async (req: Request, res: Response) => {
  const bearerToken = getTokenFromHeader(req, res);
  if (!bearerToken) {
    return false;
  }
  const { userData } = await getUserByToken(bearerToken);
  if (!userData) {
    return false;
  } else {
    const accessTokenExpires = userData.accessToken;
    const currentDate = new Date();
    if (accessTokenExpires < currentDate) {
      await userCollection.doc(userData.id).update({
        accessTokenExpires: FieldValue.delete(),
        accessToken: FieldValue.delete()
      });
      return false;
    }
    return true;
  }
};

export { authMiddleware };
