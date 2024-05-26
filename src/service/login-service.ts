import { ResponseError } from '../error/response-error';
import { loginUserValidation } from '../validation/login-validation';
import { validate } from '../validation/validation';
import { Firestore } from '@google-cloud/firestore';

const loginService = async (req) => {
  try {
    const db = new Firestore();
    const userCollection = db.collection('users');
    const loginRequest = validate(loginUserValidation, req);
    const querySnapshot = await userCollection.where('email', '==', loginRequest.email).get();

    if (querySnapshot.empty) {
      throw new ResponseError(401, 'Username or Password is wrong');
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    if (userData.password !== loginRequest.password) {
      throw new ResponseError(401, 'Username or Password is wrong');
    }

    return { email: userData.email, password: userData.password };
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};

export default { loginService };
