import * as tf from '@tensorflow/tfjs-node';
import { gcs } from '../app/storage';
import { GetSignedUrlConfig } from '@google-cloud/storage';

const generateSignedUrl = async (bucketName: string, fileName: string) => {
  const options: GetSignedUrlConfig = {
    version: 'v4',
    action: 'read',
    expires: Date.now() + 15 * 60 * 1000 // 15 minutes
  };
  const [url] = await gcs.bucket(bucketName).file(fileName).getSignedUrl(options);
  return url;
};

async function loadModel() {
  const bucketName = process.env.PRIVATE_BUCKET_NAME;
  const modelPath = process.env.MODEL_PATH;
  // const signedURL = await generateSignedUrl(bucketName, modelPath);
  const model = await tf.loadLayersModel(tf.io.fileSystem('model/model.json'));
  // const model = await tf.loadLayersModel(
  //   'https://github.com/RempahRasa/RempahRasaML/blob/main/tfjs_model%20(1)/model.json'
  // );

  // const model = await tf.loadLayersModel(
  //   'https://storage.googleapis.com/rempahrasa-bucket-private/model/spice_classification/model.json'
  // );
  return model;
}
export { loadModel };
