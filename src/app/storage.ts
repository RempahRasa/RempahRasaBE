import { Storage } from '@google-cloud/storage';

export const gcs = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.KEY_PATH
});
