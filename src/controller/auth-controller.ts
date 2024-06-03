import { MiddlewareRequest, MultipartRequest } from '../interface/controller';
import { registerUser } from '../service/user/auth/register-service';
import { loginService } from '../service/user/auth/login-service';
import { uploadProfileToGcs } from '../utils/saveImage';
import { updateImageField } from '../utils/updateImageField';
import { FileUploadReturnInterface } from '../interface/return';
import { sendVerificationEmail } from '../utils/email';
import { logout } from '../service/user/auth/logout-service';

const registerController = async ({ req, res, next }: MultipartRequest) => {
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
    let emailStatus: boolean;
    if (result.verificationToken) {
      emailStatus = await sendVerificationEmail(result.email, result.verificationToken);
    }
    res.status(200).json({
      message: {
        user: result.massage,
        mail: emailStatus ? 'Email sent successfully' : 'Email not sent'
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

const logoutController = async ({ req, res, next }: MiddlewareRequest) => {
  try {
    const result = await logout(req, res);
    res.status(200).json({
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export { registerController, loginController, logoutController };
