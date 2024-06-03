import { userCollection } from '../../app/firestore';

const getUserByVerificationToken = async (verificationToken: string) => {
  const user = await userCollection.where('verificationToken', '==', verificationToken).get();
  const result = user.docs.map((doc) => {
    const data = doc.data();
    return data;
  });
  const userData = result[0];
  return { userData };
};

export { getUserByVerificationToken };
