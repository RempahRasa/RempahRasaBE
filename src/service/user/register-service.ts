import { ResponseError } from '../../error/response-error';
import { RequestSignupInterface } from '../../interface/request';
import { generateToken } from '../../utils/token';
import { registerUserValidation } from '../../validation/user/register-user-validation';
import { validate } from '../../validation/validation';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '../../utils/getUserByEmail';
import { db } from '../../app/firestore';

const registerUser = async (request: RequestSignupInterface) => {
  const validatedUser = validate(registerUserValidation, request);
  if (validatedUser) {
    const { result } = await getUserByEmail(validatedUser.email);
    if (result.length > 0) {
      throw new ResponseError(409, 'Email already registered');
    }
    validatedUser.password = await bcrypt.hash(validatedUser.password, 10);
    const verificationToken = generateToken();
    const verificationTokenExpires = new Date().setMinutes(new Date().getMinutes() + 10);
    const userId = crypto.randomUUID();
    const createdDate = new Date().toISOString();

    const newUser = {
      id: userId,
      ...validatedUser,
      image: '',
      verificationToken,
      verificationTokenExpires,
      verified: false,
      createdAt: createdDate
    };

    const userCollections = db.collection('users');
    const userRegistered = await userCollections.doc(userId).set(newUser);
    if (userRegistered) {
      return {
        id: userId,
        verificationToken,
        email: newUser.email,
        massage: 'User registered successfully'
      };
    }
  }
};

export { registerUser };
