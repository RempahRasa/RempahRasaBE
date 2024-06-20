import { userCollection } from '../app/firestore';

const updateImageField = async (imageURl: string, id: string) => {
  try {
    await userCollection.doc(id).update({ image: imageURl });
    return true;
  } catch (error) {
    return false;
  }
};
export { updateImageField };
