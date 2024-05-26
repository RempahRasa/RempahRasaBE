import express from 'express';
import { register, loginController } from '../controller/user-controller';

const publicRouter = express.Router();

publicRouter.post('/register', (req, res, next) => register({ req, res, next }));

publicRouter.post('/login', (req, res, next) => loginController({ req, res, next }));

export { publicRouter };
