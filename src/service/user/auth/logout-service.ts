import { Request, Response } from 'express';
import { userCollection } from '../../../app/firestore';
import { getUserByToken } from '../../../utils/user/getUserByToken';
import { FieldValue } from '@google-cloud/firestore';
import { getTokenFromHeader } from '../../../utils/token';

const logout = async (request: Request, res: Response) => {
  const accessToken = getTokenFromHeader(request, res);
  const { userData } = await getUserByToken(accessToken);
  await userCollection.doc(userData.id).update({
    accessTokenExpires: FieldValue.delete(),
    accessToken: FieldValue.delete()
  });
  return {
    message: 'Logout success'
  };
};
export { logout };
