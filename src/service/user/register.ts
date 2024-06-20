// import { db } from '../../app/firestore';
import { db } from '../../app/firestore';
import { ResponseError } from '../../error/response-error';
import { RequestSignupInterface } from '../../interface/request';
import { generateToken } from '../../utils/token';
import { registerUserValidation } from '../../validation/user/register-user-validation';
import { validate } from '../../validation/validation';
import bcrypt from 'bcryptjs';

const registerUser = async (request: RequestSignupInterface) => {
  const validatedUser = validate(registerUserValidation, request);
  if (validatedUser) {
    const userCollections = db.collection('users');
    const user = await userCollections.where('email', '==', validatedUser.email).get();
    const result = user.docs.map((doc) => {
      const data = doc.data();
      return data;
    });
    if (result.length > 0) {
      throw new ResponseError(409, 'Email already registered');
    }
    validatedUser.password = await bcrypt.hash(validatedUser.password, 10);
    const verificationToken = generateToken();
    const verificationTokenExpires = new Date().setMinutes(new Date().getMinutes() + 10);
    const newUser = {
      ...validatedUser,
      image: '',
      verificationToken,
      verificationTokenExpires,
      verified: false
    };
    const userRegistered = await userCollections.add(newUser);
    if (userRegistered) {
      return {
        id: userRegistered.id,
        verificationToken,
        email: newUser.email,
        massage: 'User registered successfully'
      };
    }
  }
};

export { registerUser };
