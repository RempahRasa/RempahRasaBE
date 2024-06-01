import { gcs } from '../app/storage';
import { v4 as uuid } from 'uuid';
import { MulterRequest } from '../interface/request';
const uploadProfileToGcs = async (req: MulterRequest) => {
  if (req.file) {
    const bucketName = process.env.PUBLIC_BUCKET_NAME;
    const bucket = gcs.bucket(bucketName);
    const gcsName = uuid().toString();

    const objectName = `${process.env.PROFILE_IMAGE_FOLDER}/${gcsName}`;
    const file = bucket.file(objectName);

    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    });
    let cloudStoragePublicUrl: string;
    let cloudStorageError: string;
    let storageObject: string;
    await new Promise<void>((resolve, reject) => {
      stream.on('error', (err) => {
        cloudStorageError = err.message;
        reject();
      });
      stream.on('finish', () => {
        storageObject = objectName;
        cloudStoragePublicUrl = getPublicUrl(bucketName, objectName);
        resolve();
      });
      stream.end(req.file.buffer);
    });

    return { cloudStorageError, cloudStoragePublicUrl, storageObject };
  }
};

const getPublicUrl = (bucketName: string, fileName: string) => {
  return `https://storage.googleapis.com/${bucketName}/${fileName}`;
};

export { uploadProfileToGcs };
