import { ResponseError } from "../error/response-error";
import { authMiddleware } from "../middleware/auth-middleware";
import { getRecipeClassification, getRecipeClassificationDetail } from "../service/spice/recipeClassificationService";
import { validate } from "../validation/validation";
import { recipeClassificationValidation, recipeDetailClassificationValidation } from "../validation/prediction/recipe-classification-validation";

export const recipeClassificationController = async ({ req, res, next }) => {
    try {
        const checkAuth = await authMiddleware(req, res);
        if (!checkAuth) {
            throw new ResponseError(401, 'Unauthorized');
        }
        const ingredientParams = req.query.ingredient;
        const spiceParams = req.query.spice;
        const paramsObject = {
            ingredient: ingredientParams,
            spice: spiceParams
        };
        const validatedIngredients = validate(recipeClassificationValidation, paramsObject);
        if (validatedIngredients) {
            const result = await getRecipeClassification(spiceParams, ingredientParams);
            if (result !== undefined) {
                return res.status(200).json({
                    data: result
                });
            } throw new ResponseError(500, 'Cannot get recipe classification');
        }
    } catch (error) {
        next(error);
    }
};
export const recipeDetailClassificationController = async ({ req, res, next }) => {
    try {
        const checkAuth = await authMiddleware(req, res);
        if (!checkAuth) {
            throw new ResponseError(401, 'Unauthorized');
        }
        const requestBody = req.query.id;
        const validatedIngredients = validate(recipeDetailClassificationValidation, requestBody);
        if (validatedIngredients) {
            const result = await getRecipeClassificationDetail(requestBody);
            if (result !== undefined) {
                return res.status(200).json({
                    data: result
                });
            } throw new ResponseError(500, 'Cannot get recipe classification');
        }
    } catch (error) {
        next(error);
    }
};