import { registerUser } from '../service/user/register';
import loginService from '../service/user/login-service';
import { MiddlewareRequest } from '../interface/controller-interface';

const register = async ({ req, res, next }: MiddlewareRequest) => {
  try {
    const result = await registerUser(req?.body);
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
