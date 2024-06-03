import { Request, Response } from 'express';
import { userCollection } from '../../../app/firestore';
import { ResponseError } from '../../../error/response-error';
import { getUserByToken } from '../../../utils/user/getUserByToken';
import { getTokenFromHeader } from '../../../utils/token';

const getHistoryService = async (req: Request, res: Response) => {
  const accessToken = getTokenFromHeader(req, res);
  const { userData } = await getUserByToken(accessToken);
  if (userData) {
    const historyCollection = await userCollection.doc(userData.id).collection('history').get();
    const history = historyCollection.docs.map((doc) => doc.data());
    if (history.length <= 0) {
      throw new ResponseError(404, 'History not found');
    }
    return history;
  } else {
    throw new ResponseError(404, 'User not found');
  }
};

export { getHistoryService };
