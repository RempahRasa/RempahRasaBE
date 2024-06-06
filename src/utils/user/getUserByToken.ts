import { userCollection } from '../../app/firestore';

const getUserByToken = async (token: string) => {
  const user = await userCollection.where('accessToken', '==', token).get();
  const result = user.docs.map((doc) => {
    const data = doc.data();
    return data;
  });
  const userData = result[0];
  return { userData };
};

export { getUserByToken };
