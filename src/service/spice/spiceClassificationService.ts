import * as tf from '@tensorflow/tfjs-node';
import { ResponseError } from '../../error/response-error';
import { CLASSLIST } from '../../constant/classList';

export const spiceClassificationService = async (image: Buffer, model) => {
  try {
    if (!image) {
      throw new ResponseError(400, 'Bad request');
    }
    const tensor = await tf.node
      .decodeImage(image)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .expandDims(0)
      .div(tf.scalar(255.0));

    const prediction = await model.predict(tensor);
    const classResult = prediction.argMax(1).dataSync()[0];

    return CLASSLIST[classResult];
  } catch (error) {
    throw new ResponseError(500, error.message);
  }
};
