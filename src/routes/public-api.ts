import express from 'express';
import { register, loginController } from '../controller/user-controller';

import multer from 'multer';
import { MulterRequest } from '../interface/request-interface';

const upload = multer();
const publicRouter = express.Router();

publicRouter.post('/login', (req, res, next) => loginController({ req, res, next }));
publicRouter.post('/register', upload.single('image'), (req: MulterRequest, res, next) => {
  register({ req, res, next });
});

export { publicRouter };
