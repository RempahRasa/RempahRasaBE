import { MiddlewareRequest } from "../interface/controller-interface";
import { verificationService } from "../service/token/verification";

const tokenController = async ({req, res, next}:MiddlewareRequest )  => { 
    try {
        const token = req.query.token;
        const result = await verificationService(token as string);
        res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export {tokenController};