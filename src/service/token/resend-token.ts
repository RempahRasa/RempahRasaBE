import { validate } from '../../validation/validation';
import { emailValidation } from '../../validation/user/email-validation';
import { getUserByEmail } from '../../utils/user/getUserByEmail';
import { ResponseError } from '../../error/response-error';
import { generateToken } from '../../utils/token';
import { userCollection } from '../../app/firestore';

const resendTokenByEmail = async (email: string) => {
  const validatedEmail = validate(emailValidation, email);
  if (validatedEmail) {
    const { userData } = await getUserByEmail(validatedEmail);
    if (!userData) {
      throw new ResponseError(404, "Email doesn't exist");
    }
    if (userData.verified) {
      throw new ResponseError(400, 'Email already verified');
    }

    const verificationToken = generateToken();
    const verificationTokenExpires = new Date().setMinutes(new Date().getMinutes() + 10);

    const updatedUser = await userCollection
      .doc(userData.id)
      .update({ verificationToken, verificationTokenExpires });
    if (updatedUser) {
      return {
        status: 200,
        email: validatedEmail,
        verificationToken,
        message: 'New token sent successfully'
      };
    }
  }
};
export { resendTokenByEmail };
