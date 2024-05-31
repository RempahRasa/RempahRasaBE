import { db } from '../app/firestore';

const getUserByEmail = async (email: string) => {
  const userCollection = db.collection('users');
  const user = await userCollection.where('email', '==', email).get();
  const result = user.docs.map((doc) => {
    const data = doc.data();
    return data;
  });
  return { user, result };
};

export { getUserByEmail };
