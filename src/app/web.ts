import express from 'express';
import { publicRouter } from '../routes/public-api';
import { errorMiddleware } from '../middleware/error-middleware';
import { privateRouter } from '../routes/private-api';
import { notFoundRouter } from '../routes/not-found-api';

export const web = express();

web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.use(publicRouter);
web.use(privateRouter);
web.use(notFoundRouter);
web.use(errorMiddleware);
