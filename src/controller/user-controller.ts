import { ResponseError } from '../error/response-error';
import { MiddlewareRequest } from '../interface/controller';
import { authMiddleware } from '../middleware/auth-middleware';
import { getHistoryService } from '../service/user/profile/history-service';
import { getProfileService } from '../service/user/profile/profile-service';

const getProfileController = async ({ req, res, next }: MiddlewareRequest) => {
  try {
    const checkAuth = await authMiddleware(req, res);
    if (!checkAuth) {
      throw new ResponseError(401, 'Unauthorized');
    }
    const result = await getProfileService(req, res);
    if (result) {
      res.status(200).json({
        data: result
      });
    }
  } catch (error) {
    next(error);
  }
};

const getHistoriesController = async ({ req, res, next }: MiddlewareRequest) => {
  try {
    const checkAuth = await authMiddleware(req, res);
    if (!checkAuth) {
      throw new ResponseError(401, 'Unauthorized');
    }
    const result = await getHistoryService(req, res);
    res.status(200).json({
      data: result
    });
  } catch (error) {
    next(error);
  }
};
export { getProfileController, getHistoriesController };
