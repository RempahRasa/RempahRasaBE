import { ResponseError } from '../error/response-error';
import { MultipartRequest } from '../interface/controller';
import { authMiddleware } from '../middleware/auth-middleware';
import { spiceClassificationService } from '../service/spice/spiceClassificationService';

export const spiceClassificationController = async ({ req, res, next }: MultipartRequest) => {
  try {
    // const checkAuth = await authMiddleware(req, res, next);
    // if (!checkAuth) {
    //   throw new ResponseError(401, 'Unauthorized');
    // }
    const model = (req.app as any).model;
    const image = req?.file;
    const result = await spiceClassificationService(image.buffer, model);
    
    
    // Add to firestore
    // Add image to fires
    res.status(200).json({
      data: result
    });
  } catch (error) {
    next(error);
  }
};
