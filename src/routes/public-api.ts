import express from 'express';
import { register } from '../controller/user-controller';
import userController from '../controller/user-controller';

const publicRouter = express.Router();

publicRouter.post('/register', (req, res, next) => register({ req, res, next }));

publicRouter.post('/login', (req, res, next) => userController.loginController({ req, res, next }));

export { publicRouter };
