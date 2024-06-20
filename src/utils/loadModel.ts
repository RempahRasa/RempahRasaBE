import * as tf from '@tensorflow/tfjs-node';

async function loadModel() {
  const model = await tf.loadLayersModel(process.env.MODEL_URL);
  return model;
}
export { loadModel };
