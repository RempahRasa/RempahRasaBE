import loginService from '../service/login-service';
import { MiddlewareFunction } from '../interface/controller-interface';

const loginController = async ({ req, res, next }: MiddlewareFunction): Promise<void> => {
  console.log(req);
  try {
    const result = await loginService.loginService(req);
    res.status(200).json({
      message: 'Login successful',
      data: result
    });
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};

export default { loginController };
