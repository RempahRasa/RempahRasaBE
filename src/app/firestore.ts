import { Firestore } from '@google-cloud/firestore';

export const db = new Firestore({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.KEY_PATH,
  databaseId: process.env.DATABASE_ID
});

export const userCollection = db.collection('users');
export const recipeCollection = db.collection('recipes');
export const historyCollection =  (userId: string) => {
  return userCollection.doc(userId).collection('history');
};
