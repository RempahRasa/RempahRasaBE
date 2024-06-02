import { db } from '../app/firestore';

const getUserByToken = async (token: string) => {
  const userCollection = db.collection('users');
  const user = await userCollection.where('accessToken', '==', token).get();
  const result = user.docs.map((doc) => {
    const data = doc.data();
    return data;
  });
  return { user, result };
};

export { getUserByToken };