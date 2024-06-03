import { ResponseError } from '../../../error/response-error';
import { RequestLoginInterface } from '../../../interface/request';
import { loginUserValidation } from '../../../validation/user/user-validation';
import { validate } from '../../../validation/validation';
import { generateToken } from '../../../utils/token';
import bcrypt from 'bcryptjs';
import { userCollection } from '../../../app/firestore';
import { getUserByEmail } from '../../../utils/user/getUserByEmail';

const loginService = async (request: RequestLoginInterface) => {
  const validateUser = validate(loginUserValidation, request);

  if (validateUser) {
    const { userData } = await getUserByEmail(validateUser.email);
    const user = await userCollection.where('email', '==', validateUser.email).get();
    const result = user.docs.map((doc) => {
      const data = doc.data();
      return data;
    });
    if (!userData) {
      throw new ResponseError(401, 'Username or Password is wrong');
    }
    const isPasswordValid = await bcrypt.compare(validateUser.password, userData.password);
    if (isPasswordValid === false) {
      throw new ResponseError(401, 'Username or Password is wrong');
    }
    if (!userData.verified) {
      throw new ResponseError(401, 'Please verify your email');
    }

    const accessToken = generateToken();
    const accessTokenExpires = new Date().setHours(new Date().getHours() + 2);

    const newUser = {
      accessToken,
      accessTokenExpires
    };
    const userLogin = await userCollection.doc(userData.id).update(newUser);
    if (userLogin) {
      return {
        accessToken
      };
    }
  }
};

export { loginService };
