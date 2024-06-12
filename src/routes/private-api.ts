import express from 'express';
import { logoutController } from '../controller/auth-controller';
import { getFavoriteController, getHistoriesController, getProfileController, removeFavoriteController, saveFavoriteController } from '../controller/user-controller';
import { spiceClassificationController } from '../controller/spice-controller';
import { MulterRequest } from '../interface/request';
import multer from 'multer';
import { recipeClassificationController, recipeDetailClassificationController } from '../controller/recipe-controller';

const privateRouter = express.Router();
const upload = multer();
privateRouter.delete('/logout', (req, res, next) => logoutController({ req, res, next }));
privateRouter.get('/profile', (req, res, next) => getProfileController({ req, res, next }));
privateRouter.get('/histories', (req, res, next) => getHistoriesController({ req, res, next }));
privateRouter.put('/favorites', (req, res, next) => saveFavoriteController({ req, res, next }));
privateRouter.delete('/favorites', (req, res, next) => removeFavoriteController({ req, res, next }));
privateRouter.get('/favorites', (req, res, next) => getFavoriteController({ req, res, next }));


// Model
privateRouter.post('/prediction', upload.single('image'), (req: MulterRequest, res, next) =>
  spiceClassificationController({ req, res, next })
);
privateRouter.get('/recipe', (req, res, next) => { recipeClassificationController({ req, res, next }) });
privateRouter.get('/recipe-detail', (req, res, next) => { recipeDetailClassificationController({ req, res, next }) });
export { privateRouter };
