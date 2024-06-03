import { NextFunction, Request, Response } from 'express';
import { getUserByToken } from "../../../utils/getUserByToken";
import { ResponseError } from '../../../error/response-error';

const getProfileService = async (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.get('Authorization');
    const accessToken = bearerToken.split(' ')[1];
    const userDoc = await getUserByToken(accessToken)
    if (userDoc.user) {
        const userData = userDoc.user.docs[0].data();
        return {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            image: userData.image
        };
    } else {
        throw new ResponseError(404,'User not found');
    }
};

export { getProfileService }