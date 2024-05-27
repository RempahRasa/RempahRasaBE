import { registerUser } from '../service/user/register';
import { MiddlewareRequest, MultipartRequest } from '../interface/controller-interface';
import loginService from '../service/user/login-service';

const register = async ({ req, res, next }: MultipartRequest) => {
  try {
    const formData = {
      ...req.body,
      image: req?.file
    };
    const result = await registerUser(formData);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const loginController = async ({ req, res, next }: MiddlewareRequest) => {
  try {
    const result = await loginService.loginService(req?.body);
    res.status(200).json({
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export { register, loginController };
