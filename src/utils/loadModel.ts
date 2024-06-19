import * as tf from '@tensorflow/tfjs-node';

async function loadModel() {
  const model = await tf.loadLayersModel(tf.io.fileSystem(process.env.MODEL_PATH));
  return model;
}
export { loadModel };
