import { gcs } from '../app/storage';
import { v4 as uuid } from 'uuid';
import { MulterRequest } from '../interface/request';
const saveImageToGcs = async (req: MulterRequest, bucketName: string, folderName: string) => {
  if (req.file) {
    const bucket = gcs.bucket(bucketName);
    const gcsName = uuid().toString();

    const objectName = `${folderName}/${gcsName}`;
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

export { saveImageToGcs };
