// import { db } from '../../app/firestore';
import { db } from '../../app/firestore';
import { requestSignupInterface } from '../../interface/request-interface';
import { registerUserValidation } from '../../validation/user/register-user-validation';
import { validate } from '../../validation/validation';

const registerUser = async (request: requestSignupInterface) => {
  try {
    const validatedUser = validate(registerUserValidation, request);
    const userCollections = db.collection('users');
    const user = await userCollections.where('email', '==', validatedUser.email).get();
    const result = user.docs.map((doc) => {
      const data = doc.data();
      return data;
    });
    if (result.length > 0) {
      throw new Error('Email already exists');
    }
    await userCollections.add(validatedUser);
    
  } catch (error) {
    // Handle Error
  }
};

export { registerUser };
