import { db } from '../app/firestore';

const updateImageField = async (imageURl: string, id: string) => {
  const userCollections = db.collection('users');
  try {
    await userCollections.doc(id).update({ image: imageURl });
    return true;
  } catch (error) {
    return false;
  }
};
export { updateImageField };
