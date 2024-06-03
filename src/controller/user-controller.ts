import { MiddlewareRequest } from "../interface/controller";
import { getHistoryService } from "../service/user/profile/history-service";
import { getProfileService } from "../service/user/profile/profile-service";

const getProfileController = async ({ req, res, next }: MiddlewareRequest) => {
    try {
      const result = await getProfileService(req, res, next);
      res.status(200).json({
        data: result
      });
    } catch (error) {
      next(error);
    }
  };

const getHistoriesController = async ({ req, res, next }: MiddlewareRequest) => {
    try {
      const result = await getHistoryService({req, res, next});
      res.status(200).json({
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
export {getProfileController, getHistoriesController}