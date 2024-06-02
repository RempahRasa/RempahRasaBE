import { db } from "../../../app/firestore";
import { ResponseError } from "../../../error/response-error";
import { MiddlewareRequest } from "../../../interface/controller";
import { getUserByToken } from "../../../utils/getUserByToken";

const getHistoryService = async ({req, res, next}: MiddlewareRequest) => {
    const bearerToken = req.get('Authorization');
    const accessToken = bearerToken.split(' ')[1];
    const {result} = await getUserByToken(accessToken);
    if (result.length > 0 ){
        const idUser = result[0].id;
        const historyCollection = await db.collection('users').doc(idUser).collection('history').get();
        const history = historyCollection.docs.map((doc) => doc.data());
        if (history.length <= 0) {
            throw new ResponseError(404, 'History not found');
        }
        return history;
    } else {
        throw new ResponseError(404, 'User not found');
    }
}

export { getHistoryService }