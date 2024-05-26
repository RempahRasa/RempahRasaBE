import express from 'express';
import { publicRouter } from '../routes/public-api';

export const web = express();

web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.use(publicRouter);
