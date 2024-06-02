import { Request } from 'express';
import { db } from '../../../app/firestore';
import { getUserByToken } from '../../../utils/getUserByToken';
import { FieldValue } from '@google-cloud/firestore';

const logout = async (request: Request) => {
  const bearerToken = request.get('Authorization');
  const accessToken = bearerToken.split(' ')[1];
  const { user, result } = await getUserByToken(accessToken);
  const userCollections = db.collection('users');
  await userCollections.doc(user.docs[0].id).update({
    accessTokenExpires: FieldValue.delete(),
    accessToken: FieldValue.delete()
  });
  return {
    message: 'Logout success'
  };
};
export { logout };
