import { registerUser } from '../service/user/register';
import { MiddlewareRequest, MultipartRequest } from '../interface/controller-interface';
import { loginService } from '../service/user/login-service';
import { uploadProfileToGcs } from '../utils/saveImage';
import { updateImageField } from '../utils/updateImageField';
import { FileUploadReturnInterface } from '../interface/return-interface';
import { sendVerificationEmail } from '../utils/email';

const register = async ({ req, res, next }: MultipartRequest) => {
  try {
    const formData = {
      ...req.body,
      image: req?.file
    };
    const result = await registerUser(formData);
    let uploadFile: FileUploadReturnInterface;
    if (req.file) {
      uploadFile = await uploadProfileToGcs(req);
    }
    if (uploadFile) {
      await updateImageField(uploadFile.cloudStoragePublicUrl, result.id);
    }
    if (result.verificationToken) {
      await sendVerificationEmail(result.email, result.verificationToken);
    }
    res.status(200).json({
      message: {
        user: result,
        mail: 'Verification email sent successfully'
      }
    });
  } catch (error) {
    next(error);
  }
};

const loginController = async ({ req, res, next }: MiddlewareRequest) => {
  try {
    const result = await loginService(req?.body);
    res.status(200).json({
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export { register, loginController };
