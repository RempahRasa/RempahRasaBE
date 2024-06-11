import express from 'express';
import { logoutController } from '../controller/auth-controller';
import { getHistoriesController, getProfileController } from '../controller/user-controller';
import { spiceClassificationController } from '../controller/spice-controller';
import { MulterRequest } from '../interface/request';
import multer from 'multer';

const privateRouter = express.Router();
const upload = multer();
privateRouter.delete('/logout', (req, res, next) => logoutController({ req, res, next }));
privateRouter.get('/profile', (req, res, next) => getProfileController({ req, res, next }));
privateRouter.get('/histories', (req, res, next) => getHistoriesController({ req, res, next }));

// Model
privateRouter.post('/prediction', upload.single('image'), (req: MulterRequest, res, next) =>
  spiceClassificationController({ req, res, next })
);

export { privateRouter };
