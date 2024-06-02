import express from 'express';
import { registerController, loginController } from '../controller/user-controller';

import multer from 'multer';
import { MulterRequest } from '../interface/request';
import { resendToken,  tokenController} from '../controller/token-controller';

const upload = multer();
const publicRouter = express.Router();

publicRouter.post('/login', (req, res, next) => loginController({ req, res, next }));
publicRouter.post('/register', upload.single('image'), (req: MulterRequest, res, next) => {
  registerController({ req, res, next });
});
publicRouter.get('/verification', (req, res, next) => {
  tokenController({ req, res, next });
});
publicRouter.put('/resend-token', (req, res, next) => resendToken({ req, res, next }));

export { publicRouter };
