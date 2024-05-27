import loginService from '../service/user/login-service';
import { MiddlewareFunction } from '../interface/controller-interface';

const loginController = async ({ req, res, next }: MiddlewareFunction) => {
  try {
    const result = await loginService.loginService(req?.body);
    res.status(200).json({
      data: result
    });
  } catch (error) {
    throw error;
  }
};

export default { loginController };
