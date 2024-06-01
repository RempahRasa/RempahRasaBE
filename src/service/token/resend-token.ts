import { validate } from '../../validation/validation';
import { emailValidation } from '../../validation/user/email-validation';
import { getUserByEmail } from '../../utils/getUserByEmail';
import { ResponseError } from '../../error/response-error';
import { generateToken } from '../../utils/token';
import { db } from '../../app/firestore';

const resendTokenByEmail = async (email: string) => {
  const validatedEmail = validate(emailValidation, email);
  if (validatedEmail) {
    const { user, result } = await getUserByEmail(validatedEmail);
    if (result.length < 1) {
      throw new ResponseError(404, "Email doesn't exist");
    }
    if (result[0].verified) {
      throw new ResponseError(400, 'Email already verified');
    }
    const verificationToken = generateToken();
    const verificationTokenExpires = new Date().setMinutes(new Date().getMinutes() + 10);
    try {
      const userCollections = db.collection('users');
      await userCollections
        .doc(user.docs[0].id)
        .update({ verificationToken, verificationTokenExpires });
      return {
        email: validatedEmail,
        message: 'Token sent successfully'
      };
    } catch (error) {
      return new ResponseError(500, 'Can not update token');
    }
  }
};
export { resendTokenByEmail };
