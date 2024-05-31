import { verificationService } from '../service/token/verification';
import { MiddlewareRequest } from '../interface/controller';
import { resendTokenByEmail } from '../service/token/resend-token';

const tokenController = async ({ req, res, next }: MiddlewareRequest) => {
  try {
    const token = req.query.token;
    const result = await verificationService(token as string);
    res.status(200).json({
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const resendToken = async ({ req, res, next }: MiddlewareRequest) => {
  try {
    const result = await resendTokenByEmail(req?.body.email);
    res.status(200).json({
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export { resendToken, tokenController };
