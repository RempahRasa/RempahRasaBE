import { verificationService } from '../service/token/verification';
import { MiddlewareRequest } from '../interface/controller';
import { resendTokenByEmail } from '../service/token/resend-token';
import { sendVerificationEmail } from '../utils/email';
import * as path from 'path';

const tokenController = async ({ req, res, next }: MiddlewareRequest) => {
  try {
    const token = req.query.token;
    const result = await verificationService(token as string);
    res.status(200).sendFile(path.join(__dirname, '../response/success-verification.html'))
  } catch (error) {
    next(error);
  }
};

const resendToken = async ({ req, res, next }: MiddlewareRequest) => {
  try {
    const result = await resendTokenByEmail(req?.body.email);
    let emailStatus: boolean;
    if (result.status === 200) {
      emailStatus = await sendVerificationEmail(result.email, result.verificationToken);
    }
    res.status(200).json({
      message: {
        mail: emailStatus ? result.message : 'Token cannot be sent, please try again later'
      }
    });
  } catch (error) {
    next(error);
  }
};

export { resendToken, tokenController };
