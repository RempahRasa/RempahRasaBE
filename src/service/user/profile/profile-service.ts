import { Request, Response } from 'express';
import { getUserByToken } from '../../../utils/user/getUserByToken';
import { ResponseError } from '../../../error/response-error';
import { getTokenFromHeader } from '../../../utils/token';

const getProfileService = async (req: Request, res: Response) => {
  const accessToken = getTokenFromHeader(req, res);
  const { userData } = await getUserByToken(accessToken);
  if (userData) {
    return {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      image: userData.image
    };
  } else {
    throw new ResponseError(404, 'User not found');
  }
};

export { getProfileService };
