import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware';
import { logoutController } from '../controller/auth-controller';
import { getHistoriesController, getProfileController } from '../controller/user-controller';
const privateRouter = express.Router();

privateRouter.use(authMiddleware);

privateRouter.delete('/logout', (req, res, next) => logoutController({ req, res, next }));
privateRouter.get('/profile', (req, res, next) => getProfileController({ req, res, next }));
privateRouter.get('/histories', (req, res, next) => getHistoriesController({ req, res, next }));

export { privateRouter };