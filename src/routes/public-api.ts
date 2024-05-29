import express from 'express';
import userController from '../controller/user-controller';

const publicRouter = express.Router();

publicRouter.post('/login', (req, res, next) => userController.loginController({ req, res, next }));

export { publicRouter };
