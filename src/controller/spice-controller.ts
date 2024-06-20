import { ResponseError } from '../error/response-error';
import { MultipartRequest } from '../interface/controller';
import { authMiddleware } from '../middleware/auth-middleware';
import { createSpiceHistory } from '../service/spice/createSpiceHistory';
import { spiceClassificationService } from '../service/spice/spiceClassificationService';
import { saveImageToGcs } from '../utils/saveImage';
import { spiceClassificationValidation } from '../validation/prediction/spice-classification-validation';
import { validate } from '../validation/validation';

export const spiceClassificationController = async ({ req, res, next }: MultipartRequest) => {
  try {
    const checkAuth = await authMiddleware(req, res);
    if (!checkAuth) {
      throw new ResponseError(401, 'Unauthorized');
    }
    const model = (req.app as any).model;
    const image = req?.file;
    if (!image) {
      throw new ResponseError(400, 'Image is not Found');
    }
    const validatedImage = validate(spiceClassificationValidation, image);
    if (validatedImage) {
      const result = await spiceClassificationService(image.buffer, model);
      if (result) {
        const uploadFile = await saveImageToGcs(
          req,
          process.env.PUBLIC_BUCKET_NAME,
          process.env.SPICE_IMAGE_FOLDER
        );
        if (uploadFile) {
          const data = {
            image: uploadFile.cloudStoragePublicUrl,
            result: result
          };
          const createdHistory = await createSpiceHistory(req, res, data);
          if (createdHistory) {
            return res.status(200).json({
              data: createdHistory
            });
          }
          throw new ResponseError(500, 'Cannot create history record');
        }
        throw new ResponseError(500, 'Cannot save image');
      }
    }
  } catch (error) {
    next(error);
  }
};
