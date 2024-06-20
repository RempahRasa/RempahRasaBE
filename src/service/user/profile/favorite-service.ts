import { historyCollection } from "../../../app/firestore";
import { Request, Response } from "express";
import { ResponseError } from "../../../error/response-error";
import { getTokenFromHeader } from "../../../utils/token";
import { getUserByToken } from "../../../utils/user/getUserByToken";
import { getHistoryById } from "../../../utils/getHistoryById";
import { FieldValue } from "@google-cloud/firestore";
import { favoriteValidation } from "../../../validation/user/favorite-validation";
import { validate } from "../../../validation/validation";

type FavoriteType = "add" | "remove";

const saveFavoriteService = async (req: Request, res: Response, operationType: FavoriteType) => {
    const validateFavorite = validate(favoriteValidation, operationType);
    const accessToken = getTokenFromHeader(req, res);
    const { userData } = await getUserByToken(accessToken);

    if (validateFavorite) {

        if (userData) {
            let updatedFavorite = null
            if (operationType === "add") {
                updatedFavorite = {
                    favorite: true
                };
            }
            const { historyData } = await getHistoryById(userData.id, req.body.historyId);
            if (!historyData) {
                throw new ResponseError(404, "History not found");
            }
            const historyRef = historyCollection(userData.id).doc(req.body.historyId);
            if (updatedFavorite !== null) {
                const setFavorite = await historyRef.update(updatedFavorite)
                if (setFavorite) {
                    return "Favorite saved successfully"
                } else {
                    throw new ResponseError(500, "Favorite cannot be saved");
                }
            } else {
                const removeFavorite = await historyRef.update({
                    favorite: FieldValue.delete()
                })
                if (removeFavorite) {
                    return "Favorite removed successfully"
                } else {
                    throw new ResponseError(500, "Favorite cannot be removed");
                }
            }
        } else {
            throw new ResponseError(404, "User not found");
        }
    }
};

const getFavoriteService = async (req: Request, res: Response) => {
    const accessToken = getTokenFromHeader(req, res);
    const { userData } = await getUserByToken(accessToken);

    if (userData) {
        const historyFavorite = await historyCollection(userData.id).where("favorite", "==", true).get();
        const history = historyFavorite.docs.map((doc) => doc.data());
        if (history.length <= 0) {
            throw new ResponseError(404, 'Favorite not found');
        }
        return history;
    } else {
        throw new ResponseError(404, 'User not found');
    }
}
export { saveFavoriteService, getFavoriteService };