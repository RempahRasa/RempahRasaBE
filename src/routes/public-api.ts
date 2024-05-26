import express from 'express';
import loginController from '../controller/login-controller';
const publicRouter = express.Router();

publicRouter.post('/login', loginController.loginController);

export { publicRouter };
