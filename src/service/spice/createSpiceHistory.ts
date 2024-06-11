import { Response } from 'express';
import { getTokenFromHeader } from '../../utils/token';
import { getUserByToken } from '../../utils/user/getUserByToken';
import { ResponseError } from '../../error/response-error';
import { historyCollection } from '../../app/firestore';
import { MulterRequest } from '../../interface/request';

interface SpiceHistoryData {
  image: string;
  result: string;
}
const createSpiceHistory = async (req: MulterRequest, res: Response, data: SpiceHistoryData) => {
  const accessToken = getTokenFromHeader(req, res);
  const { userData } = await getUserByToken(accessToken);
  if (userData) {
    const historyCol = await historyCollection(userData.id);
    const historyId = crypto.randomUUID();
    const createdDate = new Date().toISOString();
    const historyData = {
      id: historyId,
      image: data.image,
      result: data.result,
      createdAt: createdDate
    };
    const setHistory = await historyCol.doc(historyId).set(historyData);
    if (setHistory) {
      return historyData;
    }
  } else {
    throw new ResponseError(404, 'User not found');
  }
};

export { createSpiceHistory };
