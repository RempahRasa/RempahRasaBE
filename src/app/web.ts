import express from 'express';
import { publicRouter } from '../routes/public-api';
import { errorMiddleware } from '../middleware/error-middleware';
import { privateRouter } from '../routes/private-api';
import { notFoundRouter } from '../routes/not-found-api';
import { loadModel } from '../utils/loadModel';

export const web = express();

export const initializeWeb = async () => {
  const model = await loadModel();
  (web as any).model = model;

  web.use(express.json());
  web.use(express.urlencoded({ extended: true }));
  web.use(publicRouter);
  web.use(privateRouter);
  web.use(notFoundRouter);
  web.use(errorMiddleware);
  return web;
};
