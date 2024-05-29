import { Firestore } from '@google-cloud/firestore';

export const db = new Firestore({
  projectId: process.env.PROJECT_ID,
  keyFilename: './src/secret/service-account.json',
  databaseId: process.env.DATABASE_ID
});