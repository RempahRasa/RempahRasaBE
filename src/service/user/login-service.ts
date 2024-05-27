import { ResponseError } from '../../error/response-error';
import { requestLoginInterface } from '../../interface/request-interface';
import { loginUserValidation } from '../../validation/user/user-validation';
import { validate } from '../../validation/validation';
import { generateToken } from '../../utils/token';
import bcrypt from 'bcryptjs';
import { db } from '../../app/firestore';

const loginService = async (request: requestLoginInterface) => {
  const validateUser = validate(loginUserValidation, request);
  if (validateUser) {
    const userCollection = db.collection('users');
    const user = await userCollection.where('email', '==', validateUser.email).get();
    const result = user.docs.map((doc) => {
      const data = doc.data();
      return data;
    });
    if (result.length <= 0) {
      throw new ResponseError(401, 'Username or Password is wrong');
    }
    const userDoc = user.docs[0];
    const userData = userDoc.data();
    const hashedPassword = await bcrypt.hash(validateUser.password, 10);

    if (!bcrypt.compare(hashedPassword, userData.password)) {
      throw new ResponseError(401, 'Username or Password is wrong');
    }
    const accessToken = generateToken();
    const res = await userCollection.doc(userDoc.id).update({ accessToken });
    console.log(accessToken);
    // return res;
  }
};

export default { loginService };
