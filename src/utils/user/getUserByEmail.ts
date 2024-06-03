import { userCollection } from '../../app/firestore';

const getUserByEmail = async (email: string) => {
  const user = await userCollection.where('email', '==', email).get();
  const result = user.docs.map((doc) => {
    const data = doc.data();
    return data;
  });
  const userData = result[0];
  return { userData };
};

export { getUserByEmail };
